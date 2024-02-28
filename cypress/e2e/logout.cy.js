/// <reference types = "cypress" />

// setup instructions that run before each test
beforeEach('login to the application', function () {
    cy.visit('/')

    // enter valid credentials
    cy.get('#user-name').click() // username
    .type('standard_user')

    cy.get('#password').click() // password
    .type('secret_sauce{enter}')

    // verify the login is successful
    cy.location('pathname').should('equal', '/inventory.html')
});


// logout successfully
describe('logout successfully', function () {

    it('logs out and redirects correctly', function () {
        cy.get('#react-burger-menu-btn').click() // hamburger menu

        cy.get('#logout_sidebar_link').click() // logout button

        // verify the logout is successful
        cy.location('pathname').should('equal', "/");
    })
})