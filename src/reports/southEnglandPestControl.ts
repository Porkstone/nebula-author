export const REPORT_PATH = "/reports/south-england-pest-control";
export const REPORT_DATE = "28 October 2026";
export const REPORT_TITLE = "Pest control in Southern England";
export const regions = ["London", "South East", "South West"] as const;
export type Region = (typeof regions)[number];
export type Footprint = "National" | "Regional" | "Local";
export type ExpansionEvidence =
  | "Dated event"
  | "Undated claim"
  | "Not verified";

export interface Source {
  title: string;
  url: string;
  date?: string;
}

export interface Operator {
  id: string;
  name: string;
  group: string;
  footprint: Footprint;
  regions: Region[];
  coverage: string;
  size: string;
  sizePeriod: string;
  expansion: string;
  expansionEvidence: ExpansionEvidence;
  innovation: string;
  tags: string[];
  assessment: string;
  sources: Source[];
}

const source = (title: string, url: string, date?: string): Source => ({
  title,
  url,
  date,
});
const tyro = source(
  "Tyro's UK portfolio (ownership)",
  "https://tyrogroup.com/country/united-kingdom/",
);
const orkin = source("Orkin UK's current brands", "https://orkinuk.co.uk/");
const nightshiftAcquisitions = source(
  "Nightshift's acquisition announcements",
  "https://www.nightshiftpestcontrol.co.uk/",
  "October and December 2025 events; undated page",
);
const ocsAcquisition = source(
  "OCS acquisition of Abate",
  "https://ocs.com/uk/news/ocs-acquires-abate-pest-management-to-expand-pest-control-business/",
  "5 April 2024",
);
const ocsAccounts = source(
  "OCS 2024 accounts: Abate and Monitor transaction",
  "https://ocs.com/app/uploads/2025/06/OCS-Group-Topco-Annual-Report-Account-2024.pdf",
  "FY2024; published 2025",
);
const noSize =
  "Headcount and turnover not established from the reviewed public sources.";
const undated = "Undated company page, reviewed 28 October 2026";
const noExpansion =
  "No dated acquisition, office opening or quantified growth evidence found in the sources reviewed. Existing coverage is not proof of recent expansion.";
const unknownOwner = "Ownership not independently established";

