# Build a Complete Transflow Merchant Suite React Application

You are a **senior product designer and senior frontend engineer** building a production-quality B2B fintech application from scratch.

Create a complete React application called **Transflow Merchant Suite**.

The attached reference screens define the intended **product experience, information architecture, interaction model, visual direction, and level of polish**. Do not merely reproduce individual screenshots. Infer the complete system behind them and build a coherent application in which every important flow is navigable and functional.

The product is a **central merchant portal plus a suite of financial applications**. A merchant signs up once, manages one or more businesses, completes onboarding, configures financial products, manages users and permissions, and launches individual applications from a shared product suite.

---

# 1. Product Concept

Think of Transflow Merchant Suite similarly to a business-oriented Microsoft 365 or Google Workspace.

There are two layers:

### Merchant Suite

The central control plane for:

* Authentication
* Merchant onboarding
* Business management
* Product discovery
* Product setup
* User/access management
* Approvals
* Configuration
* Support
* Notifications
* Audit/activity
* Application switching

### Individual Applications

Products available through the suite, including:

* RPay
* TransPay
* Accounts
* Settlements
* Standing Orders
* Direct Debit
* SMS

Each application may have its own operational interface while still belonging to the Transflow ecosystem.

The user should always understand:

1. Which business they are acting on behalf of.
2. Which application they are currently using.
3. Whether that application is available, being configured, awaiting approval, or active.
4. How to return to the Merchant Suite.
5. How to switch to another application.

---

# 2. Technical Requirements

Build this as a modern React application.

Use:

* React
* TypeScript
* Vite
* React Router
* Tailwind CSS
* shadcn/ui where appropriate
* Lucide icons
* React Hook Form
* Zod validation

Use a clean component architecture.

Suggested structure:

```text
src/
  app/
  components/
    layout/
    navigation/
    merchant/
    onboarding/
    products/
    configuration/
    approvals/
    users/
    common/
  pages/
    auth/
    onboarding/
    suite/
    business/
    products/
    accounts/
    approvals/
    users/
    support/
  data/
  hooks/
  lib/
  types/
```

Do not build one enormous component.

Create reusable primitives for:

* Application icons
* Product cards
* Status badges
* Merchant selector
* Application switcher
* Side navigation
* Top navigation
* Progress indicators
* Setup stepper
* Timeline
* Empty states
* Action-required panels
* Confirmation dialogs
* Form fields
* File uploads
* Permission selectors
* Configuration comparison
* Notifications
* Drawers
* Modals

Use realistic mock data and a mock service/data layer so interactions behave like a real application.

Persist useful demo state in `localStorage` where appropriate so refreshing does not completely reset the experience.

---

# 3. Visual Direction

Follow the attached screens closely for the overall design language.

The interface should feel:

* Modern
* Enterprise
* Financial
* Minimal
* Calm
* Trustworthy
* Spacious
* Highly structured
* Production-ready

Avoid excessive gradients, giant cards, unnecessary illustrations, excessive shadows, oversized text, decorative dashboards, and visual clutter.

Use a predominantly:

* White / very light neutral workspace
* Deep navy navigation
* Transflow blue primary actions
* Muted gray borders
* Restrained status colors

Use approximately:

```text
Primary blue: #0B63F6
Deep navy: #041E49 / similar
Background: #F7F9FC
Border: #E5E7EB
Primary text: #0F1F46
Secondary text: #667085
Success: restrained green
Warning: restrained amber
Danger: restrained red
```

Do not blindly apply these colors everywhere. Use them as a coherent design system.

Typography should resemble modern enterprise products such as Stripe, Linear, Microsoft, Ramp, Brex, and modern banking platforms.

Favor whitespace and hierarchy over decoration.

---

# 4. Authentication

Create:

### Sign In

Support mock sign-in with:

* Email
* Password
* Google
* Microsoft
* Apple

Include:

* Forgot password
* Remember me
* Create account

### Create Account

Reproduce the general experience represented by the reference.

The user can:

* Continue with Google
* Continue with Microsoft
* Continue with Apple
* Create an account using work email/password
* Accept Terms of Service and Privacy Policy

The user must also choose:

**Set up a new business**

or

**Join an existing business**

If joining an existing business, provide an invitation-based flow.

Do not overcrowd this screen.

---

# 5. New Merchant Onboarding

