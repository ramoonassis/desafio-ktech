/// <reference types='Cypress' />

import productpage from "../../pages/productpage";



describe('Implementação do Page Model pra realizar pesquisas de produtos na Amazon', () => {
    beforeEach(() => {

        cy.visit(Cypress.env('baseUrl'))
        
    });
   
    it('Deverá realizar a pesquisa do produto e fazer sua validação', () => {

        productpage.typeProduct()
        productpage.clickSearchBtn()
        productpage.elementos.spanResults()
            .should('be.visible')
                .should('have.text', 'RESULTADOS')
        productpage.elementos.imageResults().should('be.visible')  
        productpage.elementos.spanText()
            .should('be.visible')
                .should('contain', 'Fire TV Stick')


        
    });
});