/// <reference types = "cypress" />

// setup instructions that run before each test
beforeEach('login to the application', function () {
    cy.visit('/')

    cy.login('standard_user', 'secret_sauce')

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