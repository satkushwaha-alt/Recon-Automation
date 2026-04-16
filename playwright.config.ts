import { defineConfig, devices } from '@playwright/test';
function getFolderName() {
  const testArg = process.argv.find(arg => arg.includes('tests/'));
  if (!testArg) return 'default-run';
  const normalized = testArg.replace(/\\/g, '/');
  const parts = normalized.split('/');
  const index = parts.indexOf('tests');
  if (index !== -1 && parts[index + 1]) {
    return parts[index + 1];
  }
  return 'default-run';
}
const folderName = getFolderName();

export default defineConfig({
  testDir: './tests',
  timeout: 1000000,

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  workers: 1,

  reporter: [
    ['html', {
      // This dynamically names the folder based on the current date and time
      outputFolder: `playwright-report/${folderName}/run-${new Date().toISOString().replace(/[:.]/g, '-')}`, 
      open: 'always' }],
    ['list'], // shows logs in terminal
  ],

   /* Expect timeout for assertions */
  expect: {
    timeout: 30000, // 30 seconds
  },

  use: {
    headless: false,
    viewport: null,
    

    launchOptions: {
      args: ['--start-maximized'],
    },

     /* Action timeout for clicks, fill, hover, etc */
    actionTimeout: 60000, // 60 seconds

    screenshot: 'only-on-failure',

    video: {
      mode: 'on',
      size: { width: 1920, height: 1080 }
    },

    trace: 'on', //  Always capture trace (not just retry)

    //  Enable HAR (network logs)
    contextOptions: {
      recordHar: {
        path: 'test-results/network.har',
        content: 'embed',
      },
    },
  },

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
      },
    },
  ],
  // projects: [
  //   /* -- Replaced chromium with Google Chrome -- */
  //   {
  //     name: 'Google Chrome',
  //     use: {
  //       // ...devices['Desktop Chrome'],
  //       channel: 'chrome', 
  //     },
  //   },
  // ],
});