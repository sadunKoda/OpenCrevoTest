---
name: crevoai
description: Guided workflow for grounded, conformant Playwright test design and generation (draft test design/stories, write, fix, stabilize, refactor, run, audit, coverage gaps, scaffold, CI).
---

# CrevoAI — Playwright Test Automation

Engage CrevoAI workflow for Playwright test tasks (design, write, fix, stabilize, refactor, run, audit, gaps, scaffold, CI). For general coding, docs, or questions, work directly without CrevoAI tools.

## Workflow Orchestration

1. **Initialize:** Call `crevoai_workflow()` (no args) → returns map + progress panel. Paths:
   - `write` (new tests) · `fix` (broken test) · `flaky` (stabilize) · `refactor` (no behavior change)
   - `gaps` (explore app) · `coverage` (AC coverage) · `smoke` (smoke suite) · `requirements` (from recording)
   - `bootstrap` (scaffold project) · `ci` (add/fix Playwright CI)
     If ambiguous, ask user one clarifying question.

2. **Loop:** `understand` → `ground` → `design` → `generate` → `execute` → `heal` → `audit`.
   Advance with updated `completed` and copy `progress_echo` from previous response:

   ```text
   crevoai_workflow(path="write", node="ground", from="understand", completed=["understand"])
   ```
   - **Design Gate (Mandatory STOP):** Structure test plan: Story → Feature Area (`FA-xxx`) → Scenario (`TS-xxx`) → Test Case (`TC-xxx`) → Steps (`test-design.template.md`). Save to `.crevoai/stories/<feature>/<feature>.test-design.md` alongside story. Present summary in chat; request sign-off via `crevoai_ask_user`. **Do NOT call `generate` until user approves.** Retain file reference through `audit`.
   - **Heal → Design Loop:** If heal triage reveals invalid AC/story/scenario, return to `design`: drop `design`, `generate`, `execute`, `heal` from `completed`. Track `design_revision: n` in frontmatter. Re-approval required. Max 2 redesigns before escalating.

3. **Directives & Branches:** Follow `progress_display.instruction`, `phase_instructions`, and `agent_directives`. Branches (e.g. `execute` → `heal` → `ground`) update `node`, `from`, `completed` accordingly.

## Core Rules

- **Workspace Isolation:** Operate strictly in current workspace. Never inspect, list, or copy parent/sibling directories. All artifacts, stories, configs belong exclusively here. Use `scaffold_project` to initialize.
- **Selectors & Tools:** Ground every locator via `browser_read` (live or recording). XPath-first. Serialize `browser_*` (1 call per `session_id`). `browser_diagnose` once if stuck, never to author selectors.
- **Interactive UI Control Grounding:** During `ground`, systematically inspect all control types before designing stories or test cases:
  - _Date / Time:_ Inspect picker popups, format constraints (ISO, localized), or relative ranges.
  - _Sliders & Draggers:_ Inspect `min`, `max`, `step`, and handle coordinates/selectors for `dragTo()`.
  - _Comboboxes & Dropdowns:_ Identify static options, async search-select triggers, and multi-select tags.
  - _Conditional & Dependent Fields:_ Track fields that dynamically appear, hide, enable, disable, or become required when another input changes.
  - _Rich & Masked Inputs:_ Identify phone/currency masks, input regexes, and character limits.
  - _Uploaders & Draggable Areas:_ Inspect accepted file extensions, size limits, and drop targets.
    _NEVER invent test data or assume control values blindly._ Present detected controls, option sets, and boundary ranges to the user via the interactive question form (`ask_question` / `crevoai_ask_user`) before finalizing scenarios (Happy path, boundary/edge limits, conditional branches, or custom values).
