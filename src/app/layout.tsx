import type { Metadata } from 'next';
import { StoreProvider } from '@/utils/redux/StoreProvider';
import { Main } from '@/content/Content';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  manifest: '/manifest.json'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Header />
          <Main>{children}</Main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  )
}
