# Worklog

---
Task ID: 1
Agent: main (Z.ai)
Task: Build NHIT Admin CMS with super admin + department-level users; give user preview access after session reset

Work Log:
- Session reset had wiped the workspace; re-cloned subro88/nhit_website with PAT remote, moved app files to /home/z/my-project root, re-bound git worktree (core.worktree), reinstalled deps, restarted dev server (port 3000), verified all public pages 200.
- Extracted department data from src/data/departmentsData.ts (1629 lines) into src/data/departments.json via scripts/extract-depts.ts (bun); rewrote departmentsData.ts as typed JSON import wrapper. Site renders identically.
- Hid site Header/Footer on /admin routes via usePathname early-return in both client components.
- Built src/lib/auth.ts: cms-users.json auto-seed (gitignored), salted SHA-256 password hashes, HMAC-signed session cookies (7d), getSessionFromRequest, canEditDepartment, unauthorized/forbidden helpers.
- Built src/lib/cmsStore.ts: JSON read/write with atomic tmp+rename, rolling backups to cms-backups/ (max 20/file), slugify, date helpers.
- Built src/lib/noticesStore.ts + src/lib/blogStore.ts: notice MDX+index writer, blog posts CRUD helpers.
- API routes under /api/admin: login, logout, session, departments (list), departments/[slug] (GET/PUT scoped), notices (GET/POST), notices/[slug] (PUT/DELETE ownership-checked), blog (GET/POST SA-only), blog/[id] (PUT/DELETE SA-only), users (GET SA-only, PUT self-or-SA password reset).
- src/middleware.ts: redirects /admin/* without session cookie to /admin login.
- Admin UI: /admin login page + LoginForm; AdminShell (dark sidebar, role-aware nav, mobile drawer, logout); DashboardHome (role-based cards + change-password card); /admin/departments list (SA); DeptEditor ([slug] — Content Form tab for basic/HOD/stats/long-text + Advanced JSON tab with validation); NoticesManager (list, post/edit/delete modal, dept auto-tagging, ownership-scoped actions); BlogManager (SA CRUD); UsersManager (SA list + password reset).
- Verified by curl/browser: login ok/wrong-pw, session, dept list scoping (hod.ce sees only civil), dept GET/PUT blocked cross-dept, blog+users blocked for dept users, notice create→public 200→delete→404, dept tagline edit appears on live page instantly then reverted clean, all admin pages 200 with cookie, 307 without, tsc --noEmit clean after excluding skills/scripts.
- .gitignore: added cms-users.json, cms-secret.txt, cms-backups/, workspace dirs; verified sensitive files ignored via check-ignore.

Stage Summary:
- Admin CMS v1 live at /admin. Super admin: admin / NHIT@Admin2026. Dept users: hod.cst|hod.me|hod.ee|hod.ce|hod.etce|hod.ae / nhit@dept123 (each locked to own dept page + own notices; can change password).
- Content files stay git-tracked (departments.json, notices-index.json + MDX, posts.json); all edits are push-ready pending user "push" command.
- Pending next phases: home page section editor, image upload, optional MDX advanced editor for posts.

---
Task ID: phase2-cms
Agent: main
Task: Phase 2 CMS — photo upload system + full home page editor + message page editors + info pages manager + blog cover photos

Work Log:
- Built /api/admin/upload (POST upload with MIME + magic-byte checks, 5MB limit; GET library listing of public/uploads + public/images; DELETE for uploads only). Super admin only.
- Built ImagePicker (modal picker with upload + uploaded + bundled tabs) used across all editors; ImageLibraryManager page at /admin/images.
- Extracted ALL home page content into src/data/homepage.json (seeded via scripts/seed-homepage.ts importing PlacementRadar branchDataset + CareerJourney STAGES).
- Refactored 12 home components (HeroSlider, FeaturesGrid, AboutSection, NewsTicker, CountersSection, CourseGridSection, OutcomesSection, RecruiterWall, PlacementRadar, CareerJourney, TestimonialsSection, CampusGallery, LeadCaptureSection) to take data props; page.tsx filters by per-section visible flag.
- Built HomeEditor (13 schema-driven tabs with form + list editors + per-section Advanced JSON + show/hide toggles) at /admin/homepage + /api/admin/homepage GET/PUT.
- Extracted messages into src/data/messages.json; refactored principal/VP/president-secretary pages to MessagePageLayout/MessageArticle; built MessagesEditor (4 person tabs, photo picker, paragraphs with **bold**) at /admin/messages + /api/admin/messages.
- Extracted 4 info pages (RTI, anti-ragging, quality-policy, approvals) into src/data/pages.json with a typed section model (text/quote/officerCards/steps/table/objectives/grid/approvals/helplines/banner); built CmsContentPage renderer + PagesEditor (section add/remove/reorder + per-type forms + Advanced JSON) at /admin/pages + /api/admin/pages.
- BlogManager: replaced raw "Image path" input with ImagePicker cover photo field.
- Sidebar nav updated: Dashboard, Home Page, Photo Library, Message Pages, Info Pages, Departments, Notices, Blog, Users.
- Tests: tsc --noEmit clean; all 20 public pages + 6 dept pages 200; home sections render from JSON; upload→serve→list→delete OK; homepage/messages/pages PUT reflect live instantly and reverted; dept users blocked (403) from upload/homepage/messages/pages; bad file type rejected.

Stage Summary:
- Live preview: https://preview-web-2b82d1cd-25bc-43cd-89b8-02a05c507f6f.space-z.ai/
- Login: admin / NHIT@Admin2026 (super), hod.* / nhit@dept123 (dept)
- Next candidates: mandatory-disclosure + about-society + big pages (about/admissions/contact/infrastructure/student-life/iti-courses) into pages.json; notices cover images; push to GitHub on user command.

---
Task ID: 3
Agent: main
Task: Push to GitHub + department page deep-dive (every detail editable)

Work Log:
- Attempted push: remote PAT (github_pat_..., 93 chars) is READ-ONLY — git push 403 "Permission denied", API ref-create "Resource not accessible by personal access token". Both commits are safe locally on main (db29cf8 CMS phases 1+2, fa47ee6 dept deep-dive). Push pending a new token with Contents: Read and write.
- Extracted shared editor kit: src/components/admin/editorKit.tsx (Spec types incl. new imglist, deepGet/deepSet, SpecFields, ListEditor); refactored HomeEditor to import it (scripts/refactor-homeeditor.py).
- DeptEditor v2 rewrite: 13 schema tabs (Basics incl. stats card fields, Hero Photos & HUD via imglist, Pillars, HOD, Labs, Subjects sems.1–6, Events, Projects, Testimonials, Careers, FAQs, Admission CTA) + Faculty Roster tab (instant-save CRUD) + Advanced JSON. accentRgb auto-derives from accentHex.
- Faculty roster: src/lib/facultyStore.ts + /api/admin/faculty (GET/POST) + /api/admin/faculty/[id] (PUT/DELETE); dept users scoped to own department on every verb (GET forced to own dept, PUT/DELETE 403 cross-dept, POST department tag forced). content/faculty/faculty-roster.json now git-tracked editable content.
- departments.json schema: added cta {badge,heading,subtext,applyLabel,applyHref,phoneLabel,phone}, cardImage, cardLabs (seeded original card lines via scripts/seed-cardlabs.py).
- Dept detail page: bottom admission CTA now reads dept.cta with site-wide fallbacks; "Explore Other Disciplines" nav derived from departmentsData sorted by order (code suffix _NN stripped).
- /departments listing page refactored from hardcoded stale array to departmentsData (fixes previously broken card images hero-cse.jpg etc. — now real dept hero photos); stats line composed from editable stats; cardLabs/cardImage overrides.
- Tests: tsc clean; faculty CRUD create/edit/delete as SA → live dept page reflects instantly → reverted; hod.me GET forced to own dept (10 rows), PUT/DELETE cross-dept 403, forged POST department auto-corrected; dept PUT with test CTA+HUD → live 200 render → reverted from cms-backups; all 6 dept pages + /departments + admin editors 200; hod.me cross-dept editor API 403.

Stage Summary:
- Department pages are now 100% CMS-editable for both super admin and dept HODs, including faculty roster with photos and the bottom admission CTA.
- Push still BLOCKED: user must create a new GitHub fine-grained PAT with Contents: Read and write for subro88/nhit_website and share it, then `git push origin main` will deliver both commits.

---
Task ID: 4
Agent: main
Task: Push to GitHub after user renewed PAT permissions

Work Log:
- User reported the GitHub token permission was updated. Ran `git push origin main` — succeeded: 927b434..fa47ee6 main -> main.
- Verified origin/main now at fa47ee6 (CMS phases 1+2 db29cf8 + department deep-dive fa47ee6); working tree clean.

Stage Summary:
- All CMS work (auth, dept editors, notices, blog, users, photo upload, image library, home page editor, message pages, info pages, full department deep-dive) is now on github.com/subro88/nhit_website main branch.


