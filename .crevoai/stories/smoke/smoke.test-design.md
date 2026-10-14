---
feature: smoke
source_story: .crevoai/stories/smoke/smoke.story.md
status: approved
story_version: 1
design_revision: 1
structure: Story -> Feature Area -> Test Scenario -> Test Case -> Test Steps
---

# Test Design — Smoke Check

## FA-00-1: Application is reachable at the configured base URL

```gherkin
As an anonymous visitor
I want to open the application at the base URL
So that I can verify the application is running and accessible

Background:
  Given the application server is running
```

## Test Scenarios and Test Cases

### TS-SMOKE-01 — Verify Base URL Reachability

**Feature area:** FA-00-1 · **ACs:** AC-1
**Objective:** Confirm the application server responds to requests at the base URL without authentication.

```gherkin
Scenario: Reach application base URL
  Given the application server is running
  When an anonymous visitor navigates to the base URL
  Then a valid page response is returned
```

#### TC-SMOKE-001 — Open Base URL and Confirm Response

| Field      | Value                                       |
| ---------- | ------------------------------------------- |
| Covers AC  | AC-1 (FA-00-1)                              |
| Type       | Positive                                    |
| Technique  | EP                                          |
| Priority   | High                                        |
| Automation | Automated                                   |
| References | —                                           |

**Preconditions:**

- Application server is running and reachable at configured base URL

**Test Data:** Base URL (`/`)

| #   | Step                                      | Expected Result                                       |
| --- | ----------------------------------------- | ----------------------------------------------------- |
| 1   | Navigate to the application base URL (`/`) | Page responds with a valid status and loads the root UI |

**Cleanup:** None

## Out of Scope

- Authenticated flows: Verified in dedicated authentication test suites.
- Page content assertions: Verified in individual feature test designs.
- Navigation flows: Handled by feature-specific regression tests.
