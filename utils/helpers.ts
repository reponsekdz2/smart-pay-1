
/**
 * Formats a number as a currency string.
 * @param amount The number to format.
 * @param currency The currency code (e.g., 'RWF').
 * @returns A formatted currency string.
 */
export const formatCurrency = (amount: number, currency: string = 'RWF'): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};
