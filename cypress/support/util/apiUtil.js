module.exports = {

    addToCartCall: () => {
        cy.intercept('POST', 'https://api.demoblaze.com/addtocart').as('addToCart')
    },

    viewCartCall: () => {
        cy.intercept('POST', 'https://api.demoblaze.com/viewcart').as('viewCart')
    }

}