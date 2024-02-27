/// <reference types = "cypress" />

beforeEach('visit the suace demo website', function () {
    cy.visit('/')
});

// successful login as a standard user
describe('login as standard user', function () {
    
    it('adds the "standard user" credentials', function () {

        // login with valid credentials
        cy.get('#user-name').click()
        .type('standard_user')
        
        cy.get('#password').click()
        .type('secret_sauce{enter}')

        // verify the correct URL redirect
        cy.location('pathname').should('equal', '/inventory.html')
        cy.get('.app_logo').should('contain', "Swag Labs")
    });
});


// attempt to login as a locked out user
describe('login as a locked out user', function () {
    it("blocks the locked out user from signing in", function () {

        // login with the correct credentials for this locked out user
        cy.get('#user-name').click()
        .type('locked_out_user')

        cy.get('#password').click()
        .type('secret_sauce{enter}')

        // verify the path and error messages
        cy.location('pathname').should('equal', '/')

        cy.get('h3[data-test="error"]')
        .should('contain', "Epic sadface: Sorry, this user has been locked out");
    });
});