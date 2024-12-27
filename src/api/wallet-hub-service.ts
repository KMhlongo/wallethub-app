/* eslint-disable */

import axios from 'axios';
import { tokensResponse } from './tokens-response';
import { transactionsResponse } from './transactions-response';
import { chainsResponse } from './chains-response';

const BASE_URL = import.meta.env.VITE_API_WALLET_HUB_SERVICE_URL;

const client = axios.create({
    baseURL: BASE_URL,
})

export const WalletApi = {

    getWalletTokens: async(walletAddress: string, chain_id?: string)  => {
        const res =  client.post(`/wallet/tokens`,
            {
                'walletAddress': walletAddress,
                'chain_id': chain_id,
            }
        )
        .then(res => {
            return res.data; 
        })
        .catch(err => {
            console.log(err);
        })
        return res;
    },
    getWalletBalance: async(walletAddress: string, chain_id? : string) : Promise<any> => {
        const res = client.post(`/wallet/balance`,
            {
                'walletAddress': walletAddress,
                'chain_id': chain_id,
            }
        )
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log(err);
        })
        return res;
    },
    getTokenPrice: async(tokenAddress: string) => {
        const res = client.post(
            `/token/price`,
            {'tokenAddress': tokenAddress}
        )
        return res;
    },
    getWalletTransactions: async(walletAddress: string, chain_id?: string) => {
        const res = client.post(`/wallet/transactions`,
            {
                'walletAddress': walletAddress,
                'chain_id': chain_id,
            }
        )
        .then((res) => {
            return res.data;
        })
        .catch(err => {
            console.log(err);
        })
        return res;
    },
    getActiveChains: async(walletAddress: string) => {
        console.log(`getting active chains for ${walletAddress}`)
        return chainsResponse;
        // const res = client.post(`/wallet/chains`, 
        //     {'walletAddress': walletAddress}
        // )
        // .then((res) => {
        //     return res.data;
        // })
        // return res;
    }
}