export const operators: Operator[] = [
  {
    id: "rentokil",
    name: "Rentokil Pest Control",
    group: "Rentokil Initial",
    footprint: "National",
    regions: [...regions],
    coverage:
      "UK-wide service network; Crawley-based parent, with coverage across the three southern regions.",
    size: "US$5.703bn global Pest Control revenue in FY2025. This is a worldwide category figure, not UK or southern England revenue.",
    sizePeriod: "Year ended 31 December 2025",
    expansion:
      "The 22 October 2026 update reports UK core Pest organic revenue growth of 9.2% in Q3, supported by pricing and retention. Group-wide acquisitions totalled 21 year to date; their southern England contribution is not disclosed.",
    expansionEvidence: "Dated event",
    innovation:
      "PestConnect Optix combines cameras and AI identification with remote alerts and the MyRentokil portal. Availability is documented; accuracy and customer savings have not been independently tested in this review.",
    tags: ["Digital monitoring", "AI detection", "Reporting"],
    assessment:
      "Scale and documented connected services make it a relevant benchmark for multi-site commercial contracts. The disclosed growth rate is Rentokil's performance, not market growth.",
    sources: [
      source(
        "2025 annual report (global scale)",
        "https://www.rentokil-initial.com/~/media/Files/R/Rentokil/documents/annual-reports/rentokil-ar25.pdf",
        "FY2025",
      ),
      source(
        "Q3 trading update",
        "https://www.rentokil-initial.com/~/media/Files/R/Rentokil/documents/2026-q3-trading-update-statement.pdf",
        "22 October 2026",
      ),
      source(
        "UK smart monitoring service",
        "https://www.rentokil.co.uk/pest-control/smart-remote-pest-monitoring/",
      ),
    ],
  },
  {
    id: "ecolab",
    name: "Ecolab Pest Elimination",
    group: "Ecolab",
    footprint: "National",
    regions: [...regions],
    coverage:
      "UK and Ireland commercial service, particularly food production, hospitality and managed estates.",
    size: "A commercial partner's undated listing reports 600+ people dedicated to pest elimination in the UK and Ireland. This is not a current audited headcount or a southern-only figure.",
    sizePeriod: "Undated partner listing; reviewed 28 October 2026",
    expansion: noExpansion,
    expansionEvidence: "Not verified",
    innovation:
      "ECOLAB3D Pest Intelligence combines connected monitoring, analytics and service records. MyEcolab gives customers access to site reports. No UK deployment count or independently validated savings were established.",
    tags: ["Digital monitoring", "Reporting"],
    assessment:
      "A relevant commercial food-safety competitor. Do not substitute total Ecolab group size or worldwide customer locations for its UK pest division.",
    sources: [
      source(
        "Unitas partner listing (UK/Ireland scale)",
        "https://unitaswholesale.co.uk/support-services/wholesale-services/service-providers/pest-control/ecolab/",
      ),
      source(
        "UK food and beverage pest programme",
        "https://en-uk.ecolab.com/solutions/food-and-beverage-processing-pest-control",
      ),
      source("Customer reporting portal", "https://myecolab.co.uk/"),
    ],
  },
  {
    id: "vergo",
    name: "Vergo Pest Management",
    group: "Tyro Group",
    footprint: "National",
    regions: [...regions],
    coverage:
      "Nationwide commercial and residential operator, including national retail and facilities contracts.",
    size: "Vergo's ESG page states 400+ employees across the UK. Other group marketing gives higher figures; no reconciled, dated headcount was established, so this review retains Vergo's own lower-bound statement.",
    sizePeriod: undated,
    expansion:
      "Formerly Terminix UK; the registered name changed to Vergo in August 2022. Tyro's current portfolio confirms group membership. A rebrand or group listing alone does not establish recent organic growth.",
    expansionEvidence: "Dated event",
    innovation:
      "Pest Alert Sight is marketed as thermal-imaging AI rodent detection; Sentry as a smart trap; Vergo Hub supplies reports and alerts. These are documented offerings, with no independent outcome comparison here.",
    tags: ["Digital monitoring", "AI detection", "Reporting"],
    assessment:
      "Evaluate alongside JG, Nightshift and other Tyro brands when assessing supplier independence.",
    sources: [
      source(
        "Vergo ESG (workforce)",
        "https://vergo.uk/our-company/about-us/environmental-social-and-governance/",
      ),
      source(
        "Vergo smart monitoring",
        "https://vergo.uk/specialist-services/innovation-technology/smart-24-7-monitoring/",
      ),
      tyro,
      source(
        "Registered-name history",
        "https://company-information.service.gov.uk/company/03173779",
        "Name change: August 2022",
      ),
    ],
  },
  {
    id: "jg",
    name: "JG Pest Control",
    group: "Tyro Group",
    footprint: "National",
    regions: [...regions],
    coverage:
      "UK reactive and scheduled work, with a stated concentration in London and the South East.",
    size: "Company reports approximately 150 staff and more than 50,000 jobs per year across the UK. Neither figure is confined to southern England.",
    sizePeriod: undated,
    expansion:
      "The current Tyro portfolio confirms shared ownership with Vergo, Nightshift and several specialists. No dated standalone revenue-growth series was established.",
    expansionEvidence: "Undated claim",
    innovation:
      "Dedicated bed bug heat-treatment teams and a reactive dispatch model. Heat is an established technique; offering it does not establish proprietary technology or guaranteed one-visit success.",
    tags: ["Heat treatment"],
    assessment:
      "A significant reactive-service benchmark. Its own comparison articles are supplier marketing, not independent rankings.",
    sources: [
      source(
        "JG company profile (staff, jobs and focus)",
        "https://jgpestcontrol.co.uk/about-jg-pest-control/",
      ),
      tyro,
    ],
  },
  {
    id: "nightshift",
    name: "Nightshift Pest Control",
    group: "Tyro Group",
    footprint: "National",
    regions: [...regions],
    coverage:
      "London, South East and West of England within a nationwide commercial service.",
    size: "Company describes 60+ London foot technicians. This is a subset of its workforce, not a total headcount.",
    sizePeriod: undated,
    expansion:
      "Company reports acquiring Pest-Tech in October 2025 and Multi Pest in December 2025, adding specialist capabilities.",
    expansionEvidence: "Dated event",
    innovation:
      "Reports piloting Syngenta SecureChoice digital rodent monitoring, alongside overnight service and visit reporting. Pilot status does not establish a universal rollout.",
    tags: ["Digital monitoring", "Reporting"],
    assessment:
      "Relevant to hospitality, heritage and out-of-hours commercial work; group and acquired brands overlap.",
    sources: [
      source(
        "Provider comparison (foot-technician count)",
        "https://www.nightshiftpestcontrol.co.uk/how-to-choose-a-national-pest-control-provider",
      ),
      nightshiftAcquisitions,
      tyro,
    ],
  },
  {
    id: "safeguard",
    name: "Safeguard Pest Control",
    group: "Rollins / Orkin UK",
    footprint: "National",
    regions: [...regions],
    coverage:
      "Published locations include London and counties across both the South East and South West.",
    size: noSize,
    sizePeriod: undated,
    expansion:
      "Rollins records the acquisition of Safeguard in June 2016. Current Orkin branding demonstrates an established group platform, not a newly independent entrant.",
    expansionEvidence: "Dated event",
    innovation:
      "Offers bird proofing, hawking and specialist environmental work alongside general pest management. These are service capabilities, not evidence of a proprietary invention.",
    tags: ["Bird management", "Proofing"],
    assessment:
      "A national contracting alternative whose parent is shared with NBC, Beaver and Albany.",
    sources: [
      source(
        "Coverage and service directory",
        "https://safeguardpestcontrol.co.uk/",
      ),
      orkin,
      source(
        "Rollins annual filing (2016 acquisition)",
        "https://www.rollins.com/investors/financial-information/sec-filings/content/0001171200-20-000103/i20108_rol-10k.htm",
        "FY2019 filing",
      ),
    ],
  },
  {
    id: "nbc",
    name: "NBC Environment",
    group: "Rollins / Orkin UK",
    footprint: "National",
    regions: [...regions],
    coverage:
      "National bird, wildlife, pest and biosecurity services, including complex multi-site and offshore work.",
    size: noSize,
    sizePeriod: undated,
    expansion:
      "The current Orkin UK brand directory confirms group membership. No dated standalone southern growth series was established.",
    expansionEvidence: "Undated claim",
    innovation:
      "Documents bird lasers, GPS tracking of birds of prey, remote cameras, drones and acoustic deterrents. Suitability is site-specific; no comparative efficacy score is assigned.",
    tags: ["Bird management", "Digital monitoring"],
    assessment:
      "A specialist competitor where wildlife, construction or offshore risk is more important than domestic callout scale.",
    sources: [
      source(
        "NBC services and specialist methods",
        "https://www.nbcenvironment.co.uk/",
      ),
      orkin,
    ],
  },
  {
    id: "beaver",
    name: "Beaver Pest Control",
    group: "Rollins / Orkin UK",
    footprint: "Regional",
    regions: ["London", "South East"],
    coverage:
      "London and the South East; pest, bird, wildlife and drainage-proofing work.",
    size: "Nearly 100 employees at the October 2024 acquisition, according to the BPCA announcement. It also reported 450+ across Orkin UK then; the two figures must not be added together.",
    sizePeriod: "October 2024 transaction snapshot",
    expansion:
      "Acquired by Rollins on 25 October 2024, increasing its London and South East presence. This is a dated consolidation event, not evidence of subsequent headcount growth.",
    expansionEvidence: "Dated event",
    innovation:
      "Combines pest management with drainage proofing and wildlife services; the current parent identifies an in-house RSPH Level 2 training centre.",
    tags: ["Proofing", "Bird management"],
    assessment:
      "A substantial regional delivery business within a larger group. The 2024 workforce count is historical.",
    sources: [
      source(
        "BPCA acquisition announcement",
        "https://bpca.org.uk/news-and-blog/beaver-pest-control-acquired-by-orkin/278375",
        "22 November 2024",
      ),
      source(
        "Beaver history and services",
        "https://pestcontrolservices.co.uk/about-beaver-pest/",
      ),
      orkin,
    ],
  },
  {
    id: "albany",
    name: "Albany Pest Control",
    group: "Rollins / Orkin UK",
    footprint: "Regional",
    regions: ["London"],
    coverage:
      "Central and Greater London, including residential, food-production and hospitality properties.",
    size: noSize,
    sizePeriod: undated,
    expansion:
      "Joined Orkin UK in 2020, according to its current parent-hosted company page.",
    expansionEvidence: "Dated event",
    innovation:
      "Lists thermal imaging and Heatwave treatment among its capabilities, with access to group training. No separate technology deployment numbers were established.",
    tags: ["Heat treatment", "Digital monitoring"],
    assessment:
      "London brand reach should be distinguished from Orkin UK's consolidated scale.",
    sources: [
      source("Albany's parent-hosted profile", "https://orkinuk.co.uk/albany/"),
    ],
  },
  {
    id: "nurture",
    name: "Nurture Pest Control (formerly Rokill)",
    group: "Nurture Group",
    footprint: "National",
    regions: [...regions],
    coverage:
      "National provider with historical Ringwood, Hampshire operations and a Surrey-registered parent footprint.",
    size: "Pest-division headcount and turnover were not established. Nurture's wider landscaping workforce and revenue are excluded from pest-service size.",
    sizePeriod: "2026 reviewed sources",
    expansion:
      "Nurture acquired Rokill in 2021 and added Alpha and Enserve in 2022, Pest Pro and Midland Pest Control in 2023. Rokill's legal name changed in July 2024.",
    expansionEvidence: "Dated event",
    innovation:
      "Current brand page advertises AI bird deterrents, drones, smart traps and detection dogs. Availability is company-described; division-wide deployment is not quantified.",
    tags: [
      "Digital monitoring",
      "AI detection",
      "Canine detection",
      "Bird management",
    ],
    assessment:
      "An acquisition-led national platform. Older Rokill listings should not be counted as an additional independent competitor.",
    sources: [
      source(
        "Group acquisition history",
        "https://www.nurture-group.co.uk/about/acquisitions/",
      ),
      source(
        "Current pest brand and capabilities",
        "https://www.nurture-group.co.uk/our-brands/nurture-pest-control/",
      ),
      source(
        "Registered-name history",
        "https://find-and-update.company-information.service.gov.uk/company/01490758",
        "July 2024 name change",
      ),
      source(
        "Ringwood operating location",
        "https://www.trustmark.org.uk/firms/Nurture%20Pest%20Services%20Ltd-4122606-BH24%203FA?id=238a6a15-a956-4736-8ed0-1c05dbce3949",
      ),
    ],
  },
  {
    id: "cleankill",
    name: "Cleankill Pest Control",
    group: "Pest Control Partnership",
    footprint: "Regional",
    regions: [...regions],
    coverage:
      "Headquarters in Kenley, with offices in East Sussex, Bristol and Buckinghamshire; southern commercial and domestic work.",
    size: noSize,
    sizePeriod: undated,
    expansion:
      "Historic acquisitions include Good Riddance, Bird Control Sussex, Pest Control Bucks and Totalcare, extending the southern footprint. Companies House records Pest Control Partnership control from 8 July 2024.",
    expansionEvidence: "Dated event",
    innovation:
      "Specialist bird proofing and technical staff development are documented. The reviewed 2026 news includes training and a bird-proofing project, rather than quantified proprietary technology adoption.",
    tags: ["Bird management", "Proofing"],
    assessment:
      "A southern regional consolidator now within a wider partnership; legacy independent descriptions need qualification.",
    sources: [
      source(
        "Company footprint",
        "https://www.cleankill.co.uk/about-cleankill-pest-control",
      ),
      source(
        "Historic Totalcare acquisition",
        "https://www.cleankill.co.uk/index.php/news/cleankill-pest-control-continues-expansion-purchase-totalcare-pest-control",
      ),
      source(
        "Ownership filing history",
        "https://find-and-update.company-information.service.gov.uk/company/03013931/filing-history",
        "Control effective 8 July 2024",
      ),
      source(
        "Current technical updates",
        "https://www.cleankill.co.uk/latest-news",
      ),
    ],
  },
  {
    id: "pestforce",
    name: "Pestforce",
    group: "The Forces Group / franchise network",
    footprint: "National",
    regions: [...regions],
    coverage:
      "UK franchise network; southern availability depends on the local franchise territory.",
    size: "Company reports 70+ vans and expansion to 70+ franchisees by 2024. Vans, franchisees and employed staff are different measures.",
    sizePeriod: "2024 network milestone on undated company page",
    expansion:
      "A dated company-history milestone places the network above 70 franchisees by 2024. No territory-by-territory southern growth series was established.",
    expansionEvidence: "Dated event",
    innovation:
      "A national account model coordinates local franchise delivery through one contract and support team. This is operational innovation; proprietary detection technology is not established.",
    tags: ["Network delivery", "Reporting"],
    assessment:
      "Local delivery with central coordination. Confirm the contracting franchise and service standards for each territory.",
    sources: [
      source(
        "Pestforce history and network scale",
        "https://www.pest-force.co.uk/about-us.aspx",
      ),
      source(
        "National contracts model",
        "https://www.pest-force.co.uk/national-pest-control-contracts.aspx",
      ),
    ],
  },
  {
    id: "pestuk",
    name: "PEST UK",
    group: "Berkshire Pest Control Ltd; company describes private ownership",
    footprint: "Regional",
    regions: ["London", "South East"],
    coverage:
      "Current directory explicitly lists all London boroughs and the South East; wider regions also served. Individual local listings are not necessarily staffed offices.",
    size: "A legacy company article claims 65+ offices. Its original publication is old and the current directory has more listings; neither establishes today's staffed-office count or workforce.",
    sizePeriod: "Legacy article; current directory checked October 2026",
    expansion:
      "Company states that it expanded its operating area and technician team, but gives no dated time series in the reviewed pages.",
    expansionEvidence: "Undated claim",
    innovation:
      "Advertises heat treatment, field-biologist inspections, sewer-related rodent work and solar-panel bird protection.",
    tags: ["Heat treatment", "Proofing", "Bird management"],
    assessment:
      "A broad local-service network; assess real delivery capacity rather than treating location-page counts as branch counts.",
    sources: [
      source(
        "Current service and ownership statements",
        "https://www.pestuk.com/",
      ),
      source("Current location directory", "https://www.pestuk.com/location/"),
      source(
        "Legacy office-count claim",
        "https://www.pestuk.com/blog/pest-uk-has-44-branches/",
      ),
    ],
  },
  {
    id: "pestology",
    name: "Pestology",
    group: unknownOwner,
    footprint: "Regional",
    regions: [...regions],
    coverage:
      "London and listed southern counties including Kent, Sussex, Hampshire, Wiltshire, Dorset and Gloucestershire. Listed coverage does not establish every South West postcode.",
    size: "Company presents multiple teams and vehicles but publishes no verified total staff or revenue figure in the reviewed pages.",
    sizePeriod: undated,
    expansion: noExpansion,
    expansionEvidence: "Not verified",
    innovation:
      "Rodent-specialist exclusion focuses on building fabric, drains and entry routes. Company describes a 12-month proofing guarantee; contract scope and exclusions require checking. Comparative success claims were not validated.",
    tags: ["Proofing", "Drain diagnostics"],
    assessment:
      "Pestology is included on the same evidence standard as competitors. Prevention is its stated positioning, not proof of superior outcomes.",
    sources: [
      source(
        "Pestology service coverage and approach",
        "https://pestologyltd.co.uk/pest-control-company/",
      ),
    ],
  },
  {
    id: "integrum",
    name: "Integrum Services",
    group: "Tyro Group",
    footprint: "Regional",
    regions: ["London", "South East"],
    coverage:
      "London, Surrey and the South East, with specialist aviation and national commercial work.",
    size: noSize,
    sizePeriod: undated,
    expansion:
      "Tyro's current portfolio confirms membership. The older company profile describes the transition from Riverside Pest Management, but does not date or quantify recent expansion.",
    expansionEvidence: "Undated claim",
    innovation:
      "Technology- and data-led pest programmes, aviation expertise and bird-management/proofing services are described. No installation count or independent performance comparison was found.",
    tags: ["Reporting", "Bird management", "Proofing"],
    assessment:
      "The company page still contains a family-owned description; the parent portfolio is used for group affiliation, and that inconsistency is retained here.",
    sources: [
      source(
        "Company profile and specialisms",
        "https://integrumservices.co.uk/about-us/",
      ),
      tyro,
    ],
  },
  {
    id: "sankeys",
    name: "Sankeys Pest Control",
    group: "Tyro Group",
    footprint: "Regional",
    regions: [...regions],
    coverage:
      "South of England branch network; confirm individual postcodes with the operator.",
    size: "Company and parent profiles describe 20+ local branches. This is a claimed network measure, not verified staffed offices or headcount.",
    sizePeriod: undated,
    expansion:
      "Present in Tyro's portfolio. No dated branch-opening schedule or recent growth rate was established.",
    expansionEvidence: "Undated claim",
    innovation:
      "Company describes CCTV inspection of voids, drains and chimneys to identify entry points and target treatment.",
    tags: ["Drain diagnostics", "Proofing"],
    assessment:
      "An established southern brand within a larger group, rather than another independently owned national supplier.",
    sources: [
      source(
        "Parent-hosted profile and branch claim",
        "https://tyrogroup.com/portfolio/sankeys/",
      ),
      tyro,
    ],
  },
  {
    id: "ark",
    name: "Ark Pest Control",
    group: "Tyro Group",
    footprint: "National",
    regions: [...regions],
    coverage:
      "Advertises London, Home Counties, South East, South West and national coverage on enquiry.",
    size: noSize,
    sizePeriod: undated,
    expansion:
      "Company reported a technician joining in April 2024; Tyro's portfolio confirms current affiliation. A single hire is a recruitment signal, not a quantified growth rate.",
    expansionEvidence: "Dated event",
    innovation:
      "Offers heat treatment, bird work and integrated cleaning/hygiene services. Announced Cyber Essentials in February 2025; this is an information-security development, not pest-treatment innovation.",
    tags: ["Heat treatment", "Bird management"],
    assessment:
      "Relevant where pest and cleaning services are bundled; group overlap matters in shortlists.",
    sources: [
      source("Coverage and dated updates", "https://arkpestcontrol.com/"),
      tyro,
    ],
  },
  {
    id: "pest-professionals",
    name: "Pest Professionals",
    group: "Tyro Group",
    footprint: "Regional",
    regions: ["London"],
    coverage:
      "A network with a specific South London service page; only that in-scope region is recorded here.",
    size: "Network size, headcount and turnover not established. The company describes a network of qualified local controllers.",
    sizePeriod: undated,
    expansion:
      "Current Tyro portfolio membership is verified; no dated network-growth series found.",
    expansionEvidence: "Undated claim",
    innovation:
      "Combines local professional services with advice and a product shop. No distinct proprietary technology or quantified digital deployment established.",
    tags: ["Network delivery"],
    assessment:
      "A network brand should not be treated as proof of directly employed staff in every advertised location.",
    sources: [
      source(
        "South London service coverage",
        "https://www.pestprofessionals.co.uk/rat-catcher-south-london/",
      ),
      source(
        "Network business model",
        "https://shop.pestprofessionals.co.uk/info/",
      ),
      tyro,
    ],
  },
  {
    id: "inoculand",
    name: "Inoculand",
    group: unknownOwner,
    footprint: "Regional",
    regions: ["London"],
    coverage: "London homes, blocks and commercial premises.",
    size: "Company identifies two biologists plus certified technicians; total workforce and turnover not disclosed.",
    sizePeriod: undated,
    expansion: noExpansion,
    expansionEvidence: "Not verified",
    innovation:
      "Combines biological assessment, full-property mouse proofing, CCTV drainage work and heat tents/whole-room heat. Advertises a one-year full-property proofing guarantee, subject to scope.",
    tags: ["Proofing", "Drain diagnostics", "Heat treatment"],
    assessment:
      "A close comparison for integrated diagnosis, treatment and building exclusion, without assuming a large workforce.",
    sources: [
      source(
        "Company team and services",
        "https://www.inoculandpestcontrol.co.uk/",
      ),
    ],
  },
  {
    id: "bon-accord",
    name: "Bon Accord Pest Control",
    group: unknownOwner,
    footprint: "Regional",
    regions: ["London", "South East"],
    coverage:
      "London and selected parts of Surrey and Kent; company asks clients to confirm postcode availability.",
    size: noSize,
    sizePeriod: undated,
    expansion:
      "Website calls the business rapidly growing but supplies no dated growth measure in the reviewed pages.",
    expansionEvidence: "Undated claim",
    innovation:
      "Prevention-led service combines proofing, heat/steam where suitable, structural remediation and photographic reporting.",
    tags: ["Proofing", "Heat treatment", "Reporting"],
    assessment:
      "A property-management and domestic competitor. Marketing language does not establish relative growth or market position.",
    sources: [
      source(
        "Services and growth claim",
        "https://bonaccordpestcontrol.co.uk/",
      ),
      source(
        "Explicit coverage limits",
        "https://bonaccordpestcontrol.co.uk/contact-us/",
      ),
    ],
  },
  {
    id: "dyno-pest",
    name: "Dyno-Pest",
    group: unknownOwner,
    footprint: "Regional",
    regions: ["London"],
    coverage: "London commercial and residential properties.",
    size: noSize,
    sizePeriod: undated,
    expansion: noExpansion,
    expansionEvidence: "Not verified",
    innovation:
      "Describes heat and non-chemical treatments alongside inspection, prevention and written pesticide/work reports. No proprietary detection system established.",
    tags: ["Heat treatment", "Reporting"],
    assessment:
      "An established London service proposition; its brand name alone does not establish affiliation with a wider plumbing or franchise group.",
    sources: [
      source("Dyno-Pest company and services", "https://dynopest.co.uk/"),
    ],
  },
  {
    id: "shield",
    name: "Shield Pest Control",
    group: unknownOwner,
    footprint: "National",
    regions: [...regions],
    coverage:
      "London base; company advertises UK-wide residential and commercial work.",
    size: "Royal Warrant Holders Association profile reports a portfolio exceeding 550 named customers. This is not active annual contracts, staff or southern revenue.",
    sizePeriod: "Undated association profile, reviewed October 2026",
    expansion: noExpansion,
    expansionEvidence: "Not verified",
    innovation:
      "Association profile describes canine bed bug detection, specialist heat treatment, an in-house bird team and refurbishment-related pest support.",
    tags: ["Canine detection", "Heat treatment", "Bird management"],
    assessment:
      "Specialist work and a long-lived client portfolio may matter more than scale; a warrant is not evidence of technological leadership.",
    sources: [
      source("Service coverage", "https://shieldpestcontrol.co.uk/"),
      source(
        "Association profile (customers and methods)",
        "https://www.royalwarrant.org/company/shield-pest-control-uk-limited",
      ),
    ],
  },
  {
    id: "fantastic",
    name: "Fantastic Pest Control",
    group: "Fantastic Services brand/network",
    footprint: "National",
    regions: ["London", "South East"],
    coverage:
      "London/M25 and selected surrounding postcodes; FAQ also names cities outside this report's area. Southern coverage is postcode-dependent.",
    size: "Pest-service workforce and turnover not established. Group-wide service-provider counts would include other home services and are excluded.",
    sizePeriod: undated,
    expansion:
      "FAQ says coverage is expanding beyond London but gives no dated opening or capacity series.",
    expansionEvidence: "Undated claim",
    innovation:
      "Online account-based booking and rescheduling, with heat and steam treatments among services offered.",
    tags: ["Digital booking", "Heat treatment", "Network delivery"],
    assessment:
      "Compare the booking platform and delivery model separately from directly employed pest-specialist capacity.",
    sources: [
      source(
        "Service, booking and coverage FAQ",
        "https://www.fantasticpestcontrol.co.uk/frequently-asked-questions/",
      ),
    ],
  },
  {
    id: "environ",
    name: "Environ Pest Control",
    group: "Environ Property Services",
    footprint: "Regional",
    regions: ["London"],
    coverage:
      "Fulham-based London property-services operator; technician roles specifically cover London areas.",
    size: "Pest-division staff and turnover not established; the wider business also covers damp, roofing, drainage and restoration.",
    sizePeriod: undated,
    expansion:
      "Current recruitment pages advertise technician roles, including North/East London. Vacancies indicate hiring intent, not completed expansion or measured net growth.",
    expansionEvidence: "Undated claim",
    innovation:
      "Coordinates pest work with drainage, damp, roofing and restoration to address building causes. This is a service-integration model, not verified proprietary technology.",
    tags: ["Proofing", "Drain diagnostics"],
    assessment:
      "Competes on resolving related property defects as well as pest treatment.",
    sources: [
      source(
        "Company model and recruitment",
        "https://www.environpestcontrol.co.uk/pest-control-technician",
      ),
      source(
        "Coordinated property-services approach",
        "https://www.environpestcontrol.co.uk/pest-control-technician-driver",
      ),
    ],
  },
  {
    id: "diamond",
    name: "Diamond Pest Control",
    group: "Company describes family ownership",
    footprint: "Regional",
    regions: ["London", "South East"],
    coverage:
      "London and Home Counties; individual service availability should be confirmed.",
    size: noSize,
    sizePeriod: undated,
    expansion:
      "Company reports an office move within the London area and an expanding electric fleet, without dates or a quantified capacity change.",
    expansionEvidence: "Undated claim",
    innovation:
      "Describes a transition from diesel to electric vehicles and responsible pesticide-use practices. Electric transport is an operational sustainability measure, not independently measured carbon reduction.",
    tags: ["Fleet electrification"],
    assessment:
      "Provides a useful small-company sustainability example; total fleet size and completion of the transition are not established.",
    sources: [
      source(
        "Company profile and electric-fleet statement",
        "https://diamondpestcontrol.co.uk/about-us/",
      ),
    ],
  },
  {
    id: "bounty",
    name: "Bounty Pest Control",
    group: "Company describes family ownership",
    footprint: "Regional",
    regions: ["South East"],
    coverage:
      "Ashford base; Kent and the South East, including domestic, commercial and local-authority customers.",
    size: "Company reports 5,000+ customers 'at the last count'. No measurement date, active-contract count or workforce figure is given.",
    sizePeriod: undated,
    expansion: noExpansion,
    expansionEvidence: "Not verified",
    innovation:
      "Tailored programmes and continuous professional development are documented. No distinct new technology or independently measured innovation outcome was established.",
    tags: ["Tailored prevention"],
    assessment:
      "A regional generalist; cumulative customer claims should not be compared with annual revenue or staff figures.",
    sources: [
      source(
        "Bounty company profile",
        "https://www.bountypestcontrol.co.uk/pest_control/file/about.php",
      ),
    ],
  },
  {
    id: "total",
    name: "Total Pest Control (UK)",
    group: unknownOwner,
    footprint: "National",
    regions: [...regions],
    coverage:
      "Oxford-based proposition advertising London, South East, South West and national services.",
    size: noSize,
    sizePeriod: undated,
    expansion: noExpansion,
    expansionEvidence: "Not verified",
    innovation:
      "Electronic reports and portal access, bed bug heat/steam treatment and specialist grain fumigation are advertised.",
    tags: ["Reporting", "Heat treatment"],
    assessment:
      "A broad contracting and specialist-treatment proposition. It is not the historic Totalcare business acquired by Cleankill.",
    sources: [
      source(
        "Coverage and service offering",
        "https://www.totalpestcontrol.co.uk/",
      ),
    ],
  },
  {
    id: "sdk",
    name: "SDK Environmental / Dial A Pest",
    group: "SDK Environmental",
    footprint: "National",
    regions: ["South East"],
    coverage:
      "Slough-based outsourcing provider. Surrey Heath and Woking councils confirm resident pest-control contracts. Wider availability is contract-dependent; only the evidenced southern region is mapped here.",
    size: "Pest-service workforce, contract count and revenue not established. The wider company also supplies animal-control and customer services.",
    sizePeriod: undated,
    expansion:
      "Bedford Borough Council announced SDK taking over its service from 21 September 2026. This is a verified new contract outside this report's geographic boundary, not a southern market-growth measure.",
    expansionEvidence: "Dated event",
    innovation:
      "Combines pest delivery with contact-centre services; the company describes satellite-tracked vehicles to support dispatch. No independently quantified response-time improvement was established.",
    tags: ["Network delivery", "Digital booking"],
    assessment:
      "Important to public-sector market structure even where residents book through a council rather than a visible consumer pest brand.",
    sources: [
      source("Company services and base", "https://www.sdke.co.uk/"),
      source(
        "Surrey Heath confirms local service",
        "https://www.surreyheath.gov.uk/environment/pest-control",
      ),
      source(
        "Woking confirms local service",
        "https://www.woking.gov.uk/environment-neighbourhoods/your-neighbourhood/pest-control",
      ),
      source(
        "Bedford announces a new contract (outside report area)",
        "https://www.bedford.gov.uk/news/2026/pest-control-services-taken-over-new-provider",
        "21 September 2026",
      ),
      source(
        "Delivery model and satellite tracking",
        "https://www.sdke.co.uk/customer-direct-pest-control/",
      ),
    ],
  },
  {
    id: "monitor",
    name: "Monitor Pest Control",
    group: "OCS (via Abate)",
    footprint: "Regional",
    regions: ["London", "South East"],
    coverage:
      "Kent, London, Surrey and Sussex; some domestic work is delivered through local-authority or housing contracts.",
    size: noSize,
    sizePeriod: "2024 acquisition filing; current service page",
    expansion:
      "OCS's annual accounts record acquiring Abate and its wholly owned Monitor subsidiary on 28 March 2024.",
    expansionEvidence: "Dated event",
    innovation:
      "Public-sector delivery and tailored prevention are documented. No standalone technology deployment count was established.",
    tags: ["Tailored prevention"],
    assessment:
      "Retain the OCS relationship when comparing bids; the similarly named Atlanta business is unrelated and excluded.",
    sources: [
      source(
        "Kent/London service and contracting scope",
        "https://www.monitorpestcontrol.co.uk/services/wasp-bee-control/",
      ),
      ocsAccounts,
    ],
  },
  {
    id: "abate",
    name: "Abate Pest Management",
    group: "OCS",
    footprint: "Regional",
    regions: ["London", "South East"],
    coverage:
      "OCS describes particular strength in Kent and Sussex as well as Norfolk, outside this review's boundary.",
    size: "Standalone staff and revenue not established. Its acquisition included Monitor, which is separately profiled as a trading business.",
    sizePeriod: "2024 acquisition sources",
    expansion:
      "Acquired by OCS in March 2024, adding sector exposure and services to the parent's pest operation.",
    expansionEvidence: "Dated event",
    innovation:
      "OCS identifies CCTV drainage surveys, controlled low-temperature treatments and woodworm capability as additions from the acquisition.",
    tags: ["Drain diagnostics", "Low-temperature treatment"],
    assessment:
      "An acquisition example where added capability and reach are better evidenced than a southern growth rate.",
    sources: [ocsAcquisition, ocsAccounts],
  },
  {
    id: "countrywide",
    name: "Countrywide Pest Control",
    group: "Pest Control Partnership",
    footprint: "Regional",
    regions: ["South East", "South West"],
    coverage:
      "Newbury, Berkshire, Oxfordshire, Hampshire, Surrey and Wiltshire.",
    size: noSize,
    sizePeriod: undated,
    expansion:
      "Companies House records Pest Control Partnership becoming a person with significant control on 7 October 2025. The current service footprint spans Berkshire to the south coast and Wiltshire; no standalone organic-growth rate was established.",
    expansionEvidence: "Dated event",
    innovation:
      "Offers CCTV rat-drain surveys, proofing and contaminated-loft clearance alongside general pest work.",
    tags: ["Drain diagnostics", "Proofing"],
    assessment:
      "Company pages still use owner-led language; the ownership statement is based on the dated Companies House filing.",
    sources: [
      source(
        "Coverage and capabilities",
        "https://www.countrywide-pestcontrol.co.uk/",
      ),
      source(
        "Companies House control filing",
        "https://find-and-update.company-information.service.gov.uk/company/11019709/filing-history",
        "Control effective 7 October 2025; filed 21 October 2025",
      ),
    ],
  },
  {
    id: "eco",
    name: "Eco Environmental Services",
    group: unknownOwner,
    footprint: "National",
    regions: ["South West"],
    coverage:
      "Plymouth head office and Bristol regional office, with a national bird-management proposition. Other southern regions are not separately mapped without a specific source.",
    size: "Publishes five office contacts: Plymouth, Bristol, Birmingham, Manchester and Glasgow. This is a listed-office footprint, not staff or revenue.",
    sizePeriod: undated,
    expansion:
      "The contact page demonstrates an established multi-region footprint but does not date office openings. No quantified recent expansion established.",
    expansionEvidence: "Undated claim",
    innovation:
      "Specialist electric bird deterrents, netting, rope access and solar-panel protection, with project-managed installations for construction and infrastructure.",
    tags: ["Bird management", "Proofing"],
    assessment:
      "A specialist installation competitor rather than a directly comparable domestic rodent-response business.",
    sources: [
      source("Service capabilities", "https://www.ecoltd.net/"),
      source("Five office contacts", "https://www.ecoltd.net/contact-us/"),
    ],
  },
  {
    id: "urban",
    name: "Urban Pest Control",
    group: "Urban Pest Control Ltd",
    footprint: "Regional",
    regions: ["South East", "South West"],
    coverage:
      "Dorset, Hampshire and Wiltshire from Wimborne; commercial, domestic and agricultural services.",
    size: noSize,
    sizePeriod: undated,
    expansion:
      "South Dorset Pest Control's website states it is now a wholly owned Urban subsidiary; the transaction date is not given.",
    expansionEvidence: "Undated claim",
    innovation:
      "Advertises bird-scarer alert systems, proofing, specialist cleaning and tailored commercial contracts. No proprietary-system outcome data established.",
    tags: ["Bird management", "Proofing"],
    assessment:
      "A regional consolidation example with a separate local brand retained; do not count the subsidiary as independent ownership.",
    sources: [
      source(
        "Urban coverage and services",
        "https://www.urbanpestcontrol.co.uk/",
      ),
      source(
        "Subsidiary ownership statement",
        "https://www.southdorsetpestcontrol.co.uk/",
      ),
    ],
  },
  {
    id: "south-dorset",
    name: "South Dorset Pest Control",
    group: "Urban Pest Control Ltd",
    footprint: "Local",
    regions: ["South West"],
    coverage: "Weymouth, Portland, Dorchester and surrounding Dorset areas.",
    size: noSize,
    sizePeriod: undated,
    expansion:
      "Website identifies the business as a wholly owned Urban Pest Control subsidiary. No acquisition date or subsequent growth figure given.",
    expansionEvidence: "Undated claim",
    innovation:
      "Tailored agricultural and commercial contracts, bird proofing and prevention. No separately documented new technology established.",
    tags: ["Proofing", "Bird management"],
    assessment:
      "A local trading operation within Urban's regional network, not an additional independent parent.",
    sources: [
      source(
        "Service area, ownership and capabilities",
        "https://www.southdorsetpestcontrol.co.uk/",
      ),
    ],
  },
  {
    id: "advance-bristol",
    name: "Advance Pest Control Bristol",
    group: "Founder-led company; ownership not independently verified",
    footprint: "Local",
    regions: ["South West"],
    coverage:
      "Bristol and surrounding areas; commercial and residential services.",
    size: "Company describes a founder-led local business with 30+ years of Bristol experience. Experience is not a workforce measure; staff and turnover remain undisclosed.",
    sizePeriod: undated,
    expansion: noExpansion,
    expansionEvidence: "Not verified",
    innovation:
      "Emphasises local building/drainage knowledge, prevention and audit-ready commercial documentation. No proprietary technology or quantified rollout established.",
    tags: ["Tailored prevention", "Reporting"],
    assessment:
      "A local-service comparison for dense urban properties, rather than a national-scale operator.",
    sources: [
      source(
        "Company background and service area",
        "https://www.advancepestcontrolbristol.com/",
      ),
    ],
  },
  {
    id: "devon-solutions",
    name: "Devon Pest Solutions",
    group: "Company describes independent operation",
    footprint: "Local",
    regions: ["South West"],
    coverage:
      "Newton Abbot and South Devon; domestic, commercial, agricultural and education sectors.",
    size: "Company explicitly describes itself as small and profiles a lead technician. Total staff and turnover are not stated.",
    sizePeriod: undated,
    expansion:
      "Advertises a referral programme for ongoing contracts; no dated growth or territory expansion established.",
    expansionEvidence: "Undated claim",
    innovation:
      "Sector-specific managed plans, bee-swarm relocation with a local beekeeper and school-site safeguards. No distinct monitoring technology established.",
    tags: ["Tailored prevention"],
    assessment:
      "A useful rural and smaller-contract benchmark; a referral offer is customer-acquisition activity, not evidence of realised growth.",
    sources: [
      source(
        "Company size and base",
        "https://devonpestsolutions.co.uk/about-devon-pest-solutions/",
      ),
      source(
        "Current service and referral model",
        "https://devonpestsolutions.co.uk/",
      ),
      source(
        "Domestic methods",
        "https://devonpestsolutions.co.uk/domestic-pest-services/",
      ),
    ],
  },
  {
    id: "greenrock",
    name: "GreenRock Pest Control",
    group:
      "Subsidiary of Kieron Bewes Horticultural Consultant Ltd (company statement)",
    footprint: "Local",
    regions: ["South West"],
    coverage:
      "Ottery St Mary base; explicit coverage of East Devon and West Dorset.",
    size: "Company describes a small family-run operator. No quantified staff or revenue figure established.",
    sizePeriod: undated,
    expansion: noExpansion,
    expansionEvidence: "Not verified",
    innovation:
      "Highlights accessible service including sign-language communication, consultancy and bee/bat-aware practices. These are service differentiators; no novel detection system evidenced.",
    tags: ["Accessible service", "Tailored prevention"],
    assessment:
      "A local example of differentiation through accessibility and customer knowledge rather than fleet scale.",
    sources: [
      source(
        "Company coverage, accessibility and legal statement",
        "https://www.greenrockpestcontrol.co.uk/",
      ),
    ],
  },
  {
    id: "killpro",
    name: "Killpro",
    group: "Company describes independent operation",
    footprint: "Local",
    regions: ["South West"],
    coverage:
      "Kingsbridge, South Hams and South Devon, including Dartmouth, Totnes, Ivybridge and Salcombe.",
    size: noSize,
    sizePeriod: undated,
    expansion:
      "Established in 2020, according to the company. Formation is documented background; no subsequent quantified growth established.",
    expansionEvidence: "Not verified",
    innovation:
      "Focuses on source identification, prevention advice and treatment plans. No proprietary technology or measured innovation outcome established.",
    tags: ["Tailored prevention"],
    assessment:
      "A newer local entrant relative to the long-established regional brands; age alone does not prove rapid growth.",
    sources: [
      source(
        "Company background and coverage",
        "https://www.killpro.co.uk/about-us/",
      ),
    ],
  },
  {
    id: "southwest-newquay",
    name: "SouthWest Pest Control (Newquay)",
    group: "Owner-led service; wider ownership not established",
    footprint: "Local",
    regions: ["South West"],
    coverage: "Newquay, Cornwall; private and business premises.",
    size: "Website presents a named owner/contact, Matt. Total workforce and revenue are not stated; a single named contact is not proof of a sole-trader legal structure.",
    sizePeriod: undated,
    expansion: noExpansion,
    expansionEvidence: "Not verified",
    innovation:
      "Direct WhatsApp contact and a broad local pest service. No distinct treatment technology or quantified innovation evidence established.",
    tags: ["Digital booking"],
    assessment:
      "Kept distinct from similarly named South West businesses in Somerset and other counties.",
    sources: [
      source("Newquay service and named contact", "https://pestcontrolsw.com/"),
    ],
  },
  {
    id: "cornish-pesties",
    name: "Cornish Pesties / Cornwall Pest Control",
    group: unknownOwner,
    footprint: "Regional",
    regions: ["South West"],
    coverage:
      "Cornwall; Padstow contact address and claimed local office network.",
    size: "Company describes offices throughout Cornwall but supplies no office count, workforce or revenue. Trading experience is stated from 1998.",
    sizePeriod: undated,
    expansion:
      "An office network is described without dated openings or quantified growth.",
    expansionEvidence: "Undated claim",
    innovation:
      "Seasonally scheduled visits and specialist treatments are offered. No proprietary system or independently verified innovation outcome established.",
    tags: ["Tailored prevention"],
    assessment:
      "A county-wide service proposition; do not equate multiple local contacts with verified staffed branches.",
    sources: [
      source(
        "Cornwall coverage and services",
        "https://www.cornwallpestcontrol.co.uk/",
      ),
      source(
        "Company history",
        "https://www.cornwallpestcontrol.co.uk/about-us/",
      ),
    ],
  },
  {
    id: "dcs",
    name: "DCS Pest Control (Cornwall)",
    group: "Founder-run company (company statement)",
    footprint: "Regional",
    regions: ["South West"],
    coverage:
      "Devon and Cornwall, including Exeter, Plymouth, Torquay, Truro and surrounding areas.",
    size: "Company describes founder Simon Ronald running the business from near Liskeard. Total workforce and turnover not stated.",
    sizePeriod: undated,
    expansion:
      "Established in 2015. No dated subsequent expansion or quantified growth established.",
    expansionEvidence: "Not verified",
    innovation:
      "Experience-led pest management is documented; no separate novel technology or measured innovation programme established.",
    tags: ["Tailored prevention"],
    assessment:
      "A cross-county local delivery proposition whose service-area breadth is not a headcount measure.",
    sources: [
      source(
        "Founder background and service area",
        "https://www.dcspestcontrol.co.uk/about.php",
      ),
    ],
  },
  {
    id: "cotswold",
    name: "Cotswold Pest Control and Wildlife Management",
    group: "Alex Badger, sole trader (company statement)",
    footprint: "Local",
    regions: ["South West"],
    coverage:
      "Moreton-in-Marsh and the Cotswolds; domestic, commercial and agricultural work.",
    size: "Explicitly describes an owner-operator/sole-trader model. No revenue figure established.",
    sizePeriod: undated,
    expansion:
      "Owner describes starting independently in 2015 after council employment. This is a historical launch, not evidence of recent expansion.",
    expansionEvidence: "Not verified",
    innovation:
      "Situation-specific pest plans and wildlife-aware practices, with food-premises and farm-contract experience. No proprietary technology established.",
    tags: ["Tailored prevention"],
    assessment:
      "Demonstrates why sole traders belong in the competitive landscape and why turnover comparisons would be misleading without accounts.",
    sources: [
      source(
        "Owner-operator history",
        "https://www.cotswoldpestcontrol.co.uk/about",
      ),
      source(
        "Sector and geographic coverage",
        "https://www.cotswoldpestcontrol.co.uk/",
      ),
    ],
  },
  {
    id: "acd",
    name: "ACD Pest Control",
    group: "Tudor family business (company statement)",
    footprint: "Local",
    regions: ["South West"],
    coverage:
      "Gloucestershire and Wiltshire; agricultural, commercial and domestic clients.",
    size: "About page describes a two-person business from December 2021: a technician/owner and an office manager. This is a dated historical description, not a confirmed 2026 headcount.",
    sizePeriod: "December 2021 team milestone",
    expansion:
      "Natalie Tudor joined as office manager in December 2021 following reported growth. No later quantified expansion found.",
    expansionEvidence: "Dated event",
    innovation:
      "A dated April 2020 update introduced an online appointment calendar. This is a booking/process improvement, not pest-detection technology.",
    tags: ["Digital booking"],
    assessment:
      "A documented small-business capacity step, with older milestones clearly separated from current scale.",
    sources: [
      source(
        "Team milestone and online-booking update",
        "https://acdpestcontrol.co.uk/about-us/",
        "2020/2021 events on current page",
      ),
      source("Current operations", "https://acdpestcontrol.co.uk/"),
    ],
  },
  {
    id: "somerset-solutions",
    name: "Somerset Pest Solutions",
    group: "Company describes private ownership",
    footprint: "Local",
    regions: ["South West"],
    coverage:
      "Nailsea and North Somerset; estate agents, local authorities and domestic clients.",
    size: "About page describes a two-person team. Its 'past nine years' wording appears older than the current site, so the team figure is treated as historical/undated, not verified current staff.",
    sizePeriod:
      "Undated legacy about page; current homepage checked October 2026",
    expansion: noExpansion,
    expansionEvidence: "Not verified",
    innovation:
      "Combines pest services with contaminated-area and loft clearance. No distinct new monitoring or treatment technology established.",
    tags: ["Tailored prevention"],
    assessment:
      "Local client relationships and clearance work are documented; neither establishes a new growth trajectory.",
    sources: [
      source(
        "Legacy team-size statement",
        "https://www.somersetpestsolutions.co.uk/about-us/",
      ),
      source(
        "Current service area",
        "https://www.somersetpestsolutions.co.uk/",
      ),
    ],
  },
  {
    id: "tim-slator",
    name: "Tim Slator & Co",
    group: "Tim Slator, sole trader (company statement)",
    footprint: "Local",
    regions: ["South West"],
    coverage:
      "South West proprietor/associate network; the site lists associated contractors in West, Mid and East Devon and Somerset. Confirm job locations directly.",
    size: "Company explicitly identifies the proprietor as a sole trader. The 20 staff mentioned on its site belonged to the previous Valley Pest Control business, not this operation.",
    sizePeriod: undated,
    expansion:
      "Describes forming a new sole-trader operation after selling Valley Pest Control. No current expansion programme established.",
    expansionEvidence: "Not verified",
    innovation:
      "Specialist bird-proofing work and support for smaller operators. No proprietary technology or measured innovation programme established.",
    tags: ["Bird management", "Proofing"],
    assessment:
      "The historical employer's workforce is excluded to avoid overstating the size of the present business.",
    sources: [
      source(
        "Proprietor and former-company distinction",
        "https://www.timslatorandco.co.uk/",
      ),
      source(
        "South West associate service areas",
        "https://www.timslatorandco.co.uk/associates/",
      ),
    ],
  },
  {
    id: "merlin",
    name: "Merlin Environmental",
    group: "Company describes family ownership",
    footprint: "National",
    regions: [...regions],
    coverage:
      "London-based specialist offering UK-wide commercial service, particularly accommodation and hospitality.",
    size: "Current staff, dog-team count and turnover not established. Historical dog counts from older articles are not used as current capacity.",
    sizePeriod: "2026 company press release; older company factsheet",
    expansion:
      "Participation in PestEx 2026 demonstrates current market activity, not a quantified expansion programme.",
    expansionEvidence: "Not verified",
    innovation:
      "Dedicated bed bug detection dogs and heat treatment are documented; live canine demonstrations were announced for PestEx 2026. Vendor claims about speed and accuracy are not independently validated here.",
    tags: ["Canine detection", "Heat treatment"],
    assessment:
      "A specialist comparator for detection-led hospitality work. Marketing descriptions such as 'largest' are not adopted as rankings.",
    sources: [
      source(
        "Company PestEx announcement",
        "https://pestex.org/news/page-5/merlin-environmental-returns-to-pestex-2026-/279512",
        "22 February 2026",
      ),
      source(
        "Company bed bug methods and London base",
        "https://merlinenvironmental.co.uk/wp-content/uploads/2019/03/Merlin_Fact-Sheet_Bed-Bugs.pdf",
        "Legacy factsheet",
      ),
    ],
  },
  {
    id: "de-pest",
    name: "De-Pest",
    group: "Related property-care business: ROTS-UK (company statement)",
    footprint: "Regional",
    regions: ["South East", "South West"],
    coverage: "Southampton, New Forest, Hampshire and Dorset.",
    size: noSize,
    sizePeriod: undated,
    expansion: noExpansion,
    expansionEvidence: "Not verified",
    innovation:
      "Combines pest work, contaminated-loft restoration and timber/damp services through a sister company. The advertised Boracol conservation treatment relates to property care, not a new rodent-control technology.",
    tags: ["Proofing", "Property restoration"],
    assessment:
      "A property-remediation competitor with cross-service capability; guarantee claims should be checked against the particular service.",
    sources: [
      source("Services and related business", "https://de-pest.co.uk/"),
      source("Explicit county coverage", "https://de-pest.co.uk/contact/"),
    ],
  },
  {
    id: "pest-tech",
    name: "Pest-Tech",
    group: "Nightshift / Tyro Group (acquired brand)",
    footprint: "Regional",
    regions: ["South East"],
    coverage:
      "Maidstone and Kent. Retained website supports an acquired brand now operating under Nightshift.",
    size: noSize,
    sizePeriod: "October 2025 acquisition; current site",
    expansion: "Nightshift reports acquiring Pest-Tech in October 2025.",
    expansionEvidence: "Dated event",
    innovation:
      "Drain diagnostics, rodent entry prevention and specialist bird/solar-panel proofing are documented.",
    tags: ["Drain diagnostics", "Proofing", "Bird management"],
    assessment:
      "Included for local brand visibility; not counted as a separate independent parent from Nightshift.",
    sources: [
      source("Pest-Tech services and Kent base", "https://pest-tech.org/"),
      nightshiftAcquisitions,
    ],
  },
  {
    id: "multi-pest",
    name: "Multi Pest",
    group: "Nightshift / Tyro Group (acquired brand)",
    footprint: "Regional",
    regions: ["London"],
    coverage:
      "Retained website includes Northwood and surrounding London-border service areas; wider Hertfordshire locations are outside this report's boundary.",
    size: noSize,
    sizePeriod: "December 2025 acquisition; retained legacy website",
    expansion: "Nightshift reports acquiring Multi Pest in December 2025.",
    expansionEvidence: "Dated event",
    innovation:
      "Website lists digital pest management and year-round commercial servicing; the acquiring company describes retail/hospitality proofing and clearance capabilities.",
    tags: ["Digital monitoring", "Proofing"],
    assessment:
      "An acquired trading identity; retained website information may lag group integration.",
    sources: [
      source("Retained services and coverage", "https://www.multipest.co.uk/"),
      nightshiftAcquisitions,
    ],
  },
];

