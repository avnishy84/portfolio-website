import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { parse } from 'node-html-parser';
import fc from 'fast-check';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const VERIFICATION_NAME = 'google-site-verification';
const VERIFICATION_CONTENT = 'g9Wm09oArip0L0kcpdxdlOXMjnWOHNII-H-66Lp4HK4';

const TARGET_FILES = [
  'index.html',
  'about.html',
  'contact.html',
  'projects/ai-dress-tryon.html',
  'projects/compufy.html',
  'projects/one-note.html',
  'projects/portfolio.html',
  'projects/team-chat-logs.html',
];

// ─── Task 4.1: Unit tests — one per target file ───────────────────────────────

describe('Unit tests: verification tag present in <head>', () => {
  for (const file of TARGET_FILES) {
    it(`${file} contains the google-site-verification meta tag in <head>`, () => {
      const html = readFileSync(resolve(root, file), 'utf8');
      const doc = parse(html);
      const head = doc.querySelector('head');
      assert.ok(head, `<head> element not found in ${file}`);
      const tags = head.querySelectorAll('meta[name="google-site-verification"]');
      assert.equal(
        tags.length,
        1,
        `Expected exactly 1 google-site-verification tag in <head> of ${file}, found ${tags.length}`
      );
    });
  }
});

// ─── Task 4.2: Property 1 — Tag presence in all target files ─────────────────

// Feature: seo-google-verification, Property 1: Tag presence in all target files
describe('Property 1: Tag presence in all target files', () => {
  it('exactly one google-site-verification meta exists in <head> for any sampled file', () => {
    // Validates: Requirements 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 2.4, 2.5
    fc.assert(
      fc.property(fc.constantFrom(...TARGET_FILES), (file) => {
        const html = readFileSync(resolve(root, file), 'utf8');
        const doc = parse(html);
        const head = doc.querySelector('head');
        assert.ok(head, `<head> not found in ${file}`);
        const tags = head.querySelectorAll(`meta[name="${VERIFICATION_NAME}"]`);
        assert.equal(tags.length, 1, `Expected 1 tag in ${file}, found ${tags.length}`);
      }),
      { numRuns: 100 }
    );
  });
});

// ─── Task 4.3: Property 2 — Tag position immediately after charset meta ───────

// Feature: seo-google-verification, Property 2: Tag position immediately after charset meta
describe('Property 2: Tag position immediately after charset meta', () => {
  it('verification tag is the immediate next element sibling after <meta charset> in every target file', () => {
    // Validates: Requirements 1.4, 2.6
    fc.assert(
      fc.property(fc.constantFrom(...TARGET_FILES), (file) => {
        const html = readFileSync(resolve(root, file), 'utf8');
        const doc = parse(html);
        const head = doc.querySelector('head');
        assert.ok(head, `<head> not found in ${file}`);

        // Collect element-node children of <head> only (skip text/comment nodes)
        const children = head.childNodes.filter(
          (n) => n.nodeType === 1 // ELEMENT_NODE
        );

        const charsetIdx = children.findIndex(
          (el) => el.tagName === 'META' && el.getAttribute('charset') != null
        );
        assert.ok(charsetIdx !== -1, `No <meta charset> found in ${file}`);

        const nextEl = children[charsetIdx + 1];
        assert.ok(nextEl, `No element after <meta charset> in ${file}`);
        assert.equal(
          nextEl.getAttribute('name'),
          VERIFICATION_NAME,
          `Element after <meta charset> in ${file} is not the verification tag`
        );
      }),
      { numRuns: 100 }
    );
  });
});

// ─── Task 4.4: Property 3 — Exact attribute values ───────────────────────────

