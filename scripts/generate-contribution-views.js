const path = require("node:path");
const sharp = require("sharp");

const WIDTH = 1736;
const HEIGHT = 906;
const OUTPUT_DIR = path.join(
  __dirname,
  "..",
  "content",
  "blog",
  "open-source-fortnight-july-13-24-2026"
);

// Snapshot from GitHub GraphQL contributionsCalendar for vinitkumar.
// Query window: 2026-07-13 through 2026-07-24, inclusive.
const contributions = [
  { date: "2026-07-13", day: "Mon", count: 8, level: "FIRST_QUARTILE" },
  { date: "2026-07-14", day: "Tue", count: 2, level: "FIRST_QUARTILE" },
  { date: "2026-07-15", day: "Wed", count: 6, level: "FIRST_QUARTILE" },
  { date: "2026-07-16", day: "Thu", count: 8, level: "FIRST_QUARTILE" },
  { date: "2026-07-17", day: "Fri", count: 5, level: "FIRST_QUARTILE" },
  { date: "2026-07-18", day: "Sat", count: 2, level: "FIRST_QUARTILE" },
  { date: "2026-07-19", day: "Sun", count: 9, level: "FIRST_QUARTILE" },
  { date: "2026-07-20", day: "Mon", count: 17, level: "SECOND_QUARTILE" },
  { date: "2026-07-21", day: "Tue", count: 2, level: "FIRST_QUARTILE" },
  { date: "2026-07-22", day: "Wed", count: 3, level: "FIRST_QUARTILE" },
  { date: "2026-07-23", day: "Thu", count: 37, level: "FOURTH_QUARTILE" },
  { date: "2026-07-24", day: "Fri", count: 4, level: "FIRST_QUARTILE" },
];

// GitHub's dark contribution palette. Levels come directly from the API snapshot.
const COLORS = {
  NONE: "#161b22",
  FIRST_QUARTILE: "#0e4429",
  SECOND_QUARTILE: "#006d32",
  THIRD_QUARTILE: "#26a641",
  FOURTH_QUARTILE: "#39d353",
};

const total = contributions.reduce((sum, item) => sum + item.count, 0);

function xml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function formatDate(date) {
  const [, month, day] = date.split("-");
  return `${month === "07" ? "Jul" : month} ${Number(day)}`;
}

function svgFrame(content, accessibleTitle, accessibleDescription) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-labelledby="title desc">
  <title id="title">${xml(accessibleTitle)}</title>
  <desc id="desc">${xml(accessibleDescription)}</desc>
  <defs>
    <linearGradient id="background" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#050910"/>
      <stop offset="100%" stop-color="#0b1119"/>
    </linearGradient>
    <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="7" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#background)"/>
  ${content}