export const methodology = [
  "Scope: London, South East and South West England. This covers the southern English regions, including Bristol, Gloucestershire, Wiltshire, Dorset, Somerset, Devon and Cornwall. East of England and the Midlands are outside the boundary, although an included provider may also operate there. Region tags indicate evidenced operations in at least part of that region, not universal postcode coverage.",
  "Coverage limitation: this is a broad review of identified operators and trading brands, not a complete census of every company, franchise territory or sole trader. No complete operating register was established. The NPTA directory lists only members who opt in; legal registration or an SEO location page alone is not proof of current delivery capacity. Additional local operators will exist, including on islands and in rural areas.",
  "Inclusion: national operators with evidenced southern activity, regional firms, local specialists and identifiable acquired brands. The final set is purposive, not a statistical sample. Local council in-house teams, product-only suppliers, businesses without confirmed in-scope coverage and every separate franchise territory are not profiled.",
  "Size: use the actual measure available — employees, technicians, franchisees, vans, customers, office claims or turnover — and state its geographic and time perimeter. These units are not interchangeable. No southern revenue estimates, invented staff bands, market shares or unsupported rankings are supplied. Undisclosed does not mean small.",
  "Expansion: separate dated completed events from undated marketing, recruitment intent and existing coverage. Dated event can include an acquisition, rebrand or historical team milestone; it does not automatically mean recent organic growth. Not verified means no qualifying evidence was found in the sources reviewed, not that a business has not grown.",
  "Innovation: record a specific advertised product, technique or service process. Established methods such as heat, proofing and canine detection are capabilities, not necessarily new inventions. AI, sustainability, accuracy, speed and savings claims remain company claims unless explicitly independently evidenced; no comparative efficacy testing was performed.",
  "Sources: primary company/group pages, public filings and trade/association material; secondary partner or registry aggregators are identified where used. Every linked source was reviewed for this edition on 28 October 2026. Undated pages may contain legacy content; historical dates and inconsistencies are retained rather than silently treated as current facts. No company was contacted for confirmation.",
  "Ownership: group affiliation is recorded where a parent portfolio, filing or acquisition announcement supports it. Not established is deliberately used instead of assuming independence. Shared brands, subsidiaries and networks are not additive independent competitors. This is a point-in-time research snapshot, not a live register or an automatic update service.",
];

