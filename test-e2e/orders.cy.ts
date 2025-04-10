describe("Order Tests", () => {
  before(() => {
    // Login first
    cy.visit("/login");
    cy.get('[data-testid="email-input"]').type('asdf@asdf.com');
    cy.get('[data-testid="password-input"]').type('$asdf123$');
    cy.get('[data-testid="login-button"]').click();
  });

  beforeEach(() => {
    cy.visit("/orders");
    // Wait for data to load
    cy.wait(1000);
  });

  it("should display orders with correct pricing", () => {
    // First check if any orders exist
    cy.get('.orders-table').should('exist');
    cy.get('.text-right').should('exist');
    
    // Verify that the order total is the sum of individual items
    cy.get('.text-right').not('.summary-border .text-right').then($prices => {
      const total = Array.from($prices).reduce((sum, el) => {
        const price = parseFloat(el.textContent.replace(/[^0-9.-]+/g, ''));
        return sum + price;
      }, 0);
      
      cy.get('.summary-border .text-right').first().invoke('text').then(totalText => {
        const displayedTotal = parseFloat(totalText.replace(/[^0-9.-]+/g, ''));
        expect(Math.round(total * 100) / 100).to.equal(Math.round(displayedTotal * 100) / 100);
      });
    });
  });
});
