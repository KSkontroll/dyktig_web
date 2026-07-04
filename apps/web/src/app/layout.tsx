import './global.css';

import type { Metadata } from 'next';
import { Geist } from 'next/font/google';

import { cn } from '@/lib/utils';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: '@dyktig/web',
  description: 'Dyktig web app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nb" className={cn('font-sans', geist.variable)}>
      <body>{children}</body>
    </html>
  );
}
