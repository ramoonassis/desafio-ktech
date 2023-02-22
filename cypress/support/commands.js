// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add('loginAmazon', (email, senha) => {   

    cy.visit('https://www.amazon.com.br')
.get('#nav-link-accountList-nav-line-1').click()
.get('#ap_email').click().type(Cypress.env('usuario.amazon')).type('{enter}')
.get('#ap_password').click().type(Cypress.env('senha.amazon')).type('{enter}')

})

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })