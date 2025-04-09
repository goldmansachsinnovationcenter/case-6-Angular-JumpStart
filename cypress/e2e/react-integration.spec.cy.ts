
describe("React Integration", () => {
  beforeEach(() => {
    cy.visit("/");
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('authToken', 'demo-token');
    cy.reload();
  });

  it("should render React Navbar component", () => {
    cy.get('cm-navbar').should('exist');
    cy.get('.navbar-brand').should('contain', 'Customer Manager');
    cy.get('.nav.navbar-nav li').should('have.length.at.least', 3);
  });

  it("should render React Sidebar component", () => {
    cy.get('cm-sidebar').should('exist');
    cy.get('.sidebar-header').should('contain', 'Navigation');
    cy.get('.sidebar-nav li').should('have.length', 3);
  });

  it("should render React Shell component", () => {
    cy.get('cm-shell').should('exist');
    cy.get('.shell-header').should('contain', 'Application Shell');
  });

  it("should navigate between pages using React components", () => {
    cy.get('.sidebar-nav li').contains('Orders').click();
    cy.url().should('include', '/orders');
    
    cy.get('.sidebar-nav li').contains('About').click();
    cy.url().should('include', '/about');
    
    cy.get('.sidebar-nav li').contains('Customers').click();
    cy.url().should('include', '/customers');
  });

  it("should handle authentication state in React components", () => {
    cy.get('.user-info').should('contain', 'Logged In');
    
    cy.get('.user-info a').contains('Logout').click();
    
    cy.url().should('include', '/customers');
    cy.get('.user-info').should('contain', 'Login');
  });
});
