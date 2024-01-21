/**
 * Format Currency Function
 * 
 * @param {object} options - An object containing formatting options.
 * @param {string} [options.lang="en-US"] - The language code for formatting (default: "en-US").
 * @param {string} [options.style="currency"] - The style of formatting (default: "currency").
 * @param {string} [options.currency="USD"] - The currency code (default: "USD").
 * @param {number} options.value - The numerical value to be formatted.
 * 
 * @returns {string} - A formatted string representing the given value in the specified currency format.
 * @throws {Error} - Throws an error if there is an issue with formatting.
 */



type CurrencyFormatState = {
    lang?: string,
    style?: string,
    currency?: string,
    value: number
}

class CurrencyFormat {
    static get({ lang = "en-US", style = "currency", currency = "USD", value }: CurrencyFormatState) {
        try {
            return new Intl.NumberFormat(lang, {
                style: style,
                currency: currency,
            }).format(value);
        } catch (error) {
            throw new Error('error');
        }
    }
}

export { CurrencyFormat }
