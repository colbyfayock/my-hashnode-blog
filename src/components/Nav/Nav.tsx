import Link from 'next/link';

import Container from '@/components/Container';

export default async function Nav() {
  return (
    <nav className="py-8">
      <Container className="max-w-7xl flex justify-between items-center flex-col md:flex-row">
        <p className="text-center mb-4 md:mb-0">
          <Link href="/" className="text-3xl font-bold text-zinc-900 dark:text-white hover:text-zinc-900 dark:hover:text-gray-100 drop-shadow-[0_2px_0px_rgba(255,255,255,1)] dark:drop-shadow-[0_2px_0px_rgba(0,0,0,1)]">
            My Blog
          </Link>
        </p>
        <ul className="flex m-0">
          <li className="mr-6">
            Link
          </li>
        </ul>
      </Container>
    </nav>
  )
}