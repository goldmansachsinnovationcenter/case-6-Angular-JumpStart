describe("Login Tests", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should login successfully with correct credentials", () => {
    cy.get('[data-testid="email-input"]').type('asdf@asdf.com');
    cy.get('[data-testid="password-input"]').type('$asdf123$');
    cy.get('[data-testid="login-button"]').click();
    cy.url().should('include', '/customers');
  });

  it("should show error with invalid email", () => {
    cy.get('[data-testid="email-input"]').type('invalid-email');
    cy.get('[data-testid="email-input"]').blur();
    cy.get('[data-cy="email-error"]').should('be.visible');
  });

  it("should show error with invalid password", () => {
    cy.get('[data-testid="password-input"]').type('123');
    cy.get('[data-testid="password-input"]').blur();
    cy.get('[data-cy="password-error"]').should('be.visible');
  });
});
