"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";
import NavbarClient from "@/app/products/NavbarClient"; // Use the client version

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white flex flex-col">
      <NavbarClient />
      
      <main className="flex-1 flex items-center justify-center p-6 mt-20">
        <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
          
          <h1 className="text-3xl font-black mb-4">Oops! Something went wrong.</h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            We sincerely apologize for the inconvenience. Our engineering team has been notified of the issue.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => reset()}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-0.5"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
            <Link
              href="/"
              className="flex items-center justify-center px-8 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold rounded-xl transition-all"
            >
              Return Home
            </Link>
          </div>
          
          {process.env.NODE_ENV !== "production" && (
            <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-900 rounded-xl text-left overflow-auto max-h-48 text-sm border border-gray-300 dark:border-gray-700">
              <p className="font-mono text-red-500 mb-2 font-bold">Development Details:</p>
              <p className="font-mono text-xs">{error.message}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
