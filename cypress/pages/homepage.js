class AmazonHomePage{
    
    elementos = {

        loginBtn: () => cy.get('#nav-link-accountList-nav-line-1'),
        emailInput: () => cy.get('#ap_email'),
        passwordInput: () => cy.get('#ap_password'),
        submitBtn: () => cy.get('#signInSubmit'),
        continueBtn: () => cy.get('#continue'),
        spanSuaConta: () => cy.get('h1'),

    }

    typeEmail(){
        this.elementos.emailInput().type('ramon.assisklok@gmail.com');
    
    }

    typePassword(){
        this.elementos.passwordInput().type('@Kloktech1');
    
    }

    clickLoginBtn(){
        this.elementos.loginBtn().click();
    
    }

    clickSubmitBtn(){
        this.elementos.submitBtn().click();
    
    }
    clickContinueBtn(){
        this.elementos.continueBtn().click();
    }
}

module.exports = new AmazonHomePage();