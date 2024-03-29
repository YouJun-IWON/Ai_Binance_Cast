import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/providers/theme-provider';
import QueryProvider from '@/lib/providers/query-provider';
import { ModalProvider } from '@/lib/providers/modal-provider';
import siteMetadata from '@/utils/siteMetaData';
import { ThirdwebProvider } from '@/lib/thirdweb/thirdweb';
import { client } from '@/lib/thirdweb/client-side';
import { ClerkProvider } from '@clerk/nextjs';
import {
  metamaskConfig,
  coinbaseConfig,
  walletConnectConfig,
} from 'thirdweb/react';
import WagmiProviderSet from '@/lib/providers/wagmi-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title,
  },
  description: siteMetadata.description,
  openGraph: {
    // meta
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'ko-KR',
    type: 'website',
  },
  robots: {
    // google bot
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.socialBanner],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <WagmiProviderSet>
          <QueryProvider>
            <ThirdwebProvider
              client={client}
              dappMetadata={{
                name: 'My App',
                url: 'https://my-website.com',
                description: 'Some description of my app',
                logoUrl: 'https://path/to/logo.png',
              }}
            >
              <ClerkProvider telemetry={false}>
                <ThemeProvider
                  attribute='class'
                  defaultTheme='system'
                  enableSystem
                  disableTransitionOnChange
                >
                  <ModalProvider />
                  {children}
                </ThemeProvider>
              </ClerkProvider>
            </ThirdwebProvider>
          </QueryProvider>
        </WagmiProviderSet>
      </body>
    </html>
  );
}