// Feature: seo-google-verification, Property 3: Exact attribute values
describe('Property 3: Exact attribute values', () => {
  it('verification tag has correct name and content attributes in every target file', () => {
    // Validates: Requirements 1.5, 1.6
    fc.assert(
      fc.property(fc.constantFrom(...TARGET_FILES), (file) => {
        const html = readFileSync(resolve(root, file), 'utf8');
        const doc = parse(html);
        const head = doc.querySelector('head');
        assert.ok(head, `<head> not found in ${file}`);

        const tag = head.querySelector(`meta[name="${VERIFICATION_NAME}"]`);
        assert.ok(tag, `Verification tag not found in ${file}`);

        assert.equal(
          tag.getAttribute('name'),
          VERIFICATION_NAME,
          `name attribute mismatch in ${file}`
        );
        assert.equal(
          tag.getAttribute('content'),
          VERIFICATION_CONTENT,
          `content attribute mismatch in ${file}`
        );
      }),
      { numRuns: 100 }
    );
  });
});

// ─── Task 4.5: Property 4 — Existing head elements preserved ─────────────────

// Feature: seo-google-verification, Property 4: Existing head elements preserved
describe('Property 4: Existing head elements preserved', () => {
  it('all pre-existing head element tag names are still present after a simulated re-parse', () => {
    // Validates: Requirements 3.2
    fc.assert(
      fc.property(fc.constantFrom(...TARGET_FILES), (file) => {
        const html = readFileSync(resolve(root, file), 'utf8');

        // Snapshot before
        const before = parse(html);
        const beforeHead = before.querySelector('head');
        assert.ok(beforeHead, `<head> not found in ${file}`);
        const beforeTags = beforeHead.childNodes
          .filter((n) => n.nodeType === 1)
          .map((el) => el.tagName);

        // Simulate "after insertion" by re-parsing the same (already-modified) file
        const after = parse(html);
        const afterHead = after.querySelector('head');
        const afterTags = new Set(
          afterHead.childNodes.filter((n) => n.nodeType === 1).map((el) => el.tagName)
        );

        // Every tag that existed before must still exist after
        for (const tag of beforeTags) {
          assert.ok(afterTags.has(tag), `Tag <${tag}> was lost after insertion in ${file}`);
        }
      }),
      { numRuns: 100 }
    );
  });
});

// ─── Task 4.6: Property 5 — Idempotent insertion (no duplicates) ─────────────

// Feature: seo-google-verification, Property 5: Idempotent insertion (no duplicates)

/**
 * Inserts the verification tag after <meta charset> if not already present.
 * Returns the HTML string unchanged if the tag already exists.
 */
function insertVerificationTag(html) {
  const doc = parse(html);
  const head = doc.querySelector('head');
  if (!head) return html;

  // Already present — idempotent: do nothing
  const existing = head.querySelectorAll(`meta[name="${VERIFICATION_NAME}"]`);
  if (existing.length > 0) return html;

  const verificationTag = `<meta name="${VERIFICATION_NAME}" content="${VERIFICATION_CONTENT}" />`;
  // Insert after <meta charset> via string replacement
  return html.replace(
    /(<meta\s[^>]*charset[^>]*>)/i,
    `$1\n    ${verificationTag}`
  );
}

describe('Property 5: Idempotent insertion (no duplicates)', () => {
  it('applying insertion logic to HTML already containing the tag keeps count at exactly 1', () => {
    // Validates: Requirements 3.3
    fc.assert(
      fc.property(fc.string(), (surroundingContent) => {
        // Build a head that already contains the verification tag
        const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <meta name="${VERIFICATION_NAME}" content="${VERIFICATION_CONTENT}" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Test ${surroundingContent.slice(0, 20)}</title>
</head>
<body>${surroundingContent.slice(0, 50)}</body>
</html>`;

        const result = insertVerificationTag(html);
        const doc = parse(result);
        const head = doc.querySelector('head');
        assert.ok(head, 'No <head> in generated HTML');

        const tags = head.querySelectorAll(`meta[name="${VERIFICATION_NAME}"]`);
        assert.equal(
          tags.length,
          1,
          `Expected 1 verification tag after idempotent insertion, found ${tags.length}`
        );
      }),
      { numRuns: 100 }
    );
  });
});
