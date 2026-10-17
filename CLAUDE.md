A mock mobile banking app built with React + Vite.

## Commands
- npm install: install dependencies
- npm run dev: start the dev server
- npm run build: production build

## Specs
- UI_spec.md: the source of truth for the UI (design system, layout, and all pages). Read it before any frontend work.
- txn_SOT_spec.md: the schema and rules for the transactions JSON file. Read it before creating or changing transaction data, or anything that reads it (e.g. the  balance or the Transactions page).
- If a spec is unclear or contradicts the code, ask rather than guess. Do not change the specs unless asked.

## Data
- src/data/transactions.json: transaction history (see txn_SOT_spec.md).
- src/data/user.json: the bank user's details. Use this rather than hardcoding user data.
- The balance is always calculated from transactions, never stored.
 