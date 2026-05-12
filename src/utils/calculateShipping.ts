export const calculateShipping = (subtotal: number, country: string): number => {
  // Mock logic: free over $100, $10 otherwise; $20 for international
  if (country !== 'US' && country !== 'CA') return 20
  return subtotal >= 100 ? 0 : 10
}
