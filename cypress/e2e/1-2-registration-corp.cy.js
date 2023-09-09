/// <reference types="cypress" />

describe("Test Registration Corporate", () => {
    beforeEach(() => {
      cy.viewport(1200, 800)
      cy.visit('https://sandbox-app.oexpress.co.id/corp/register', {failOnStatusCode: false});
      cy.clearLocalStorage();
    });

    it("[RC001] - Access register corporate page",() => {
        cy.get('.form-label').should('contain', 'Nama Perusahaan')
    })

    it("[RC002] - Input name less than 2 characters",() => {
        cy.get('input[name="name"]').type('C')
        cy.get('span[role="alert"]').should('contain', 'name terlalu pendek.')
        cy.get('input[name="email"]').type('regulartest1@yopmail.com')
        cy.get('input[name="password"]').type('Akuntes1.')
        cy.get('.input-password__append').click()
        cy.get('input[name="password"]').should('have.value', 'Akuntes1.')
        cy.get('input[name="phone"]').type('0812345678')
    })

    it("[RC003] - Input invalid email", () => {
        cy.get('input[name="name"]').type('Corporate Satu')
        cy.get('input[name="email"]').type('regulartest1yopmail.com')
        cy.get('span[role="alert"]').should('contain', 'email harus email valid.')
        cy.get('input[name="password"]').type('Akuntes1.')
        cy.get('.input-password__append').click()
        cy.get('input[name="password"]').should('have.value', 'Akuntes1.')
        cy.get('input[name="phone"]').type('0812345678')
    })

    it("[RC004] - Register with valid data", () => {
        const randomName = "Corporate Automate "+Math.floor(Math.random() * 100) + 1;
        const randomEmail = "corptest"+Math.floor(Math.random() * 100) + 1+"@yopmail.com";
        const randomPhone = "081"+Math.floor(Math.random() * 10000000) + 1;

        cy.get('input[name="name"]').type(randomName)
        cy.get('input[name="email"]').type(randomEmail)
        cy.get('input[name="password"]').type('Akuntes1.')
        cy.get('.input-password__append').click()
        cy.get('input[name="password"]').should('have.value', 'Akuntes1.')
        cy.get('input[name="phone"]').type(randomPhone)
        cy.get('button[type="submit"]').click()
        cy.wait(2000)
        cy.url().should('include', '/register-verification?email')
    })
});