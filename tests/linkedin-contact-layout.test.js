import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { parse } from 'node-html-parser';
import fc from 'fast-check';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// Parse index.html once at module level
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const doc = parse(html);

// ─── Unit tests: LinkedIn panel DOM structure ─────────────────────────────────

describe('Unit tests: LinkedIn panel DOM structure', () => {

  // Test 1: #contact contains exactly one <h2> with text "Get In Touch"  [Req 6.1]
  it('#contact contains exactly one <h2> with text "Get In Touch"', () => {
    const contact = doc.querySelector('#contact');
    assert.ok(contact, '#contact section not found');
    const h2s = contact.querySelectorAll('h2');
    const getInTouchH2s = h2s.filter(el => el.text.trim() === 'Get In Touch');
    assert.equal(
      getInTouchH2s.length,
      1,
      `Expected exactly 1 <h2> with text "Get In Touch" in #contact, found ${getInTouchH2s.length}`
    );
  });

  // Test 2: <h2> and intro <p> appear before .contact-columns in DOM order  [Req 6.2]
  it('<h2> and intro <p> appear before .contact-columns in DOM order', () => {
    const container = doc.querySelector('#contact .container');
    assert.ok(container, '#contact .container not found');

    // Get direct children of the container (element nodes only)
    const children = container.childNodes.filter(n => n.nodeType === 1);

    const h2Index = children.findIndex(
      el => el.tagName === 'H2' && el.text.trim() === 'Get In Touch'
    );
    const pIndex = children.findIndex(
      (el, idx) => el.tagName === 'P' && idx > h2Index
    );
    const columnsIndex = children.findIndex(
      el => el.classList && el.classList.contains('contact-columns')
    );

    assert.ok(h2Index !== -1, '<h2>Get In Touch</h2> not found as direct child of #contact .container');
    assert.ok(pIndex !== -1, 'Intro <p> not found after <h2> in #contact .container');
    assert.ok(columnsIndex !== -1, '.contact-columns not found as direct child of #contact .container');
    assert.ok(
      h2Index < columnsIndex,
      `<h2> (index ${h2Index}) should appear before .contact-columns (index ${columnsIndex})`
    );
    assert.ok(
      pIndex < columnsIndex,
      `Intro <p> (index ${pIndex}) should appear before .contact-columns (index ${columnsIndex})`
    );
  });

  // Test 3: .linkedin-panel contains <h3> whose text includes "Avnish Yadav"  [Req 3.1]
  it('.linkedin-panel contains <h3> whose text includes "Avnish Yadav"', () => {
    const panel = doc.querySelector('.linkedin-panel');
    assert.ok(panel, '.linkedin-panel not found');
    const h3 = panel.querySelector('h3');
    assert.ok(h3, '<h3> not found inside .linkedin-panel');
    assert.ok(
      h3.text.includes('Avnish Yadav'),
      `Expected <h3> text to include "Avnish Yadav", got: "${h3.text.trim()}"`
    );
  });

  // Test 4: .linkedin-panel contains an element whose text includes "Software Engineer · Full-Stack Developer"  [Req 3.2]
  it('.linkedin-panel contains an element whose text includes "Software Engineer · Full-Stack Developer"', () => {
    const panel = doc.querySelector('.linkedin-panel');
    assert.ok(panel, '.linkedin-panel not found');
    const allElements = panel.querySelectorAll('*');
    const match = allElements.find(el =>
      el.text.includes('Software Engineer · Full-Stack Developer')
    );
    assert.ok(
      match,
      'No element inside .linkedin-panel found with text "Software Engineer · Full-Stack Developer"'
    );
  });

  // Test 5: CTA anchor has href, target="_blank", rel="noopener noreferrer"  [Req 3.3, 3.4, 5.2]
  it('CTA anchor has href="https://www.linkedin.com/in/avnishy84/", target="_blank", rel="noopener noreferrer"', () => {
    const panel = doc.querySelector('.linkedin-panel');
    assert.ok(panel, '.linkedin-panel not found');
    const cta = panel.querySelector('.lp-cta');
    assert.ok(cta, '.lp-cta anchor not found inside .linkedin-panel');
    assert.equal(
      cta.getAttribute('href'),
      'https://www.linkedin.com/in/avnishy84/',
      `Expected href "https://www.linkedin.com/in/avnishy84/", got "${cta.getAttribute('href')}"`
    );
    assert.equal(
      cta.getAttribute('target'),
      '_blank',
      `Expected target="_blank", got "${cta.getAttribute('target')}"`
    );
    assert.equal(
      cta.getAttribute('rel'),
      'noopener noreferrer',
      `Expected rel="noopener noreferrer", got "${cta.getAttribute('rel')}"`
    );
  });

  // Test 6: CTA anchor visible text is "Connect on LinkedIn"  [Req 3.4]
  it('CTA anchor visible text includes "Connect on LinkedIn"', () => {
    const panel = doc.querySelector('.linkedin-panel');
    assert.ok(panel, '.linkedin-panel not found');
    const cta = panel.querySelector('.lp-cta');
    assert.ok(cta, '.lp-cta anchor not found inside .linkedin-panel');
    assert.ok(
      cta.text.trim().includes('Connect on LinkedIn'),
      `Expected CTA text to include "Connect on LinkedIn", got: "${cta.text.trim()}"`
    );
  });

  // Test 7: Font Awesome LinkedIn icon is present inside .lp-name or .lp-cta  [Req 3.5]
  it('Font Awesome LinkedIn icon (fa-linkedin or fa-linkedin-in) is present inside .lp-name or .lp-cta', () => {
    const panel = doc.querySelector('.linkedin-panel');
    assert.ok(panel, '.linkedin-panel not found');

    const lpNameIcon = panel.querySelector('.lp-name i');
    const lpCtaIcon = panel.querySelector('.lp-cta i');

    const hasLinkedInIcon = (el) => {
      if (!el) return false;
      const cls = el.getAttribute('class') || '';
      return cls.includes('fa-linkedin') || cls.includes('fa-linkedin-in');
    };

    assert.ok(
      hasLinkedInIcon(lpNameIcon) || hasLinkedInIcon(lpCtaIcon),
      'No Font Awesome LinkedIn icon (fa-linkedin or fa-linkedin-in) found inside .lp-name or .lp-cta'
    );
  });

  // Test 8: <img class="lp-avatar"> has a non-empty alt attribute  [Req 5.3]
  it('<img class="lp-avatar"> has a non-empty alt attribute', () => {
    const panel = doc.querySelector('.linkedin-panel');
    assert.ok(panel, '.linkedin-panel not found');
    const avatar = panel.querySelector('img.lp-avatar');
    assert.ok(avatar, '<img class="lp-avatar"> not found inside .linkedin-panel');
    const alt = avatar.getAttribute('alt');
    assert.ok(
      alt && alt.trim().length > 0,
      `Expected non-empty alt attribute on .lp-avatar, got: "${alt}"`
    );
  });

  // Test 9: .lp-profile-url anchor has aria-label attribute  [Req 5.1]
  it('.lp-profile-url anchor has aria-label attribute', () => {
    const panel = doc.querySelector('.linkedin-panel');
    assert.ok(panel, '.linkedin-panel not found');
    const profileUrl = panel.querySelector('.lp-profile-url');
    assert.ok(profileUrl, '.lp-profile-url anchor not found inside .linkedin-panel');
    const ariaLabel = profileUrl.getAttribute('aria-label');
    assert.ok(
      ariaLabel && ariaLabel.trim().length > 0,
      `Expected non-empty aria-label on .lp-profile-url, got: "${ariaLabel}"`
    );
  });

});

