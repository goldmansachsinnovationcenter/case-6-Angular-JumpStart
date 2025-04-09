

describe("Pre-filled Login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should have pre-filled login credentials", () => {
    cy.get('[name="email"]').should('have.value', 'test@test.com');
    
    cy.get('[name="password"]').should('have.value', 'password1');
    
    cy.get('.btn-success').should('not.be.disabled');
  });

  it("should successfully login with pre-filled credentials", () => {
    cy.get('.btn-success').click();
    
    cy.url().should('include', '/customers');
    
    cy.get('[data-cy="login-logout"]').should('contain', 'Logout');
  });
});
