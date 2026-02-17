const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🔧 Starting Toys Store Fix...\n');

  // 1. Find the toys store
  const store = await prisma.store.findUnique({
    where: { subdomain: 'toys' },
    include: {
      products: true,
      websiteCustomization: true
    }
  });

  if (!store) {
    console.error('❌ Store "toys" not found!');
    const allStores = await prisma.store.findMany({ select: { subdomain: true } });
    console.log('Available stores:', allStores.map(s => s.subdomain).join(', '));
    return;
  }

  console.log(`✅ Found store: ${store.name} (${store.subdomain})`);
  console.log(`   Store ID: ${store.id}`);
  console.log(`   Existing products: ${store.products.length}`);

  // 2. Create sample products if none exist
  if (store.products.length === 0) {
    console.log('\n📦 Creating sample products...');
    
    const sampleProducts = [
      {
        name: 'Building Blocks Set',
        description: 'Colorful building blocks for creative play and learning',
        price: 29.99,
        stock: 50,
        category: 'educational',
        images: ['https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800'],
        tags: ['educational', 'creative'],
        isActive: true,
        isFeatured: true
      },
      {
        name: 'Puzzle Adventure',
        description: 'Challenging puzzle set for problem-solving skills',
        price: 19.99,
        stock: 30,
        category: 'educational',
        images: ['https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800'],
        tags: ['educational', 'puzzle'],
        isActive: true,
        isFeatured: true
      },
      {
        name: 'Action Figure Hero',
        description: 'Poseable action figure with accessories',
        price: 24.99,
        stock: 40,
        category: 'action',
        images: ['https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?w=800'],
        tags: ['action', 'collectible'],
        isActive: true,
        isFeatured: false
      },
      {
        name: 'Plush Teddy Bear',
        description: 'Soft and cuddly teddy bear for comfort',
        price: 34.99,
        stock: 25,
        category: 'plush',
        images: ['https://images.unsplash.com/photo-1551361415-69c87624334f?w=800'],
        tags: ['plush', 'comfort'],
        isActive: true,
        isFeatured: true
      },
      {
        name: 'Remote Control Car',
        description: 'Fast RC car with rechargeable battery',
        price: 49.99,
        stock: 15,
        category: 'vehicles',
        images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'],
        tags: ['vehicles', 'remote-control'],
        isActive: true,
        isFeatured: false
      },
      {
        name: 'Art & Craft Kit',
        description: 'Complete art supplies for young artists',
        price: 39.99,
        stock: 20,
        category: 'educational',
        images: ['https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800'],
        tags: ['educational', 'creative', 'art'],
        isActive: true,
        isFeatured: true
      }
    ];

    for (const productData of sampleProducts) {
      const product = await prisma.product.create({
        data: {
          ...productData,
          storeId: store.id
        }
      });
      console.log(`   ✅ Created: ${product.name} ($${product.price})`);
    }
    
    console.log(`\n✅ Created ${sampleProducts.length} sample products`);
  } else {
    // Ensure all existing products are active
    console.log('\n🔄 Ensuring all products are active...');
    await prisma.product.updateMany({
      where: { storeId: store.id },
      data: { isActive: true }
    });
    console.log('✅ All products marked as active');
  }

  // 3. Create or update website customization
  console.log('\n🎨 Setting up website customization...');
  
  const customizationData = {
    logo: null,
    favicon: null,
    brandColors: {
      primary: '#5FA8D3',
      secondary: '#1E3A8A',
      accent: '#F59E0B'
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter'
    },
    heroSection: {
      title: 'Spark Joy in Every Moment',
      subtitle: 'Discover amazing toys that help your little ones learn, grow, and have a blast.',
      ctaText: 'Shop Now',
      ctaLink: '#products',
      backgroundImage: null
    },
    features: [
      { id: '1', icon: '🎯', title: 'Quality Toys', description: 'Safe & Certified' },
      { id: '2', icon: '🚀', title: 'Fast Shipping', description: 'Free on orders $50+' },
      { id: '3', icon: '💝', title: 'Gift Wrapping', description: 'Available at checkout' }
    ],
    announcementBar: {
      enabled: true,
      text: '🎉 Free shipping on orders over $50! Limited time offer.',
      backgroundColor: '#5FA8D3',
      textColor: '#FFFFFF'
    },
    aboutSection: {
      title: 'About Our Toy Store',
      content: 'We bring joy to children through carefully selected, high-quality toys that inspire creativity and learning.',
      image: null
    },
    contactInfo: {
      email: 'hello@toystore.com',
      phone: '1-800-TOY-STORE',
      address: null
    },
    socialLinks: {
      facebook: null,
      instagram: null,
      twitter: null
    },
    productSections: [
      {
        id: 'featured',
        title: 'Featured Collections',
        subtitle: 'Our hand-picked selections for your little ones',
        category: 'all',
        limit: 8,
        style: 'grid'
      },
      {
        id: 'educational',
        title: 'Learning & Growth',
        subtitle: 'Toys that challenge and inspire young minds',
        category: 'educational',
        limit: 4,
        style: 'grid'
      }
    ]
  };

  const customization = await prisma.websiteCustomization.upsert({
    where: { storeId: store.id },
    update: customizationData,
    create: {
      storeId: store.id,
      ...customizationData
    }
  });

  console.log('✅ Website customization configured');

  // 4. Verify everything
  console.log('\n🔍 Verification...');
  
  const finalCheck = await prisma.store.findUnique({
    where: { subdomain: 'toys' },
    include: {
      products: { where: { isActive: true } },
      websiteCustomization: true
    }
  });

  console.log(`✅ Active products: ${finalCheck.products.length}`);
  console.log(`✅ Customization: ${finalCheck.websiteCustomization ? 'Present' : 'Missing'}`);
  console.log(`✅ Product Sections: ${finalCheck.websiteCustomization?.productSections ? JSON.parse(JSON.stringify(finalCheck.websiteCustomization.productSections)).length : 0}`);

  console.log('\n🎉 Toys Store is now fully configured!');
  console.log('\n📍 Next steps:');
  console.log('   1. Refresh your Orbit Admin dashboard (http://localhost:3001)');
  console.log('   2. Visit the storefront (http://toys.localhost:3000)');
  console.log('   3. Products should now appear on the website!');
}

main()
  .catch(e => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
