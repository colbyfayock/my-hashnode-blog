import Link from 'next/link';
import Image from 'next/image';

import Container from '@/components/Container';

export default async function Home() {
  return (
    <>
      <Container className="max-w-4xl">
        <ul>
          <li className="grid sm:grid-cols-2 gap-8 mb-16">
            <div>
              <Image width="600" height="400" className="rounded border border-zinc-200" src="/images/placeholder.jpg" alt="" />
            </div>
            <div>
              <h2 className="text-2xl pb-5 border-b-2 mb-5">
                Title
              </h2>
              <p className="text-zinc-500">
                {
                  new Date().toLocaleDateString('en-us', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })
                }
              </p>
            </div>
          </li>
        </ul>
      </Container>
    </>
  )
}
