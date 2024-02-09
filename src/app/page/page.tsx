import Container from '@/components/Container';

export default async function Page() {
  return (
    <>
      <Container className="max-w-5xl xl:max-w-7xl mt-12 mb-24">
        <article className="prose mx-auto">
          <h1>Page</h1>
          <div>Content</div>
        </article>
      </Container>
    </>
  )
}
