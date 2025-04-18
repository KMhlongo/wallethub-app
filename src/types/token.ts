export interface Token {
    address: string,
    name: string,
    decimals: number,
    symbol: string,
}

export interface SwapRequest {
    inputToken: Token,
    outputToken: Token,
    amount: string,
}