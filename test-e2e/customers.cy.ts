describe("Customer Management Tests", () => {
  beforeEach(() => {
    cy.visit("/customers");
  });

  it("should display customers in card view", () => {
    cy.get('[data-testid="card-view-link"]').click();
    cy.get('[data-testid="customer-card"]').should('have.length.gt', 0);
  });

  it("should display customers in list view", () => {
    cy.get('[data-testid="list-view-link"]').click();
    cy.get('[data-testid="customers-grid"]').should('be.visible');
  });

  it("should filter customers", () => {
    const filterText = "ze";
    cy.get('[data-testid="filter-input"]').type(filterText);
    cy.get('[data-testid="customer-card"]').should('have.length', 1);
  });

  it("should navigate to customer details", () => {
    cy.get('[data-testid="customer-card"]').first().find('a').first().click();
    cy.url().should('include', '/customers/');
    cy.url().should('include', '/details');
  });
});
