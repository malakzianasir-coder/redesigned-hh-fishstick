# Project Rules & Guidelines — Hijaz Hospital

## 1. CMS & Editorial Notes Policy
- **DO NOT render CMS Notes / Editorial Notes (`.cms-note`, `editorialNote`, `chairpersonsNote`, etc.) anywhere on the patient-facing website.**
- CMS Notes present in design system mockups or source text extracts are internal editorial annotations only. They must never be displayed to end-users on production pages.

## 2. Task Tracking & Documentation Invariant
- **Maintain a Task Tracker:** Maintain and update an active markdown log/task tracker artifact (`task_tracker.md` or changelog) after completing any task or milestone.
- **Record notes, uncompleted items, and changes:** Always log what was changed, any blockers encountered, and remaining items before drifting into speculative tasks.

## 3. Branch & Scope Isolation
- **Strict Separation of Concerns:** Keep static frontend/content updates strictly separated from CMS backend integration.
- **Branch Rules:** 
  - Frontend visual/content changes (e.g. typography, label changes, static JSON cleanups) belong on `static-development`.
  - CMS schemas, database queries, and route wiring belong on `cms-integration`.
  - Never allow frontend UI modifications to leak into CMS integration commits.

## 4. CMS Data Integrity (AS-IS Policy)
- **Exact Data Parity:** CMS output from Payload and database inputs must match legacy JSON structure **AS-IS**.
- The patient-facing frontend pages must render identically without unexpected schema alterations or breaking visual changes.

## 5. Next.js SSR & Server Runtime Safety
- **Do not assume browser globals on the server:** In Next.js SSR / Node environments, `window` does not exist and experimental Node proxies (such as `localStorage`) can trigger proxy trap errors if mutated naively.
- Always isolate client-only API access to `useEffect` or safe runtime checks (`typeof window !== 'undefined'`).

# Design System for this project
@Design-System.md

# Component catalogue — when/how to use page building blocks (heroes, sections, donate)
@COMPONENTS.md

# Navigation — mega menu, hubs, and subpage URL rules
@NAVIGATION.md

# Content voice, kickers, hero support lines, anti-repetition
@Content-System.md
