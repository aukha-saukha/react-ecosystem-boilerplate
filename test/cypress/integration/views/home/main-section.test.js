describe('Home Page', () => {
  before(() => {
    cy.visit('/');
  });

  it('has the correct page info text.', () => {
    cy.get('[data-test="main"]').contains('Home page');
  });
});
