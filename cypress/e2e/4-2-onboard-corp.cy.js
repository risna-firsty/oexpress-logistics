/// <reference types="cypress" />


describe("[CORPORATE] Test login OExpress", () => {
    beforeEach(() => {
      cy.viewport(1200, 800)
      cy.visit('https://sandbox-app.oexpress.co.id/');
      cy.clearLocalStorage();
      cy.get('input[name="email"]').type('corptest11@yopmail.com');
      cy.get('input[name="password"]').type('Akuntes1.');
      cy.get('.input-password__append').click();
      cy.get('input[name="password"]').should('have.value', 'Akuntes1.');
      cy.get('button[type="submit"]').click();
      cy.wait(2000);
      cy.get('.side-nav-item').should('contain', 'Dashboard');
      cy.get('.menuitem-create-order').should('contain', 'Buat Kiriman');
      cy.get('.account-position').should('contain', 'Corporate');
    });

    it("[OC001] - Access onboarding corporate account ", () => { 
        cy.get('.side-nav-item').should('contain', 'Dashboard');
        cy.get('.menuitem-create-order').should('contain', 'Buat Kiriman');
        cy.get('.account-position').should('contain', 'Corporate');
    })

    it("[OC002] - Change profile information", () => {
        const randomName = "Corporate Automate "+Math.floor(Math.random() * 100) + 1;
      const randomPhone = "081"+Math.floor(Math.random() * 10000000) + 1;

      cy.get('.submenu-icon').last().click();
      cy.get('a[href="/settings/account"]').click();
      cy.url().should('include', '/settings/account');
      cy.get('.page-title').should('contain', 'Pengaturan Akun');
      cy.get('h4').should('contain', 'Ubah Informasi Profil');
      cy.get('input[name="nama"]').clear();
      cy.get('input[name="ponsel"]').clear();
      cy.get('input[name="nama"]').type(randomName);
      cy.get('input[name="ponsel"]').type(randomPhone);
      cy.get('.btn-primary').contains('Simpan Perubahan').click();
      cy.get('.notification-content').should('contain', 'Your profile was changed');
    })

    it("[OC003] - Upload Surat Perjanjian", () => {
        // This case can only be done in a new Corporate account after the account is fully set. 
        // So you need to change the credential with a new fullly set account of the login script in the beforeEach section

        cy.get('button[class="btn btn-outline-alert-warning mb-2"]').contains('Upload Surat').click({force: true});
        cy.wait(1000);

        cy.fixture('a3-potrait.pdf').then((fileContent) => {
          
            // Find the drag-and-drop area (replace with your selector)
            cy.get('h1').attachFile(
              {
                fileContent,
                fileName: 'a3-potrait.pdf',
                mimeType: 'application/pdf', // Set the MIME type for PDF
              },
              { subjectType: 'drag-n-drop' }
            );
            cy.contains('Simpan').click()
        })
        
        cy.wait(5000)
        cy.reload()
        cy.get('.bg-warning-lighten').should('not.exist')
    })
})