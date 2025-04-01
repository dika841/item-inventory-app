describe("My First Test", () => {
  it("Visits the inventory page", () => {
    cy.visit("http://localhost:3000");
    cy.get("#add-item").should("be.visible");
    cy.get("#add-item").should("contain", "Add Item");
    // cy.get("#add-item").click();
  });
});
