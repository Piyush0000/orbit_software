export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-6">Orbit360 Storefront Hub</h1>
        <p className="text-lg text-center text-gray-600 mb-8">
          Welcome to the unified multi-tenant storefront hub. Each subdomain will render a different merchant theme.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Dynamic Theming</h2>
            <p>Different themes loaded based on subdomain</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Multi-Tenant</h2>
            <p>Each merchant gets their own storefront</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Brand Customization</h2>
            <p>Colors and branding injected dynamically</p>
          </div>
        </div>
      </main>
    </div>
  );
}