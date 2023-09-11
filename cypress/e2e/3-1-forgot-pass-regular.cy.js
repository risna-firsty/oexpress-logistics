/// <reference types="cypress" />

describe("[REGULAR] Test login OExpress", () => {
    beforeEach(() => {
      cy.viewport(1200, 800)
      cy.visit('https://sandbox-app.oexpress.co.id/password/reset', {failOnStatusCode: false})
      cy.clearLocalStorage();
    });

    it("[FPR001] - Access regular account forgot password page", () => {
        cy.get('.mt-0').should('contain', 'Reset Password')
    })

    it("[FPR002] - With invalid email", () => {
        cy.get('input[name="email"]').type('test1yopmail.com')
        cy.get('span[role="alert"]'). should('contain', 'email harus email valid.')
    })

    it("[FPR003] - With unregistered email", () => {
        cy.get('input[name="email"]').type('regular02@yopmail.com')
        cy.get('button[type="submit"]').click()
        cy.get('.alert').should('contain', 'Pengguna tidak ditemukan')
    })

    it("[FPR004] - With registered and valid email", () => {
        cy.get('input[name="email"]').type('regular01@yopmail.com')
        cy.get('button[type="submit"]').click()
        cy.get('.alert-success').should('contain', 'Tolong cek email Anda!')
    })
})