Create a complete onboarding journey.

Suggested stages:

```text
1. Account
2. Business
3. People
4. Verification
5. Products
6. Review
```

The flow should collect realistic information such as:

### Business Information

* Registered business name
* Trading name
* Registration number
* Tax number
* Business type
* Industry
* Country
* Address
* Website
* Phone
* Business email

### Business Representatives

* Directors
* Owners
* Authorized representatives
* Primary administrator

### Verification

Allow upload of mock:

* Certificate of incorporation
* Business registration
* Proof of address
* Identification
* Tax documents

### Products

Allow the merchant to select applications they are interested in.

For example:

* RPay
* TransPay
* Accounts
* Settlement
* Standing Orders
* Direct Debit
* SMS

Explain each product briefly.

### Review

Show a clean summary before submission.

Allow:

* Edit section
* Save and exit
* Submit for review

---

# 6. Onboarding Status Experience

After submission, the merchant should enter the Merchant Suite even if onboarding is not complete.

This is important.

Do NOT simply block the user behind a "pending" page.

Create an onboarding-aware Suite Home.

Show:

**Onboarding in review**

with:

* Submission date
* Estimated review time
* Progress
* Current stage

Create a vertical progress timeline similar to:

```text
✓ Account created
✓ Business information
✓ Documents submitted
◷ Verification — In review
○ Products — Waiting
```

The merchant should be able to see exactly where they are.

---

# 7. Action Required

The onboarding system must support reviewer requests.

Example:

> Provide proof of business address

Show:

* What is required
* Why
* Requested date
* Due date
* Upload document action

Opening the action should display a modal or focused workflow.

Once submitted, update the state to something such as:

**Submitted — awaiting review**

Create several mock reviewer-request scenarios so the interface can demonstrate this capability.

---

# 8. Merchant Suite Home

Once the merchant is approved, the primary home should evolve from an onboarding dashboard into a product-oriented workspace.

Create a polished Suite Home.

Header:

```text
Good morning, Gideon
Choose an application or continue where you left off.
```

Include:

### Recently Used

Show recently accessed applications.

### Application Catalogue

Group applications into logical categories.

For example:

**Finance Apps**

* RPay
* TransPay
* Accounts
* Settlement

**Collections**

* Standing Orders
* Direct Debit

**Other Apps**

* SMS

Each product should have an appropriate status.

Possible statuses:

```text
Active
Available
Setup required
Setup in progress
Pending approval
Unavailable
Not selected
```

The CTA must change according to status:

```text
Open
Set up
Continue setup
View status
Request access
Learn more
```

Do not make unavailable products disappear.

---

# 9. Product Switcher

Create an application launcher accessible from the top navigation.

Use a grid/app-switcher icon.

Opening it should display a clean overlay or large popover.

Include:

* Suite Home
* Search products
* Categorized applications
* Recently used applications

For example:

```text
PAYMENTS
TransPay
RPay

COLLECTIONS
Standing Orders
Direct Debit

FINANCE
Accounts
Settlement

OTHER
SMS
```

Clicking an active product should navigate into that application.

Clicking an unconfigured product should begin setup.

This component must work throughout the application.

---

# 10. Business Context

A user can manage more than one merchant/business.

Create a persistent merchant selector.

Example:

```text
ACME
Acme Trading Ltd
```

Clicking it should open a business switcher.

Support:

* Switching businesses
* Viewing businesses
* Adding a business

Example businesses:

```text
Acme Trading Ltd
Nova Retail Ltd
Acme Distribution
```

Each business can have different:

* Onboarding status
* Applications
* Configurations
* Users
* Permissions

Changing business must update the UI context.

---

# 11. Add Another Business

Allow a merchant administrator to create another business from within the Suite.

Support two conceptual relationships:

### Independent Business

The user simply manages another separate merchant.

### Related / Sub-Merchant

The new business can be related to the current merchant through a supermerchant/sub-merchant relationship.

The interface should make this understandable without exposing unnecessary technical terminology.

The new business then follows the onboarding process.

---

# 12. Business Profile

Create:

**Business → Business Details**

Allow the merchant to see and update:

* Legal name
* Trading name
* Registration information
* Tax information
* Contact details
* Business address
* Website
* Representatives
* Uploaded documents

Clearly distinguish fields that can be immediately edited from regulated fields requiring review.

For sensitive changes, show:

