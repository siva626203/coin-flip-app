import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { Provider } from './provider';
import 'react-toastify/dist/ReactToastify.css';
import Head from "next/head"
import { Metadata } from 'next';

// Static metadata
export const metadata: Metadata = {
  title: 'Coin Flip',
  description: 'A simple coin flip game built with React and Web3.',
  keywords: ['coin flip', 'React', 'Web3', 'Sepolia']
};
function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
       <Head>
       <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Jersey+10&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

export default RootLayout;
