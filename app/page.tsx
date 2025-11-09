import TokenCreator from '@/components/TokenCreator';

// This page requires client-side rendering due to wallet adapter
export const dynamic = 'force-dynamic';

export default function Home() {
  return <TokenCreator />;
}
