describe('auth guard', () => {
  it('redirects to login when accessing /app without token', () => {
    cy.visit('/app');
    cy.url().should('include', '/login');
  });
});

describe('login page', () => {
  it('logs in successfully', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password');
    cy.contains('Entrar').click();
    cy.url().should('include', '/app/overview');
  });

  it('shows error with invalid password', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('wrong');
    cy.contains('Entrar').click();
    cy.contains('Credenciais inválidas');
  });
});
