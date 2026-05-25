/**
 * Validates if a string is a shopping product URL from Amazon India or Flipkart
 * @param url - The URL string to validate
 * @returns true if the URL is from amazon.in, amzn.in, or flipkart.com; false otherwise
 */
export const isShoppingProductUrl = (url: string): boolean => {
  const shoppingUrlPattern = /^https:\/\/(www\.)?(amzn\.in|amazon\.in|flipkart\.com|dl\.flipkart\.com)(\/|$)/i
  return shoppingUrlPattern.test(url)
}
