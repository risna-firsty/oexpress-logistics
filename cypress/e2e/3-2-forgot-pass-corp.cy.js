/// <reference types="cypress" />

describe("[REGULAR] Test login OExpress", () => {
    beforeEach(() => {
      cy.viewport(1200, 800)
      cy.visit('https://sandbox-app.oexpress.co.id/password/reset', {failOnStatusCode: false})
      cy.clearLocalStorage();
    });

    it("[FPC001] - Access regular account forgot password page", () => {
        cy.get('.mt-0').should('contain', 'Reset Password')
    })

    it("[FPC002] - With invalid email", () => {
        cy.get('input[name="email"]').type('corp1yopmail.com')
        cy.get('span[role="alert"]'). should('contain', 'email harus email valid.')
    })

    it("[FPC003] - With unregistered email", () => {
        cy.get('input[name="email"]').type('test11@yopmail.com')
        cy.get('button[type="submit"]').click()
        cy.get('.alert').should('contain', 'Pengguna tidak ditemukan')
    })

    it("[FPC004] - With registered and valid email", () => {
        cy.get('input[name="email"]').type('corp1@yopmail.com')
        cy.get('button[type="submit"]').click()
        cy.get('.alert-success').should('contain', 'Tolong cek email Anda!')
    })
})