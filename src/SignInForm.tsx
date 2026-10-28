"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { ArrowRight, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useState, type FormEvent } from "react";

export function SignInForm() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [submitting, setSubmitting] = useState<"password" | "anonymous" | null>(
    null,
  );
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isSignIn = flow === "signIn";

  async function authenticate(
    provider: "password" | "anonymous",
    formData?: FormData,
  ) {
    setSubmitting(provider);
    setError(null);
    try {
      await signIn(provider, formData);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "";
      setError(
        provider === "anonymous"
          ? "Could not sign in anonymously. Please try again."
          : message.includes("Invalid password")
            ? "Invalid password. Please try again."
            : isSignIn
              ? "Could not sign in. Check your details, or create an account if you are new here."
              : "Could not create your account. If you already have an account, try signing in.",
      );
    } finally {
      setSubmitting(null);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const formData = new FormData(event.currentTarget);
    formData.set("flow", flow);
    void authenticate("password", formData);
  }

  return (
    <div className="auth-form-content">
      <p className="auth-eyebrow">Your document workspace</p>
      <h1 id="auth-form-title">
        {isSignIn ? "Welcome back." : "Create your account."}
      </h1>
      <p className="auth-intro">
        {isSignIn
          ? "Sign in to pick up where you left off."
          : "Get started with your Pestology document workspace."}
      </p>

      <form onSubmit={handleSubmit} aria-busy={submitting !== null}>
        <fieldset className="auth-fields" disabled={submitting !== null}>
          <legend className="sr-only">
            {isSignIn ? "Sign in details" : "New account details"}
          </legend>
          <div className="auth-field">
            <label htmlFor="auth-email">Email address</label>
            <input
              className="auth-input-field"
              id="auth-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@pestologyltd.co.uk"
              autoCapitalize="none"
              spellCheck={false}
              required
            />
          </div>
          <div className="auth-field">
            <label htmlFor="auth-password">Password</label>
            <div className="auth-password-field">
              <input
                className="auth-input-field"
                id="auth-password"
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete={isSignIn ? "current-password" : "new-password"}
                placeholder={
                  isSignIn ? "Enter your password" : "Choose a password"
                }
                required
              />
              <button
                className="auth-password-toggle"
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-controls="auth-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={19} aria-hidden="true" />
                ) : (
                  <Eye size={19} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button className="auth-button" type="submit">
            {submitting === "password" ? (
              <>
                <LoaderCircle
                  className="auth-spin"
                  size={18}
                  aria-hidden="true"
                />
                {isSignIn ? "Signing in…" : "Creating account…"}
              </>
            ) : (
              <>
                {isSignIn ? "Sign in" : "Create account"}
                <ArrowRight size={18} aria-hidden="true" />
              </>
            )}
          </button>
        </fieldset>
      </form>

      <p className="auth-switch">
        {isSignIn ? "New to the workspace? " : "Already have an account? "}
        <button
          type="button"
          disabled={submitting !== null}
          onClick={() => {
            setFlow(isSignIn ? "signUp" : "signIn");
            setError(null);
            setShowPassword(false);
          }}
        >
          {isSignIn ? "Create an account" : "Sign in"}
        </button>
      </p>

      <div className="auth-divider">
        <span>or</span>
      </div>
      <button
        className="auth-guest-button"
        type="button"
        disabled={submitting !== null}
        onClick={() => void authenticate("anonymous")}
      >
        {submitting === "anonymous" && (
          <LoaderCircle className="auth-spin" size={17} aria-hidden="true" />
        )}
        {submitting === "anonymous" ? "Signing in…" : "Continue anonymously"}
      </button>
    </div>
  );
}
