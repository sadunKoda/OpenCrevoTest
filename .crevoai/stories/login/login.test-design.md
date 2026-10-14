---
feature: login
source_story: .crevoai/stories/login/login.story.md
status: approved
story_version: 1
design_revision: 2
structure: Story -> Feature Area -> Test Scenario -> Test Case -> Test Steps
---

# Test Design — Login

## FA-01-1: Valid login navigates to the product page

```gherkin
As a users.admin
I want to sign in with valid credentials
So that I can reach the product catalog

Background:
  Given a fresh session at the base URL
  And the login form is visible
```

## FA-01-2: A locked-out account is rejected on the login page

```gherkin
As a users.admin
I want a locked-out account to be rejected
So that a locked user cannot reach the product catalog

Background:
  Given a fresh session at the base URL
  And the login form is visible
```

## Test Scenarios and Test Cases

### TS-LOGIN-01 — Sign in and reach the product catalog

**Feature area:** FA-01-1 · **ACs:** AC-1
**Objective:** Confirm a valid login replaces the login form with the product catalog.

```gherkin
Scenario: Valid credentials reach the product catalog
  Given a fresh session at the base URL
  When the user signs in with valid credentials
  Then the product catalog is displayed with the Products heading
```

#### TC-LOGIN-001 — Sign in with the accepted standard account

| Field      | Value                          |
| ---------- | ------------------------------ |
| Covers AC  | AC-1 (FA-01-1)                 |
| Type       | Positive                       |
| Technique  | EP                             |
| Priority   | High                           |
| Automation | Automated                      |

**Preconditions:**

- A fresh session is open at the base URL
- The login form is visible
- Credentials are the accepted standard account shown on the login page

**Test Data:** Username `standard_user` and the password labeled for all users, supplied from environment variables

| #   | Step                                      | Expected Result                                   |
| --- | ----------------------------------------- | ------------------------------------------------- |
| 1   | Open the application at the base URL      | The login form is displayed                       |
| 2   | Enter the accepted standard username      | The username is shown in the username field       |
| 3   | Enter the password labeled for all users  | The password is entered                           |
| 4   | Submit the login form                     | The login form is replaced by the product catalog |
| 5   | Check the product catalog                 | The Products heading is visible                   |

**Cleanup:** None

### TS-LOGIN-02 — Reject the locked-out account

**Feature area:** FA-01-2 · **ACs:** AC-2
**Objective:** Confirm the locked-out account stays on the login page and shows a lockout error.

```gherkin
Scenario: Locked-out account is rejected
  Given a fresh session at the base URL
  When the user signs in with the locked-out account
  Then the login page shows that the user has been locked out
```

#### TC-LOGIN-002 — Sign in with the locked-out account

| Field      | Value                          |
| ---------- | ------------------------------ |
| Covers AC  | AC-2 (FA-01-2)                 |
| Type       | Negative                       |
| Technique  | EP                             |
| Priority   | High                           |
| Automation | Automated                      |

**Preconditions:**

- A fresh session is open at the base URL
- The login form is visible
- Credentials are the locked-out account shown on the login page

**Test Data:** Username `locked_out_user` and the password labeled for all users, supplied from environment variables

| #   | Step                                     | Expected Result                                              |
| --- | ---------------------------------------- | ------------------------------------------------------------ |
| 1   | Open the application at the base URL     | The login form is displayed                                  |
| 2   | Enter the locked-out username            | The username is shown in the username field                  |
| 3   | Enter the password labeled for all users | The password is entered                                      |
| 4   | Submit the login form                    | The user remains on the login page                           |
| 5   | Check the login error                    | The error says the user has been locked out                  |

**Cleanup:** None

## Out of Scope

- Invalid credentials: not requested.
- Password reset: no reset flow was captured.
- API authentication: this project is scaffolded for UI tests only.
