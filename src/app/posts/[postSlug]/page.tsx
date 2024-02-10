import Image from 'next/image';

import { query } from '@/lib/hashnode';
import { Post } from '@/types/posts';

import Container from '@/components/Container';

interface PostParams {
  params: { postSlug: string }
}

export default async function Post({ params }: PostParams) {
  const { data: { publication } } = await query({
    query: `
      query($host: String!, $slug: String!) {
        publication(host: $host) {
          post(slug: $slug) {
            author {
              name
              profilePicture
              socialMediaLinks {
                twitter
              }
            }
            content {
              html
            }
            coverImage {
              url
            }
            id
            publishedAt
            title
          }
        }
      }
    `,
    variables: {
      host: 'spacejelly.hashnode.dev',
      slug: params.postSlug
    }
  });
  
  const post = publication?.post as Post;

  return (
    <>
      <Container className="max-w-5xl xl:max-w-7xl xl:grid xl:grid-cols-[2fr_1fr] gap-12 mt-12 mb-24">
        <aside className="mb-12 xl:order-2">
          <Image width="984" height="554" className="w-full rounded h-auto mb-6 xl:mb-12" src={post.coverImage.url} alt="" />
        </aside>
        <article className="w-full xl:order-1 mx-auto">
          <h1 className="text-4xl font-bold mb-8">{ post.title }</h1>
          <div className="max-w-3xl flex items-center gap-4 mb-8">
            <Image width="48" height="48" className="w-12 h-auto rounded-full" src={post.author.profilePicture} alt="" />
            <div>
              <p className="text-lg font-bold mb-[.1rem]">{ post.author.name }</p>
              <ul className="flex gap-3">
                <li className="text-sm">
                  <a className="hover:underline hover:text-blue-500" href={post.author.socialMediaLinks.twitter}>
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <p className="italic text-zinc-500 mb-6">
            Published on
            {` `}
            { new Date(post.publishedAt).toLocaleDateString('en-us', {
              weekday: 'long',
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }) }
          </p>
          <div
            className="prose max-w-3xl prose-img:rounded"
            dangerouslySetInnerHTML={{
              __html: post.content.html
            }}
          />
        </article>
      </Container>
    </>
  )
}