> This change requires approval.

Submitting such changes should create a pending change request instead of immediately replacing the approved information.

---

# 13. Product Setup Experience

Products are not simply turned on.

Some require configuration.

When an administrator clicks **Set up** on a product, first display a setup gateway modal.

For example:

```text
Set up Accounts

Which business should use Accounts?

○ Use Acme Trading Ltd
  Approved business

○ Add a new business
  Start merchant onboarding for another business.
```

Also show prerequisites:

* Approved merchant profile
* Eligible account
* Administrator permission

And:

```text
Estimated setup: 5–8 minutes
Approval required
```

Then allow the user to continue.

---

# 14. Product Configuration Wizard

Build a reusable setup framework.

For Accounts, use something similar to:

```text
Business confirmed
      ↓
Link account
      ↓
Permissions
      ↓
Review
```

The left navigation should change to the application being configured.

Example:

```text
Accounts

Setup overview
Linked accounts
Permissions
Documents
Settings

Back to Merchant Suite
```

The merchant must always have a clear way back to the Suite.

---

# 15. Accounts Setup

Create a realistic Accounts setup experience.

### Link Account

Show available accounts such as:

```text
Operating Account ••••4587
Titan Trust Bank
Eligible

Reserve Account ••••2196
Guardian Commercial Bank
Eligibility review required
```

Allow:

* Selecting an account
* Adding another account
* Viewing eligibility status

Then configure capabilities such as:

```text
✓ View balances
✓ Download statements
✓ View account transactions
□ Initiate transfers
```

Some capabilities may require additional approval.

---

# 16. Permissions Setup

Create a permissions stage.

Allow the administrator to determine which users can:

* View balances
* View transactions
* Download statements
* Initiate transfers
* Manage configuration

Use a clean permission matrix or grouped controls.

Do not create an unnecessarily complicated IAM interface.

---

# 17. Setup Review

Before submission, display:

* Merchant
* Product
* Connected accounts
* Capabilities
* Users
* Permissions
* Documents
* Approval requirements

Allow the merchant to go back and edit individual sections.

CTA:

**Submit configuration**

After submission:

```text
Configuration submitted
Pending approval
```

---

# 18. Configuration Approval State

Create a product state for configurations awaiting review.

Show:

* Submitted date
* Submitted by
* Configuration version
* Current status
* Review timeline
* Reviewer requests
* Estimated review time

The merchant can continue using already-active configurations where applicable.

---

# 19. Active Configuration

Once approved, create:

**Accounts → Configuration**

Show:

```text
Accounts configuration
Active

Configuration version 1
Effective Aug 20, 2026
```

Summary:

* Merchant
* Connected account
* Permissions
* User access
* Last approved by
* Approval date

Primary action:

**Request a change**

---

# 20. Request Configuration Change

This is a key workflow.

Opening **Request a change** should display a modal over the normal configuration page.

Allow changing:

* Connected account
* Permissions
* User access

Show:

```text
Current value → Proposed value
```

Example:

```text
Operating Account ••••4587
        →
Reserve Account ••••2196
```

Collect:

* Reason for change
* Supporting document
* Proposed configuration

Include an impact summary explaining:

* Existing configuration remains active
* No change occurs until approval
* Users will be notified after activation

Actions:

```text
Cancel
Save draft
Review change
```

After review, allow submission.

---

# 21. Configuration Versioning

Treat configurations as immutable approved versions.

Example:

```text
Version 1 — Active
Version 2 — Pending approval
```

When Version 2 is approved:

```text
Version 1 — Superseded
Version 2 — Active
```

Create a configuration history view.

This should make auditability obvious without making the UI technical.

---

# 22. Users & Access

Create a central:

**Users & Access**

page.

Show:

* Name
* Email
* Role
* Business
* Applications
* Status
* Last active

Support:

* Invite user
* Edit user
* Suspend user
* Remove user
* Manage application access

Roles could include:

```text
Merchant Administrator
Finance Manager
Operations
Viewer
```

---

# 23. Merchant Administrator

The primary merchant administrator has broader capabilities.

They can:

* Manage business information
* Add businesses
* Configure applications
* Request configuration changes
* Invite users
* Assign application access
* Review requests
* Manage permissions

Regular users should only see applications they are entitled to use.

---

# 24. Access Requests

If a regular user tries to open an application without permission, show a proper access state.

