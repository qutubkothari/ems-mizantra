# Enquiry Management System (EMS)

EMS is the standalone, frontend-only Mizantra enquiry-management workspace.

- It reuses Mizantra's authentication, design system, shared components and CRM API contract.
- It is permanently configured for the Mizantra test environment through `EMS_TEST_API_URL`.
- It does not include or deploy its own database, API, or ERP modules.
- Internal API paths remain `/crm/*` for compatibility with the existing test backend; all user-facing labels are EMS / Enquiry Management System.
