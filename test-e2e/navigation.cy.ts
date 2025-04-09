describe("Navigation Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should navigate to customers page", () => {
    cy.url().should('include', '/customers');
  });

  it("should navigate to orders page", () => {
    cy.get('a').contains('Orders').click();
    cy.url().should('include', '/orders');
  });

  it("should navigate to about page", () => {
    cy.get('a').contains('About').click();
    cy.url().should('include', '/about');
  });

  it("should navigate to login page", () => {
    cy.get('[data-cy="login-logout"]').click();
    cy.url().should('include', '/login');
  });
});
