<div align="center">
  <img src="assets/banner.svg" alt="my-wedding-invitation banner" width="100%">

  <p><code>A cinematic, mobile-first digital wedding invitation with RSVP, live countdown, polaroid gallery and love story.</code></p>

  <a href="https://sajid-weds-dilruba.vercel.app"><img src="https://img.shields.io/badge/LIVE_DEMO-sajid--weds--dilruba.vercel.app-6366f1?style=for-the-badge&labelColor=0B0E1A&logo=vercel&logoColor=8b7cf6" alt="Live demo"></a>
  <a href="https://github.com/Saji-d/my-wedding-invitation"><img src="https://img.shields.io/badge/SOURCE-GitHub-8b7cf6?style=for-the-badge&labelColor=0B0E1A&logo=github&logoColor=8b7cf6" alt="Source"></a>
  <img src="https://img.shields.io/badge/STATUS-LIVE-fb7185?style=for-the-badge&labelColor=0B0E1A" alt="Status live">
  <br>
  <img src="https://img.shields.io/badge/Next.js-16-0B0E1A?style=flat-square&logo=nextdotjs&logoColor=8b7cf6" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19-0B0E1A?style=flat-square&logo=react&logoColor=8b7cf6" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5-0B0E1A?style=flat-square&logo=typescript&logoColor=8b7cf6" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-0B0E1A?style=flat-square&logo=tailwindcss&logoColor=8b7cf6" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Framer_Motion-12-0B0E1A?style=flat-square&logo=framer&logoColor=8b7cf6" alt="Framer Motion">
  <img src="https://img.shields.io/badge/Swiper-12-0B0E1A?style=flat-square&logo=swiper&logoColor=8b7cf6" alt="Swiper">
  <img src="https://img.shields.io/badge/Vercel-deployed-0B0E1A?style=flat-square&logo=vercel&logoColor=8b7cf6" alt="Vercel">

  <p>
    <a href="#-overview">Overview</a> · <a href="#-highlights">Highlights</a> · <a href="#-preview">Preview</a> · <a href="#-architecture">Architecture</a> · <a href="#-tech-stack">Tech Stack</a> · <a href="#-getting-started">Getting Started</a> · <a href="#-project-structure">Structure</a> · <a href="#-roadmap">Roadmap</a> · <a href="#-author">Author</a>
  </p>
</div>

<img src="assets/divider.svg" alt="" width="100%">

## ◈ Overview

A personal project: the digital invitation for the wedding of Sajid and Dilruba. Instead of a static card, guests open an animated experience that tells the couple's story, shows the schedule, counts down to the day and lets them reply from their phone.

It is a single-page Next.js app. All the content (names, date, venue link, timeline, gallery captions, quotes, form field ids) lives in one typed config file, so the whole invitation can be re-skinned for another event without touching the components.

<img src="assets/divider.svg" alt="" width="100%">

## ◈ Highlights

<table>
  <tr>
    <td width="33%"><b>Cinematic entry</b><br>An opening screen with a tap to enter, which also starts the background music.</td>
    <td width="33%"><b>Live countdown</b><br>Days, hours, minutes and seconds to the ceremony, computed with date-fns.</td>
    <td width="33%"><b>Polaroid gallery</b><br>A Swiper card-stack gallery with autoplay, keyboard control and captions.</td>
  </tr>
  <tr>
    <td><b>Love story timeline</b><br>Six milestones from the first date to the wedding day, with photos.</td>
    <td><b>RSVP and guest wishes</b><br>Forms post straight to Google Forms, so replies land in a sheet with no backend. Confetti on acceptance.</td>
    <td><b>Scratch card reveal</b><br>A canvas scratch-off that uncovers the wedding date.</td>
  </tr>
  <tr>
    <td><b>Venue and directions</b><br>Venue section with a one-tap link to Google Maps.</td>
    <td><b>Music player</b><br>Background track with a mute toggle that remembers the choice in localStorage.</td>
    <td><b>Ambient effects</b><br>Floating petals, glass panels and a scroll-to-top button near the end.</td>
  </tr>