// ─── Property 1: LinkedIn panel required content is always present ────────────

// Feature: linkedin-contact-layout, Property 1: LinkedIn panel required content is always present
describe('Property 1: LinkedIn panel required content is always present', () => {
  it('for any sampled HTML file, .linkedin-panel contains all required content', () => {
    // Validates: Requirements 3.1, 3.2, 3.3, 3.4
    fc.assert(
      fc.property(fc.constantFrom('index.html'), (file) => {
        const fileHtml = readFileSync(resolve(root, file), 'utf8');
        const fileDoc = parse(fileHtml);

        const panel = fileDoc.querySelector('.linkedin-panel');
        assert.ok(panel, `.linkedin-panel not found in ${file}`);

        // Req 3.1: h3 text includes "Avnish Yadav"
        const h3 = panel.querySelector('h3');
        assert.ok(h3, `<h3> not found in .linkedin-panel in ${file}`);
        assert.ok(
          h3.text.includes('Avnish Yadav'),
          `<h3> text does not include "Avnish Yadav" in ${file}`
        );

        // Req 3.2: role text includes "Software Engineer · Full-Stack Developer"
        const allEls = panel.querySelectorAll('*');
        const roleEl = allEls.find(el =>
          el.text.includes('Software Engineer · Full-Stack Developer')
        );
        assert.ok(
          roleEl,
          `No element with "Software Engineer · Full-Stack Developer" found in ${file}`
        );

        // Req 3.3: profile URL anchor href
        const profileUrl = panel.querySelector('.lp-profile-url');
        assert.ok(profileUrl, `.lp-profile-url not found in ${file}`);
        assert.equal(
          profileUrl.getAttribute('href'),
          'https://www.linkedin.com/in/avnishy84/',
          `Profile URL href mismatch in ${file}`
        );

        // Req 3.4: CTA text equals "Connect on LinkedIn"
        const cta = panel.querySelector('.lp-cta');
        assert.ok(cta, `.lp-cta not found in ${file}`);
        assert.ok(
          cta.text.trim().includes('Connect on LinkedIn'),
          `CTA text does not include "Connect on LinkedIn" in ${file}`
        );
      }),
      { numRuns: 100 }
    );
  });
});

