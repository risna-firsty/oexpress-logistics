/// <reference types="cypress" />

describe("[REGULAR] Test login OExpress", () => {
    beforeEach(() => {
      cy.viewport(1200, 800);
      cy.visit('https://sandbox-app.oexpress.co.id/', {failOnStatusCode: false});
      cy.clearLocalStorage();
    });

    it("[LR001] - Access regular account login page", () => {
        cy.get('.text-muted').should('contain', 'Belum memiliki akun?');
        cy.url().should('include', '/login');
    })

    it("[LR002] - With invalid email", () => {
        cy.get('input[name="email"]').type('regular01yopmail.com');
        cy.get('span[role="alert"]').should('contain', 'email harus email valid.');
        cy.get('input[name="password"]').type('Akuntes1.');
        cy.get('.input-password__append').click();
        cy.get('input[name="password"]').should('have.value', 'Akuntes1.');
    })

    it("[LR003] - With incorrect password", () => {
        cy.get('input[name="email"]').type('regular01@yopmail.com');
        cy.get('input[name="password"]').type('Qwert1234567');
        cy.get('.input-password__append').click();
        cy.get('input[name="password"]').should('have.value', 'Qwert1234567');
        cy.get('button[type="submit"]').click();
        cy.wait(1000);
        cy.get('.alert').should('contain', 'Kombinasi email dan password salah');
    })

    it("[LR004] - Login with registered & valid email and password", () => {
        cy.get('input[name="email"]').type('regular01@yopmail.com');
        cy.get('input[name="password"]').type('Akuntes1.');
        cy.get('.input-password__append').click();
        cy.get('input[name="password"]').should('have.value', 'Akuntes1.');
        cy.get('button[type="submit"]').click();
        cy.wait(2000);
        cy.get('.side-nav-item').should('contain', 'Dashboard');
        cy.get('.menuitem-create-order').should('contain', 'Buat Kiriman');
        cy.get('.account-position').should('contain', 'Social Commerce');
    })
})