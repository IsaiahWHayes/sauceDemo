/// <reference types = "cypress" />

// tests to be run
describe('select and purchase an item', function () {

    // login before running the tests
    beforeEach('login as a standard user', function () {
        cy.visit('/')

        // enter valid credentials
        cy.get('#user-name').click() // username
        .type('standard_user')

        cy.get('#password').click() // password
        .type('secret_sauce{enter}')

        // verify the login is successful
        cy.location('pathname').should('equal', '/inventory.html')

        // Check if "remove" button is displayed
        cy.get('.pricebar').children('.btn').then(($removeButton) => {
            if($removeButton.text().includes('Remove')) {
                cy.get('.btn.btn_secondary.btn_small.btn_inventory').click()
            }
        })
    });

    afterEach('reset the application state', function () {
        // resets the application state
        cy.get('#react-burger-menu-btn').click() // hamburger menu
        cy.get('#reset_sidebar_link').click() // reset button
    })

    // add an item to the cart
    it('selects an item to purchase', function () {
        cy.get('[data-test = add-to-cart-sauce-labs-backpack]').click()

        cy.get('span[class = shopping_cart_badge') // verify the correct badge number
        .should('contain', '1')
    });

    // verify the cart contents
    it('verifies the cart item and quantity', function () {
        cy.get('[data-test = add-to-cart-sauce-labs-backpack]').click() // adds an item to the cart

        cy.get('span[class = shopping_cart_badge').click() // goes to the cart

        cy.get('.inventory_item_name') // verify the item name
        .should('contain', 'Sauce Labs Backpack')

        cy.get('.cart_item>.cart_quantity')
        .should('contain', '1')
    })

    // remove items from the cart
    it('removes items from the cart', function () {
        cy.get('[data-test = add-to-cart-sauce-labs-backpack]').click()
        cy.get('span[class = shopping_cart_badge').click()

        cy.get('[data-test = remove-sauce-labs-backpack]').click()
        cy.get('span[class = shopping_cart_badge').should('not.exist')
    })

    // completes an order
    it('completes a purchase', function () {
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
})