/**
 * 
 * @param rawBalance
 * @returns balance formatted rounded to 2 decimal points
 */
export const formatBalance = (rawBalance: string) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2)
  return balance
}

/**
 * 
 * @param rawBalance 
 * @returns balance formatted with no rounding
 */
export const formatEthersBalance = (rawBalance: string, digits?: number | 18) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(18);
  return balance;
}

export const formatDollarBalance = (rawBalance: string) => {
  return parseInt(rawBalance).toFixed(2);
}

export const formatChainAsNum = (chainIdHex: string) => {
  const chainIdNum = parseInt(chainIdHex)
  return chainIdNum
}

export const formatAddress = (addr: string) => {
  const upperAfterLastTwo = addr.slice(0, 2) + addr.slice(2)
  return `${upperAfterLastTwo.substring(0, 5)}...${upperAfterLastTwo.substring(39)}`
}