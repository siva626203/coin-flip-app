// utils/web3.ts
import Web3 from 'web3';

// Define the type of web3 instance
let web3: Web3;

const alchemyUrl = 'https://eth-sepolia.alchemyapi.io/v2/luh4AMJHFhr7LANNBONQpWrv28wAC6X4';

if (typeof window !== 'undefined' && (window as any).ethereum) {
  // Browser has Metamask
  web3 = new Web3((window as any).ethereum);
  (window as any).ethereum.request({ method: 'eth_requestAccounts' });
} else {
  // No Metamask
  const provider = new Web3.providers.HttpProvider(alchemyUrl);
  web3 = new Web3(provider);
}

export default web3;
