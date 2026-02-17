export default function FeaturesSection() {
    const features = [
        {
            title: "Free Delivery",
            description: "On all orders over ₹500"
        },
        {
            title: "30 Day Returns",
            description: "Hassle-free return policy"
        },
        {
            title: "Secure Payment",
            description: "100% secure checkout"
        },
        {
            title: "24/7 Support",
            description: "Dedicated support team"
        }
    ];

    return (
        <section className="bg-[var(--card-bg)] border-b border-[var(--card-border)]">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
                <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[var(--card-border)]">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center text-center py-10 px-4 group hover:bg-[var(--section-alt)] transition-colors duration-300">
                            <h3 className="font-heading font-medium text-sm text-[var(--text-primary)] uppercase tracking-widest mb-2">{feature.title}</h3>
                            <p className="text-[var(--text-secondary)] text-xs font-light">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
