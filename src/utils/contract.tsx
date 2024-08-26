    // utils/contract.ts
    import Web3 from 'web3';
    import web3 from './web3';
    import contractData from '../../artifacts/contracts/CoinFlip.sol/CoinFlip.json'
    const contractAddress = '0x3279af1cc04097a58a83f47E875cc85f35D4ad01';

    // Type the contract instance
    const contract = new web3.eth.Contract(contractData.abi as unknown as any[], contractAddress);


    export default contract;
