describe('dashboard page', () => {
  it('renders metrics and charts', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password');
    cy.contains('Entrar').click();
    cy.url().should('include', '/app');
    cy.contains('OS Abertas');
    cy.contains('Status dos ativos');
  });
});
