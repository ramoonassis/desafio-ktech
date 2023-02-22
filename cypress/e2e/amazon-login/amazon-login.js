/// <reference types='Cypress' />

/// Esse teste tenta driblar um pouco o bloqueio de login da Amazon, fazendo uma condição if/else quando encontra o bloqueio de login 
/// na primeira vez. ao encontrar o erro, ele dá um reload na página de login pra tentar acessar ela novamente e tentar fazer o login de novo
/// caso ele não encontre erro, ele segue com o login normalmente e faz as asserções necessárias.

describe('Login Amazon site', () => {



    it('logar com sucesso', () => {
        

        cy.visit(Cypress.env('baseUrl'))
        cy.get('#nav-link-accountList').click()
        cy.get('#ap_email').type(Cypress.env('usuario.amazon')).type('{enter}')
        cy.get('#ap_password').type(Cypress.env('senha.amazon')).type('{enter}')

        cy.get('body').then((body) => {

            if (body.find('.a-span5 > .a-form-label').length > 0) {
                cy.visit('https://www.amazon.com.br/ap/signin?_encoding=UTF8&openid.assoc_handle=brflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com.br%2Fgp%2Fyourstore%2Fhome%3Fie%3DUTF8%26ref_%3Dgno_signin')
                cy.get('#ap_email')
                    .type('ramon.assisklok@gmail.com')
                      .type('{enter}')
                cy.get('#ap_password')
                   .type('@Kloktech1')
                     .type('{enter}')
                cy.get('.a-alert-heading')
                   .should('be.visible')
                    .log('Não foi possível fazer o login por proteção da Amazon')
     }
            else {
                    cy.get('#nav-link-accountList')
                       .click()
                         .get('h1').then((element) => {

                          expect(element.text().replace(/\s+/g, "")).to.contain("Suaconta")                 //asserção em Chai
               })
       
                  cy.url()
                  .should('include', 'youraccount_btn') // checar se a URL contém 'your account' pra confirmar login
                  cy.get(Cypress.env('barraNavegacao'))
                   .should('have.text', 'Olá, Ramon') // checar se há a saudação "Olá, Ramon" na barra de navegação


        
     }
        })


    });
});