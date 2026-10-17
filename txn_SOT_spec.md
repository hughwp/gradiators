# Data Spec: Transactions SOT (Source of Truth) JSON File

## 1. Overview
A JSON file containing the user's mock transaction history for Gradiators Banking. It is the single source of truth for the Transactions page, including the account balance, which is calculated from it.

## 2. Location & format
- Path: src/data/transactions.json
- A single JSON array of transaction objects.
- Currency: GBP (£) for all transactions.

## 3. Schema
Each transaction object has the following fields:

| Field         | Type   | Description                                         |
|---------------|--------|-----------------------------------------------------|
| id            | string | Unique identifier, e.g. "txn_001"                   |
| date          | string | ISO 8601 date and time, e.g. "2026-10-01T14:32:00Z" |
| merchantName  | string | Name of the merchant or person                      |
| amount        | number | Positive number, 2 decimal places, e.g. 24.99       |
| direction     | string | "in" (paid in) or "out" (paid out)                  |
| reference     | string | Payment reference or description                    |


## 4. Example
[
  {
    "id": "txn_001",
    "date": "2026-10-01T09:00:00Z",
    "merchantName": "Gradiators Payroll",
    "amount": 2100.00,
    "direction": "in",
    "reference": "October salary"
  },
  {
    "id": "txn_002",
    "date": "2026-10-02T18:45:00Z",
    "merchantName": "Tesco",
    "amount": 42.18,
    "direction": "out",
    "reference": "Card payment"
  }
]

## 5. Rules
- Balance = sum of all "in" amounts minus sum of all "out" amounts.
- Amounts are always positive; direction determines whether money was paid in or out.
- The file should contain around 20 transactions covering a mix of incoming and outgoing payments.