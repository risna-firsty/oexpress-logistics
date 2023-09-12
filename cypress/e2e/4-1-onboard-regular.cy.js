/// <reference types="cypress" />

describe("[REGULAR] Test login OExpress", () => {
    beforeEach(() => {
      cy.viewport(1200, 800)
      cy.visit('https://sandbox-app.oexpress.co.id/')
      cy.clearLocalStorage();
      cy.get('input[name="email"]').type('regular01@yopmail.com')
      cy.get('input[name="password"]').type('Akuntes1.')
      cy.get('.input-password__append').click()
      cy.get('input[name="password"]').should('have.value', 'Akuntes1.')
      cy.get('button[type="submit"]').click()
      cy.wait(2000)
    });

    it("[OR001] - Access onboarding regular account", () => {
      cy.get('.side-nav-item').should('contain', 'Dashboard')
      cy.get('.menuitem-create-order').should('contain', 'Buat Kiriman')
      cy.get('.account-position').should('contain', 'Social Commerce')
    })

    it("[OR002] - Change profile information", () => {
      const randomName = "Regular Automate "+Math.floor(Math.random() * 100) + 1;
      const randomPhone = "081"+Math.floor(Math.random() * 10000000) + 1;

      cy.get('.submenu-icon').last().click()
      cy.get('a[href="/settings/account"]').click()
      cy.url().should('include', '/settings/account')
      cy.get('.page-title').should('contain', 'Pengaturan Akun')
      cy.get('h4').should('contain', 'Ubah Informasi Profil')
      cy.get('input[name="nama"]').clear()
      cy.get('input[name="ponsel"]').clear()
      cy.get('input[name="nama"]').type(randomName)
      cy.get('input[name="ponsel"]').type(randomPhone)
      cy.get('.btn-primary').contains('Simpan Perubahan').click()
      cy.get('.notification-content').should('contain', 'Your profile was changed')
    })

    it("[OR003] - Cancel to add new bank account", () => {
      const randomName = `${Math.random().toString(36).substring(2, 10)} ${Math.random().toString(36).substring(2, 10)}`;
      const randomRekening = Math.floor(1000000000 + Math.random() * 9000000000);

      cy.get('.submenu-icon').last().click()
      cy.get('a[href="/settings/bank-accounts"]').click()
      cy.wait(500)
      cy.get('.page-title').should('contain', 'Rekening Bank')
      cy.get('.add-bank-account').click()
      cy.get('.multiselect__tags').click()
      cy.contains('BNI').click()
      cy.get('input[name="account_name"]').type(randomName)
      cy.get('input[name="account_number"]').type(randomRekening)
      cy.get('button[type="submit"]').contains('Simpan Rekening').click()
      cy.wait(3000)
      cy.get('button[type="submit"]').contains('Batal').click()
    })

    it.only("[OR004] - Change Store information", () => {
      const randomStore = "Toko Regular Automate "+Math.floor(Math.random() * 100) + 1;
      const randomOwner = "Owner Regular Automate "+Math.floor(Math.random() * 100) + 1;
      const randomAddress = "Owner Regular Automate "+Math.floor(Math.random() * 100) + 1;


      cy.get('.submenu-icon').last().click()
      cy.get('a[href="/settings/store"]').click()
      cy.get('.page-title').should('contain', 'Informasi Toko')

      // check whether the current (initial condition)
      cy.get('input[name="store_name"]').should('have.value', 'Toko Regular 01')
      cy.get('input[name="name"]').should('have.value', 'Owner Regular 01')
      cy.get('input[name="pickup_address"]').should('have.value', 'Alamat Regular 01')

      // edit the store information
      cy.get('input[name="store_name"]').clear()
      cy.get('input[name="name"]').clear()
      cy.get('input[name="pickup_address"]').clear()
      cy.get('input[name="store_name"]').type(randomStore) //nama toko
      cy.get('input[name="name"]').type(randomOwner) // nama owner
      cy.get('input[name="pickup_address"]').type(randomAddress) //alamat
      cy.get('button[type="submit"]').contains('Simpan').click()
      cy.get(6000)

      //assert that the data are already changed, if we compare to initial condition
      cy.get('input[name="store_name"]').should('not.have.value', 'Toko Regular 01')
      cy.get('input[name="name"]').should('not.have.value', 'Owner Regular 01')
      cy.get('input[name="pickup_address"]').should('not.have.value', 'Alamat Regular 01')
      cy.wait(2000)

      //change back to the initial condition for the next automation
      cy.get('input[name="store_name"]').clear()
      cy.get('input[name="name"]').clear()
      cy.get('input[name="pickup_address"]').clear()
      cy.get('input[name="store_name"]').type('Toko Regular 01') //nama toko
      cy.get('input[name="name"]').type('Owner Regular 01') // nama owner
      cy.get('input[name="pickup_address"]').type("Alamat Regular 01") //alamat
      cy.get('button[type="submit"]').contains('Simpan').click()
      cy.get(4500)

    })
})