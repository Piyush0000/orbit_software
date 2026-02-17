const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const themes = [
  {
    name: "Modern Fashion Store",
    slug: "clothing-modern",
    category: "CLOTHING",
    description: "Contemporary fashion e-commerce template",
    thumbnail: "/themes/clothing-modern/preview.png",
    repository: "orbit_front_all",
    version: "1.0.0",
    config: {
      features: ["product-grid", "quick-view", "size-guide"],
      colors: { primary: "#000000", secondary: "#FFFFFF" }
    }
  },
  {
    name: "Boutique Fashion",
    slug: "clothing-boutique",
    category: "CLOTHING",
    description: "Elegant boutique style template",
    thumbnail: "/themes/clothing-boutique/preview.png",
    repository: "orbit_upfront",
    version: "1.0.0",
    config: {
      features: ["lookbook", "style-guide", "collections"],
      colors: { primary: "#D4AF37", secondary: "#2C2C2C" }
    }
  },
  {
    name: "Tech Store Pro",
    slug: "electronics-pro",
    category: "ELECTRONICS",
    description: "Modern electronics store template",
    thumbnail: "/themes/electronics-pro/preview.png",
    repository: "orbit_front_others",
    version: "1.0.0",
    config: {
      features: ["specs-comparison", "tech-reviews", "warranty-info"],
      colors: { primary: "#0066CC", secondary: "#333333" }
    }
  },
  {
    name: "Beauty Luxe",
    slug: "cosmetics-luxe",
    category: "COSMETICS",
    description: "Luxury cosmetics store template",
    thumbnail: "/themes/cosmetics-luxe/preview.png",
    repository: "orbit-cosmetics-upfront",
    version: "1.0.0",
    config: {
      features: ["ingredient-list", "skin-type-filter", "beauty-tips"],
      colors: { primary: "#FF69B4", secondary: "#FFFFFF" }
    }
  },
  {
    name: "Kids Wonderland",
    slug: "toystore-wonderland",
    category: "TOYSTORE",
    description: "Colorful toy store template",
    thumbnail: "/themes/toystore-wonderland/preview.png",
    repository: "orbit_front_all",
    version: "1.0.0",
    config: {
      features: ["age-filter", "educational-toys", "gift-guide"],
      colors: { primary: "#FF6B6B", secondary: "#4ECDC4" }
    }
  },
  {
    name: "Shoe Gallery",
    slug: "footwear-gallery",
    category: "FOOTWEAR",
    description: "Premium footwear store template",
    thumbnail: "/themes/footwear-gallery/preview.png",
    repository: "orbit_upfront",
    version: "1.0.0",
    config: {
      features: ["size-chart", "360-view", "material-info"],
      colors: { primary: "#8B4513", secondary: "#F5F5DC" }
    }
  },
  {
    name: "Restaurant Deluxe",
    slug: "food-deluxe",
    category: "FOOD_BEVERAGE",
    description: "Restaurant and cafe template",
    thumbnail: "/themes/food-deluxe/preview.png",
    repository: "orbit_front_others",
    version: "1.0.0",
    config: {
      features: ["menu-builder", "reservations", "delivery-tracking"],
      colors: { primary: "#FF4500", secondary: "#FFD700" }
    }
  },
  {
    name: "Fragrance Elite",
    slug: "perfume-elite",
    category: "PERFUME",
    description: "Luxury perfume store template",
    thumbnail: "/themes/perfume-elite/preview.png",
    repository: "orbit-cosmetics-upfront",
    version: "1.0.0",
    config: {
      features: ["scent-finder", "fragrance-notes", "gift-sets"],
      colors: { primary: "#4B0082", secondary: "#FFD700" }
    }
  },
  {
    name: "Jewel Showcase",
    slug: "jewellery-showcase",
    category: "JEWELLERY",
    description: "Elegant jewellery store template",
    thumbnail: "/themes/jewellery-showcase/preview.png",
    repository: "orbit_front_all",
    version: "1.0.0",
    config: {
      features: ["virtual-try-on", "certification", "custom-design"],
      colors: { primary: "#FFD700", secondary: "#000000" }
    }
  }
];

async function seedThemes() {
  console.log('🌱 Seeding themes...');
  for (const theme of themes) {
    await prisma.theme.upsert({
      where: { slug: theme.slug },
      update: theme,
      create: theme
    });
    console.log(`✅ Created/Updated: ${theme.name}`);
  }
  console.log('✨ Theme seeding complete!');
  await prisma.$disconnect();
}

seedThemes().catch((error) => {
  console.error('Theme seeding failed:', error);
  prisma.$disconnect();
});
