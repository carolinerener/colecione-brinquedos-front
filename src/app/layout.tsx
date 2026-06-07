import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Colecione Brinquedos',
  description: 'Diversão que ensina',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${geist.className} flex flex-col min-h-screen bg-[#FFF3E6]`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}