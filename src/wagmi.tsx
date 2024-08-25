import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: '65fc36a210152457cbf5bb30cbddb84c',
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    sepolia
  ],
  ssr: true,
});
