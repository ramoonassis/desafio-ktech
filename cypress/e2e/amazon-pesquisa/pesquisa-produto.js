/// <reference types='Cypress' />


describe('Pesquisar produtos no e-commerce da Amazon', () => {
  
  beforeEach(() => {

    cy.visit(Cypress.env('baseUrl'))
    cy.viewport(1285, 721)

})

   it('Validar o retorno da busca por meio da estrutura do HTML ', () => {

    cy.get(Cypress.env('barraPesquisa'))
        .should('be.visible')
           .click()
             .type(Cypress.env('MeuProduto'))
               .type('{enter}')
       cy.title()
          .should('include', 'Fire TV Stick')
       cy.url()
          .should('include', 'Fire+TV+Stick')
       cy.get(Cypress.env("elementoResultado"))
           .should('contain', Cypress.env('MeuProduto'))
       cy.get(Cypress.env("elementoResultado2"))
           .should('be.visible')
       cy.get(Cypress.env("elementoResultado3"))
           .should('be.visible')
       cy.get(Cypress.env('barraPesquisa'))
           .should('have.value', Cypress.env('MeuProduto'))
       cy.get(Cypress.env("elementoResultado"))
           .should('be.visible')
       cy.get('[data-asin="B091G767YB"] > .sg-col-inner > .s-widget-container > .s-card-container > .a-spacing-base > .a-spacing-small > .s-title-instructions-style > .a-size-mini > .a-link-normal > .a-size-base-plus')
           .should('be.visible')  
       cy.get('.s-no-outline > .a-size-medium-plus')
           .then((element) => {

            expect(element.text().replace(/\s+/g, "")).to.contain("RESULTADOS")  // Chai
          
          })
/* cy.get(Cypress.env("elementoResultado")).each(($item) => {
 cy.wrap($item).find('.s-image').should('be.visible')
cy.wrap($item).find('.a-price-whole').should('be.visible')
})  */
/// Código que acredito que era pra estar funcional, que tinha como objetivo fazer a asserção que cada resultado tivesse certos padrões 
//em HTML, porém como acredito que esses elementos estão dentro de um iframe, o cypress não consegue capturá-los.
        
    });

it('Visualizar a barra de sugestões fica visível quando se entra parte de uma string no input de busca', () => {
  
  cy.get(Cypress.env('barraPesquisa'))
    .type('Fire Sti')
      .wait(200)
  cy.get(' .s-suggestion-container > .s-suggestion')
    .should('be.visible')
  cy.get(':nth-child(1) > .s-suggestion-container > .s-suggestion') 
    .click()
    cy.url()
        .should('include', 'Fire+Sti')
       cy.get(Cypress.env("elementoResultado"))
         .should('contain', Cypress.env('MeuProduto'))
       cy.get(Cypress.env("elementoResultado2"))
         .should('be.visible')
       cy.get(Cypress.env("elementoResultado3"))
         .should('be.visible')
       cy.get(Cypress.env("elementoResultado"))
          .should('be.visible')
      cy.get('[data-asin="B091G767YB"] > .sg-col-inner > .s-widget-container > .s-card-container > .a-spacing-base > .a-spacing-small > .s-title-instructions-style > .a-size-mini > .a-link-normal > .a-size-base-plus')
          .should('be.visible')  
       cy.get('.s-no-outline > .a-size-medium-plus').then((element) => {

            expect(element.text().replace(/\s+/g, "")).to.contain("RESULTADOS")  // asserção em Chai
          
          })

      
      })

it('Fazer pesquisa apenas com parte do nome do produto pra ver se o sistema completa o nome como sugestão', () => {

  cy.get(Cypress.env('barraPesquisa'))
    .type('stick')
      .type('{enter}')
      cy.get('.a-size-medium > .a-color-base').should('have.text', 'Confira os Dispositivos Fire TV')
      cy.get(Cypress.env("elementoResultado"))
           .should('contain', Cypress.env('MeuProduto'))
       cy.get(Cypress.env("elementoResultado2"))
           .should('be.visible')
       cy.get(Cypress.env("elementoResultado3"))
           .should('be.visible')

});   

it('Fazer pesquisa apenas com parte do nome do produto errado pra ver comportamento do sistema de correção', () => {

  cy.get(Cypress.env('barraPesquisa'))
    .type('Firi TV Stick')
      .type('{enter}')
      cy.get('.a-size-medium > .a-color-base').should('have.text', 'Confira os Dispositivos Fire TV')
      cy.get(Cypress.env("elementoResultado"))
           .should('contain', Cypress.env('MeuProduto'))
       cy.get(Cypress.env("elementoResultado2"))
           .should('be.visible')
       cy.get(Cypress.env("elementoResultado3"))
           .should('be.visible')

});  

it('Fazer pesquisa usando uma referência do produto (ID, SKU, ASIN)', () => {

  cy.get(Cypress.env('barraPesquisa'))
    .type('B08C1K6LB2')
      .type('{enter}')
      cy.get('.a-size-base-plus').should('contain', 'Fire TV Stick')
      cy.get(Cypress.env("elementoResultado"))
           .should('contain', Cypress.env('MeuProduto'))
       cy.get(Cypress.env("elementoResultado2"))
           .should('be.visible')
       cy.get(Cypress.env("elementoResultado3"))
           .should('be.visible')


});   

it('Fazer a pesquisa utilizando apenas a marca do produto (Amazon) como referência', () => {

  cy.get(Cypress.env('barraPesquisa'))
  .type('Amazon')
    .type('{enter}')
    cy.get('.a-size-base-plus').should('contain', 'Fire TV Stick')
    cy.get(Cypress.env("elementoResultado"))
           .should('contain', Cypress.env('MeuProduto'))
       cy.get(Cypress.env("elementoResultado2"))
           .should('be.visible')
       cy.get(Cypress.env("elementoResultado3"))
           .should('be.visible')
  
});



//Alguns testes utilizando as requests para algumas análises 

it('Deverá fazer um mock do body de um GET Request, sendo validado depois', () => {
  cy.intercept('GET', 'https://www.amazon.com.br/af/*', {body: 'Fire Stick TV'}).as('getReq')
  cy.visit('https://www.amazon.com.br/');
  cy.get(Cypress.env('barraPesquisa')).type('Fire Tv Stick').type('{enter}')

  cy.wait('@getReq').its('response.body').should('be.equal', 'Fire Stick TV')

  cy.wait('@getReq').then(interception => {

    console.log(interception);
  
    cy.wrap(interception.response.statusCode).should('eq', 200)
  })

});

it('Deverá interceptar o GET request e validar seu Status Code e sua referência', () => {
  cy.intercept('GET', 'https://www.amazon.com.br/af/*').as('getReq')
  cy.visit('https://www.amazon.com.br/');
  cy.get(Cypress.env('barraPesquisa')).type('Fire Tv Stick').type('{enter}')

  cy.wait('@getReq').its('request.headers').should('have.property', 'referer', 'https://www.amazon.com.br/')
  
  cy.wait('@getReq').then(interception => {

    console.log(interception);
  
    cy.wrap(interception.response.statusCode).should('eq', 200)
  })

  
});

it('Não deverá conseguir fazer uma pesquisa com o input de pesquisa vazio', () => {

  cy.get(Cypress.env('barraPesquisa'))
  .should('be.visible')
     .click()
       .type('   ')
         .type('{enter}')
  cy.title()
     .should('include', 'Tudo pra você')
  cy.url()
     .should('include', 'https://www.amazon.com.br/') //confirma o retorno pra página inicial após pesquisa
});

it('Não deverá conseguir realizar pesquisa com valor do tipo ahsduaduaihs465sa486484', () => {
  cy.get(Cypress.env('barraPesquisa'))
  .should('be.visible')
     .click()
       .type('ahsduaduaihs465sa486484')
         .type('{enter}')
  cy.get('.s-no-outline > :nth-child(1)')
      .should('have.text', 'Nenhum resultado para ahsduaduaihs465sa486484.')
  cy.get('.a-size-medium-plus').then((element) => {

        expect(element.text().replace(/\s+/g, "")).to.contain("Precisadeajuda?")

      })

});

it('Deverá conseguir navegar pela barra de categorias e encontrar o produto desejado', () => {
    
  cy.get(Cypress.env('barraPesquisa'))
        .should('be.visible')
  cy.get('#nav-hamburger-menu')
    .click()
     .wait(4000) 
  cy.get('.hmenu-visible > :nth-child(7) > .hmenu-item')
      .click()
       .wait(4000)
  cy.get('.hmenu-visible > :nth-child(4) > .hmenu-item')   
      .click()  
  cy.title()
      .should('include', 'Fire TV Stick') 
  cy.get('#productTitle') 
  .then((element) => {

    expect(element.text().replace(/\s+/g, "")).to.contain("FireTVStick|StreamingemFullHDcomAlexa|ComControleRemotoporVozcomAlexa(incluicomandosdeTV)")    
  })

}); 

});