Example:

```text
You don't currently have access to Accounts.

Accounts is active for Acme Trading Ltd, but your role does not include access.
```

Actions:

```text
Request access
Back to Merchant Suite
```

The administrator should then see:

```text
2 user access requests
```

inside their Action Required area.

---

# 25. Approvals

Create a central Approvals area.

Include tabs such as:

```text
Needs my approval
Submitted by me
Completed
```

Approval types can include:

* Product configuration
* Configuration change
* User access
* Business information change
* Account eligibility

Show meaningful information instead of just IDs.

---

# 26. Notifications

Create a notification centre.

Example events:

```text
Your business verification was approved.
Additional proof of address is required.
Accounts configuration has been approved.
Ama Mensah requested access to RPay.
Settlement configuration requires attention.
```

Notifications should navigate to the relevant object.

---

# 27. Action Required Panel

Suite Home should have a persistent, useful task area.

Examples:

```text
Complete Accounts setup
Settlement configuration pending approval
Review 2 user access requests
Provide proof of business address
```

Each item should have a clear next action.

Do not turn the home page into a giant analytics dashboard.

This is primarily an operational workspace.

---

# 28. Application Shells

Create lightweight operational shells for the major applications so navigation feels real.

Do not stop at empty placeholder pages.

## RPay

Possible navigation:

```text
Overview
Transactions
Customers
Reconciliation
Reports
Settings
```

## TransPay

```text
Overview
Payments
Beneficiaries
Mandates
Reports
Settings
```

## SMS

```text
Overview
Messages
Contacts
Templates
Reports
Settings
```

## Settlement

```text
Overview
Batches
Reconciliation
Reports
Configuration
```

## Accounts

```text
Overview
Accounts
Transactions
Statements
Users & access
Configuration
Reports
Settings
```

These pages can use mock financial data, but should look believable.

---

# 29. Contextual Application Navigation

When inside an application, the left navigation should belong to that application.

For example, inside Accounts:

```text
Overview
Accounts
Transactions
Statements
Users & access
Configuration
Reports
Settings

← Back to Merchant Suite
```

Do not keep the entire Merchant Suite navigation visible inside every product.

The Merchant Suite is the launcher/control plane.

The application is the operational workspace.

The app switcher in the top navigation remains available.

---

# 30. Product Status Model

Implement a central status model rather than scattering arbitrary strings through components.

Suggested states:

```ts
type ProductStatus =
  | "not_selected"
  | "available"
  | "setup_required"
  | "setup_in_progress"
  | "pending_approval"
  | "active"
  | "restricted";
```

UI behavior should derive from these statuses.

For example:

```text
active             → Open
available          → Set up
setup_required     → Set up
setup_in_progress  → Continue setup
pending_approval   → View status
restricted         → Request access
```

---

# 31. Merchant Status Model

Likewise support:

```ts
type MerchantStatus =
  | "draft"
  | "onboarding"
  | "action_required"
  | "in_review"
  | "approved"
  | "suspended";
```

The Suite Home should adapt to the merchant's status.

---

# 32. Demo Personas

Include multiple demo users.

### Gideon — Merchant Administrator

Full access.

### Ama — Finance Manager

Access to:

* RPay
* TransPay
* Accounts

Cannot manage the merchant.

### Kwame — Operations User

Access to:

* SMS
* Settlement

### New Merchant

Still completing onboarding.

Provide an easy development/demo mechanism to switch personas and merchant states.

---

# 33. Demo States

The application must demonstrate more than the happy path.

Seed scenarios for:

1. New account
2. Onboarding incomplete
3. Onboarding in review
4. Reviewer requested additional document
5. Merchant approved
6. Product available but not configured
7. Product setup in progress
8. Product pending approval
9. Product active
10. Configuration change pending
11. User without product access
12. Multiple businesses
13. Sub-merchant relationship
14. Pending user-access request

These states should be reachable without editing source code.

---

# 34. Responsive Behaviour

Primary target is desktop web, but make it responsive.

Desktop should resemble the supplied references.

For smaller screens:

* Collapse navigation
* Preserve business context
* Keep primary actions accessible
* Convert large tables appropriately
* Avoid horizontal overflow where practical

Do not merely shrink the desktop interface.

---

# 35. UX Rules

Follow these rules throughout the application.

### Rule 1 — Business context is persistent