// ─── Layout structure tests ───────────────────────────────────────────────────

describe('Layout structure tests', () => {

  // Test: .contact-columns exists as a child of #contact .container  [Req 1.3]
  it('.contact-columns exists as a child of #contact .container', () => {
    const container = doc.querySelector('#contact .container');
    assert.ok(container, '#contact .container not found');
    const columns = container.querySelector('.contact-columns');
    assert.ok(columns, '.contact-columns not found inside #contact .container');
  });

  // Test: .contact-form-col is the first child of .contact-columns and .linkedin-panel is the second  [Req 1.2]
  it('.contact-form-col is the first child and .linkedin-panel is the second child of .contact-columns', () => {
    const columns = doc.querySelector('.contact-columns');
    assert.ok(columns, '.contact-columns not found');
    const children = columns.childNodes.filter(n => n.nodeType === 1);
    assert.ok(children.length >= 2, `Expected at least 2 children in .contact-columns, found ${children.length}`);
    const firstChild = children[0];
    const secondChild = children[1];
    assert.ok(
      firstChild.classList && firstChild.classList.contains('contact-form-col'),
      `Expected first child to be .contact-form-col, got: ${firstChild.getAttribute('class')}`
    );
    assert.ok(
      secondChild.classList && secondChild.classList.contains('linkedin-panel'),
      `Expected second child to be .linkedin-panel, got: ${secondChild.getAttribute('class')}`
    );
  });

  // Test: #contact-form is a descendant of .contact-form-col  [Req 1.2]
  it('#contact-form is a descendant of .contact-form-col', () => {
    const formCol = doc.querySelector('.contact-form-col');
    assert.ok(formCol, '.contact-form-col not found');
    const form = formCol.querySelector('#contact-form');
    assert.ok(form, '#contact-form not found inside .contact-form-col');
  });

  // Test: .linkedin-panel has aria-label attribute  [Req 5.1]
  it('.linkedin-panel has aria-label attribute', () => {
    const panel = doc.querySelector('.linkedin-panel');
    assert.ok(panel, '.linkedin-panel not found');
    const ariaLabel = panel.getAttribute('aria-label');
    assert.ok(
      ariaLabel && ariaLabel.trim().length > 0,
      `Expected non-empty aria-label on .linkedin-panel, got: "${ariaLabel}"`
    );
  });

  // Test: .lp-avatar-fallback element exists and contains text "AY"  [Req 3.6]
  it('.lp-avatar-fallback element exists and contains text "AY"', () => {
    const panel = doc.querySelector('.linkedin-panel');
    assert.ok(panel, '.linkedin-panel not found');
    const fallback = panel.querySelector('.lp-avatar-fallback');
    assert.ok(fallback, '.lp-avatar-fallback not found inside .linkedin-panel');
    assert.ok(
      fallback.text.trim().includes('AY'),
      `Expected .lp-avatar-fallback text to include "AY", got: "${fallback.text.trim()}"`
    );
  });

  // Test: <img class="lp-avatar"> has onerror attribute  [Req 3.6]
  it('<img class="lp-avatar"> has onerror attribute', () => {
    const panel = doc.querySelector('.linkedin-panel');
    assert.ok(panel, '.linkedin-panel not found');
    const avatar = panel.querySelector('img.lp-avatar');
    assert.ok(avatar, '<img class="lp-avatar"> not found inside .linkedin-panel');
    const onerror = avatar.getAttribute('onerror');
    assert.ok(
      onerror && onerror.trim().length > 0,
      `Expected non-empty onerror attribute on .lp-avatar, got: "${onerror}"`
    );
  });

});

