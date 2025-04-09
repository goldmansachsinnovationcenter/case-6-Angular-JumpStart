describe("Pagination Tests", () => {
  beforeEach(() => {
    cy.visit("/customers");
  });

  it("should navigate to next page", () => {
    cy.get('[data-testid="pagination"] li').eq(2).click(); // Click on page 2
    cy.url().should('include', 'page=2');
    cy.get('[data-testid="customer-card"]').should('have.length.gt', 0);
  });

  it("should navigate to previous page", () => {
    // First go to page 2
    cy.get('[data-testid="pagination"] li').eq(2).click();
    // Then go back to page 1
    cy.get('[data-testid="pagination"] li').first().next().click();
    cy.url().should('include', 'page=1');
  });
});
