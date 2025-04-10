describe("Pagination Tests", () => {
  beforeEach(() => {
    cy.visit("/customers");
    // Wait for data to load
    cy.wait(1000);
  });

  it("should navigate to next page", () => {
    // Check if pagination exists
    cy.get('.pagination').should('exist');
    // Click on page 2 (third li element - first is previous, second is page 1)
    cy.get('.pagination li').eq(2).click();
    cy.url().should('include', 'page=2');
    // Verify customer cards are displayed
    cy.get('.card').should('have.length.gt', 0);
  });

  it("should navigate to previous page", () => {
    // First go to page 2
    cy.get('.pagination li').eq(2).click();
    cy.wait(500);
    // Then go back to page 1 (click on previous arrow)
    cy.get('.pagination li').first().click();
    cy.url().should('include', 'page=1');
  });
});