export const researchSources = [
  source(
    "NPTA directory and its opt-in limitation",
    "https://www.npta.org.uk/find-pest-controller-near-me/",
  ),
  tyro,
  orkin,
  source(
    "Pest Control Partnership's strategy",
    "https://www.pestcontrolpartnership.com/",
  ),
  source(
    "Nurture acquisition history",
    "https://www.nurture-group.co.uk/about/acquisitions/",
  ),
  ocsAcquisition,
];

export const findings = [
  {
    title: "Count ownership, not logos",
    text: "Tyro and Orkin each operate multiple familiar brands; Nurture, Pest Control Partnership and OCS add further consolidation paths. A long shortlist can contain several businesses with shared ownership. Check parent relationships before treating bids as independent alternatives.",
    ids: ["vergo", "beaver", "nurture", "cleankill", "monitor"],
  },
  {
    title: "Size is measured in different units",
    text: "Rentokil publishes global category revenue; JG gives UK staff and annual jobs; Beaver has a historical workforce snapshot; Pestforce describes franchisees and vans. Many local firms publish no headcount. A credible league table cannot be built by mixing these numbers.",
    ids: ["rentokil", "jg", "beaver", "pestforce", "cotswold"],
  },
  {
    title: "Connected monitoring is a documented offer",
    text: "Rentokil, Ecolab and Vergo advertise connected monitoring, analytics or AI-assisted detection. Nightshift describes a pilot. This establishes a procurement option, not a proven universal reduction in visits, chemical use or cost. Ask for deployment evidence and site-specific outcomes.",
    ids: ["rentokil", "ecolab", "vergo", "nightshift"],
  },
  {
    title: "Prevention and specialist delivery remain relevant",
    text: "Pestology and Inoculand emphasise exclusion and diagnostics; Merlin documents canine detection and heat; NBC and Eco focus on difficult bird-management work. Operational fit and the cause of the infestation can matter more than national scale. This is an analyst inference from the stated capabilities.",
    ids: ["pestology", "inoculand", "merlin", "nbc", "eco"],
  },
];

