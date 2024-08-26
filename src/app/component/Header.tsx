'use client';
import React from 'react';
import { motion, Variants } from 'framer-motion';

// Define an array of colors
const colors = [
  'text-red-500',
  'text-green-500',
  'text-blue-500',
  'text-yellow-500',
  'text-purple-500',
  'text-pink-500',
  'text-orange-500',
  'text-teal-500',
];

// Define animation variants for each letter
const letterVariants: Variants = {
  initial: { y: 0 },
  animate: { 
    y: [0, -10, 0], // Up and down animation
    transition: { 
      duration: 0.6,
      repeat: Infinity, 
      repeatType: 'loop'
    } 
  },
};

// Define animation variants for the container
const containerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.5, // Stagger the animation of children
    }
  }
};

const Header: React.FC<{ text: string }> = ({ text }) => {
  // Split the text into an array of characters
  const characters = text.split('');
  
  return (
    <motion.h1
      className="font-jersey text-4xl text-center tracking-wider"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className={colors[index % colors.length]} // Cycle through colors
          variants={letterVariants}
          // Optional: Ensure the motion span is displayed
          style={{ display: 'inline-block' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default Header;
