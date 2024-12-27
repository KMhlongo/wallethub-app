/* eslint-disable */

export interface WalletInfo {
    tokens: any,
    transactions: any,
    balance: any,
    address?: string,
    activeChains?: Chain[],
    selectedChain?: string,
}

export interface Chain {
    chain: string,
    chain_id: string,
}