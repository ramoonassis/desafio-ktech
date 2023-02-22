describe('Validar o carrinho de compras da Amazon', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'))
        cy.viewport(1285, 721)
    });

    it('Deverá colocar no carrinho de compras um produto, validar que o produto foi inserido no carrinho e validar seu preço', () => {
    
        cy.get(Cypress.env('barraPesquisa'))
        .should('be.visible')
           .click()
             .type(Cypress.env('MeuProduto'))
               .type('{enter}')
               cy.get('[data-asin="B09Q947VKN"] > .sg-col-inner > .s-widget-container > .s-card-container > .a-spacing-base > .a-spacing-small > .s-title-instructions-style > .a-size-mini > .a-link-normal > .a-size-base-plus')
                  .click()
               cy.get('#add-to-cart-button')
                    .click()
              cy.get('#sw-gtc > .a-button-inner > .a-button-text')
                    .click()
               cy.get('.a-color-base > .a-truncate > .a-truncate-cut')
                    .should('contain', 'Xiaomi TV Stick 4K')
               cy.get('#sc-subtotal-amount-buybox')
                    .invoke('text')
                        .then((text1) => {
                cy.get('#sc-subtotal-amount-activecart')
                   .invoke('text')
                    .then((text2) => {
                        
                  expect(text1).equal(text2)  // asserção feita comparando os dois preços simultâneos da página.
    })
})


    });


    it('Deverá colocar dois ou mais produtos no carrinho de compra e validar seu preço', () => {

        cy.get(Cypress.env('barraPesquisa'))
        .should('be.visible')
           .click()
             .type(Cypress.env('MeuProduto'))
               .type('{enter}')
               cy.get('[data-asin="B09Q947VKN"] > .sg-col-inner > .s-widget-container > .s-card-container > .a-spacing-base > .a-spacing-small > .s-title-instructions-style > .a-size-mini > .a-link-normal > .a-size-base-plus')
                  .click()
               cy.get('#add-to-cart-button')
                  .click()
                cy.get('#sw-gtc > .a-button-inner > .a-button-text')
                    .click()
                cy.get('.a-color-base > .a-truncate > .a-truncate-cut')
                    .should('contain', 'Xiaomi TV Stick 4K')    
                cy.get('#a-autoid-0-announce')
                    .click() 
                cy.get('#quantity_2')
                    .click()
                      .wait(2000)
                cy.get('#sc-subtotal-amount-buybox')
                .invoke('text')
                    .then((text1) => {
            cy.get('#sc-subtotal-amount-activecart')
               .invoke('text')
                .then((text2) => {
                    
              expect(text1).equal(text2) // asserção feita comparando os dois preços simultâneos da página, assim validando a quantidade de produtos no carrinho
})
})

                
    });
});