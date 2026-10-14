---
feature: login
status: approved
version: 1
layer: ui
---

# Login — reach the product page

Verify that a valid login reaches the product catalog, and that the locked-out account is rejected on the login page.

**Persona**
users.admin

# Feature

- [FA-01-1] Valid login navigates to the product page
- [FA-01-2] A locked-out account is rejected on the login page

# Acceptance Criteria

AC-1: A user with valid credentials reaches the product page after signing in
AC-2: A locked-out user remains on the login page and sees that the account is locked

## Valid credentials [AC-1]
Given a fresh session at the base URL
When the user signs in with valid credentials
Then the product catalog is displayed with the Products heading

## Locked-out account [AC-2]
Given a fresh session at the base URL
When the user signs in with the locked-out account
Then the login page shows that the user has been locked out

# Out of Scope

- Invalid credentials
- Password reset
- API authentication
