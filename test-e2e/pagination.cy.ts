describe("Pagination Tests", () => {
  beforeEach(() => {
    cy.visit("/customers");
    // Wait for data to load
    cy.wait(1000);
  });

  it("should navigate to next page", () => {
    // First check if pagination exists
    cy.get('ul.pagination').should('exist').then($pagination => {
      // Only proceed if there are multiple pages
      if ($pagination.find('li').length > 3) { // Previous, Page 1, Next at minimum
        cy.get('ul.pagination li').eq(2).click({ force: true });
        cy.url().should('include', 'page=2');
        
        // Verify customer cards are displayed
        cy.get('div.card').should('exist');
      } else {
        cy.log('Not enough pages to test pagination');
      }
    });
  });

  it("should navigate to previous page", () => {
    // First check if pagination exists
    cy.get('ul.pagination').should('exist').then($pagination => {
      // Only proceed if there are multiple pages
      if ($pagination.find('li').length > 3) { // Previous, Page 1, Next at minimum
        cy.get('ul.pagination li').eq(2).click({ force: true });
        cy.url().should('include', 'page=2');
        cy.wait(500);
        
        cy.get('ul.pagination li').first().click({ force: true });
        cy.url().should('include', 'page=1');
      } else {
        cy.log('Not enough pages to test pagination');
      }
    });
  });
});
