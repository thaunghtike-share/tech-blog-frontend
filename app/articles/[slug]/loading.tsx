// app/articles/[slug]/loading.tsx
export default function ArticleLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A]">
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Article skeleton */}
        <div className="max-w-4xl mx-auto">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-8 animate-pulse"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-8 animate-pulse"></div>

          <div className="space-y-3">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                style={{ width: `${Math.random() * 30 + 70}%` }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
