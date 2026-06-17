'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const rotasSemLayout = ['/login', '/registro'];
  const esconder = rotasSemLayout.includes(pathname);

  return (
    <>
      {!esconder && <Header />}
      <main className="flex-1">{children}</main>
      {!esconder && <Footer />}
    </>
  );
}