export const implications = [
  "For Pestology: articulate the diagnostic and building-proofing scope with before/after evidence, entry-point findings and clear guarantee terms. Several competitors describe prevention, so the word alone is not a unique differentiator.",
  "For expansion planning: distinguish a new advertised postcode from local capacity. Look for route density, repeat-visit capacity, qualified recruitment and documented contract retention before assuming a territory can be served profitably. The reviewed evidence does not establish an undersupplied county or a market-size estimate.",
  "For innovation: prioritise customer-visible documentation and measurable outcomes. Consider connected monitoring where the site and contract justify it; validate alert quality, response workflow and total cost rather than copying an AI claim. This is analysis, not a recommendation of a particular vendor.",
  "For supplier comparison: request current staff and service-area figures, direct versus subcontracted delivery, proofing exclusions, sample reports and two comparable references. Confirm who contracts with you when a franchise or acquired brand is involved.",
];

export const innovationThemes = [
  {
    title: "Connected monitoring",
    description:
      "Sensors, AI-assisted identification and customer portals are documented commercial offerings. A product page establishes availability, not proven savings or equal adoption across every site.",
    ids: ["rentokil", "ecolab", "vergo", "nightshift"],
  },
  {
    title: "Building diagnosis & exclusion",
    description:
      "CCTV drainage surveys and structural proofing address entry routes. These are established practical methods; the scope of the investigation and quality of repairs determine the proposition.",
    ids: ["pestology", "inoculand", "sankeys", "abate"],
  },
  {
    title: "Specialist detection & treatment",
    description:
      "Detection dogs, controlled heat and site-specific bird deterrents expand the available toolkit. Match the method to the pest and environment; company claims are not comparative efficacy evidence.",
    ids: ["merlin", "jg", "nbc", "eco"],
  },
  {
    title: "How the service is delivered",
    description:
      "Franchise coordination, electric vehicles, accessible communication and digital booking show that innovation also happens in operations. The benefit and scale need their own evidence.",
    ids: ["pestforce", "diamond", "greenrock", "acd"],
  },
];