The user should always know which merchant they are managing.

### Rule 2 — Product context is obvious

Inside an application, the application identity should be immediately clear.

### Rule 3 — Never hide important states

Pending approval, restricted access, incomplete setup, and action-required states must be clearly communicated.

### Rule 4 — Preserve active configurations

A requested configuration change does not alter the current configuration until approved.

### Rule 5 — Progressive disclosure

Do not show every possible option simultaneously.

### Rule 6 — Explain consequences

Before important submissions, explain what happens next.

### Rule 7 — Save and resume

Long onboarding/setup processes should autosave.

### Rule 8 — Keep financial interfaces calm

Avoid unnecessary visual noise.

### Rule 9 — Use modals correctly

When an action is contextual to an existing screen, preserve the underlying normal page and display the modal over it, as demonstrated by the references.

### Rule 10 — Do not create dead ends

Every screen should have an obvious next action or way back.

---

# 36. Important User Journeys

Make sure these complete journeys work.

### Journey A — New Merchant

```text
Sign up
→ Create business
→ Enter business information
→ Upload verification documents
→ Select products
→ Review
→ Submit
→ Merchant Suite
→ View onboarding progress
→ Respond to reviewer request
→ Approval
→ Products become available
```

### Journey B — Configure Product

```text
Suite Home
→ Accounts
→ Set up
→ Select existing business
→ Confirm prerequisites
→ Link bank account
→ Configure permissions
→ Review
→ Submit
→ Pending approval
→ Approved
→ Open Accounts
```

### Journey C — Configuration Change

```text
Accounts
→ Configuration
→ Request a change
→ Choose connected account
→ Compare current/proposed
→ Give reason
→ Upload supporting document
→ Review
→ Submit
→ Version 2 pending
→ Version 1 remains active
```

### Journey D — Add Business

```text
Business switcher
→ Add business
→ Choose independent/related business
→ Onboard business
→ Submit
→ Track status
→ Switch between businesses
```

### Journey E — User Access

```text
Administrator
→ Users & Access
→ Invite user
→ Assign products
→ User signs in
→ User sees only permitted products
→ User requests additional access
→ Administrator reviews request
```

### Journey F — Switch Applications

```text
RPay
→ Open application switcher
→ Select TransPay
→ Enter TransPay
→ Merchant context remains Acme Trading Ltd
```

---

# 37. Data Model

Create TypeScript models for at least:

```text
User
Merchant
MerchantRelationship
MerchantOnboarding
OnboardingStep
OnboardingRequest
Product
MerchantProduct
ProductConfiguration
ConfigurationVersion
BankAccount
Permission
Role
UserProductAccess
AccessRequest
Approval
Notification
AuditEvent
Document
```

Relationships should be realistic.

Do not create components that depend directly on hard-coded display strings when structured data would be more appropriate.

---

# 38. Mock Backend

Since this is initially a frontend implementation, create a clean mock service layer.

Example:

```text
services/auth.ts
services/merchants.ts
services/onboarding.ts
services/products.ts
services/configurations.ts
services/users.ts
services/approvals.ts
services/notifications.ts
```

Functions should mimic asynchronous API calls.

Example:

```ts
getMerchant()
getMerchantProducts()
updateBusinessDetails()
submitOnboarding()
uploadOnboardingDocument()
startProductSetup()
saveProductConfiguration()
submitConfiguration()
requestConfigurationChange()
inviteUser()
requestProductAccess()
approveRequest()
```

Use realistic loading states.

---

# 39. Required UX States

Every significant page should consider:

* Loading
* Empty
* Error
* Success
* Disabled
* Pending
* Action required

Use skeletons where appropriate.

Use toast notifications for lightweight confirmations.

Use dialogs for consequential actions.

---

# 40. Accessibility

Ensure:

* Semantic HTML
* Keyboard-accessible navigation
* Proper labels
* Visible focus states
* Accessible modals
* Sufficient contrast
* Icon buttons have accessible names
* Status is not communicated using color alone

---

# 41. Application Quality

Do not generate a prototype that merely looks correct in screenshots.

Build an application that feels usable.

Interactions should work.

Buttons should navigate or perform their stated actions.

Forms should validate.

Modals should open.

Merchant switching should work.

Product switching should work.

Onboarding progress should change.

Setup progress should persist.

Configuration requests should appear in pending state.

