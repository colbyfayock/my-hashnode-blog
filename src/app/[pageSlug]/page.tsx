import { query } from '@/lib/hashnode';
import { Page } from '@/types/pages';

import Container from '@/components/Container';

interface PageParams {
  params: { pageSlug: string };
}

export default async function Page({ params }: PageParams) {
  const { data: { publication } } = await query({
    query: `
      query($host: String!, $slug: String!) {
        publication(host: $host) {
          staticPage(slug: $slug) {
            content {
              html
            }
            id
            slug
            title
          }
        }
      }
    `,
    variables: {
      host: 'spacejelly.hashnode.dev',
      slug: params.pageSlug
    }
  });

  const page = publication?.staticPage as Page;

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