# NZ Privacy Act 2020 & CERT NZ Security Controls

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Verification Suite](https://img.shields.io/badge/TAVARDT-New%20Zealand%20Suite-5b3cf5.svg)](https://tools.tavardt.com/nz/)
[![JavaScript](https://img.shields.io/badge/JavaScript-Node.js-yellow.svg)](https://nodejs.org/)
[![Governance](https://img.shields.io/badge/Compliance-NZ%20Privacy%20Act%202020-00C853.svg)](https://ag.tavardt.com/nz/cybersecurity/)

A technical compliance framework, perimeter audit checklist, and verification tooling tailored specifically to the **New Zealand Privacy Act 2020**, the **New Zealand Information Security Manual (NZISM)**, and **CERT NZ Critical Controls**.

Engineered and maintained independently by the cyber defence practice at **TAVARDT**.

***

## 1. Regulatory Context in New Zealand

New Zealand organisations and digital platforms operating within Aotearoa are bound by statutory standards designed to protect sensitive data and prevent cyber extortion:

1. **New Zealand Privacy Act 2020 (13 IPPs):** Mandatory breach notification to the Privacy Commissioner for privacy breaches causing serious harm.
2. **CERT NZ Critical Security Controls:** Directives to enforce patch management, multi-factor authentication, domain email security, and logging.
3. **NZISM Operational Baseline:** Guidance for secure transport protocols (TLS 1.3), perimeter segmentation, and encryption in transit.

***

## 2. Technical Control Architecture

| Domain | Control Focus | Verification Mechanism |
|-|-|-|
| **Identity & Access** | Two-factor authentication (2FA) on all administrative conduits | Audit cloud identity providers and remote VPN gateways |
| **Domain Authentication** | Strict DMARC `p=reject` or `p=quarantine` with SPF and DKIM | Automated DNS TXT record parsing |
| **Transport Layer** | Strict HSTS with subdomains and modern cipher suites | Real-time SSL/TLS handshake inspection |
| **Leak Prevention** | Zero public accessibility of configuration and environment files | Automated HTTP scanning for root file disclosures |

***

## 3. Perimeter Audit CLI for New Zealand Domains

This repository provides an automated Node.js validation tool designed to inspect external perimeter controls and anti-spoofing defences for Kiwi organisations (`.co.nz`, `.org.nz`, `.govt.nz`):

### Running via Terminal:
```bash
node bin/nz-security-check.js enterprise.co.nz
```

### What the Tool Evaluates:
* **Email Brand Integrity (DMARC):** Validates that domain spoofing and invoice fraud cannot be executed in your organisation's name.
* **Perimeter Header Hardening:** Audits CSP, HSTS, and X-Frame-Options according to NZISM guidance.
* **Accidental Exposure:** Checks for publicly accessible `.env` configuration files or backup archives.

***

## 4. Regional Online Diagnostic Tools (New Zealand)

For immediate non-intrusive online diagnostics, access the New Zealand verification suite:

* [NZ DMARC & Spoofing Checker](https://tools.tavardt.com/nz/dmarc-checker/): Audits email delivery and anti-impersonation records.
* [NZ Security Headers Inspector](https://tools.tavardt.com/nz/security-headers-check/): Verifies browser isolation policies.
* [Exposed Files & Credential Scanner](https://tools.tavardt.com/nz/exposed-files-scanner/): Detects secret keys and database leaks.
* Full Diagnostic Suite (New Zealand): 20 free technical tools.

***

## 5. Enterprise Cyber Defence & Incident Response in New Zealand

Need expert engineering support for Privacy Act compliance, offensive security testing, or emergency breach containment in Auckland, Wellington, or Christchurch?

* **Cybersecurity & Hardening:** [https://ag.tavardt.com/nz/cybersecurity/](https://ag.tavardt.com/nz/cybersecurity/)

***

## Useful Links

* **Corporate Portal:** https://ag.tavardt.com/nz/
* **Diagnostic Suite:** https://tools.tavardt.com/nz/
* **Technical Contact:** https://ag.tavardt.com/nz/contact/

***

## License

Released under the MIT License.

***

© 2026 TAVARDT. All rights reserved.
