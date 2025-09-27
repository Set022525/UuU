import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600'] });

export const metadata: Metadata = {
  title: 'Portfolio | Akira Murakami',
  description: 'I am a master’s student at the ICD Lab, Tohoku University. I’m interested in the intersection of Architecture and Human-Computer Interaction (HCI).',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
