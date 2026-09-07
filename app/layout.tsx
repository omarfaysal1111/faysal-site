import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FAYSAL — Commerce & Digital Product Studio',
  description: 'We find where retail and consumer storefronts lose customers, tell you what is worth fixing, and build the fix.',
  openGraph: {
    title: 'FAYSAL — Commerce & Digital Product Studio',
    description: 'We find where retail and consumer storefronts lose customers, tell you what is worth fixing, and build the fix.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAYSAL — Commerce & Digital Product Studio',
    description: 'We find where retail and consumer storefronts lose customers, tell you what is worth fixing, and build the fix.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
