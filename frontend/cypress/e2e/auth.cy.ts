describe('auth guard', () => {
  it('redirects to login when accessing /app without token', () => {
    cy.visit('/app');
    cy.url().should('include', '/login');
  });
});
