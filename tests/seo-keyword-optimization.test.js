import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { parse } from 'node-html-parser';
import fc from 'fast-check';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const BASE_URL = 'https://avnish-portfolio-c14e6.web.app';
const OG_IMAGE = 'https://avnish-portfolio-c14e6.web.app/images/avnish-transparent.png';

const TARGET_FILES = [
  'index.html',
  'about.html',
  'contact.html',
  'projects/compufy.html',
  'projects/one-note.html',
  'projects/team-chat-logs.html',
  'projects/portfolio.html',
  'projects/ai-dress-tryon.html',
];

const PROJECT_FILES = [
  'projects/compufy.html',
  'projects/one-note.html',
  'projects/team-chat-logs.html',
  'projects/portfolio.html',
  'projects/ai-dress-tryon.html',
];

// ─── Task 9: Unit tests ───────────────────────────────────────────────────────

describe('Unit tests: exact title values', () => {
  it('index.html title equals "Avnish Yadav — Software Engineer & Full-Stack Developer"', () => {
    // Requirements: 1.1
    const html = readFileSync(resolve(root, 'index.html'), 'utf8');
    const doc = parse(html);
    const title = doc.querySelector('title');
    assert.ok(title, '<title> not found in index.html');
    assert.equal(
      title.text,
      'Avnish Yadav — Software Engineer & Full-Stack Developer',
      `index.html title mismatch: got "${title.text}"`
    );
  });

  it('about.html title equals "About Avnish Yadav — Software Engineer & Developer"', () => {
    // Requirements: 1.2
    const html = readFileSync(resolve(root, 'about.html'), 'utf8');
    const doc = parse(html);
    const title = doc.querySelector('title');
    assert.ok(title, '<title> not found in about.html');
    assert.equal(
      title.text,
      'About Avnish Yadav — Software Engineer & Developer',
      `about.html title mismatch: got "${title.text}"`
    );
  });

  it('contact.html title equals "Contact Avnish Yadav — Software Engineer Portfolio"', () => {
    // Requirements: 1.3
    const html = readFileSync(resolve(root, 'contact.html'), 'utf8');
    const doc = parse(html);
    const title = doc.querySelector('title');
    assert.ok(title, '<title> not found in contact.html');
    assert.equal(
      title.text,
      'Contact Avnish Yadav — Software Engineer Portfolio',
      `contact.html title mismatch: got "${title.text}"`
    );
  });
});

describe('Unit tests: meta description keywords', () => {
  it('index.html meta description contains "Avnish Yadav" and "Software Engineer"', () => {
    // Requirements: 2.2
    const html = readFileSync(resolve(root, 'index.html'), 'utf8');
    const doc = parse(html);
    const head = doc.querySelector('head');
    const desc = head.querySelector('meta[name="description"]');
    assert.ok(desc, 'meta[name="description"] not found in index.html');
    const content = desc.getAttribute('content');
    assert.ok(
      content.includes('Avnish Yadav'),
      `index.html description does not contain "Avnish Yadav": "${content}"`
    );
    assert.ok(
      content.includes('Software Engineer'),
      `index.html description does not contain "Software Engineer": "${content}"`
    );
  });
});

describe('Unit tests: Open Graph type', () => {
  it('index.html og:type equals "website"', () => {
    // Requirements: 3.2
    const html = readFileSync(resolve(root, 'index.html'), 'utf8');
    const doc = parse(html);
    const head = doc.querySelector('head');
    const ogType = head.querySelector('meta[property="og:type"]');
    assert.ok(ogType, 'meta[property="og:type"] not found in index.html');
    assert.equal(
      ogType.getAttribute('content'),
      'website',
      `index.html og:type mismatch: got "${ogType.getAttribute('content')}"`
    );
  });
});