// ─── CSS class presence and attribute correctness tests ───────────────────────

describe('CSS class presence and attribute correctness', () => {

  // Test: .lp-cta anchor has rel="noopener noreferrer"  [Req 5.2]
  it('.lp-cta anchor has rel="noopener noreferrer"', () => {
    const panel = doc.querySelector('.linkedin-panel');
    assert.ok(panel, '.linkedin-panel not found');
    const cta = panel.querySelector('.lp-cta');
    assert.ok(cta, '.lp-cta anchor not found inside .linkedin-panel');
    assert.equal(
      cta.getAttribute('rel'),
      'noopener noreferrer',
      `Expected rel="noopener noreferrer" on .lp-cta, got: "${cta.getAttribute('rel')}"`
    );
  });

  // Test: .lp-profile-url anchor has target="_blank"  [Req 3.3]
  it('.lp-profile-url anchor has target="_blank"', () => {
    const panel = doc.querySelector('.linkedin-panel');
    assert.ok(panel, '.linkedin-panel not found');
    const profileUrl = panel.querySelector('.lp-profile-url');
    assert.ok(profileUrl, '.lp-profile-url anchor not found inside .linkedin-panel');
    assert.equal(
      profileUrl.getAttribute('target'),
      '_blank',
      `Expected target="_blank" on .lp-profile-url, got: "${profileUrl.getAttribute('target')}"`
    );
  });

  // Test: .lp-profile-url visible text includes "linkedin.com/in/avnishy84"  [Req 3.3]
  it('.lp-profile-url visible text includes "linkedin.com/in/avnishy84"', () => {
    const panel = doc.querySelector('.linkedin-panel');
    assert.ok(panel, '.linkedin-panel not found');
    const profileUrl = panel.querySelector('.lp-profile-url');
    assert.ok(profileUrl, '.lp-profile-url anchor not found inside .linkedin-panel');
    assert.ok(
      profileUrl.text.trim().includes('linkedin.com/in/avnishy84'),
      `Expected .lp-profile-url text to include "linkedin.com/in/avnishy84", got: "${profileUrl.text.trim()}"`
    );
  });

  // Test: .lp-divider element exists inside .linkedin-panel  [design]
  it('.lp-divider element exists inside .linkedin-panel', () => {
    const panel = doc.querySelector('.linkedin-panel');
    assert.ok(panel, '.linkedin-panel not found');
    const divider = panel.querySelector('.lp-divider');
    assert.ok(divider, '.lp-divider element not found inside .linkedin-panel');
  });

});
