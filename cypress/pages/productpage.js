class AmazonProductPage{

    elementos = {

        searchInput: () => cy.get('#twotabsearchtextbox'),
        searchBtn: () => cy.get('#nav-search-submit-button'),
        spanResults: () => cy.get('.s-no-outline > .a-size-medium-plus'),
        imageResults: () => cy.get('.sg-col-inner > .s-widget-container > .s-card-container > .a-spacing-base > .s-product-image-container > .rush-component > .a-link-normal > .a-section > .s-image'),
        spanText: () => cy.get('.sg-col-inner > .s-widget-container > .s-card-container > .a-spacing-base > .a-spacing-small > .s-title-instructions-style > .a-size-mini > .a-link-normal > .a-size-base-plus') 



    }

    typeProduct(){
        this.elementos.searchInput().type('Fire TV Stick');
 }


    clickSearchBtn(){
        this.elementos.searchBtn().click();
    }

}

module.exports = new AmazonProductPage();
