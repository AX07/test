import { BlogPost } from '../types';

export const initialBlogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'why-self-custody-is-crucial',
    title: 'Why Self-Custody is Crucial in Crypto',
    summary: 'Discover the importance of "not your keys, not your coins" and how holding your own crypto assets can protect you from exchange failures and censorship.',
    content: `The phrase "not your keys, not your coins" is a fundamental principle in the cryptocurrency world. It means that if you don't control the private keys to your wallet, you don't truly own your digital assets.

When you leave your cryptocurrency on a centralized exchange, you are trusting that exchange to act as a custodian. While convenient, this comes with risks:
- **Exchange Hacks:** Exchanges are major targets for hackers. If an exchange is compromised, your funds could be stolen.
- **Insolvency:** Exchanges can go bankrupt, as seen with major players like FTX. In such cases, recovering your funds can be a long and uncertain process.
- **Censorship:** A centralized entity can freeze your account or block your transactions if they choose to, or if they are compelled to by a government.

By moving your assets to a self-custody wallet (either a software wallet like MetaMask or a hardware wallet like Ledger), you take full control. You become your own bank. This responsibility is significant—you must protect your seed phrase—but it is the only way to ensure true ownership and censorship resistance for your digital wealth.`,
    imageUrl: 'https://images.unsplash.com/photo-1639755491147-81b858c1b392?q=80&w=1920&auto=format&fit=crop',
    publishedAt: '2024-05-10T10:00:00Z',
  },
  {
    id: '2',
    slug: 'understanding-layer-2-scaling',
    title: 'Understanding Layer 2 Scaling Solutions',
    summary: 'Ethereum can be slow and expensive. Layer 2 solutions are changing the game. Learn how technologies like Optimism and Arbitrum are making Ethereum faster and cheaper for everyone.',
    content: `As Ethereum's popularity grew, so did the traffic on its network. This led to high "gas fees" (transaction costs) and slow confirmation times, making it expensive for everyday use.

Layer 2 (L2) scaling solutions are protocols built 'on top of' Ethereum to solve this problem. They work by processing transactions off the main Ethereum chain (Layer 1) and then posting a compressed summary of those transactions back to it.

There are several types of L2s, but the most popular are **Optimistic Rollups** (like Optimism and Arbitrum) and **ZK-Rollups** (like zkSync and StarkNet).

**How do they benefit you?**
- **Lower Fees:** Transaction costs on L2s can be 10x to 100x cheaper than on Ethereum mainnet.
- **Faster Transactions:** Transactions are confirmed almost instantly on L2s, providing a much smoother user experience.
- **Inherited Security:** Because they post data back to Ethereum, L2s inherit the security and decentralization of the main network.

By using dApps on Layer 2 networks, you get the best of both worlds: the vibrant ecosystem of Ethereum with the speed and low cost of a modern blockchain.`,
    imageUrl: 'https://images.unsplash.com/photo-1641353989082-9b285373a033?q=80&w=1920&auto=format&fit=crop',
    publishedAt: '2024-05-15T12:30:00Z',
  },
];