describe('Unit tests: canonical URL', () => {
  it('index.html canonical href equals "https://avnish-portfolio-c14e6.web.app/"', () => {
    // Requirements: 5.3
    const html = readFileSync(resolve(root, 'index.html'), 'utf8');
    const doc = parse(html);
    const head = doc.querySelector('head');
    const canonical = head.querySelector('link[rel="canonical"]');
    assert.ok(canonical, 'link[rel="canonical"] not found in index.html');
    assert.equal(
      canonical.getAttribute('href'),
      'https://avnish-portfolio-c14e6.web.app/',
      `index.html canonical href mismatch: got "${canonical.getAttribute('href')}"`
    );
  });
});

describe('Unit tests: JSON-LD schemas', () => {
  it('index.html Person schema has correct @type, name, url, jobTitle, sameAs, and knowsAbout', () => {
    // Requirements: 6.1–6.7
    const html = readFileSync(resolve(root, 'index.html'), 'utf8');
    const doc = parse(html);
    const scripts = doc.querySelectorAll('script[type="application/ld+json"]');
    assert.ok(scripts.length > 0, 'No application/ld+json scripts found in index.html');

    let person = null;
    for (const script of scripts) {
      const data = JSON.parse(script.text);
      if (data['@type'] === 'Person') { person = data; break; }
    }
    assert.ok(person, 'No Person schema found in index.html JSON-LD scripts');

    assert.equal(person['@type'], 'Person', 'Person schema @type mismatch');
    assert.equal(person.name, 'Avnish Yadav', `Person schema name mismatch: got "${person.name}"`);
    assert.equal(
      person.url,
      'https://avnish-portfolio-c14e6.web.app/',
      `Person schema url mismatch: got "${person.url}"`
    );
    assert.equal(
      person.jobTitle,
      'Software Engineer',
      `Person schema jobTitle mismatch: got "${person.jobTitle}"`
    );

    assert.ok(Array.isArray(person.sameAs), 'Person schema sameAs is not an array');
    const hasLinkedIn = person.sameAs.some((url) => url.includes('linkedin.com'));
    const hasGitHub = person.sameAs.some((url) => url.includes('github.com'));
    assert.ok(hasLinkedIn, `Person schema sameAs missing LinkedIn URL: ${JSON.stringify(person.sameAs)}`);
    assert.ok(hasGitHub, `Person schema sameAs missing GitHub URL: ${JSON.stringify(person.sameAs)}`);

    assert.ok(Array.isArray(person.knowsAbout), 'Person schema knowsAbout is not an array');
    assert.ok(
      person.knowsAbout.length >= 5,
      `Person schema knowsAbout must have ≥5 skills, got ${person.knowsAbout.length}`
    );
  });

  it('index.html WebSite schema has correct @type, name, url, and author.name', () => {
    // Requirements: 7.1–7.5
    const html = readFileSync(resolve(root, 'index.html'), 'utf8');
    const doc = parse(html);
    const scripts = doc.querySelectorAll('script[type="application/ld+json"]');
    assert.ok(scripts.length > 0, 'No application/ld+json scripts found in index.html');

    let website = null;
    for (const script of scripts) {
      const data = JSON.parse(script.text);
      if (data['@type'] === 'WebSite') { website = data; break; }
    }
    assert.ok(website, 'No WebSite schema found in index.html JSON-LD scripts');

    assert.equal(website['@type'], 'WebSite', 'WebSite schema @type mismatch');
    assert.ok(
      typeof website.name === 'string' && website.name.length > 0,
      `WebSite schema name is missing or empty: got "${website.name}"`
    );
    assert.equal(
      website.url,
      'https://avnish-portfolio-c14e6.web.app/',
      `WebSite schema url mismatch: got "${website.url}"`
    );
    assert.ok(website.author, 'WebSite schema author is missing');
    assert.equal(
      website.author.name,
      'Avnish Yadav',
      `WebSite schema author.name mismatch: got "${website.author.name}"`
    );
  });
});

