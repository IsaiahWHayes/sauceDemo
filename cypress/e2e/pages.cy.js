/// <reference types = "cypress" />

describe('be sure each webpage works', function () {

    beforeEach('visit the sauce demo website', function () {
        cy.visit('/')

        // login as standard user
        cy.login('standard_user', 'secret_sauce')

        // verify the login is successful
        cy.location('pathname').should('equal', '/inventory.html')

        // Check if "remove" button is displayed
        cy.get('.pricebar').children('.btn').then(($removeButton) => {
            if($removeButton.text().includes('Remove')) {
                cy.get('.btn.btn_secondary.btn_small.btn_inventory').click()
            }
        })
    })

    it('navigates to All Item\'s page', function () {
        cy.get('#react-burger-menu-btn').click() // hamburger menu
        
        cy.contains(/all items/i).click()
        cy.location('pathname', '/').should('exist')
    })

    it('navigates to About page', function () {
        cy.get('#react-burger-menu-btn').click() // hamburger menu

        cy.contains(/about/i).then(($about) => {
            cy.get($about).should('have.attr', 'href', 'https://saucelabs.com/')
        })
    })
})