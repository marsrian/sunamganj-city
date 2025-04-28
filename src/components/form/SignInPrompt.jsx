import Link from "next/link";

export default function SignInPrompt() {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md mb-6">
      <p className="text-blue-800 dark:text-blue-200">
        You need to <Link href="/login" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">sign in</Link> to post a comment.
      </p>
    </div>
  );
}