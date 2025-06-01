export default function Loading() {
    return (
        <div className="container px-4 py-8">
            <div className="animate-pulse">
                {/* Breadcrumbs skeleton */}
                <div className="flex items-center gap-2 mb-6">
                    <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>

                {/* Banner skeleton */}
                <div className="h-48 md:h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-8"></div>

                {/* Brand info skeleton */}
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-8"></div>

                <div className="flex gap-8">
                    {/* Sidebar skeleton */}
                    <div className="hidden md:block w-64 flex-shrink-0">
                        <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    </div>

                    {/* Content skeleton */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            </div>
                            <div className="flex gap-4">
                                <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                <div className="h-10 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            </div>
                        </div>

                        {/* Products grid skeleton */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="border rounded-lg overflow-hidden">
                                    <div className="aspect-square bg-gray-200 dark:bg-gray-700"></div>
                                    <div className="p-4 space-y-2">
                                        <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                        <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                        <div className="h-8 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
