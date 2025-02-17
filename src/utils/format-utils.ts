/**
 * Formats a raw balance string into a human-readable format by converting it from wei to ether and rounding to a specified number of decimal places.
 * 
 * @param rawBalance - The raw balance string in wei to be formatted.
 * @param precision - Optional parameter to specify the number of decimal places for rounding. If not provided, it defaults to a dynamic precision based on the input value.
 * @returns The formatted balance string in ether, rounded to the specified number of decimal places.
 */
export const formatBalance = (rawBalance: string, precision?: number) => {
  const balance = parseFloat(rawBalance) / 1000000000000000000;
  const dynamicPrecision = balance.toString().split('.')[1]?.length || 0;
  const finalPrecision = precision !== undefined ? precision : dynamicPrecision;
  const formattedBalance = balance.toFixed(finalPrecision);
  return formattedBalance;
}
// export const formatBalance = (rawBalance: string) => {
//   const balance = parseFloat(rawBalance) / 1000000000000000000;
//   const precision = balance.toString().split('.')[1]?.length || 0;
//   const formattedBalance = balance.toFixed(precision);
//   return formattedBalance;
// }

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