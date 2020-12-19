/// <reference types="cypress" />

describe("Home Page Test Case", () =>{

    beforeEach(() =>{
        cy.visit("http://localhost:4100/")
    })

    it("Check navigation- Login,Signup,Home",() =>{
        cy.xpath('//a[@class="nav-link" and text()="Sign in"]')
          .click()
          .url()
          .should('contain','login')
        
        cy.xpath('//a[@class="nav-link" and text()="Home"]')
          .click()
        cy.get('.banner')
        .should('contain.text',"A place to share your knowledge.")

        cy.xpath('//a[@class="nav-link" and text()="Sign up"]')
          .click()
          .url()
          .should('contain','register')
        
        cy.get('.navbar-brand')
          .click()
        cy.get('.banner')
        .should('contain.text',"A place to share your knowledge.")
    })
})