describe('Unit tests: semantic HTML on index.html', () => {
  it('index.html <h1> contains "Avnish Yadav"', () => {
    // Requirements: 8.1
    const html = readFileSync(resolve(root, 'index.html'), 'utf8');
    const doc = parse(html);
    const h1 = doc.querySelector('h1');
    assert.ok(h1, '<h1> not found in index.html');
    assert.ok(
      h1.text.includes('Avnish Yadav'),
      `index.html <h1> does not contain "Avnish Yadav": got "${h1.text}"`
    );
  });

  it('index.html #about section text contains a secondary keyword', () => {
    // Requirements: 8.2
    const html = readFileSync(resolve(root, 'index.html'), 'utf8');
    const doc = parse(html);
    const about = doc.querySelector('#about');
    assert.ok(about, '#about section not found in index.html');
    const text = about.text;
    const secondaryKeywords = ['Software Engineer', 'Full Stack Developer', 'Software Developer'];
    const found = secondaryKeywords.some((kw) => text.includes(kw));
    assert.ok(
      found,
      `index.html #about section does not contain any secondary keyword (${secondaryKeywords.join(', ')})`
    );
  });
});

describe('Unit tests: favicon', () => {
  it('index.html favicon href equals "/images/favicon.ico"', () => {
    // Requirements: 9.2
    const html = readFileSync(resolve(root, 'index.html'), 'utf8');
    const doc = parse(html);
    const head = doc.querySelector('head');
    const favicon = head.querySelector('link[rel="icon"]');
    assert.ok(favicon, 'link[rel="icon"] not found in index.html');
    assert.equal(
      favicon.getAttribute('href'),
      '/images/favicon.ico',
      `index.html favicon href mismatch: got "${favicon.getAttribute('href')}"`
    );
  });
});

// ─── Task 10: Property tests ──────────────────────────────────────────────────

// Feature: seo-keyword-optimization, Property 1: Title contains primary keyword
describe('Property 1: Title contains primary keyword', () => {
  it('title contains "Avnish Yadav" on all 8 pages', () => {
    // Validates: Requirements 1.6
    fc.assert(
      fc.property(fc.constantFrom(...TARGET_FILES), (file) => {
        const html = readFileSync(resolve(root, file), 'utf8');
        const doc = parse(html);
        const title = doc.querySelector('title');
        assert.ok(title, `<title> not found in ${file}`);
        assert.ok(
          title.text.includes('Avnish Yadav'),
          `${file} title does not contain "Avnish Yadav": got "${title.text}"`
        );
      }),
      { numRuns: 100 }
    );
  });
});

// Feature: seo-keyword-optimization, Property 2: Title length is within SEO bounds
describe('Property 2: Title length is within SEO bounds', () => {
  it('title length is between 50 and 60 characters on all 8 pages', () => {
    // Validates: Requirements 1.5
    fc.assert(
      fc.property(fc.constantFrom(...TARGET_FILES), (file) => {
        const html = readFileSync(resolve(root, file), 'utf8');
        const doc = parse(html);
        const title = doc.querySelector('title');
        assert.ok(title, `<title> not found in ${file}`);
        const len = title.text.length;
        assert.ok(
          len >= 50,
          `${file} title too short (${len} chars, min 50): "${title.text}"`
        );
        assert.ok(
          len <= 60,
          `${file} title too long (${len} chars, max 60): "${title.text}"`
        );
      }),
      { numRuns: 100 }
    );
  });
});

// Feature: seo-keyword-optimization, Property 3: Meta description presence and length
describe('Property 3: Meta description presence and length', () => {
  it('meta description exists and length is between 140 and 160 characters on all 8 pages', () => {
    // Validates: Requirements 2.1, 2.6
    fc.assert(
      fc.property(fc.constantFrom(...TARGET_FILES), (file) => {
        const html = readFileSync(resolve(root, file), 'utf8');
        const doc = parse(html);
        const head = doc.querySelector('head');
        const desc = head.querySelector('meta[name="description"]');
        assert.ok(desc, `meta[name="description"] not found in ${file}`);
        const content = desc.getAttribute('content');
        const len = content.length;
        assert.ok(
          len >= 140,
          `${file} description too short (${len} chars, min 140): "${content}"`
        );
        assert.ok(
          len <= 160,
          `${file} description too long (${len} chars, max 160): "${content}"`
        );
      }),
      { numRuns: 100 }
    );
  });
});

