describe("Order Tests", () => {
  before(() => {
    // Login first
    cy.visit("/login");
    cy.get('[data-testid="email-input"]').type('asdf@asdf.com');
    cy.get('[data-testid="password-input"]').type('$asdf123$');
    cy.get('[data-testid="login-button"]').click();
    cy.url().should('include', '/customers');
  });

  beforeEach(() => {
    cy.visit("/orders");
    // Wait for data to load
    cy.wait(1000);
  });

  it("should display orders with correct pricing", () => {
    // Check if any orders exist by looking for the table
    cy.get('table.orders-table').should('exist');
    
    // Get all price cells (excluding the total row)
    cy.get('table.orders-table tr:not(.summary-border) td.text-right').then($prices => {
      if ($prices.length === 0) {
        // Skip test if no prices found
        cy.log('No order prices found to verify');
        return;
      }
      
      let total = 0;
      Array.from($prices).forEach(el => {
        const price = parseFloat(el.textContent.replace(/[^0-9.-]+/g, ''));
        if (!isNaN(price)) {
          total = Math.round((total + price) * 100) / 100;
        }
      });
      
      // Get the displayed total
      cy.get('table.orders-table tr.summary-border td.text-right').first().invoke('text').then(totalText => {
        const displayedTotal = parseFloat(totalText.replace(/[^0-9.-]+/g, ''));
        if (!isNaN(displayedTotal)) {
          const roundedTotal = Math.round(total * 100) / 100;
          const roundedDisplayed = Math.round(displayedTotal * 100) / 100;
          expect(roundedTotal).to.equal(roundedDisplayed);
        }
      });
    });
  });
});
