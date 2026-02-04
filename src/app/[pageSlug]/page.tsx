import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getPageBySlug } from '@/lib/pages';
import type { Page } from '@/types/pages';

import Container from '@/components/Container';

interface PageParams {
  params: { pageSlug: string };
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const page = await getPageBySlug(params.pageSlug);
  if (!page) {
    return {
      title: 'Page Not Found - Space Jelly',
      description: 'The requested page could not be found.'
    };
  }
  return {
    title: `${page.title} - Space Jelly`,
    description: page.seo?.description || `${page.title} on Space Jelly`
  }
}

export default async function Page({ params }: PageParams) {
  const page = await getPageBySlug(params.pageSlug);
  if (!page) {
    return notFound();
  }
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