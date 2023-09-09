function login () {
    cy.visit('https://sandbox-app.oexpress.co.id/')
    cy.get('.text-muted').should('contain', 'Belum memiliki akun?')
    cy.url().should('include', '/login')
    cy.clearLocalStorage();
    cy.get('input[name="email"]').type('')
    cy.get('input[name="password"]').type('')
    cy.get('button[type="submit"]').click({force:true})
}
export {login};