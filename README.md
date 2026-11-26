<p align="center">
  <a href="https://ag.tavardt.com/nz/">
    <img src="https://ag.tavardt.com/img/tavardt-banner.png" alt="TAVARDT" width="1024" />
  </a>
</p>

# NZ Privacy Act 2020 & CERT NZ Security Controls

[![Verification Suite](https://img.shields.io/badge/TAVARDT-New%20Zealand%20Suite-5b3cf5.svg)](https://tools.tavardt.com/nz/)
[![JavaScript](https://img.shields.io/badge/JavaScript-Node.js-yellow.svg)](https://nodejs.org/)
[![Governance](https://img.shields.io/badge/Compliance-NZ%20Privacy%20Act%202020-00C853.svg)](https://ag.tavardt.com/nz/cybersecurity/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A technical compliance framework, perimeter audit checklist, and verification tooling tailored specifically to the **New Zealand Privacy Act 2020**, the **New Zealand Information Security Manual (NZISM)**, and **CERT NZ Critical Controls**.

Engineered and maintained independently by the cyber defence practice at **TAVARDT**.

***

## 1. Regulatory Framework and Technical Standards in New Zealand

Organisations and digital platforms operating within Aotearoa must satisfy rigorous statutory requirements to protect personal information and withstand cyber threats. The compliance architecture integrates three authoritative national security baselines:

* **New Zealand Privacy Act 2020 (13 IPPs)**: Enforces Information Privacy Principle 5 regarding reasonable security safeguards for stored personal data. It mandates immediate reporting of privacy breaches that cause or risk serious harm to the Office of the Privacy Commissioner.
* **CERT NZ Critical Security Controls**: Establishes priority defenses including strict email authentication via DMARC, proactive patch management, and credential boundary protection.
* **NZISM Operational Security Baseline**: Mandates robust transport layer security protocols and browser isolation headers to defend institutional communications across digital perimeters.

***

## 2. Compliance Architecture and Technical Audit Controls

The framework implements deterministic automated inspections to validate critical perimeter controls across three primary defense surfaces:

* **NZISM Transport & Browser Security Headers**: Verifies active enforcement of cryptographic transport and client isolation directives. It audits `Strict-Transport-Security` (HSTS), `Content-Security-Policy` (CSP), `X-Frame-Options`, and `X-Content-Type-Options`.
* **CERT NZ Domain Authentication and Anti-Spoofing**: Conducts automated DNS record validation to ensure active `v=DMARC1` policies are deployed. This control prevents unauthorised sender spoofing and business email compromise attacks.
* **Perimeter Secret and Configuration Leak Defense**: Systematically probes public web paths to verify that sensitive configuration files remain strictly inaccessible. It tests whether internal `.env` files are exposed to unauthenticated external access.

***

## 3. Threat Vectors and Operational Risk Mitigation

Unprotected perimeter infrastructure exposes Kiwi organisations to severe privacy violations, financial extortion, and regulatory investigations. The verification tool audits and mitigates four critical operational risks:

* **Email Impersonation and Invoice Redirection Fraud**: Missing DMARC records allow malicious actors to forge outgoing emails under your domain name. Implementing strict quarantine or reject policies prevents fraudulent communication targeting customers and vendors.
* **Protocol Downgrade and Session Hijacking**: Absence of HSTS allows adversaries to intercept unencrypted HTTP traffic across public networks. Enforcing strict transport policies ensures all user sessions remain securely encrypted over TLS channels.
* **Credential and Cloud API Secret Exfiltration**: Publicly readable `.env` files reveal database connection strings, encryption keys, and administrative API tokens. Attackers utilise these exposed credentials to compromise internal data stores directly.
* **Browser Redressing and Script Injection**: Missing CSP and frame controls leave web applications susceptible to clickjacking and cross-site scripting. Hardening HTTP response headers blocks unauthorised scripts and UI redressing attacks.

***

## 4. Quick Start and Operational Verification

Run the automated perimeter security inspection locally against New Zealand domains using Node.js:

```bash
git clone https://github.com/TAVARDT-New-Zealand/nzism-cert-nz-security-controls.git
cd nzism-cert-nz-security-controls
node bin/nz-security-check.js example.co.nz
```

### Execution Diagnostics and Output Evaluation

The inspection utility returns deterministic classifications for each evaluated defensive control:

* **Verified Protection Confirmed (`[PASSED]`)**: Indicates that the evaluated control (such as enforced headers, active DMARC records, or protected configuration paths) is properly implemented.
* **Critical Privacy Risk Detected (`[CRITICAL]` / `[WARNING]`)**: Signals missing email authentication records, absent security headers, or publicly readable `.env` files requiring urgent operational remediation.

***

## 5. Frequently Asked Technical Questions (FAQ)

### How does the verification utility support compliance with IPP 5 under the New Zealand Privacy Act 2020?
The utility automates perimeter security inspections to verify that digital services implement reasonable security safeguards against loss, unauthorised access, and disclosure of personal data. By validating transport encryption and blocking public access to environment credentials, it ensures digital platforms meet statutory security standards.

### Why does CERT NZ prioritise DMARC implementation as a critical security control for organisations?
Domain-based Message Authentication, Reporting and Conformance (DMARC) prevents cyber adversaries from sending fraudulent emails that impersonate trusted New Zealand domains. Enforcing a strict DMARC policy mitigates phishing campaigns, business email compromise, and brand reputation damage.

### What specific operational risks are introduced by missing NZISM browser security headers?
Omitting headers such as HSTS, CSP, and X-Frame-Options exposes web visitors to clickjacking, protocol downgrade attacks, and cross-site script injections. Enforcing these browser isolation directives ensures that all communication occurs over encrypted channels and blocks unconsented data exfiltration.

### How does the script evaluate perimeter exposure risks for sensitive configuration files?
The Node.js tool conducts targeted HTTP requests to ascertain whether internal environment files like .env are publicly accessible without authentication. Receiving an HTTP 200 response flags an immediate critical privacy vulnerability that requires urgent web server access restriction.

### What technical remediation steps should engineering teams take if a control check fails?
Infrastructure teams must immediately configure web server rules to return HTTP 403 or 404 responses for dotfiles and internal directories. Additionally, missing DMARC TXT records must be published in DNS and exposed application secrets must be revoked and rotated without delay.

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
