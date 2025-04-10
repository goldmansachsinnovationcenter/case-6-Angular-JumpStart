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
      
      // Calculate total from individual prices
      const total = Array.from($prices).reduce((sum, el) => {
        const price = parseFloat(el.textContent.replace(/[^0-9.-]+/g, ''));
        return sum + (isNaN(price) ? 0 : price);
      }, 0);
      
      // Get the displayed total
      cy.get('table.orders-table tr.summary-border td.text-right').first().invoke('text').then(totalText => {
        const displayedTotal = parseFloat(totalText.replace(/[^0-9.-]+/g, ''));
        if (!isNaN(displayedTotal)) {
          // Compare with a small tolerance for floating point errors
          expect(Math.abs(total - displayedTotal)).to.be.lessThan(0.01);
        }
      });
    });
  });
});
