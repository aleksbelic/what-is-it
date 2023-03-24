describe('Homepage spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000');

    cy.title().should('eq', 'What is IT - API');
    cy.get('footer').should(
      'have.text',
      `Copyright © Aleksandar Belic, ${new Date().getFullYear()}`
    );
  });
});
