import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  ChevronDown,
  Download,
  Search,
  X,
} from "lucide-react";
import {
  REPORT_DATE,
  REPORT_TITLE,
  findings,
  innovationThemes,
  expansionTimeline,
  getReportMarkdown,
  implications,
  methodology,
  operators,
  regions,
  researchSources,
  type Operator,
  type Source,
} from "./southEnglandPestControl";
import "./marketReport.css";

function SourceLink({ source }: { source: Source }) {
  return (
    <a href={source.url} target="_blank" rel="noreferrer">
      {source.title}
      <ArrowUpRight size={12} aria-hidden="true" />
    </a>
  );
}

function CompanyLinks({ ids }: { ids: string[] }) {
  return (
    <span className="report-evidence-links">
      {ids.map((id) => {
        const company = operators.find((operator) => operator.id === id)!;
        return (
          <a key={id} href={`#${id}`}>
            {company.name}
          </a>
        );
      })}
    </span>
  );
}

function CompanyProfile({ company }: { company: Operator }) {
  return (
    <details className="report-company" id={company.id}>
      <summary>
        <div className="report-company-name">
          <span className="report-company-region">
            {company.regions.join(" · ")}
          </span>
          <h3>{company.name}</h3>
          <p>{company.footprint} service footprint</p>
        </div>
        <div className="report-company-group">
          <span>Group / ownership</span>
          <p>{company.group}</p>
        </div>
        <ChevronDown className="report-chevron" size={20} aria-hidden="true" />
      </summary>
      <div className="report-company-body">
        <p className="report-company-coverage">
          <strong>Coverage:</strong> {company.coverage}
        </p>
        <div className="report-company-facts">
          <section>
            <h4>Size & scale</h4>
            <p>{company.size}</p>
            <p className="report-period">
              Evidence period: {company.sizePeriod}
            </p>
          </section>
          <section>
            <h4>
              Expansion{" "}
              <span className="report-evidence-badge">
                {company.expansionEvidence}
              </span>
            </h4>
            <p>{company.expansion}</p>
          </section>
          <section>
            <h4>Innovation & capabilities</h4>
            <p>{company.innovation}</p>
            <ul className="report-tags" aria-label="Capability themes">
              {company.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </section>
        </div>
        <p className="report-assessment">
          <strong>Analyst assessment</strong>
          {company.assessment}
        </p>
        <div className="report-company-sources">
          <h4>
            Sources <span>Reviewed {REPORT_DATE}</span>
          </h4>
          <ul>
            {company.sources.map((source) => (
              <li key={source.url}>
                <SourceLink source={source} />
                {source.date && (
                  <span className="report-source-date"> · {source.date}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </details>
  );
}

function downloadReport() {
  const blob = new Blob([getReportMarkdown()], {
    type: "text/markdown;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "southern-england-pest-control-review-2026-10-28.md";
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function MarketReport() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All regions");
  const [footprint, setFootprint] = useState("All footprints");
  const [theme, setTheme] = useState("All capabilities");
  const [expansion, setExpansion] = useState("All evidence");
  const [sort, setSort] = useState("Name A–Z");
  const tags = useMemo(
    () => [...new Set(operators.flatMap((o) => o.tags))].sort(),
    [],
  );
  const sourceCount = new Set(
    [...researchSources, ...operators.flatMap((o) => o.sources)].map(
      (s) => s.url,
    ),
  ).size;
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return operators
      .filter(
        (o) =>
          (!query ||
            [
              o.name,
              o.group,
              o.coverage,
              o.size,
              o.expansion,
              o.innovation,
              ...o.tags,
            ]
              .join(" ")
              .toLowerCase()
              .includes(query)) &&
          (region === "All regions" || o.regions.some((r) => r === region)) &&
          (footprint === "All footprints" || o.footprint === footprint) &&
          (theme === "All capabilities" || o.tags.includes(theme)) &&
          (expansion === "All evidence" || o.expansionEvidence === expansion),
      )
      .sort((a, b) =>
        sort === "Name A–Z"
          ? a.name.localeCompare(b.name)
          : a.group.localeCompare(b.group) || a.name.localeCompare(b.name),
      );
  }, [search, region, footprint, theme, expansion, sort]);
  const activeFilters = Boolean(
    search ||
      region !== "All regions" ||
      footprint !== "All footprints" ||
      theme !== "All capabilities" ||
      expansion !== "All evidence",
  );

  function clearFilters() {
    setSearch("");
    setRegion("All regions");
    setFootprint("All footprints");
    setTheme("All capabilities");
    setExpansion("All evidence");
  }

  useEffect(() => {
    const title = document.title;
    document.title = `${REPORT_TITLE} | Pestology Research`;
    return () => {
      document.title = title;
    };
  }, []);

  useEffect(() => {
    // Direct links and evidence links must work even after filtering the directory.
    function revealCompany(hash = window.location.hash) {
      const id = hash.slice(1);
      if (!operators.some((o) => o.id === id)) return;
      setSearch("");
      setRegion("All regions");
      setFootprint("All footprints");
      setTheme("All capabilities");
      setExpansion("All evidence");
      window.requestAnimationFrame(() => {
        const details = document.getElementById(id);
        if (details instanceof HTMLDetailsElement) {
          details.open = true;
          details.scrollIntoView({ block: "start" });
        }
      });
    }
    function handleHashChange() {
      revealCompany();
    }
    function handleEvidenceClick(event: MouseEvent) {
      const link =
        event.target instanceof Element
          ? event.target.closest('a[href^="#"]')
          : null;
      if (link instanceof HTMLAnchorElement) revealCompany(link.hash);
    }
    revealCompany();
    window.addEventListener("hashchange", handleHashChange);
    document.addEventListener("click", handleEvidenceClick);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      document.removeEventListener("click", handleEvidenceClick);
    };
  }, []);

  return (
    <div className="market-report">
      <a className="report-skip" href="#report-content">
        Skip to report
      </a>
      <header className="report-header">
        <a href="/" aria-label="Pestology workspace">
          <img
            src="/brand/pestology-logo.png"
            alt="Pestology"
            width="433"
            height="82"
          />
        </a>
        <div className="report-header-actions">
          <a className="report-workspace-link" href="/">
            <ArrowLeft size={15} aria-hidden="true" />
            Workspace
          </a>
          <button className="report-download" onClick={downloadReport}>
            <Download size={16} aria-hidden="true" />
            <span>Download report</span>
          </button>
        </div>
      </header>

      <main id="report-content">
        <section
          className="report-hero report-container"
          aria-labelledby="report-title"
        >
          <p className="report-eyebrow">
            Pestology research <span>/</span> Market review 01
          </p>
          <div className="report-hero-grid">
            <div>
              <h1 id="report-title">
                Pest control.
                <br />
                <span>The southern landscape.</span>
              </h1>
              <p className="report-deck">
                Size, expansion and innovation across London, the South East and
                the South West of England.
              </p>
              <a className="report-text-link" href="#company-directory">
                Explore the companies <ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>
            <aside className="report-edition">
              <p className="report-eyebrow">Research edition</p>
              <p className="report-edition-date">{REPORT_DATE}</p>
              <p>
                Public-source research with dated events, ownership context and
                explicit evidence gaps.
              </p>
              <div>
                <strong>{operators.length}</strong>
                <span>operator & trading-brand profiles</span>
              </div>
              <small>
                A broad market review, not an exhaustive register of every pest
                control business.
              </small>
            </aside>
          </div>
          <div className="report-meta">
            <span>
              <strong>03</strong> English regions
            </span>
            <span>
              <strong>{sourceCount}</strong> linked sources
            </span>
            <span>
              <strong>01</strong> point-in-time edition
            </span>
          </div>
        </section>

        <nav className="report-section-nav" aria-label="Report sections">
          <div className="report-container">
            <a href="#overview">Overview</a>
            <a href="#expansion">Expansion</a>
            <a href="#innovation">Innovation</a>
            <a href="#company-directory">Company directory</a>
            <a href="#methodology">Methodology</a>
          </div>
        </nav>

        <section
          className="report-section report-container"
          id="overview"
          aria-labelledby="overview-title"
        >
          <div className="report-section-heading">
            <p className="report-eyebrow">01 / The market picture</p>
            <h2 id="overview-title">
              A fragmented market.
              <br />
              Increasingly connected.
            </h2>
            <p>
              The evidence supports several competitive models. It does not
              support a reliable southern England revenue ranking or
              market-share estimate.
            </p>
          </div>
          <div className="report-overview-grid">
            <div className="report-findings">
              {findings.map((finding, i) => (
                <article key={finding.title}>
                  <span className="report-finding-number">0{i + 1}</span>
                  <div>
                    <h3>{finding.title}</h3>
                    <p>{finding.text}</p>
                    <CompanyLinks ids={finding.ids} />
                  </div>
                </article>
              ))}
            </div>
            <aside className="report-sample-chart">
              <p className="report-eyebrow">Composition of this review</p>
              <h3>Service footprint</h3>
              <p>
                Profiles classified by stated reach, rather than workforce size.
              </p>
              <div
                className="report-chart-bars"
                role="img"
                aria-label={["National", "Regional", "Local"]
                  .map(
                    (label) =>
                      `${label}: ${operators.filter((o) => o.footprint === label).length} profiles`,
                  )
                  .join("; ")}
              >
                {["National", "Regional", "Local"].map((label) => {
                  const count = operators.filter(
                    (o) => o.footprint === label,
                  ).length;
                  return (
                    <div key={label} className="report-chart-row">
                      <div>
                        <span>{label}</span>
                        <strong>{count}</strong>
                      </div>
                      <div className="report-chart-track">
                        <span
                          style={{
                            width: `${(count / operators.length) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <small>
                Counts describe the {operators.length} profiles in this report,
                including shared brands. They are not market shares or
                independent-parent counts.
              </small>
              <a href="#methodology">
                Read the inclusion criteria{" "}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </aside>
          </div>
        </section>

        <section
          className="report-expansion-band"
          id="expansion"
          aria-labelledby="expansion-title"
        >
          <div className="report-container report-section">
            <div className="report-section-heading">
              <p className="report-eyebrow">02 / Expansion signals</p>
              <h2 id="expansion-title">
                Follow the transactions.
                <br />
                Then check the capacity.
              </h2>
              <p>
                Selected dated milestones from the reviewed sources. An
                acquisition adds reach or capability; it does not automatically
                prove organic growth.
              </p>
            </div>
            <ol className="report-timeline">
              {expansionTimeline.map((event) => (
                <li key={event.date}>
                  <time>{event.date}</time>
                  <h3>
                    <a href={`#${event.id}`}>
                      {event.title}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </h3>
                  <p>{event.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="report-section report-container"
          id="innovation"
          aria-labelledby="innovation-title"
        >
          <div className="report-section-heading">
            <p className="report-eyebrow">03 / Innovation in practice</p>
            <h2 id="innovation-title">More than a new treatment.</h2>
            <p>
              Documented capabilities, established techniques and operational
              changes. These themes are not a technology or service-quality
              ranking.
            </p>
          </div>
          <div className="report-innovation-grid">
            {innovationThemes.map((theme, i) => (
              <article key={theme.title}>
                <span className="report-innovation-number">0{i + 1}</span>
                <h3>{theme.title}</h3>
                <p>{theme.description}</p>
                <CompanyLinks ids={theme.ids} />
              </article>
            ))}
          </div>
        </section>

        <section
          className="report-directory-band"
          id="company-directory"
          aria-labelledby="directory-title"
        >
          <div className="report-container report-section">
            <div className="report-directory-heading">
              <div className="report-section-heading">
                <p className="report-eyebrow">04 / Company review</p>
                <h2 id="directory-title">The operator directory.</h2>
                <p>
                  Open a profile for size, expansion, capabilities, analyst
                  assessment and sources. Footprint describes geographic reach,
                  not company size.
                </p>
              </div>
              <button
                className="report-secondary-button"
                onClick={downloadReport}
              >
                <Download size={16} aria-hidden="true" />
                Download full review (.md)
              </button>
            </div>
            <div className="report-filters">
              <div className="report-search">
                <label htmlFor="company-search">Search the review</label>
                <div>
                  <Search size={18} aria-hidden="true" />
                  <input
                    id="company-search"
                    type="search"
                    placeholder="Company, group, county or capability…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <div className="report-filter-grid">
                <div>
                  <label htmlFor="company-region">Region</label>
                  <select
                    id="company-region"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    <option>All regions</option>
                    {regions.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="company-footprint">Service footprint</label>
                  <select
                    id="company-footprint"
                    value={footprint}
                    onChange={(e) => setFootprint(e.target.value)}
                  >
                    {["All footprints", "National", "Regional", "Local"].map(
                      (value) => (
                        <option key={value}>{value}</option>
                      ),
                    )}
                  </select>
                </div>
                <div>
                  <label htmlFor="company-theme">Capability</label>
                  <select
                    id="company-theme"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                  >
                    <option>All capabilities</option>
                    {tags.map((tag) => (
                      <option key={tag}>{tag}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="company-expansion">Expansion evidence</label>
                  <select
                    id="company-expansion"
                    value={expansion}
                    onChange={(e) => setExpansion(e.target.value)}
                  >
                    {[
                      "All evidence",
                      "Dated event",
                      "Undated claim",
                      "Not verified",
                    ].map((value) => (
                      <option key={value}>{value}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="report-results-bar">
              <p role="status">
                {filtered.length} of {operators.length} profiles
                {activeFilters ? " match your filters" : " in this edition"}
              </p>
              <div>
                {activeFilters && (
                  <button onClick={clearFilters}>
                    <X size={14} aria-hidden="true" />
                    Clear filters
                  </button>
                )}
                <label htmlFor="company-sort" className="sr-only">
                  Sort profiles
                </label>
                <select
                  id="company-sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option>Name A–Z</option>
                  <option>Group A–Z</option>
                </select>
              </div>
            </div>
            <div className="report-company-list">
              {filtered.map((company) => (
                <CompanyProfile key={company.id} company={company} />
              ))}
              {filtered.length === 0 && (
                <div className="report-empty">
                  <h3>No matching companies</h3>
                  <p>Try a broader search or remove a filter.</p>
                  <button
                    className="report-secondary-button"
                    onClick={clearFilters}
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
            <p className="report-directory-note">
              All source pages reviewed {REPORT_DATE}. “Not verified” describes
              an evidence gap, not a negative finding about the company.
              Regional coverage is partial unless explicitly stated.
            </p>
          </div>
        </section>

        <section
          className="report-container report-section"
          aria-labelledby="implications-title"
        >
          <div className="report-section-heading">
            <p className="report-eyebrow">05 / Analyst interpretation</p>
            <h2 id="implications-title">What to do with the evidence.</h2>
            <p>
              The following are inferences and procurement questions based on
              the company profiles, rather than reported company facts.
            </p>
          </div>
          <ol className="report-implications">
            {implications.map((text, i) => (
              <li key={text}>
                <span>0{i + 1}</span>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="report-method-band"
          id="methodology"
          aria-labelledby="methodology-title"
        >
          <div className="report-container report-section">
            <div className="report-section-heading">
              <p className="report-eyebrow">06 / Methodology & limitations</p>
              <h2 id="methodology-title">
                Know what this report can tell you.
              </h2>
              <p>
                Transparent scope is part of the research. This is a static
                public-source edition, with no claim to have identified every
                operating business.
              </p>
            </div>
            <ol className="report-method-list">
              {methodology.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ol>
            <div className="report-background-sources">
              <h3>Background and ownership sources</h3>
              <ul>
                {researchSources.map((source) => (
                  <li key={source.url}>
                    <SourceLink source={source} />
                  </li>
                ))}
              </ul>
              <p>
                Company-specific sources appear inside each profile and in the
                download. Review dates and source publication dates are recorded
                separately.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="report-footer report-container">
        <p>
          © {new Date().getFullYear()} Pestology Ltd{" "}
          <span>Research edition · {REPORT_DATE}</span>
        </p>
        <a href="/">
          Back to workspace <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </footer>
    </div>
  );
}