// Feature: seo-keyword-optimization, Property 4: Open Graph tags completeness and consistency
describe('Property 4: Open Graph tags completeness and consistency', () => {
  it('all 5 OG tags are present and consistent with title/description on all 8 pages', () => {
    // Validates: Requirements 3.1, 3.3, 3.4, 3.5, 3.6
    fc.assert(
      fc.property(fc.constantFrom(...TARGET_FILES), (file) => {
        const html = readFileSync(resolve(root, file), 'utf8');
        const doc = parse(html);
        const head = doc.querySelector('head');
        const titleText = doc.querySelector('title').text;
        const descContent = head.querySelector('meta[name="description"]').getAttribute('content');

        const ogTitle = head.querySelector('meta[property="og:title"]');
        const ogDesc = head.querySelector('meta[property="og:description"]');
        const ogUrl = head.querySelector('meta[property="og:url"]');
        const ogType = head.querySelector('meta[property="og:type"]');
        const ogImage = head.querySelector('meta[property="og:image"]');

        assert.ok(ogTitle, `meta[property="og:title"] not found in ${file}`);
        assert.ok(ogDesc, `meta[property="og:description"] not found in ${file}`);
        assert.ok(ogUrl, `meta[property="og:url"] not found in ${file}`);
        assert.ok(ogType, `meta[property="og:type"] not found in ${file}`);
        assert.ok(ogImage, `meta[property="og:image"] not found in ${file}`);

        assert.equal(
          ogTitle.getAttribute('content'),
          titleText,
          `${file} og:title does not match <title>: og:title="${ogTitle.getAttribute('content')}", title="${titleText}"`
        );
        assert.equal(
          ogDesc.getAttribute('content'),
          descContent,
          `${file} og:description does not match meta description`
        );
        assert.ok(
          ogUrl.getAttribute('href') !== undefined || ogUrl.getAttribute('content') !== undefined,
          `${file} og:url has no content attribute`
        );
        assert.ok(
          ogUrl.getAttribute('content').startsWith(BASE_URL),
          `${file} og:url does not start with base URL: got "${ogUrl.getAttribute('content')}"`
        );
        assert.equal(
          ogImage.getAttribute('content'),
          OG_IMAGE,
          `${file} og:image mismatch: got "${ogImage.getAttribute('content')}"`
        );
      }),
      { numRuns: 100 }
    );
  });
});

// Feature: seo-keyword-optimization, Property 5: Twitter Card tags completeness and consistency
describe('Property 5: Twitter Card tags completeness and consistency', () => {
  it('all 4 Twitter tags are present and consistent with title/description on all 8 pages', () => {
    // Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5
    fc.assert(
      fc.property(fc.constantFrom(...TARGET_FILES), (file) => {
        const html = readFileSync(resolve(root, file), 'utf8');
        const doc = parse(html);
        const head = doc.querySelector('head');
        const titleText = doc.querySelector('title').text;
        const descContent = head.querySelector('meta[name="description"]').getAttribute('content');

        const twCard = head.querySelector('meta[name="twitter:card"]');
        const twTitle = head.querySelector('meta[name="twitter:title"]');
        const twDesc = head.querySelector('meta[name="twitter:description"]');
        const twImage = head.querySelector('meta[name="twitter:image"]');

        assert.ok(twCard, `meta[name="twitter:card"] not found in ${file}`);
        assert.ok(twTitle, `meta[name="twitter:title"] not found in ${file}`);
        assert.ok(twDesc, `meta[name="twitter:description"] not found in ${file}`);
        assert.ok(twImage, `meta[name="twitter:image"] not found in ${file}`);

        assert.equal(
          twCard.getAttribute('content'),
          'summary_large_image',
          `${file} twitter:card mismatch: got "${twCard.getAttribute('content')}"`
        );
        assert.equal(
          twTitle.getAttribute('content'),
          titleText,
          `${file} twitter:title does not match <title>: twitter:title="${twTitle.getAttribute('content')}", title="${titleText}"`
        );
        assert.equal(
          twDesc.getAttribute('content'),
          descContent,
          `${file} twitter:description does not match meta description`
        );
        assert.equal(
          twImage.getAttribute('content'),
          OG_IMAGE,
          `${file} twitter:image mismatch: got "${twImage.getAttribute('content')}"`
        );
      }),
      { numRuns: 100 }
    );
  });
});

