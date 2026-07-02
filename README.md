# 🚀 Gowri Prasath Babu — Enterprise Portfolio

> Senior Software Engineer | Angular 20 · ASP.NET Core · AWS · React

[![Angular](https://img.shields.io/badge/Angular-20-FF6B00?style=flat&logo=angular)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3B82F6?style=flat&logo=typescript)](https://typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat)](LICENSE)

A world-class, enterprise-grade personal portfolio website built with Angular 20, featuring SSR, Signals API, dark premium theme with orange accents, and full production deployment support.

---

## ✨ Features

- ⚡ **Angular 20** — Standalone components, Signals API, Control flow syntax
- 🖥️ **SSR** — Angular Universal with Node.js/Express
- 🎨 **Premium Dark Theme** — Orange accent, glassmorphism, particle animations
- 📱 **Fully Responsive** — Mobile-first design, all breakpoints
- ♿ **Accessible** — WCAG 2.1 AA compliant, ARIA labels, keyboard navigation
- 🔍 **SEO Optimized** — Meta tags, Open Graph, Twitter Cards, Structured Data
- 🐳 **Docker Ready** — Multi-stage build, compose, nginx config
- ☁️ **AWS Deployable** — ECS/Fargate, CloudFront, ALB guide included
- 🔄 **GitHub Actions** — Full CI/CD pipeline
- 📧 **EmailJS Integration** — Contact form with validation

---

## 🏗️ Architecture

```
src/
├── app/
│   ├── core/
│   │   ├── models/          # TypeScript domain models
│   │   └── services/        # Portfolio data + Email services
│   ├── features/
│   │   ├── home/            # Main page (all sections)
│   │   │   └── components/
│   │   │       ├── hero/
│   │   │       ├── about/
│   │   │       ├── skills/
│   │   │       ├── experience/
│   │   │       ├── projects/
│   │   │       ├── achievements/
│   │   │       ├── architecture/
│   │   │       ├── certifications/
│   │   │       └── contact/
│   │   └── layout/
│   │       ├── header/      # Sticky nav with scroll detection
│   │       └── footer/
│   └── state/               # Signal-based global state
├── styles/
│   ├── _variables.scss      # Design tokens
│   ├── _typography.scss     # Font system
│   ├── _animations.scss     # Keyframes & transitions
│   ├── _utilities.scss      # Utility classes
│   └── _components.scss     # Global component styles
└── environments/
```

---

---

## ✅ Before You Deploy — Setup Checklist

After extracting this project, do the following:

1. **Install dependencies**: `npm install`
2. **Add your resume**: place your PDF at `src/assets/resume/Gowri Prasath Babu - Software Developer.pdf` (referenced by the Hero and Header download buttons)
3. **Add social preview image**: drop a 1200×630 PNG at `public/assets/og-image.png` for Open Graph/Twitter link previews
4. **Add app icons**: generate `apple-touch-icon.png` (180×180) into `public/assets/icons/` — see `public/assets/icons/README.txt` for a one-line command
5. **Configure EmailJS**: fill in real credentials in `src/environments/environment.ts` and `environment.prod.ts` (see EmailJS Setup below)
6. **Update domain references**: replace `gowriprasath.dev` in `src/index.html`, `public/robots.txt`, and `public/sitemap.xml` with your real domain
7. **Verify content**: all profile data, projects, and experience live in one place — `src/app/core/services/portfolio-data.service.ts`

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm 9+

### Development

```bash
# Install dependencies
npm install

# Start dev server
npm start
# → http://localhost:4200
```

### Production Build

```bash
npm run build:prod
```

### SSR (Server-Side Rendering)

```bash
npm run build:ssr
npm run serve:ssr
# → http://localhost:4000
```

---

## 🐳 Docker

```bash
# Build image
docker build -t gowri-portfolio .

# Run container
docker run -p 4000:4000 gowri-portfolio

# Or with Docker Compose
docker-compose up
```

---

## 📧 EmailJS Setup

1. Create a free account at [emailjs.com](https://emailjs.com)
2. Create an Email Service (e.g. Gmail/Outlook) and an Email Template
3. Update your credentials in **both** environment files:

   `src/environments/environment.ts` (development):
   ```typescript
   export const environment = {
     production: false,
     emailjsServiceId:  'your_service_id',
     emailjsTemplateId: 'your_template_id',
     emailjsPublicKey:  'your_public_key',
   };
   ```

   `src/environments/environment.prod.ts` (production build):
   ```typescript
   export const environment = {
     production: true,
     emailjsServiceId:  'your_service_id',
     emailjsTemplateId: 'your_template_id',
     emailjsPublicKey:  'your_public_key',
   };
   ```

4. In your EmailJS dashboard, restrict the Public Key to your production domain to prevent abuse.

**EmailJS Template Variables** (map these in your EmailJS template):
- `{{from_name}}` — Sender name
- `{{from_email}}` — Sender email
- `{{subject}}` — Message subject
- `{{message}}` — Message body
- `{{to_name}}` — Recipient (Gowri Prasath Babu)
- `{{reply_to}}` — Set as the Reply-To address in your template settings

---

## 🎨 Customization

### Update Personal Info

Edit `src/app/core/services/portfolio-data.service.ts`:

```typescript
readonly personalInfo: PersonalInfo = {
  name:     'Your Name',
  title:    'Your Title',
  email:    'your@email.com',
  github:   'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  // ...
};
```

### Update Projects

Add/edit projects in the `projects` array in the same file.

### Change Theme Colors

Edit `src/styles/_variables.scss`:

```scss
$primary:    #FF6B00;  // Main accent color
$bg-base:    #0A0A0A;  // Page background
$bg-card:    #1A1A1A;  // Card background
```

---

## ☁️ AWS Deployment

See [AWS_DEPLOY_GUIDE.md](AWS_DEPLOY_GUIDE.md) for full deployment instructions including ECS Fargate, CloudFront, ALB, and Route 53 setup.

> **Note on CI/CD:** `.github/workflows/ci-cd.yml` pushes the Docker image to **Docker Hub** by default (`DOCKER_USERNAME` / `DOCKER_PASSWORD` secrets), then deploys to AWS ECS. If you prefer Amazon ECR instead, swap the "Docker Build & Push" job for the `aws-actions/amazon-ecr-login` action and update the image reference in your ECS task definition accordingly — see AWS_DEPLOY_GUIDE.md Step 2 for the ECR commands.

Required GitHub repository secrets for the included workflow:
- `DOCKER_USERNAME`, `DOCKER_PASSWORD` — Docker Hub credentials
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION` — AWS credentials
- `ECS_CLUSTER`, `ECS_SERVICE` — your ECS cluster/service names

---

## 🔒 Security

- HTTP security headers (X-Frame-Options, CSP, etc.)
- No sensitive data in client bundle
- EmailJS keys should be restricted by domain in dashboard
- Nginx reverse proxy with SSL termination

---

## 📄 License

MIT © 2025 Gowri Prasath Babu

---

## 👨‍💻 About

Built by [Gowri Prasath Babu](https://gowriprasath.dev) — Senior Software Engineer at Exalca Technologies, Coimbatore.

**Connect:**
- GitHub: [@gowriprasath](https://github.com/gowriprasath)
- LinkedIn: [in/gowriprasath](https://linkedin.com/in/gowriprasath)
