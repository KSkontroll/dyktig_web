import type { Metadata } from 'next';
import { Barlow, Inter_Tight, JetBrains_Mono } from 'next/font/google';

import { CookieConsent } from '@/components/site/cookie-consent';
import { PaletteProvider } from '@/components/site/palette-provider';
import { SITE_DESCRIPTION, SITE_TITLE } from '@/lib/site/constants';

import './global.css';

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-inter-tight',
});

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-barlow',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dyktigregnskapsforer.no'),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: 'nb_NO',
    type: 'website',
    siteName: 'Dyktig Regnskapsfører AS',
    images: ['/images/aml-dashboard-pic.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/images/aml-dashboard-pic.webp'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body
        className={`${interTight.variable} ${barlow.variable} ${jetbrainsMono.variable}`}
      >
        <PaletteProvider>
          {children}
          <CookieConsent />
        </PaletteProvider>
      </body>
    </html>
  );
}