// Feature: seo-keyword-optimization, Property 6: Canonical URL presence and HTTPS format
describe('Property 6: Canonical URL presence and HTTPS format', () => {
  it('canonical link exists and href starts with HTTPS base URL on all 8 pages', () => {
    // Validates: Requirements 5.1, 5.2
    fc.assert(
      fc.property(fc.constantFrom(...TARGET_FILES), (file) => {
        const html = readFileSync(resolve(root, file), 'utf8');
        const doc = parse(html);
        const head = doc.querySelector('head');
        const canonical = head.querySelector('link[rel="canonical"]');
        assert.ok(canonical, `link[rel="canonical"] not found in ${file}`);
        const href = canonical.getAttribute('href');
        assert.ok(
          href.startsWith('https://avnish-portfolio-c14e6.web.app'),
          `${file} canonical href does not start with base URL: got "${href}"`
        );
      }),
      { numRuns: 100 }
    );
  });
});

// Feature: seo-keyword-optimization, Property 7: Semantic HTML signals on every page
describe('Property 7: Semantic HTML signals on every page', () => {
  it('html[lang="en"], meta author, and meta robots are present on all 8 pages', () => {
    // Validates: Requirements 8.3, 8.4, 8.5
    fc.assert(
      fc.property(fc.constantFrom(...TARGET_FILES), (file) => {
        const html = readFileSync(resolve(root, file), 'utf8');
        const doc = parse(html);
        const htmlEl = doc.querySelector('html');
        assert.ok(htmlEl, `<html> element not found in ${file}`);
        assert.equal(
          htmlEl.getAttribute('lang'),
          'en',
          `${file} <html> lang attribute is not "en": got "${htmlEl.getAttribute('lang')}"`
        );

        const head = doc.querySelector('head');
        const author = head.querySelector('meta[name="author"]');
        assert.ok(author, `meta[name="author"] not found in ${file}`);
        assert.equal(
          author.getAttribute('content'),
          'Avnish Yadav',
          `${file} meta author content mismatch: got "${author.getAttribute('content')}"`
        );

        const robots = head.querySelector('meta[name="robots"]');
        assert.ok(robots, `meta[name="robots"] not found in ${file}`);
        assert.equal(
          robots.getAttribute('content'),
          'index, follow',
          `${file} meta robots content mismatch: got "${robots.getAttribute('content')}"`
        );
      }),
      { numRuns: 100 }
    );
  });
});

// Feature: seo-keyword-optimization, Property 8: Favicon present on every page
describe('Property 8: Favicon present on every page', () => {
  it('link[rel="icon"] exists in <head> on all 8 pages', () => {
    // Validates: Requirements 9.1
    fc.assert(
      fc.property(fc.constantFrom(...TARGET_FILES), (file) => {
        const html = readFileSync(resolve(root, file), 'utf8');
        const doc = parse(html);
        const head = doc.querySelector('head');
        const favicon = head.querySelector('link[rel="icon"]');
        assert.ok(favicon, `link[rel="icon"] not found in <head> of ${file}`);
      }),
      { numRuns: 100 }
    );
  });
});

