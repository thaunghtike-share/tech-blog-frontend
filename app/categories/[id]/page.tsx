import CategoryPageClient from "./CategoryPageClient"

interface PageProps {
  params: {
    id: string
  }
}

// This is a Server Component, params is a plain object here
export default function CategoryPage({ params }: PageProps) {
  const { id } = params

  // Just pass id to client component
  return <CategoryPageClient id={id} />
}