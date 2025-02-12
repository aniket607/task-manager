"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

const errorMessages: Record<string, string> = {
  Configuration: "There was a problem with the server configuration.",
  AccessDenied: "You do not have permission to access this resource.",
  Verification: "The verification failed.",
  "Please enter your email and password": "Please enter your email and password",
  "No user found with this email": "No user found with this email",
  "Invalid password": "Invalid password",
  Default: "An error occurred. Please try again.",
};

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const errorMessage = error ? errorMessages[error] || errorMessages.Default : errorMessages.Default;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-bold text-red-600">Authentication Error</h1>
        <p className="text-gray-600">{errorMessage}</p>
        <Link 
          href="/login"
          className="block text-blue-600 hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
} 