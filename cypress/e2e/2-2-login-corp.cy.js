/// <reference types="cypress" />

describe("[REGULAR] Test login OExpress", () => {
    beforeEach(() => {
      cy.viewport(1200, 800)
      cy.visit('https://sandbox-app.oexpress.co.id/', {failOnStatusCode: false})
      cy.clearLocalStorage();
    });

    it("[LC001] - Access regular account login page", () => {
        cy.get('.text-muted').should('contain', 'Belum memiliki akun?')
        cy.url().should('include', '/login')
    })

    it("[LC002] - With invalid email", () => {
        cy.get('input[name="email"]').type('corptest1yopmail.com')
        cy.get('span[role="alert"]').should('contain', 'email harus email valid.')
        cy.get('input[name="password"]').type('Akuntes1.')
        cy.get('.input-password__append').click()
        cy.get('input[name="password"]').should('have.value', 'Akuntes1.')
    })

    it("[LC003] - With incorrect password", () => {
        cy.get('input[name="email"]').type('corptest1@yopmail.com')
        cy.get('input[name="password"]').type('Akuntes12345')
        cy.get('.input-password__append').click()
        cy.get('input[name="password"]').should('have.value', 'Akuntes12345')
        cy.get('button[type="submit"]').click()
        cy.wait(1000)
        cy.get('.alert').should('contain', 'Kombinasi email dan password salah')
        //cy.get('div[role="alert"]').should('contain', 'Kombinasi email dan password salah')
    })

    it("[LR004] - Login with registered & valid email and password", () => {
        cy.get('input[name="email"]').type('corptest1@yopmail.com')
        cy.get('input[name="password"]').type('Akuntes1.')
        cy.get('.input-password__append').click()
        cy.get('input[name="password"]').should('have.value', 'Akuntes1.')
        cy.get('button[type="submit"]').click()
        cy.wait(2000)
        cy.get('.side-nav-item').should('contain', 'Dashboard')
        cy.get('.menuitem-create-order').should('contain', 'Buat Kiriman')
        cy.get('.account-position').should('contain', 'Corporate')
    })
})