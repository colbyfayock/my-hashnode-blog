import Image from 'next/image';
import type { Metadata } from 'next';

import { getPostBySlug } from '@/lib/posts';
import { Post } from '@/types/posts';

import Container from '@/components/Container';

interface PostParams {
  params: { postSlug: string }
}

export async function generateMetadata({ params }: PostParams): Promise<Metadata> {
  const post = await getPostBySlug(params.postSlug);
  return {
    title: `${post.title} - Space Jelly`,
    description: post.seo?.description || `Read ${post.title} on Space Jelly`,
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  }
}

export default async function Post({ params }: PostParams) {
  const post = await getPostBySlug(params.postSlug);
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