// Feature: seo-keyword-optimization, Property 9: Project page title follows naming pattern
describe('Property 9: Project page title follows naming pattern', () => {
  it('project page title ends with "— Avnish Yadav"', () => {
    // Validates: Requirements 1.4
    fc.assert(
      fc.property(fc.constantFrom(...PROJECT_FILES), (file) => {
        const html = readFileSync(resolve(root, file), 'utf8');
        const doc = parse(html);
        const title = doc.querySelector('title');
        assert.ok(title, `<title> not found in ${file}`);
        assert.ok(
          title.text.endsWith('— Avnish Yadav'),
          `${file} title does not end with "— Avnish Yadav": got "${title.text}"`
        );
      }),
      { numRuns: 100 }
    );
  });
});

// Feature: seo-keyword-optimization, Property 10: Project page canonical URL contains projects path
describe('Property 10: Project page canonical URL contains projects path', () => {
  it('project canonical href contains "/projects/"', () => {
    // Validates: Requirements 5.4
    fc.assert(
      fc.property(fc.constantFrom(...PROJECT_FILES), (file) => {
        const html = readFileSync(resolve(root, file), 'utf8');
        const doc = parse(html);
        const head = doc.querySelector('head');
        const canonical = head.querySelector('link[rel="canonical"]');
        assert.ok(canonical, `link[rel="canonical"] not found in ${file}`);
        const href = canonical.getAttribute('href');
        assert.ok(
          href.includes('/projects/'),
          `${file} canonical href does not contain "/projects/": got "${href}"`
        );
      }),
      { numRuns: 100 }
    );
  });
});

// Feature: seo-keyword-optimization, Property 11: Project page h1 contains primary keyword
describe('Property 11: Project page h1 contains primary keyword', () => {
  it('first <h1> contains "Avnish Yadav" on all project pages', () => {
    // Validates: Requirements 8.6
    fc.assert(
      fc.property(fc.constantFrom(...PROJECT_FILES), (file) => {
        const html = readFileSync(resolve(root, file), 'utf8');
        const doc = parse(html);
        const h1 = doc.querySelector('h1');
        assert.ok(h1, `<h1> not found in ${file}`);
        assert.ok(
          h1.text.includes('Avnish Yadav'),
          `${file} <h1> does not contain "Avnish Yadav": got "${h1.text}"`
        );
      }),
      { numRuns: 100 }
    );
  });
});

// Feature: seo-keyword-optimization, Property 12: Project page favicon uses relative path
describe('Property 12: Project page favicon uses relative path', () => {
  it('project page favicon href equals "../images/favicon.ico"', () => {
    // Validates: Requirements 9.3
    fc.assert(
      fc.property(fc.constantFrom(...PROJECT_FILES), (file) => {
        const html = readFileSync(resolve(root, file), 'utf8');
        const doc = parse(html);
        const head = doc.querySelector('head');
        const favicon = head.querySelector('link[rel="icon"]');
        assert.ok(favicon, `link[rel="icon"] not found in ${file}`);
        assert.equal(
          favicon.getAttribute('href'),
          '../images/favicon.ico',
          `${file} favicon href mismatch: got "${favicon.getAttribute('href')}"`
        );
      }),
      { numRuns: 100 }
    );
  });
});

// Feature: seo-keyword-optimization, Property 13: Meta descriptions are unique across all pages
describe('Property 13: Meta descriptions are unique across all pages', () => {
  it('all 8 pages have distinct meta description content values', () => {
    // Validates: Requirements 2.5
    const descriptions = TARGET_FILES.map((file) => {
      const html = readFileSync(resolve(root, file), 'utf8');
      const doc = parse(html);
      const head = doc.querySelector('head');
      const desc = head.querySelector('meta[name="description"]');
      assert.ok(desc, `meta[name="description"] not found in ${file}`);
      return desc.getAttribute('content');
    });

    const unique = new Set(descriptions);
    assert.equal(
      unique.size,
      descriptions.length,
      `Meta descriptions are not unique across all pages. Found ${descriptions.length - unique.size} duplicate(s).`
    );
  });
});
