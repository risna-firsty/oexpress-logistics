function loginRegular () {
    cy.visit('https://sandbox-app.oexpress.co.id/')
    cy.clearLocalStorage();
    cy.get('input[name="email"]').type('regular01@yopmail.com')
    cy.get('input[name="password"]').type('Akuntes1.')
    cy.get('.input-password__append').click()
    cy.get('input[name="password"]').should('have.value', 'Akuntes1.')
    cy.get('button[type="submit"]').click()
    cy.wait(2000)
}
export { loginRegular };