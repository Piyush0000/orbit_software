import { notFound } from 'next/navigation';
import { fetchMerchantByDomain } from '@/lib/merchant-api';
import ThemeRenderer from '@/components/ThemeRenderer';
import { StorefrontProvider } from '@/contexts/StorefrontContext';

export default async function StorefrontPage({ 
    params 
}: { 
    params: Promise<{ subdomain: string }> 
}) {
    const { subdomain } = await params;
  const merchant = await fetchMerchantByDomain(subdomain);

  if (!merchant) {
    return notFound();
  }

  // Wrap with StorefrontProvider to make data available to theme
  return (
    <StorefrontProvider storeInfo={merchant} subdomain={subdomain}>
      <ThemeRenderer merchant={merchant} />
    </StorefrontProvider>
  );
}