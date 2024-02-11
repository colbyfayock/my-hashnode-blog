import Link from 'next/link';

import { query } from '@/lib/hashnode';

import Container from '@/components/Container';

export default async function Nav() {
  const { data } = await query({
    query: `
      query($host: String) {
        publication(host: $host) {
          title
          preferences {
            navbarItems {
              id
              label
              url
            }
          }
        }
      }
    `,
    variables: {
      host: process.env.HASHNODE_HOST
    }
  });

  interface Publication {
    title?: string;
    preferences?: {
      navbarItems?: Array<{
        id: string;
        label: string;
        url: string;
      }>
    }
  }

  const publication: Publication = data?.publication;

  return (
    <nav className="py-8">
      <Container className="max-w-7xl flex justify-between items-center flex-col md:flex-row">
        <p className="text-center mb-4 md:mb-0">
          <Link href="/" className="text-3xl font-bold text-zinc-900 dark:text-white hover:text-zinc-900 dark:hover:text-gray-100 drop-shadow-[0_2px_0px_rgba(255,255,255,1)] dark:drop-shadow-[0_2px_0px_rgba(0,0,0,1)]">
            { publication.title }
          </Link>
        </p>
        <ul className="flex m-0">
          {publication.preferences?.navbarItems?.map((item) => {
            return (
              <li key={item.id} className="mr-6">
                <Link href={item.url.replace(`https://${process.env.HASHNODE_HOST}`, '')}>{ item.label }</Link>
              </li>
            )
          })}
        </ul>
      </Container>
    </nav>
  )
}