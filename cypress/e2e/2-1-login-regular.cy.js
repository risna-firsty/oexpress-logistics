/// <reference types="cypress" />

describe("[REGULAR] Test login OExpress", () => {
    beforeEach(() => {
      cy.viewport(1200, 800)
      cy.visit('https://sandbox-app.oexpress.co.id/login', {failOnStatusCode: false})
      cy.clearLocalStorage();
    });

it("", () => {

})


})