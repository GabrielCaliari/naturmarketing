import Link from "next/link";

export default function NotFound() {
  return (
    <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
      <div className="section-container max-w-2xl mx-auto text-center">
        <svg className="w-20 h-20 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h1 className="text-4xl font-bold font-hanken text-gray-900 mb-4">
          Article Not Found
        </h1>
        <p className="text-gray-600 font-rubik mb-8">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/blog"
          className="inline-block px-8 py-3 bg-secondary text-white font-rubik font-semibold rounded-lg hover:bg-secondary/90 transition-colors"
        >
          Back to Blog
        </Link>
      </div>
    </main>
  );
}
