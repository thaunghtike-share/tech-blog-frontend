import CategoryPageClient from "./CategoryPageClient";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await Promise.resolve(params); // 👈 silence the warning
  return <CategoryPageClient slug={slug} />;
}