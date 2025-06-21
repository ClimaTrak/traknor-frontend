describe('top navigation drawer', () => {
  it('opens drawer and navigates', () => {
    cy.visit('/');
    cy.viewport(400, 800);
    cy.get('[aria-label="Toggle navigation"]').click();
    cy.contains('Ativos').click();
    cy.url().should('include', '/app/assets');
  });
});
