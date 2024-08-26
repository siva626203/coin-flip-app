'use client';
import { useAccount } from 'wagmi';
import { useState,useEffect } from 'react';
import contract from '../../utils/contract';
import web3 from '../../utils/web3';
import { toast } from "react-toastify";
import Image from 'next/image';
import Head from '../../images/head.png';
import confetti from 'canvas-confetti';
import Tail from '../../images/tail.png'; 
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
export default function Flip() {
  const { address } = useAccount(); // Get the current account address
  const [result, setResult] = useState('');
  const [isFlipping, setIsFlipping] = useState(false);
  const [status, setStatus] = useState<boolean | undefined>(undefined);
  const [choice, setChoice] = useState(true); // default choice (true for heads)
  const [amount, setAmount] = useState<number>(0.000001);
  const flipCoin = async () => {
  if (!address) {
    toast.warn("Please connect the wallet!"); // Ensure there is an address
    return;
  }
  if (amount <= 0) {
    toast.error("Amount must be greater than 0 ETH");
    return;
  }
  const audio = new Audio();
  audio.play();
  setIsFlipping(true);
  try {
    // Estimate the gas required for the transaction
    const estimatedGas = await contract.methods.flipCoin(choice).estimateGas({
      from: address,
      value: web3.utils.toWei(amount.toString(), 'ether')
    });

    // Convert estimatedGas to a string to match TypeScript types
    const estimatedGasString = estimatedGas.toString();

    // Send transaction and await the receipt
    const amountInWei = web3.utils.toWei(amount.toString(), 'ether');
    const gasPriceInGwei = '50'; // Example gas price in Gwei
    const gasPriceInWei = web3.utils.toWei(gasPriceInGwei, 'gwei');

    const tx = await contract.methods.flipCoin(choice).send({
      from: address,
      value: amountInWei,// Set the gas price
    });

    // Access event data safely
    const event = tx?.events?.CoinFlipped;
    if (event && event.returnValues) {
      // Type assertion to ensure proper typing
      const { won, amount } = event.returnValues as { won: boolean, amount: string };

      // Safely convert amount to number using BigNumber
      const amountInEther = web3.utils.fromWei(amount, 'ether');

      // Check if amountInEther is a valid number
      if (!isNaN(parseFloat(amountInEther))) {
        setStatus(won);
        const resultAudio = new Audio(won ? "../../musics/winning-218995.mp3" : "../../musics/fail-144746.mp3");
        resultAudio.play().catch(error => console.error('Audio playback error:', error));
        setResult(won ? `You won ${amountInEther} ETH!` : `You lost ${amountInEther} ETH.`);
      } else {
        console.error('Amount is not a valid number');
        setResult('Failed to process the result.');
      }
    } else {
      console.error('Event or returnValues not found');
      setResult('No event data found.');
    }
  } catch (error) {
    console.error('Error:', error);
    setResult('An error occurred.');
  }
  setIsFlipping(false);
};

useEffect(() => {
    if (status) {
      // Duration of the confetti effect
      const duration = 5000; // 5 seconds
      const end = Date.now() + duration;
      const interval = setInterval(() => {
        if (Date.now() > end) {
          clearInterval(interval);
        } else {
          confetti({
            spread: 360,
            origin: { y: 0.6 },
            particleCount: 50, // Adjust particle count as needed
          });
        }
      }, 200); // Adjust frequency of confetti bursts
    }
  }, [status]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Convert the string to a number
    const numberValue = parseFloat(value);
    // Check if the value is a valid number
    if (!isNaN(numberValue)) {
      setAmount(numberValue);
    } else {
      // Optionally handle invalid input (e.g., clear the state or set to a default value)
      setAmount(0);
    }
  };
  return (
    <div>
      
      <motion.div 
      className="bg-rotating-gradient bg-[length:200%_200%] bg-contain bg-no-repeat flex flex-col justify-center gap-2 items-center rounded-xl md:mx-24 md:py-10 mx-10 py-10 animate-bg-rotate"
       >
        {result && (
          <div>
            {
              status?
              <motion.h1
            initial={{ opacity: 0, scale: 0.5,color:"green" }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='text-4xl font-jersey font-semibold '
          >
            Result: {result}
          </motion.h1>:<motion.h1
            initial={{ opacity: 0, scale: 0.5,color:"red" }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='text-4xl font-jersey font-semibold '
          >
            Result: {result}
          </motion.h1>
            }
          
          </div>
        )}
        <div className={`coin ${isFlipping ? 'flipping' : ''}`}>
          {
            isFlipping ? 
          <><Image className="side heads" src={Head} alt="Heads" width={800} height={100} /><Image className="side tails" src={Tail} alt="Tails" width={800} height={100} /></>:choice?<Image className="side heads" src={Head} alt="Heads" width={800} height={100} />:<Image className="side" style={{backgroundColor:"gold"}} src={Tail} alt="Tails" width={800} height={100} />
          }
          
        </div>
        <div className='flex md:gap-36 gap-5'>
       <button
  onClick={() => setChoice(true)}
  disabled={isFlipping}
  className="text-white font-bold md:py-2 md:px-4 rounded bg-gradient-to-r from-green-400 via-yellow-500 to-blue-500 bg-rotate bg-rotate-hover transition-all duration-500"
>
  Heads
</button>

 <input
      type="number"
      value={amount}
      onChange={handleChange}
      min={0.000001}
      className= "placeholder:text-yellow-500 text-yellow-500 md:text-4xl  peer ring md:px-4 md:py-1 md:h-12 border-0 rounded-lg ring-gray-200 duration-500 focus:ring-2 focus:border-gray-100 relative  shadow-xl shadow-gray-400/10 focus:shadow-none focus:rounded-md focus:ring-blue-600"
    />
<button
  onClick={() => setChoice(false)}
  disabled={isFlipping}
  className="text-white font-bold md:py-2 md:px-4 rounded bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 bg-rotate bg-rotate-hover transition-all duration-500"
>
  Tails
</button>
        </div>
      </motion.div>
      <div className="flex justify-center items-center mt-7">
   <button onClick={flipCoin} className="rgb-button text-white font-bold py-4 px-8 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-110">
        Flip Coin
    </button>
</div>      
</div>
  );
}
