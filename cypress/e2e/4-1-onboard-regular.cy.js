/// <reference types="cypress" />
import { login } from './0-login-regular.cy.js'


describe("[REGULAR] Test login OExpress", () => {
    beforeEach(() => {
      login()
      cy.viewport(1200, 800)
      cy.clearLocalStorage();
    });

    it("[OR001] - Access onboarding regular account ", () => {
        cy.get('')
    })
})