import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 1500000,

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'always' }]], // Generates the HTML report

  /* Expect timeout for assertions */
  expect: {
    timeout: 10000, // 10 seconds
  },

  use: {
    headless: false,
    viewport: null,
    launchOptions: {
      args: ['--start-maximized'],
    },
      /* Action timeout for clicks, fill, hover, etc */
    actionTimeout: 60000, // 60 seconds
    
    /* Capture screenshots for every test failure */
    screenshot: 'only-on-failure', 

    /* Record video for every test (or 'retain-on-failure') */
    video: 'retain-on-failure', 

    /* Record traces for every test (standard for debugging) */
    trace: 'on',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        viewport: null,
        launchOptions: {
        args: ['--start-maximized'],
        },
      },
    },
  ],
});