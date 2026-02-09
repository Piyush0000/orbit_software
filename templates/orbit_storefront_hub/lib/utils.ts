import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const usdToInr = (usd: number) => Math.round(usd * 83);
export const formatINR = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;
export const parseINRToNumber = (priceString: string): number => {
    if (typeof priceString !== 'string') return 0;
    return parseInt(priceString.replace(/[₹,\s]/g, ''), 10) || 0;
};
