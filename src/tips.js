import { marked } from 'marked';

// Tips are authored as plain text (for SportsYou pasting), so single newlines
// should render as line breaks rather than being collapsed into one paragraph.
marked.setOptions({ breaks: true });

// Eagerly read every weekly tip markdown file as raw text.
const rawFiles = import.meta.glob('../weekly tips/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

/**
 * Parse a single raw tip file into structured data.
 * Source format:
 *   # Week N — Title
 *   - Suggested post date: ...
 *   - Ties to: ...
 *   - Note: ...
 *   ---
 *   <body to publish>
 */
function parseTip(path, raw) {
  const slug = path.split('/').pop().replace(/\.md$/, '');
  const weekMatch = slug.match(/^week-(\d+)/);
  const week = weekMatch ? parseInt(weekMatch[1], 10) : 0;

  const headingMatch = raw.match(/^#\s+(.+)$/m);
  const title = headingMatch ? headingMatch[1].trim() : slug;

  const dateMatch = raw.match(/Suggested post date:\s*(.+)/i);
  const postDate = dateMatch ? dateMatch[1].trim() : '';

  // Body is everything after the first standalone `---` separator.
  const parts = raw.split(/\n-{3,}\s*\n/);
  const body = (parts.length > 1 ? parts.slice(1).join('\n---\n') : raw).trim();

  return { slug, week, title, postDate, bodyHtml: marked.parse(body) };
}

const tips = Object.entries(rawFiles)
  .map(([path, raw]) => parseTip(path, raw))
  .sort((a, b) => a.week - b.week);

export function getTips() {
  return tips;
}
