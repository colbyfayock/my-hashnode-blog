import './globals.css';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google';

import { getPublication } from '@/lib/publication';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const publication = await getPublication();
  return {
    title: publication.title,
    description: publication.descriptionSEO,
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="grid grid-rows-[auto_1fr_auto] h-screen">
          <Nav />
          <main className="min-w-0">{ children }</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
