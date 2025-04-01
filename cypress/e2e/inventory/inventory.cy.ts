import { inventoryPage } from "../../support/pages/inventory-page";

describe("Inventory Dashboard", () => {
  beforeEach(() => {
    inventoryPage.visit();
  });
  context("Inventory Table", () => {
    it("Should display the inventory table with data", () => {
      inventoryPage.elements.inventoryTable().should("be.visible");
      inventoryPage.elements.tableRow().should("have.length.greaterThan", 0);
    });
    it("Should display correct column", () => {
      const expectedColumn = [
        "Name",
        "Quantity",
        "Category",
        "Price",
        "Action",
      ];
      expectedColumn.forEach((column) => {
        inventoryPage.elements.inventoryTable().should("contain", column);
      });
    });
  });

  context("CRUD Operations", () => {
    before(() => {
      cy.fixture("inventory-items").as("items");
    });
    it("Should add new inventory item", function () {
      inventoryPage.addInventoryItem(this.items.validItem);

      inventoryPage.elements
        .notification()
        .should("be.visible")
        .and("contain", "Item added successfully");

      inventoryPage.validateTableRow(0, {
        name: this.items.validItem.name,
        quantity: this.items.validItem.quantity,
        purchasePrice: this.items.validItem.purchasePrice,
        categoryId: this.items.validItem.categoryId,
        sellingPrice: this.items.validItem.sellingPrice,
        id: this.items.validItem.id,
      });
    });
    it("Should show validation errors for invalid input", function () {
      inventoryPage.elements.addButton().click();
      inventoryPage.elements.saveButton().click();
      cy.get(".ant-form-item-explain-error")
        .should("have.length.at.least", 3)
        .and("contain", "Please input the name!")
        .and("contain", "Please input the quantity!")
        .and("contain", "Please input the purchase price!")
        .and("contain", "Please select a currency!")
        .and("contain", "Please select a category!");
      inventoryPage.elements.notification().should("not.exist");
    });

    it("Should Edit existing inventory item", function () {
      const newQuantity = 20;
      inventoryPage.elements
        .firstRow()
        .find(".ant-btn")
        .contains("Edit")
        .click();
      inventoryPage.elements
        .quantityInput()
        .clear()
        .type(newQuantity.toString());
      inventoryPage.elements.saveButton().click();

      inventoryPage.elements
        .firstRow()
        .should("contain", newQuantity.toString());
    });

    it("Should Delete existing inventory item", function () {
      inventoryPage.elements
        .firstRow()
        .find(".ant-btn")
        .contains("Delete")
        .click();
      inventoryPage.elements
        .notification()
        .should("be.visible")
        .and("contain", "Item deleted successfully");
    });
  });
});
