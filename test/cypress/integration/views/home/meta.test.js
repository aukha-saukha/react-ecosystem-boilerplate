/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('Home Page', () => {
  before(() => {
    cy.visit('/');
  });

  it('has the correct description.', () => {
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'React ecosystem boilerplate'
    );
  });

  it('has the correct title.', () => {
    cy.title().should('equal', 'React ecosystem boilerplate');
  });
});
