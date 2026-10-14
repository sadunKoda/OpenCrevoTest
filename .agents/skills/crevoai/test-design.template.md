# Test Design Specification Template

Save as `.crevoai/stories/<feature>/<feature>.test-design.md` alongside story.

---

feature: <feature_noun>
source_story: .crevoai/stories/<feature_noun>/<feature_noun>.story.md
status: draft
story_version: 1
design_revision: 1
structure: Story -> Feature Area -> Test Scenario -> Test Case -> Test Steps
---

# Test Design — <Feature Name>

## FA-<ID>: <Feature Area Title>

```gherkin
As a <persona>
I want to <action>
So that <business value>

Background:
  Given <precondition>
```

## Test Scenarios and Test Cases

### TS-<FEATURE>-<NN> — <Scenario Title>

**Feature area:** FA-<ID> · **ACs:** AC-1, AC-2
**Objective:** <Validation objective of this scenario>

```gherkin
Scenario: <Scenario description>
  Given <initial state>
  When <action taken>
  Then <expected outcome>
```

#### TC-<FEATURE>-<NNN> — <Test Case Title>

| Field      | Value                                                          |
| ---------- | -------------------------------------------------------------- |
| Covers AC  | AC-1 (<REQ-ID>)                                                |
| Type       | Positive / Negative / Boundary / End-to-End                    |
| Technique  | EP / BVA / UC / DT / ST                                        |
| Priority   | High / Normal / Low                                            |
| Automation | Automated / Blocked — needs <data> / test.fixme / Out of Scope |

**Preconditions:** <Prerequisite state and seeded data>
**Test Data:** <Specific inputs, field boundaries, or fixtures>

<!-- Steps MUST be in plain human business language (e.g. "User clicks Submit button"), NEVER raw Playwright code/APIs. -->

| #   | Step                   | Expected Result                                                             |
| --- | ---------------------- | --------------------------------------------------------------------------- |
| 1   | <User action or input> | <Expected UI/system state, e.g. Form submitted and success message appears> |

**Cleanup:** <Teardown or restore actions>

## Out of Scope

- <AC-n / Scenario / Flow>: <Reason citing concrete evidence, e.g. bug ID or observed environment limitation>.
