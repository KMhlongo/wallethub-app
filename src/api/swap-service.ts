import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_WALLET_HUB_SERVICE_URL;

const client = axios.create({
    baseURL: BASE_URL,
})

export const SwapApi = {

    getCommonTokens: async() => {
        const res = client.get(`/dex/common-tokens`)
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
            })
        return res;
    },
    swapTokens: async(swapRequest) => {
        const res = client.post(`dex/swap`,swapRequest)
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.
                log(err);
            })
        return res;
    }

}