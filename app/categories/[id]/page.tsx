import CategoryPageClient from "./CategoryPageClient";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { id } = await params;

  return <CategoryPageClient id={id} />;
}