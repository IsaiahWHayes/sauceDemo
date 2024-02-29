/// <reference types = "cypress" />

beforeEach('visit the suace demo website', function () {
    cy.visit('/')
});

// successful login as a standard user
describe('standard user', function () {
    
    it('signs in as a standard user', function () {

        // login
        cy.login('standard_user', 'secret_sauce')
    
        // verify the correct URL redirect
        cy.location('pathname').should('equal', '/inventory.html')
    });
});


// attempt to login as a locked out user
describe('locked out user', function () {
    it("shows the correct error message", function () {

        // login as a locked out user
        cy.login('locked_out_user', 'secret_sauce')

        // verify the path and error messages
        cy.location('pathname').should('equal', '/')

        // verify the correct error message is displayed
        cy.get('h3[data-test="error"]')
        .should('contain', "Epic sadface: Sorry, this user has been locked out");
    });
});