import { Authenticated, Unauthenticated, useConvexAuth } from "convex/react";
import { AuthPage } from "./AuthPage";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { MarkdownEditor } from "./MarkdownEditor";

export default function App() {
  const { isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="auth-loading" role="status">
        <span className="auth-loading-spinner" aria-hidden="true" />
        <span className="sr-only">Loading your workspace…</span>
      </div>
    );
  }

  return (
    <>
      <Authenticated>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm h-16 flex justify-between items-center border-b shadow-sm px-4">
            <h2 className="text-xl font-semibold text-primary">
              Markdown Editor
            </h2>
            <SignOutButton />
          </header>
          <main className="flex-1">
            <MarkdownEditor />
          </main>
        </div>
      </Authenticated>
      <Unauthenticated>
        <AuthPage />
      </Unauthenticated>
      <Toaster />
    </>
  );
}
