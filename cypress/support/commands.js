// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// login command
Cypress.Commands.add('login', (username, password) => {
    // enter valid credentials
    cy.get('#user-name').click() // username
    .type(username)

    cy.get('#password').click() // password
    .type(password)

    cy.get('[data-test = login-button]')
    .click()
})

Cypress.Commands.add('completePurchase', function () {
        // add's an item, then goes to customer info page
        cy.get('[data-test = add-to-cart-sauce-labs-backpack]').click()
        cy.get('span[class = shopping_cart_badge').click()
        cy.get('[data-test = checkout]').click()

        // enter's info into the form
        cy.get('[data-test = firstName]').click()
        .type('Test')
        cy.get('[data-test = lastName]').click()
        .type('User')
        cy.get('[data-test = postalCode]').click()
        .type('90018')

        // goes to the checkout page
        cy.get('[data-test = continue]').click()
        cy.location('pathname').should('equal', '/checkout-step-two.html')

        // go to the confirmation page
        cy.get('[data-test = finish]').click()
        cy.location('pathname').should('equal', '/checkout-complete.html')
    })