# Playwright UI & API Test Suites

This repository contains an automated testing framework built with Playwright and TypeScript.  
It includes UI tests for Sauce Demo and API tests for Airport Gap.  
UI tests run in Chromium, Firefox and WebKit. API tests use Playwright’s built-in request fixture.

## Prerequisites

- Node.js v18+
- npm

## Installation
git clone https://github.com/valeria20/controlup-autotests.git
cd controlup-autotests
npm install
npx playwright install

## Configuration
Create a .env file in the project root(see env.example):
UI_BASE_URL=<saucedemo-url>
API_BASE_URL=<airport-gap-url>
TEST_USERNAME=<saucedemo-user-name>
TEST_PASSWORD=<saucedemo-user-password>

## Running Tests
Run all tests (UI + API):
npm run tests

Run only UI tests (Chromium + Firefox + WebKit):
npm run ui-tests

## Project structure
.
├─ tests/
│  ├─ ui/
│  │  └─ inventoryItemsAndCartBadgeTests.spec.ts
│  ├─ api/
│  │  └─ airport.spec.ts
│  └─ fixtures/
├─ data/
│  ├─ apiEndpoints.ts
│  └─ airports.ts
├─ pages/
├─ playwright.config.ts
├─ package.json
├─ env.example
└─ .gitignore



