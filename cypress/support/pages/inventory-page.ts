import { TInventoryResponse } from "@/api/inventory/type";

class InventoryPage {
  elements = {
    inventoryTable: () => cy.get(".ant-table"),
    tableRow: () => cy.get(".ant-table-row"),
    firstRow: () => cy.get(".ant-table-row").first(),
    addButton: () => cy.get("#add-item"),
    quantityInput: () => cy.get("#inventoryForm_quantity"),
    nameInput: () => cy.get("#inventoryForm_name"),
    priceInput: () => cy.get("#inventoryForm_purchasePrice"),
    categoryInput: () => cy.get("#inventoryForm_categoryId"),
    currencyInput: () => cy.get("#inventoryForm_currencyId"),
    saveButton: () => cy.get(".ant-btn").contains("Submit"),
    openDropdown: () =>
      cy.get(".ant-select-dropdown:not(.ant-select-dropdown-hidden)"),
    dropdownOption: () => cy.get(".ant-select-item-option"),
    notification: () => cy.get(".ant-notification-notice"),
  };
  visit() {
    cy.visit("http://localhost:3000");
    cy.waitForLoader();
  }

  addInventoryItem(item: TInventoryResponse) {
    this.elements.addButton().click();
    this.elements.nameInput().type(item.name);
    this.elements.priceInput().type(item.purchasePrice.toString());
    this.elements.quantityInput().type(item.quantity.toString());
    if (item.categoryId) {
      this.selectAntDropdown(
        this.elements.categoryInput(),
        item.categoryId as unknown as string
      );
    }
    if (item.currencyId) {
      this.selectAntDropdown(
        this.elements.currencyInput(),
        item.currencyId.toString()
      );
    }

    this.elements.saveButton().click();
  }
  private selectAntDropdown(
    triggerElement: Cypress.Chainable<JQuery<HTMLElement>>,
    optionText: string
  ) {
    triggerElement.click();

    this.elements
      .openDropdown()
      .should("be.visible")
      .find(".ant-select-item-option")
      .contains(optionText)
      .scrollIntoView()
      .click({ force: true });
  }
  validateTableRow(index: number, expectedValues: TInventoryResponse) {
    const row = this.elements.tableRow().eq(index);

    Object.entries(expectedValues).forEach(([key, value]) => {
      row.should("contain", value);
      row.should("have.keys", key);
    });
  }
}

export const inventoryPage = new InventoryPage();
