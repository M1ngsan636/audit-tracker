import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center w-full max-w-md">
        <h1 className="text-5xl font-bold mb-6 text-blue-600">Audit Tracker</h1>
        <p className="text-lg text-gray-700 mb-8">
          Welcome to the Corporate QA Audit Tracker.
        </p>
        <Link href="/login">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
            Log In
          </button>
        </Link>
      </div>
    </main>
  );
}