Approvals should affect state.

Access requests should affect user/product access.

Notifications should link to the appropriate screen.

---

# 42. Seed Data

Use realistic fictional data.

Primary merchant:

```text
Acme Trading Ltd
```

Example administrator:

```text
Gideon Okafor
```

Example accounts:

```text
Operating Account ••••4587
Titan Trust Bank

Reserve Account ••••2196
Guardian Commercial Bank
```

Example onboarding request:

```text
Provide proof of business address
Requested today
Due Aug 21, 2026
```

Do not use Lorem Ipsum.

---

# 43. Primary Navigation

Merchant Suite navigation should roughly contain:

```text
Home
Applications
Businesses
Users & Access
Approvals
Audit
Support
```

During onboarding it can be simplified.

The top bar should include:

```text
Merchant selector
Search
Help
Notifications
Profile
Application switcher
```

---

# 44. Search

Create a global search field.

Placeholder:

```text
Search payments, accounts, invoices and more
```

It does not need a sophisticated search engine, but should produce a useful command/search overlay containing mock results from:

* Applications
* Transactions
* Accounts
* Businesses
* Users

---

# 45. Audit

Create a simple audit/activity page.

Examples:

```text
Gideon submitted Accounts configuration
Ama requested access to Settlement
Compliance approved business verification
Gideon changed the primary business contact
Accounts configuration v2 was activated
```

Include:

* Actor
* Action
* Object
* Timestamp
* Status

---

# 46. Support

Create a basic Support area.

Include:

* Contact support
* Open support request
* Existing requests
* Request status

Support should also be contextually accessible from onboarding and product setup.

---

# 47. What Not to Do

Do NOT:

* Build only the screenshots.
* Make every section a card.
* Put every possible feature on the home screen.
* Create giant gradient hero sections inside the authenticated application.
* Use excessive icons.
* Use excessive rounded containers.
* Use unnecessary charts.
* Use random fintech statistics.
* Hide products simply because they are unavailable.
* Treat onboarding as completely separate from the Merchant Suite.
* Treat all applications as pages inside one giant sidebar.
* Immediately apply configuration changes requiring approval.
* Use placeholder buttons that do nothing.
* Create five different visual systems for five applications.
* Overdesign the UI.

---

# 48. Design Principle

The fundamental product model is:

```text
                  TRANSFLOW
                      │
              MERCHANT SUITE
                      │
       ┌──────────────┼───────────────┐
       │              │               │
   Businesses      Governance      Products
       │              │               │
  Onboarding       Users           RPay
  Details          Access          TransPay
  Documents        Approvals       Accounts
  Relationships    Audit           Settlement
                                  Standing Orders
                                  Direct Debit
                                  SMS
```

The Merchant Suite owns **identity, businesses, governance and product lifecycle**.

Individual applications own their **operational workflows**.

---

# 49. Implementation Order

Build the application in coherent stages.

### Phase 1

* Design system
* Router
* Mock data layer
* Authentication
* Global shell

### Phase 2

* Account creation
* Merchant onboarding
* Onboarding status
* Action required

### Phase 3

* Suite Home
* Product catalogue
* Product switcher
* Merchant switcher

### Phase 4

* Business management
* Add business
* Users & access

### Phase 5

* Product setup framework
* Accounts setup
* Setup review
* Approval state

### Phase 6

* Active configuration
* Configuration change request
* Configuration version history

### Phase 7

* Application shells
* Approvals
* Notifications
* Audit
* Support

### Phase 8

* Responsive refinement
* Accessibility
* Loading/error states
* UX polish

Do not stop after Phase 1 or after producing static screens. Continue until the complete application is implemented.

---

# 50. Final Standard

The finished product should feel like a credible **enterprise merchant banking platform**, not a generic admin template.

A user should be able to open the application and immediately understand:

> "This is where I manage my business relationship with Transflow and access all of my Transflow financial products."

A merchant administrator should feel that the Merchant Suite is the central place to:

> **Onboard → Manage Business → Configure Products → Manage Access → Handle Approvals → Launch Applications**

A regular merchant user should experience something simpler:

> **Sign in → Choose Business → Open Product → Do Work**

Use the supplied reference images as the strongest visual and experiential guide throughout implementation. Where a detail is unspecified, make a sensible enterprise UX decision consistent with the references rather than introducing a completely different design language.
