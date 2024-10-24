import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
    apeChain,
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID?process.env.NEXT_PUBLIC_PROJECT_ID:'1111',
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    apeChain
  ],
  ssr: true,
});
