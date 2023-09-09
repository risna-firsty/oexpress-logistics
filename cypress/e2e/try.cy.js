/// <reference types="cypress" />



//this is the file i use to try any command that I am not sure will work before I apply it to real spec
describe("Test", () => {
    beforeEach(() => {
      cy.viewport(1200, 800)
      //cy.visit('https://sandbox-app.oexpress.co.id/corp/register')
      cy.wait(6000)
    });


    it("[RR001] - Access register regular page",() => {
        cy.visit('https://sandbox-app.oexpress.co.id/corp/register', {failOnStatusCode: false});
    })
})
