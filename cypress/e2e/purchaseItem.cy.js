/// <reference types = "cypress" />

// tests to be run
describe('select and purchase an item', function () {

    // login before running the tests
    beforeEach('login as a standard user', function () {
        cy.visit('/')

        // // login as standard_user
        cy.login('standard_user', 'secret_sauce')

        // validate the page
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
        // adds item to cart, then goes to cart
        cy.get('[data-test = add-to-cart-sauce-labs-backpack]').click()
        cy.get('span[class = shopping_cart_badge').click()

        // removes item from cart, then verifies the removal
        cy.get('[data-test = remove-sauce-labs-backpack]').click()
        cy.get('span[class = shopping_cart_badge').should('not.exist')
    })

    // completes an order
    it('completes a purchase', function () {
        cy.completePurchase();
    })

    //returns home after making a purchase
    it('returns home after checkout', function () {
        cy.completePurchase() // successfully complete a purchase

        cy.get('[data-test = back-to-products]').click() // click the "back to homepage" button

        cy.location('pathname').should('equal', '/inventory.html') // verify the correct page
    })
})