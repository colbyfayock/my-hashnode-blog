import Image from 'next/image';

import Container from '@/components/Container';

export default async function Post() {
  return (
    <>
      <Container className="max-w-5xl xl:max-w-7xl xl:grid xl:grid-cols-[2fr_1fr] gap-12 mt-12 mb-24">
        <aside className="mb-12 xl:order-2">
          <Image width="984" height="554" className="w-full rounded h-auto mb-6 xl:mb-12" src="/images/placeholder.jpg" alt="" />
        </aside>
        <article className="w-full xl:order-1 mx-auto">
          <h1 className="text-4xl font-bold mb-8">
            Post
          </h1>
          <div className="max-w-3xl flex items-center gap-4 mb-8">
            <Image width="48" height="48" className="w-12 h-auto rounded-full" src="/images/placeholder.jpg" alt="" />
            <div>
              <p className="text-lg font-bold mb-[.1rem]">Author</p>
              <ul className="flex gap-3">
                <li className="text-sm">
                  <a className="hover:underline hover:text-blue-500" href="#">
                    Link
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="prose max-w-3xl prose-img:rounded">
            Content
          </div>
        </article>
      </Container>
    </>
  )
}