</svg>`;
}

function header(viewLabel, subtitle) {
  return `
  <text x="80" y="72" fill="#7ee787" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="20" font-weight="700" letter-spacing="3">ACTUAL GITHUB CONTRIBUTIONS</text>
  <text x="80" y="134" fill="#f0f6fc" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="50" font-weight="750">${xml(viewLabel)}</text>
  <text x="80" y="177" fill="#8b949e" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="23">${xml(subtitle)}</text>
  <text x="1656" y="92" text-anchor="end" fill="#f0f6fc" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="29" font-weight="700">${total} contributions</text>
  <text x="1656" y="130" text-anchor="end" fill="#8b949e" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="19">vinitkumar · Jul 13–24, 2026</text>`;
}

function legend(y) {
  const items = [
    ["NONE", "0"],
    ["FIRST_QUARTILE", "Q1"],
    ["SECOND_QUARTILE", "Q2"],
    ["THIRD_QUARTILE", "Q3"],
    ["FOURTH_QUARTILE", "Q4"],
  ];

  return `
  <g transform="translate(80 ${y})">
    <text x="0" y="18" fill="#8b949e" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="17">GitHub contribution level</text>
    ${items
      .map(
        ([level, label], index) => `
    <rect x="${225 + index * 93}" y="0" width="28" height="28" rx="5" fill="${COLORS[level]}" stroke="#30363d"/>
    <text x="${261 + index * 93}" y="20" fill="#c9d1d9" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="16">${label}</text>`
      )
      .join("")}
    <text x="1576" y="18" text-anchor="end" fill="#6e7681" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="15">Source: GitHub GraphQL contributionsCalendar</text>
  </g>`;
}

function topViewSvg() {
  const cellWidth = 205;
  const cellHeight = 218;
  const gapX = 18;
  const gapY = 24;
  const startX = 84;
  const startY = 235;
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const dayHeaders = days
    .map(
      (day, index) => `
  <text x="${startX + index * (cellWidth + gapX) + cellWidth / 2}" y="${startY - 24}" text-anchor="middle" fill="#8b949e" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="17" font-weight="650">${day}</text>`
    )
    .join("");

  const cells = [];
  for (let week = 0; week < 2; week += 1) {
    for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
      const dataIndex = week * 7 + dayIndex;
      const item = contributions[dataIndex];
      const x = startX + dayIndex * (cellWidth + gapX);
      const y = startY + week * (cellHeight + gapY);

      if (!item) {
        cells.push(`
  <g transform="translate(${x} ${y})">
    <rect width="${cellWidth}" height="${cellHeight}" rx="16" fill="#0d1117" stroke="#21262d" stroke-width="2" stroke-dasharray="8 8"/>
    <text x="${cellWidth / 2}" y="${cellHeight / 2}" text-anchor="middle" fill="#484f58" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="18">Outside range</text>
  </g>`);
        continue;
      }

      const fill = COLORS[item.level];
      cells.push(`
  <g transform="translate(${x} ${y})">
    <rect width="${cellWidth}" height="${cellHeight}" rx="16" fill="#0d1117" stroke="#30363d" stroke-width="2"/>
    <text x="18" y="31" fill="#8b949e" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="16">${formatDate(item.date)}</text>
    <rect x="18" y="48" width="${cellWidth - 36}" height="126" rx="12" fill="${fill}" stroke="#6e7681" stroke-opacity=".35"/>
    <text x="${cellWidth / 2}" y="132" text-anchor="middle" fill="#f0f6fc" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="52" font-weight="750">${item.count}</text>
    <text x="${cellWidth / 2}" y="201" text-anchor="middle" fill="#8b949e" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="15">contributions</text>
  </g>`);
    }
  }

  const content = `
  ${header("July 13–24 · Top View", "Two calendar rows. Every tile shows the exact daily count and GitHub level.")}
  ${dayHeaders}
  ${cells.join("")}
  ${legend(810)}`;

  return svgFrame(
    content,
    "GitHub contributions from July 13 through July 24, 2026, top view",
    `A two-row calendar grid showing ${total} actual GitHub contributions. Daily counts are 8, 2, 6, 8, 5, 2, 9, 17, 2, 3, 37, and 4.`
  );
}

function darken(hex, factor) {
  const value = Number.parseInt(hex.slice(1), 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;
  const scale = (channel) => Math.max(0, Math.min(255, Math.round(channel * factor)));
  return `#${[scale(red), scale(green), scale(blue)]
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("")}`;
}

function lighten(hex, amount) {
  const value = Number.parseInt(hex.slice(1), 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;
  const mix = (channel) => Math.round(channel + (255 - channel) * amount);
  return `#${[mix(red), mix(green), mix(blue)]
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("")}`;
}

function sideViewSvg() {
  const startX = 94;
  const baseline = 712;
  const spacing = 130;
  const blockWidth = 72;
  const blockHeight = 12;
  const depth = 13;

  const perspectiveGrid = Array.from({ length: 8 }, (_, index) => {
    const y = baseline + 24 + index * 18;
    return `<line x1="56" y1="${y}" x2="1680" y2="${y}" stroke="#21262d" stroke-width="1"/>`;
  }).join("");

  const buildings = contributions
    .map((item, index) => {
      const x = startX + index * spacing;
      const baseColor = COLORS[item.level];
      const frontColor = darken(baseColor, 0.82);
      const sideColor = darken(baseColor, 0.58);
      const topColor = lighten(baseColor, 0.18);
      const buildingHeight = item.count * blockHeight;
      const topY = baseline - buildingHeight;

      const floors = Array.from({ length: item.count }, (_, floorIndex) => {
        const y = baseline - (floorIndex + 1) * blockHeight;
        return `
      <rect x="${x}" y="${y}" width="${blockWidth}" height="${blockHeight - 2}" rx="1.5" fill="${frontColor}" stroke="${baseColor}" stroke-width="1"/>
      <polygon points="${x + blockWidth},${y} ${x + blockWidth + depth},${y - depth / 2} ${x + blockWidth + depth},${y + blockHeight - 2 - depth / 2} ${x + blockWidth},${y + blockHeight - 2}" fill="${sideColor}" stroke="${baseColor}" stroke-opacity=".55" stroke-width="1"/>`;
      }).join("");

      return `
  <g>
    <ellipse cx="${x + blockWidth / 2}" cy="${baseline + 4}" rx="${blockWidth * 0.72}" ry="12" fill="${baseColor}" opacity=".16" filter="url(#softGlow)"/>
    ${floors}
    <polygon points="${x},${topY} ${x + depth},${topY - depth / 2} ${x + blockWidth + depth},${topY - depth / 2} ${x + blockWidth},${topY}" fill="${topColor}" stroke="${baseColor}" stroke-width="1.5"/>
    <text x="${x + blockWidth / 2}" y="${Math.max(225, topY - 24)}" text-anchor="middle" fill="#f0f6fc" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="22" font-weight="750">${item.count}</text>
    <text x="${x + blockWidth / 2}" y="${baseline + 40}" text-anchor="middle" fill="#c9d1d9" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="16" font-weight="650">${item.day}</text>
    <text x="${x + blockWidth / 2}" y="${baseline + 63}" text-anchor="middle" fill="#6e7681" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="14">${formatDate(item.date)}</text>
  </g>`;
    })
    .join("");

  const content = `
  ${header("July 13–24 · Side View", "One stacked block equals one contribution. Building height is the exact daily count.")}
  <line x1="56" y1="${baseline}" x2="1680" y2="${baseline}" stroke="#30363d" stroke-width="2"/>
  ${perspectiveGrid}
  ${buildings}
  ${legend(842)}`;

  return svgFrame(
    content,
    "GitHub contributions from July 13 through July 24, 2026, side view",
    `A skyline with one building per day and one block per contribution. The tallest building is July 23 with 37 contributions. The total is ${total}.`
  );
}

async function render(svg, filename) {
  await sharp(Buffer.from(svg))
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(OUTPUT_DIR, filename));
}

async function main() {
  await Promise.all([
    render(topViewSvg(), "github-contributions-top-view.png"),
    render(sideViewSvg(), "github-contributions-side-view.png"),
  ]);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
