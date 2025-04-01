// cypress/support/cypress.d.ts
export {};

declare global {
  namespace Cypress {
    interface Chainable {
      waitForLoader(): Chainable<JQuery<HTMLElement>>;
    }
  }
}
