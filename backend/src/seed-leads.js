const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding dummy leads...');

    const leadsData = [
        {
            name: 'John Doe',
            email: 'john@example.com',
            phoneNumber: '9876543210',
            formType: 'book-demo',
            category: 'D2C brand',
            revenueRange: '$10k-$50k',
            website: 'https://johndoe.com',
            budget: '$5000',
            status: 'LEADS',
            companyName: 'Doe Corp',
        },
        {
            name: 'Jane Smith',
            email: 'jane@smith.com',
            phoneNumber: '9123456789',
            formType: 'contact',
            category: 'Electronics',
            revenueRange: '$50k-$100k',
            website: 'https://janesmith.com',
            budget: '$10000',
            status: 'CONTACTED',
            companyName: 'Smith & Co',
        },
        {
            name: 'Alice Johnson',
            email: 'alice@johnson.com',
            phoneNumber: '9988776655',
            formType: 'book-demo',
            category: 'SaaS',
            revenueRange: '$100k-$500k',
            website: 'https://alicej.com',
            budget: '$25000',
            status: 'WON',
            companyName: 'Alice SaaS',
        },
        {
            name: 'Bob Brown',
            email: 'bob@brown.com',
            phoneNumber: '9944332211',
            formType: 'contact',
            category: 'Retail',
            revenueRange: '$0-$10k',
            website: 'https://bobbrown.com',
            budget: '$2000',
            status: 'LOST',
            companyName: 'Bob Retail',
        },
        {
            name: 'Charlie Davis',
            email: 'charlie@davis.com',
            phoneNumber: '9223344556',
            formType: 'book-demo',
            category: 'Agency',
            revenueRange: '$50k-$100k',
            website: 'https://charliedavis.com',
            budget: '$8000',
            status: 'LEADS',
            companyName: 'Charlie Agency',
        },
        {
            name: 'Diana Evans',
            email: 'diana@evans.com',
            phoneNumber: '9112233445',
            formType: 'contact',
            category: 'F&B',
            revenueRange: '$10k-$50k',
            website: 'https://dianaevans.com',
            budget: '$3000',
            status: 'CONTACTED',
            companyName: 'Diana Foods',
        },
    ];

    for (const lead of leadsData) {
        await prisma.lead.create({
            data: lead,
        });
    }

    console.log('Seeding completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