</table>

<img src="assets/divider.svg" alt="" width="100%">

## ◈ Preview

<div align="center">
  <img src="docs/preview.webp" alt="Invitation preview" width="85%">
</div>

Design language: burgundy, gold, champagne and ivory, set in Great Vibes, Playfair Display and Cormorant Garamond.

<img src="assets/divider.svg" alt="" width="100%">

## ◈ Architecture

```mermaid
flowchart LR
    CFG["config/wedding.ts<br/>content and form ids"] --> PAGE["app/page.tsx"]
    PAGE --> OPEN["OpeningScreen"]
    OPEN -->|tap to enter| MAIN["Sections"]
    MAIN --> S1["Hero, Blessing, ScratchCard"]
    MAIN --> S2["Countdown, LoveStory, Gallery"]
    MAIN --> S3["Events, Venue"]
    MAIN --> S4["RSVP, GuestWishes, Closing"]
    PAGE --> MUSIC["MusicPlayer"]
    S4 -->|POST no-cors| GF[("Google Forms")]
    MUSIC -.->|mute flag| LS[("localStorage")]
```

<img src="assets/divider.svg" alt="" width="100%">

## ◈ Tech Stack

| Layer | Technologies | Purpose |
|---|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript | Page shell, fonts, image optimisation |
| Styling | Tailwind CSS 4, CSS variables | Luxury theme and responsive layout |
| Motion | Framer Motion, Swiper (EffectCards) | Scroll reveals, transitions, gallery |
| Interaction | canvas-confetti, HTML canvas | Confetti and scratch card |
| Data | Google Forms (fire and forget POST) | RSVP and guest wishes, no server |
| Utilities | date-fns, react-icons | Countdown maths and icons |
| Hosting | Vercel | Deployment |

<img src="assets/divider.svg" alt="" width="100%">

## ◈ Getting Started

Prerequisites: Node.js 20 or newer and npm.

```bash
git clone https://github.com/Saji-d/my-wedding-invitation.git
cd my-wedding-invitation
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the build
npm run lint
```

No environment variables are needed. To adapt it, edit `src/config/wedding.ts` (names, date, venue link, timeline, gallery, form entry ids) and replace the files in `public/images` and `public/music`.

<img src="assets/divider.svg" alt="" width="100%">

## ◈ Project Structure

<details>
<summary>Show tree</summary>

```text
src/
  app/            layout.tsx, page.tsx, globals.css
  components/
    layout/       BackgroundEffects
    sections/     OpeningScreen, Hero, WordsFromTheHeart, IslamicBlessing,
                  ScratchCard, Countdown, LoveStory, Gallery, Events,
                  Venue, RSVP, GuestWishes, Quotes, Closing
    ui/           MusicPlayer
  config/         wedding.ts
public/
  images/         gallery, love_story
  music/
```

</details>

<img src="assets/divider.svg" alt="" width="100%">

## ◈ Roadmap

- [x] Animated entry, hero, countdown, gallery and love story
- [x] RSVP and guest wishes through Google Forms
- [ ] Remove unused dependencies (mapbox-gl, EmailJS and GSAP are installed but not imported)
- [ ] Move contact details out of the public config file
- [ ] Optional light and dark theme toggle

<img src="assets/divider.svg" alt="" width="100%">

## ◈ Author

**Sajidur Rahman Sajid** - Full-Stack Developer and AI engineer, Dhaka.

[Portfolio](https://www.sajidur.me) · [LinkedIn](https://www.linkedin.com/in/sajidur-rahman-sajid/) · [GitHub](https://github.com/Saji-d) · [Email](mailto:sajidsajidurrahman99@gmail.com)

<sub>Built with love for a very special day.</sub>
