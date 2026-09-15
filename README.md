# Enquiry Management System (EMS)

Standalone Mizantra frontend for enquiry capture, qualification, follow-up and conversion.

**Test deployment:** [https://ems.mizantra.ae](https://ems.mizantra.ae)

## Data boundary

This project is frontend-only. By default it proxies requests to the existing Mizantra **test** environment through `EMS_TEST_API_URL`. It does not contain migrations, backend services, or database credentials.

```bash
cp .env.example .env.local
npm install
npm run dev
```

The test API retains its current server routes for compatibility. The EMS product name is used throughout the standalone user interface.

## Before deployment

- Set `EMS_TEST_API_URL` to the intended test API origin.
- Confirm the deployed origin is permitted by the test API CORS policy.
- Do not point this frontend at live without a separate production approval and environment file.

The deployed EMS host proxies browser requests through its own `/api/v1/ems/*`
contract to the existing Mizantra test backend. It does not connect to a
separate database.
