export default function ArticleLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
      {/* Header skeleton */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0A0A0A]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
            <div className="flex space-x-4">
              <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
              <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Article content skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article header skeleton */}
          <div className="mb-8">
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-6 animate-pulse"></div>
            
            {/* Author info skeleton */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Cover image skeleton */}
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl mb-8 animate-pulse"></div>
          </div>

          {/* Article content skeleton */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="space-y-4">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                  style={{ 
                    width: `${Math.random() * 40 + 60}%`,
                    marginLeft: i % 3 === 0 ? '0' : i % 3 === 1 ? '2rem' : '4rem'
                  }}
                ></div>
              ))}
            </div>

            {/* Code block skeleton */}
            <div className="my-8 bg-gray-100 dark:bg-gray-800 rounded-2xl p-6">
              <div className="space-y-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
              </div>
            </div>

            {/* More content skeleton */}
            <div className="space-y-4 mt-8">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                  style={{ width: `${Math.random() * 50 + 50}%` }}
                ></div>
              ))}
            </div>
          </div>

          {/* Tags skeleton */}
          <div className="flex flex-wrap gap-2 mt-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer skeleton */}
      <div className="border-t border-gray-200 dark:border-gray-800 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse mx-auto mb-4"></div>
            <div className="flex justify-center space-x-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}