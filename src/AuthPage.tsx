import { ArrowUpRight, FilePenLine } from "lucide-react";
import { SignInForm } from "./SignInForm";
import { REPORT_PATH } from "./reports/southEnglandPestControl";

export function AuthPage() {
  return (
    <div className="auth-page">
      <header className="auth-header">
        <a href="https://pestologyltd.co.uk/" aria-label="Pestology home">
          <img
            className="auth-logo"
            src="/brand/pestology-logo.png"
            alt="Pestology"
            width="433"
            height="82"
          />
        </a>
        <a className="auth-website-link" href="https://pestologyltd.co.uk/">
          Visit our website <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </header>

      <main className="auth-main">
        <section className="auth-story" aria-labelledby="auth-story-title">
          <img
            className="auth-story-image"
            src="/brand/pestology-team.jpg"
            alt="A Pestology specialist beside a branded service van"
            width="1920"
            height="1410"
            fetchPriority="high"
          />
          <div className="auth-story-content">
            <span className="auth-story-eyebrow">The Pestology workspace</span>
            <h2 id="auth-story-title">
              Expert care.
              <br />
              In every detail.
            </h2>
            <p>
              A dedicated space to create, edit and organise your documents.
              Everything you need to put your expertise into words.
            </p>
            <div className="auth-story-caption">
              <FilePenLine size={18} aria-hidden="true" />
              <span>Your documents. All in one place.</span>
            </div>
          </div>
        </section>

        <section className="auth-form-panel" aria-labelledby="auth-form-title">
          <SignInForm />
        </section>
      </main>

      <footer className="auth-footer">
        <p>© {new Date().getFullYear()} Pestology Ltd</p>
        <a href={REPORT_PATH}>Pest control market report</a>
        <a href="https://pestologyltd.co.uk/privacy-policy/">Privacy policy</a>
      </footer>
    </div>
  );
}
