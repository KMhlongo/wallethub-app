/* eslint-disable */

import { useState } from 'react'
import './App.css'
import {DiscoverWalletProviders} from './components/DiscoverWalletProviders'
import { WalletApi } from './api/wallet-hub-service'
import { formatEthersBalance } from './utils/format-utils'
import { Logo } from './elements/Logo'
import WalletDetail from './components/WalletDetail'
import { WalletInfo } from './types/walletInfo'
import WalletDashboard from './components/WalletDashboard'

function App() {
  const [inputAddress, setInputAddress] = useState<string>('');
  const [walletInfo, setWalletInfo] = useState<WalletInfo>();
  const [error, setError] = useState<boolean>(false);
  const [isProviderWallet, setProviderWallet] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // function to set the wallet to value from the search bar
  async function handleWalletSearch() {
    setProviderWallet(false);
    changeWalletAddress(inputAddress);
  }

  //function to set the wallet from the detected wallets of the browser
  async function handleDetectedWallet(address: string) {
    setProviderWallet(true);
    changeWalletAddress(address);
  }

  async function handleSearchString(value: string) {
    setError(false);
    setInputAddress(value);
  }

  async function changeSelectedChain(e: any) {
    setWalletInfo(prev => prev ? {...prev, selectedChain: e.target.value} : undefined)
    console.log(e.target.value)
    const chain_id = e.target.value;
    if (walletInfo?.address) {
      try {
        const [
          balanceResponse,
          tokensResponse,
          transactionsResponse,
        ] = await Promise.all([
          WalletApi.getWalletBalance(walletInfo.address, chain_id),
          WalletApi.getWalletTokens(walletInfo.address, chain_id),
          WalletApi.getWalletTransactions(walletInfo.address, chain_id)
        ])
        console.log(`balance response for chain ${chain_id} is ${balanceResponse.balance}`)
        setWalletInfo(prev => prev ? {
          ...prev,
          balance: formatEthersBalance(balanceResponse.balance),
          tokens: tokensResponse.result,
          transactions: transactionsResponse.result
        } : undefined)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const changeWalletAddress = async(address: string) => {
    setIsLoading(true);
    try {
      const [
        balanceResponse, 
        tokenResponse,
        transactionsResponse,
        activeChainsResponse,
      ] = await Promise.all([
        WalletApi.getWalletBalance(address),
        WalletApi.getWalletTokens(address),
        WalletApi.getWalletTransactions(address),
        WalletApi.getActiveChains(address),
      ]);
      // console.log(JSON.stringify(transactionsResponse))
      setWalletInfo({
        address: address,
        tokens: tokenResponse.result, 
        transactions: transactionsResponse.result, 
        balance: formatEthersBalance(balanceResponse.balance),
        activeChains: activeChainsResponse,
      })
    } catch (err) {
      console.log(`error retrieving wallet data: ${err}`)
      setError(true);
      setWalletInfo(undefined);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className='flex items-center'>
        <div className='w-16 h-16 mr-2'>
          <Logo />
        </div>
        <span className='text-xl'>wallethub</span>
        <div className='ml-auto'>
          <DiscoverWalletProviders handleDetectedWallet={handleDetectedWallet} isProviderWallet={isProviderWallet}/>
        </div>
      </div>
      <div className='flex py-2'>
        <input placeholder='Enter Wallet Address' className={`w-1/3 border rounded-full py-1 px-4 text-sm ${error ? 'border-red-500' : ''}`}
          autoComplete='false' spellCheck='false' value={inputAddress} onChange={e => handleSearchString(e.target.value)}
          title={error ? 'Invalid wallet address' : ''}
        />
        <button onClick={handleWalletSearch} className='rounded-full text-sm ml-2'>Search</button>
      </div>
        <WalletDetail walletInfo={walletInfo} isLoading={isLoading}/>
        <hr></hr>
        <WalletDashboard walletInfo={walletInfo} isLoading={isLoading} changeSelectedChain={changeSelectedChain}/>
    </>
  )
}

export default App