export const expansionTimeline = [
  {
    date: "2021–23",
    title: "Nurture builds a pest platform",
    text: "Rokill followed by Alpha, Enserve, Pest Pro and Midland Pest Control.",
    id: "nurture",
  },
  {
    date: "March 2024",
    title: "OCS acquires Abate and Monitor",
    text: "A dated addition of sector coverage and specialist capability.",
    id: "monitor",
  },
  {
    date: "July 2024",
    title: "Cleankill joins a wider partnership",
    text: "Registry control changes to Pest Control Partnership from 8 July.",
    id: "cleankill",
  },
  {
    date: "October 2024",
    title: "Beaver acquired by Rollins",
    text: "The transaction strengthens Orkin's London and South East footprint.",
    id: "beaver",
  },
  {
    date: "October–December 2025",
    title: "Nightshift adds two specialists",
    text: "Pest-Tech and Multi Pest acquisitions are reported by the company.",
    id: "nightshift",
  },
  {
    date: "October 2026",
    title: "A current UK growth signal",
    text: "Rentokil reports 9.2% Q3 UK core Pest organic revenue growth. This is company performance, not market growth.",
    id: "rentokil",
  },
];

export function getReportMarkdown(): string {
  const lines = [
    `# ${REPORT_TITLE}`,
    `Research edition: ${REPORT_DATE}`,
    "",
    `## Scope`,
    `A sourced review of ${operators.length} identified operators and trading brands across London, the South East and the South West. Not an exhaustive census or a ranking.`,
    "",
    "## Executive findings",
    ...findings.flatMap((f) => [
      `### ${f.title}`,
      f.text,
      `Evidence: ${f.ids
        .map((id) => {
          const op = operators.find((o) => o.id === id)!;
          return `[${op.name}](#${op.id})`;
        })
        .join(", ")}`,
      "",
    ]),
    "## Service-footprint chart data",
    "Profile counts in this review only, not market shares or independent-parent counts.",
    ...["National", "Regional", "Local"].map(
      (label) =>
        `- ${label}: ${operators.filter((o) => o.footprint === label).length} profiles`,
    ),
    "## Expansion signals",
    ...expansionTimeline.flatMap((event) => [
      `### ${event.date}: ${event.title}`,
      event.text,
      `[Company evidence](#${event.id})`,
      "",
    ]),
    "## Innovation themes",
    ...innovationThemes.flatMap((theme) => [
      `### ${theme.title}`,
      theme.description,
      `Evidence: ${theme.ids
        .map((id) => {
          const op = operators.find((o) => o.id === id)!;
          return `[${op.name}](#${op.id})`;
        })
        .join(", ")}`,
      "",
    ]),
    "## Company review",
    ...operators.flatMap((o) => [
      `<a id="${o.id}"></a>`,
      `### ${o.name}`,
      `Group / ownership: ${o.group}`,
      `Footprint: ${o.footprint}; regions: ${o.regions.join(", ")}`,
      `Coverage: ${o.coverage}`,
      "",
      `**Size:** ${o.size}`,
      `Size evidence period: ${o.sizePeriod}`,
      "",
      `**Expansion (${o.expansionEvidence.toLowerCase()}):** ${o.expansion}`,
      "",
      `**Innovation / capabilities:** ${o.innovation}`,
      `Themes: ${o.tags.join(", ")}`,
      "",
      `**Analyst assessment:** ${o.assessment}`,
      "Sources:",
      ...o.sources.map(
        (s) =>
          `- [${s.title}](${s.url})${s.date ? ` — ${s.date}` : " — undated unless shown on source"}`,
      ),
      "",
    ]),
    "## Implications and procurement questions",
    ...implications.map((t) => `- ${t}`),
    "",
    "## Methodology and limitations",
    ...methodology.map((t) => `- ${t}`),
    "",
    "## Background sources",
    ...researchSources.map((s) => `- [${s.title}](${s.url})`),
    "",
    "All source review dates: 28 October 2026. Published dates, where available, are recorded separately. The report is a static edition and requires a new review to stay current.",
  ];
  return lines.join("\n\n");
}
