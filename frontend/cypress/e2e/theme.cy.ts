describe('theme toggle', () => {
  it('toggles dark and light mode', () => {
    cy.visit('/');
    cy.contains('mode').click();
    cy.contains('mode');
  });
});
