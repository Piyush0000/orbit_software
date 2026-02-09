// Convert USD to INR (approximate rate: 1 USD = 83 INR)
export const usdToInr = (usd: number) => Math.round(usd * 83);

export const formatINR = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

// Helper function to parse INR price string to number
export const parseINRToNumber = (priceString: string): number => {
    return parseInt(priceString.replace(/[₹,\s]/g, ''), 10) || 0;
};
