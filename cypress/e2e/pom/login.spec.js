import homepage from '../../pages/homepage'
/// <reference types='Cypress' />

describe('Implementação de POM pra login na Amazon', () => {
   
    it('Login com sucesso', () => {
        cy.visit(Cypress.env('baseUrl'))
        homepage.clickLoginBtn()
        homepage.typeEmail()
        homepage.clickContinueBtn()
        homepage.typePassword()
        homepage.clickSubmitBtn()
        homepage.elementos.spanSuaConta()
          .should('be.visible')
            .then((element) => {

            expect(element.text().replace(/\s+/g, "")).to.contain("Suaconta")
    
          })
    
           

    });
});
