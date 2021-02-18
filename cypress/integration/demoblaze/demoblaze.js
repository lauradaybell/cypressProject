const unique = () => Cypress._.random(0, 1e6)
const id = unique()
const userName = `testuser${id}`

import { addToCartCall, viewCartCall } from '../../support/util/apiUtil'

Cypress.Cookies.defaults({preserve:['user', 'tokenp_']})

describe('Purchasing a product through demoblaze', () => {
    it('loads the lander', () => {
        cy.visit('https://demoblaze.com')
        cy.get('#narvbarx').should('be.visible')
    })

    it('allows user to create new account', () => {
        cy.get('#signin2').should('be.visible').click()
        cy.get('.modal-body').should('be.visible')
        cy.get('#sign-username').focus().type(userName, {force:true})
        cy.get('#sign-password').focus().type('testuser123422', {force:true})
        cy.get('#signInModal>.modal-dialog>.modal-content>.modal-footer > button').eq(1).click()
        cy.on("window:alert", (txt) => {
            expect(txt).to.equal('Sign up successful.')
        })
    })

    it('allows existing user to sign in', () => {
        cy.get('#login2').should('be.visible').click()
        cy.get('#loginusername').focus().type(userName, {force:true})
        cy.get('#loginpassword').focus().type('testuser123422', {force:true})
        cy.get('#logInModal>.modal-dialog>.modal-content>.modal-footer > button').eq(1).click()
        cy.get('#nameofuser').should('be.visible')
    })

    it('allows user to add correct item to cart', () => {
        cy.get('.card-title').contains('Samsung galaxy s6').first().click()
        addToCartCall()
        viewCartCall()
        cy.get('a.btn-success').click()
        cy.wait('@addToCart').then((req) => {
            let reqBody = req.request.body;
            expect(reqBody.prod_id).to.eq(1)
        })
        cy.get('#cartur').click()
        cy.wait('@viewCart')
        cy.get('.success').should('contain', 'Samsung galaxy s6')
        cy.get('.success').should('have.length', '1')
    })
})