# Devendra Vinod Patil — AI/ML Developer & Data Science Portfolio

A multi-page portfolio website showcasing applied Machine Learning, Data Science, Natural Language Processing, and full-stack software development projects by **Devendra Vinod Patil** (B.E. Information Technology, CGPA 9.65/10, Surat, Gujarat, India).

Designed with a high-contrast editorial aesthetic: warm white/ivory canvas, charcoal ink typography, restrained accents, animated doodle elements, smooth micro-interactions, accessible modal dialogs, and a touch-enabled moving photo gallery.

---

## 🧭 Website Architecture & Sitemap

| Page | URL | Description |
| :--- | :--- | :--- |
| **Home** | [`index.html`](file:///d:/portfolio/index.html) | Recruiter-friendly overview, featured builds, credentials preview, skills, and contact CTA. |
| **About** | [`about.html`](file:///d:/portfolio/about.html) | Academic journey, technical focus, research interests, and career objectives. |
| **Projects** | [`projects.html`](file:///d:/portfolio/projects.html) | Filterable project showcase (AI/ML, Data Science, NLP, Web Dev). |
| **Experience** | [`experience.html`](file:///d:/portfolio/experience.html) | Verified internships (IBM SkillsBuild GenAI & Technetics IT Services), training, and education. |
| **Achievements** | [`achievements.html`](file:///d:/portfolio/achievements.html) | Moving photo carousel, national NPTEL scores, and interactive certificate lightbox viewer. |
| **Contact** | [`contact.html`](file:///d:/portfolio/contact.html) | Professional email routing (`patildevendra984@gmail.com`), phone, GitHub, LinkedIn, and validated form. |
| **SwiftCargo Case Study** | [`project-swiftcargo.html`](file:///d:/portfolio/project-swiftcargo.html) | End-to-end ML shipment delay prediction, RFECV, GridSearchCV, metrics, and Streamlit advisory. |
| **ResumeAI Case Study** | [`project-resumeai.html`](file:///d:/portfolio/project-resumeai.html) | Full-stack GenAI career studio, ATS resume builder, cover letters, and adaptive mock interviewer. |
| **Virtual Chikitsa Case Study** | [`project-virtualchikitsa.html`](file:///d:/portfolio/project-virtualchikitsa.html) | Telemedicine platform with role-based workflows (doctor/patient), video consults, and e-prescriptions. |
| **Pad Le Beta GTU Case Study** | [`project-padlebeta.html`](file:///d:/portfolio/project-padlebeta.html) | Educational portal curating semester-wise notes, exam question papers, and video lectures. |
| **404 Error Page** | [`404.html`](file:///d:/portfolio/404.html) | Clean, branded error page with quick links back to homepage and projects. |

---

## 🚀 Key Features

1. **Moving Photo Gallery & Certificate Viewer:**
   - Smooth horizontal auto-sliding carousel with pause on hover/focus.
   - Touch swipe on mobile devices and click-and-drag scrolling on desktops.
   - Previous (`←`) and Next (`→`) navigation controls.
   - Built-in category filter tabs (Certifications vs. Academic).
   - High-resolution click-to-enlarge lightbox modal with keyboard `ESC` dismissal.
   - Full accessibility support for `prefers-reduced-motion`.

2. **Applied ML Case Studies:**
   - Dedicated technical breakdowns following standard industry structures.
   - Transparent reporting of algorithms, hyperparameter optimization, and evaluation metrics (Precision, Recall, F1, ROC-AUC).
   - Clear architectural diagrams and business problem framing.

3. **Recruiter-Friendly Design:**
   - Clean light palette: ivory paper (`#FFFDF9`), crisp ink (`#111111`), playful muted accents.
   - Responsive design across desktop, tablet, and mobile breakpoints.
   - Zero external framework dependencies; written in modular Vanilla HTML5, CSS3, and JavaScript.

---

## 🛠️ Tech Stack

- **Markup & Semantics:** HTML5
- **Styling:** Vanilla CSS3 (Custom CSS Properties, Flexbox, CSS Grid)
- **Scripting:** Modular ES6 JavaScript (IntersectionObserver, Dialog API, Touch/Drag Events)
- **Typography:** Google Fonts (*Fraunces*, *Space Grotesk*, *Inter*, *Caveat*)
- **Icons & Badges:** Devicon SVG icons, inline scalable SVGs

---

## 📄 Resume PDF Integration

To enable direct PDF resume downloads:
1. Save your compiled resume PDF as `Devendra_Vinod_Patil_Resume.pdf` into a `docs/` or root directory.
2. Update the resume download link in [`index.html`](file:///d:/portfolio/index.html#L136):
   ```html
   <a href="docs/Devendra_Vinod_Patil_Resume.pdf" download class="btn btn-ghost" id="resumeBtnHero">↓ Resume</a>
   ```

---

## 📬 Contact Form Configuration

The contact form currently triggers the visitor's native email client with pre-filled parameters directed to `patildevendra984@gmail.com`.

If you prefer an automated background form service without opening the client's mail application:
- **Formspree:** Change `<form class="card contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">`
- **EmailJS / Web3Forms:** Plug your free public access key into `js/main.js`.

---

## 🌐 Deployment Instructions

### GitHub Pages (Recommended)
1. Initialize or push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Complete multi-page AI/ML portfolio"
   git remote add origin https://github.com/Devendra-Vinod-Patil/portfolio.git
   git push -u origin main
   ```
2. In GitHub, navigate to **Settings** → **Pages**.
3. Under **Branch**, select `main` and root `/`, then click **Save**.
4. Your site will be live at `https://devendra-vinod-patil.github.io/portfolio/`.

### Netlify / Vercel
- Drag and drop the project folder directly into the Netlify Drop dashboard, or import via GitHub.
- Build command: *(leave empty)*
- Publish directory: `.` (root)
