import type { Metadata } from 'next';

import { getPageBySlug } from '@/lib/pages';

import Container from '@/components/Container';

interface PageParams {
  params: Promise<{ pageSlug: string }>;
}

export async function generateMetadata(props: PageParams): Promise<Metadata> {
  const params = await props.params;
  const page = await getPageBySlug(params.pageSlug);
  return {
    title: `${page.title} - Space Jelly`,
    description: page.seo?.description || `${page.title} on Space Jelly`
  }
}

export default async function Page(props: PageParams) {
  const params = await props.params;
  const page = await getPageBySlug(params.pageSlug);
  return (
    <>
      <Container className="max-w-5xl xl:max-w-7xl mt-12 mb-24">
        <article className="prose mx-auto">
          <h1>{ page.title }</h1>
          <div dangerouslySetInnerHTML={{
            __html: page?.content.html
          }} />
        </article>
      </Container>
    </>
  )
}