- **Code Generation:** Use `crevoai_generate_code create` once for new features, `register_page` for new pages, `add_test_cases` for new tests. Edit `.ts` directly for subsequent changes. `npm run audit` is the gate.
- **Structure:** `tests/` (specs), `pages/` (page objects), `panels/` (panels) — all `.ts`.
- **Traceability & Contract Conformance (STRICT):**
  - Line 1 header: `// spec: .crevoai/stories/<feature>/<feature>.story.md`
  - Scenario comment: Precede every `test()` block with `// scenario: <Matching Scenario or TC Name>`
  - Title tag: Starts with `[AC-n] [TC-<FEATURE>-<NNN>]` (e.g. `test('[AC-1] [TC-LOGIN-001] should ...')`). Never omit `[AC-n]` or `// scenario:`.
  - Exact count parity: Count of `test()` blocks in `tests/<feature>.spec.ts` MUST EQUAL designed test cases (`TC-*`) in `.crevoai/stories/<feature>/<feature>.test-design.md`.
  - Reporters: Output JSON results to `test-results/results.json` (or `--reporter=list,json`) for dashboard sync.
  - Reference:
    ```ts
    // spec: .crevoai/stories/login/login.story.md
    test.describe('Login', () => {
      // scenario: Valid Credentials
      test('[AC-1] [TC-LOGIN-001] should log in successfully', async ({ loginPage }) => { ... });
    });
    ```
- **7-Token Consistency:** Identical noun across story, `support/data/<x>/`, `<X>Page`, fixture `<x>Page`, `<x>Expected`, `tests/<x>.spec.ts`, and describe block.
- **Secrets:** `.env` via `process.env.X!` only. Never hardcode secrets in step arguments or extra quotes.
- **Out of Scope & Blocked Policy:**
  - `test.fixme` / Out of Scope requires concrete evidence (bug ID / DOM issue) + `[AC-n] [TC-<FEATURE>-<NNN>]`.
  - Missing environment data: use `test.skip(true, reason)` + annotate `{ type: 'blocked', description: '<field>: needs <value> for <upstream>' }`. Store valid combinations in `support/data/<feature>/`.
  - Audit: `fixme`, `blocked`, and Out of Scope count as "documented, not covered" (gate passes, zero coverage credit).

## Browser Gestures (`browser_act`)

Prefer `fill` for text inputs (`type` for keystroke-sensitive inputs). `hover` before `click` for menus. `dragTo()` via `ref` + `to_ref`. Upload using fixture samples during exploration; reference `support/data/<feature>/` in tests.

## Migration & Upgrade Flow ("Upgrade my project test structure with CrevoAI.")

Trigger: `"Upgrade my project test structure with CrevoAI."`
Upgrades legacy suites (flat stories, 1:1 AC mapping) to hierarchical nested test-design:

1. **Layout:** Move flat files in `.crevoai/stories/` to `.crevoai/stories/<feature>/<feature>.story.md` and `<feature>.test-design.md` (or run `crevoai.reorganizeStories`). Identify missing designs, `[TC-...]` tags, or `// scenario:` comments.
2. **Test Design Specs:** Create/update `.crevoai/stories/<feature>/<feature>.test-design.md` per template. Map ACs/BDD cases to `FA-xxx`, `TS-<FEATURE>-<NN>`, `TC-<FEATURE>-<NNN>`. Steps must be plain business language (never raw Playwright APIs). Frontmatter: `feature: <slug>`, `source_story: .crevoai/stories/<slug>/<slug>.story.md`, `status: approved`, `story_version: 1`, `design_revision: 1`, `structure: Story -> Feature Area -> Test Scenario -> Test Case -> Test Steps`.
3. **Spec Alignment:** Update `tests/<feature>.spec.ts` with Line 1 spec header, `// scenario:` comments, `[AC-n] [TC-<FEATURE>-<NNN>]` titles, and exact count parity. Preserve test bodies, assertions, locators, and fixtures untouched.
4. **Execution & Audit:** Configure `--reporter=list,json` to write `test-results/results.json`. Run `npm run audit` to confirm zero traceability/contract errors. Output migration summary.

## Communication Essentials

See [`refs/communication.md`](../refs/communication.md):

- **Live phase emission:** At each phase transition (`understand`, `scaffold`, `install`, `ground`, etc.), emit the `<details open>` phase checklist in chat so progress is visible in real time. Collapse on completion.
- **Findings-first:** Show evidence before asking questions or presenting options.
- **Milestone status:** Plain language with emojis (🔍 ground · 📝 understand · 📐 design · ⚙️ generate · ▶️ execute · 🩺 heal · 📊 coverage · ✅ audit) — one short line per step.
- **Implicit continuation:** Announce next step and proceed immediately without asking permission.
- **Discipline:** No internal jargon ("graph", "MCP", node IDs). Never ask questions via plain chat text; ALWAYS use the interactive question form (`ask_question` / `crevoai_ask_user`) with structured selectable options whenever input, sign-off, or clarification is needed. Finish with one status line + one next-step recommendation.
