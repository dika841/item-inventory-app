// cypress/support/commands.ts

// 1. Extend Cypress types globally
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Wait for loading spinner to disappear
       * @example cy.waitForLoader()
       */
      waitForLoader(): Chainable<JQuery<HTMLElement>>;
    }
  }
}

// 2. Implement the command
Cypress.Commands.add("waitForLoader", () => {
  cy.get(".ant-spin-dot-spin", { timeout: 10000 }).should("not.exist");
});
