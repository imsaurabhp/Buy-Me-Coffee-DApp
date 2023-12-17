import React, { useState, useEffect } from 'react'
import './App.css'
import Hero from './components/hero/Hero'
import Memo from './components/memos/Memo'

import Web3 from 'web3'
import ABI from './components/ABI.json'
// import {ethers} from 'ethers'

function App() {
  const [state, setState] = useState({
    web3: null,
    contract: null,
    account: ""
  })

  useEffect(() => {
    const connectWallet = async() => {
        const contractAddress = "0xef40025d40d4a348265173fa2f9656199cc17b15";
        let defaultAccount;
        // const contractABI = ABI.abi;
        try{
          const web3 = new Web3(window.ethereum);
          if(!web3){
            alert("Please install MetaMask!")
            return
          }

          // // This is EtherJS code
          // const provider = new ethers.BrowserProvider(window.ethereum);
          // // It will prompt user for account connections if it isnt connected
          // const signer = await provider.getSigner();
          // console.log("Account:", await signer.getAddress());

          const contract = new web3.eth.Contract(ABI, contractAddress);
          const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
          setState({web3:web3, contract:contract, account: accounts[0]})
        }
        catch(error){
            console.error(error)
        }
    }
    connectWallet()
}, [])
  // console.log(state)

  return (
    <>
      <div className='bg-[#ffcc81]'>
        <Hero state={state}/>
        <Memo state={state}/>
      </div>
    </>
  )
}

export default App
