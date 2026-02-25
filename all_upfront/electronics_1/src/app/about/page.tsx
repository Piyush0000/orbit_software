export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-gray-900 text-white py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6">About Upfront</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        We are redefining the way you discover and experience technology.
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                        <p className="text-gray-600 text-lg mb-4">
                            At Upfront, we believe that technology should be accessible, transparent, and exciting.
                            We curate the best products from around the world to ensure you always stay ahead of the curve.
                        </p>
                        <p className="text-gray-600 text-lg">
                            Quality, integrity, and customer satisfaction are at the core of everything we do.
                        </p>
                    </div>
                    <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center">
                        <span className="text-gray-400 font-bold text-xl">Mission Image Placeholder</span>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold">Our Values</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-sm">
                            <h3 className="text-xl font-bold mb-2">Transparency</h3>
                            <p className="text-gray-600">No hidden fees, no fake reviews. Just honest products and prices.</p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-sm">
                            <h3 className="text-xl font-bold mb-2">Quality</h3>
                            <p className="text-gray-600">Every product is vigorously tested to meet our high standards.</p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-sm">
                            <h3 className="text-xl font-bold mb-2">Community</h3>
                            <p className="text-gray-600">We build relationships, not just customer bases. We're in this together.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
