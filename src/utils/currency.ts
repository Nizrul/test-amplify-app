class CurrencyUtil {
  formatCurrency(amount: number) {
    return Intl.NumberFormat('en-MY', { style: 'currency', currency: 'MYR'}).format(amount);
  }
}

export const currencyUtil = new CurrencyUtil();