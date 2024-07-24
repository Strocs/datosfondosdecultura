export function formatAmount (amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CLP'
  }).format(amount)
}
