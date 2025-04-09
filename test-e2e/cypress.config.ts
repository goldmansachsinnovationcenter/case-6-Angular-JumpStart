import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    specPattern: "**/*.cy.ts",
    supportFile: false
  },
  viewportWidth: 1024,
  viewportHeight: 768,
  chromeWebSecurity: false
});
