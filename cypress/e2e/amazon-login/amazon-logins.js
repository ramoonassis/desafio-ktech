/// <reference types='Cypress' />


describe("Fazer o login na página da Amazon usando dados válidos", () => {

    beforeEach(() => {

        cy.visit(Cypress.env('baseUrl'))
        cy.viewport(1285, 721)
    })


    it("Deverá conseguir fazer o login na página da Amazon com sucesso", () => {

        cy.intercept({
            method: 'POST',
            url: 'https://unagi.amazon.com.br/1/events/com.amazon.csm.csa.prod',})
                .as('LoginCheck') //Interceptar todos os métodos API 'POST' de Login


            .get(Cypress.env('barraNavegacao'))
              .click()
                .get(Cypress.env('inputEmail')).should('be.visible') //asserção pra confirmar se input de email está visível
                  .type(Cypress.env('usuario.amazon'))    
                    .type('{enter}')
                      .get(Cypress.env('inputSenha')).should('be.visible') //asserção pra confirmar se input de senha está visivel
                        .click().type(Cypress.env('senha.amazon'))
                         .type('{enter}')
        cy.wait('@LoginCheck').its('response.statusCode').should('eq', 200)   // Checar Status Code
            .get('#nav-link-accountList')
             .click()
              .get('h1').then((element) => {

                 expect(element.text().replace(/\s+/g, "")).to.contain("Suaconta")                 //asserção em Chai
                    })
            
        cy.url().should('include', 'youraccount_btn') // checar se a URL contém 'your account' pra confirmar login
        cy.get(Cypress.env('barraNavegacao')).should('have.text', 'Olá, Ramon') // checar se há a saudação "Olá, Ramon" na barra de navegação


   

})


    it("Não deverá conseguir fazer o login na página da Amazon", () => {
            
    cy.get(Cypress.env('barraNavegacao')).click()
        .get(Cypress.env('inputEmail'))
          .click()   
            .get(Cypress.env('inputEmail')).should('be.visible') //asserção pra confirmar se input de email está visível
              .type(Cypress.env('usuario.amazon')) 
                .type('{enter}')
                  .get(Cypress.env('inputSenha'))    
                    .click()
                      .get(Cypress.env('inputSenha')).should('be.visible') //asserção pra confirmar se input de senha está visivel
                        .type(Cypress.env('senha.errada'))
                          .type('{enter}')
    cy.get('#auth-warning-message-box > .a-box-inner').then((element) => {

        expect(element.text().replace(/\s+/g, "")).to.contain('Mensagemimportante') // Confirmar mensagem de erro em Chai
               
    })

    cy.url().should('include', 'signin') // checar se a URL contém 'your account' pra confirmar que ainda se está na pagina de login
    cy.get('#auth-warning-message-box > .a-box-inner').should('be.visible') // Checar se a mensagem de erro está aparecendo depois de tentar login com a senha errada
    cy.get('.a-padding-extra-large > .a-spacing-small').then((element) => {

                 expect(element.text().replace(/\s+/g, "")).to.contain("Fazerlogin")        // Outra asserção pra confirmar que WebUI continua sem estar logada, pedindo login novamente.
                
                })       

})

})