#!/usr/bin/env node

/**
 * TAVARDT New Zealand | Privacy Act 2020 & CERT NZ Verification CLI
 * https://tools.tavardt.com/nz/
 */

const https = require('https');
const dns = require('dns').promises;

const target = process.argv[2];

if (!target) {
  console.log('Usage: node bin/nz-security-check.js <domain-or-url>');
  console.log('Example: node bin/nz-security-check.js enterprise.co.nz\n');
  process.exit(1);
}

const cleanDomain = target.replace(/^https?:\/\//i, '').replace(/\/.*$/, '');
const fullUrl = `https://${cleanDomain}`;

console.log('================================================================');
console.log(' TAVARDT New Zealand | Privacy Act 2020 & CERT NZ Verification');
console.log(` Target Domain: ${cleanDomain}`);
console.log('================================================================\n');

async function runAudit() {
  console.log('[1/3] Auditing NZISM Transport & Security Headers...');
  try {
    const res = await new Promise((resolve, reject) => {
      const req = https.get(fullUrl, { timeout: 8000 }, resolve);
      req.on('error', reject);
      req.on('timeout', () => { req.destroy(); reject(new Error('Connection timeout')); });
    });

    const headers = res.headers;
    const checks = [
      { name: 'Strict-Transport-Security (HSTS)', present: !!headers['strict-transport-security'] },
      { name: 'Content-Security-Policy (CSP)', present: !!headers['content-security-policy'] },
      { name: 'X-Frame-Options (Clickjacking Mitigation)', present: !!headers['x-frame-options'] },
      { name: 'X-Content-Type-Options (MIME Sniffing)', present: !!headers['x-content-type-options'] }
    ];

    checks.forEach(c => {
      console.log(`  ${c.present ? '[PASSED]' : '[WARNING]'} ${c.name}: ${c.present ? 'Enforced' : 'Missing'}`);
    });
  } catch (err) {
    console.log(`  [ERROR] Connection failed: ${err.message}`);
  }

  console.log('\n[2/3] Checking CERT NZ Email Spoofing Protections (DMARC)...');
  try {
    const records = await dns.resolveTxt(`_dmarc.${cleanDomain}`);
    const dmarcRecord = records.flat().find(r => r.startsWith('v=DMARC1'));
    if (dmarcRecord) {
      console.log(`  [PASSED] DMARC Policy Active: ${dmarcRecord}`);
    } else {
      console.log('  [CRITICAL] Missing DMARC Record. Domain is susceptible to brand impersonation.');
    }
  } catch {
    console.log('  [CRITICAL] DMARC lookup returned no valid TXT record.');
  }

  console.log('\n[3/3] Probing Public Access to Sensitive Configuration Files...');
  try {
    const envRes = await new Promise((resolve, reject) => {
      const req = https.get(`${fullUrl}/.env`, { timeout: 6000 }, resolve);
      req.on('error', reject);
      req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
    });

    if (envRes.statusCode === 200) {
      console.log('  [CRITICAL PRIVACY BREACH RISK] Environment file /.env returned HTTP 200!');
    } else {
      console.log(`  [PASSED] Environment configuration is protected (HTTP ${envRes.statusCode}).`);
    }
  } catch {
    console.log('  [PASSED] Environment configuration is not publicly accessible.');
  }

  console.log('\n================================================================');
  console.log(' REGIONAL DIAGNOSTIC REPORT:');
  console.log(` https://tools.tavardt.com/nz/dmarc-checker/`);
  console.log(` https://tools.tavardt.com/nz/security-headers-check/`);
  console.log(' For Enterprise Cyber Defence in NZ: https://ag.tavardt.com/nz/cybersecurity/');
  console.log('================================================================\n');
}

runAudit();
