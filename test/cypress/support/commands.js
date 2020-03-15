/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { ROUTES } = require('../../../src/shared/routes/routes.schema');

// This function can be used to make cypress visit a randomly selected page.
Cypress.Commands.add('visitRandomlySelectedPage', () => {
  // Generate a random number between 0 and number of ROUTES minus 1.
  // 0 below could have been avoided, but it's used as minimum for the sake of clarity.
  const randomNumber = Math.floor(Math.random() * (ROUTES.length - 0)) + 0;

  cy.visit(ROUTES[randomNumber]['pathToMatch']);
});
