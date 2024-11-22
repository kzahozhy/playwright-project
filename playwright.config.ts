import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  // Folder for test artifacts such as screenshots, videos, traces, etc.
  outputDir: './test-results',
  // Each test is given 30 seconds.
  timeout: 60000,
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 5 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { outputFolder: 'report', open: 'never' }]],

  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: {mode:'on'},

    // Capture screenshot after each test failure.
    screenshot: 'only-on-failure',   
    // Maximum time each action such as `click()` can take. Defaults to 0 (no limit).
    actionTimeout: 10000,
    // Timeout for each navigation action in milliseconds
    navigationTimeout: 30000,
    // Whether to run browser in headless mode
    headless: process.env.CI ? true : false,
    //Sets viewport size for each page
    viewport: { width: 1920, height: 1080 },
    // Allows to automatically download all the attachments
  },
  expect: {
    // Maximum time expect() should wait for the condition to be met.
    timeout: 10000,
  },

  /* Configure projects for major browsers */
  projects: [
    /*{ //alternative way to get auth state and use it before each test
      name: 'setup', testMatch: /.*\auth.setup\.ts/ 
    },*/
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome']}// , storageState: 'auth/user.json'},
      //dependencies: ['setup']
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], channel: 'firefox' },
    },
  ],
});
