import Link from 'next/link';
import Image from 'next/image';

import { query } from '@/lib/hashnode';

import Container from '@/components/Container';

export default async function Home() {
  const { data: { publication } } = await query({
    query: `
      query($host: String!) {
        publication(host: $host) {
          posts(first: 10) {
            edges {
              node {
                coverImage {
                  url
                }
                id
                publishedAt
                slug
                title
              }
            }
          }
        }
      }
    `,
    variables: {
      host: 'spacejelly.hashnode.dev'
    }
  });

  interface Post {
    coverImage: {
      url: string;
    };
    id: string;
    publishedAt: string;
    slug: string;
    title: string;
  }

  const posts: Array<Post> = publication.posts.edges.map(({ node }: { node: Post }) => node);

  return (
    <>
      <Container className="max-w-4xl">
        <ul>
          { posts.map((post) => {
            return (
              <li key={post.id} className="grid sm:grid-cols-2 gap-8 mb-16">
                <Image width="600" height="400" className="rounded border border-zinc-200" src={post.coverImage.url} alt="" />
                <div>
                  <h2 className="text-2xl pb-5 border-b-2 mb-5">{ post.title }</h2>
                  <p className="text-zinc-500">
                    {
                      new Date(post.publishedAt).toLocaleDateString('en-us', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })
                    }
                  </p>
                </div>
              </li>
            )
          }) }
        </ul>
      </Container>
    </>
  )
}
