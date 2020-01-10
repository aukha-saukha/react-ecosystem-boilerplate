describe('Home Page', () => {
  before(() => {
    cy.visit('/');
  });

  it('successfully loads.', () => {});

  it('is rendered as text/html.', () => {
    cy.document()
      .its('contentType')
      .should('eq', 'text/html');
  });
});
