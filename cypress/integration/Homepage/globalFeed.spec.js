/// <reference types = "cypress" />

describe("Global Feed- Before Login",() =>{

    beforeEach(() =>{
        cy.visit("http://localhost:4100/")
    })

    it("Navigating to first article",() =>{
        cy.get('.preview-link').first().click()
    })

    
    it("Navigating to first user",() =>{
        cy.get('.author').first().click()
    })

    it("Adding Article To Favorite",() =>{
        cy.get('.ion-heart')
        .first()
        .click()
        .url()
        .should('contain','register')
    })
})


describe("User Flow",() =>{
    beforeEach(() =>{
        cy.visit("http://localhost:4100/")
    })

    it("Follow user",() =>{
        cy.get('.author').first().click()
        cy.get('.ion-plus-round')
        .click()
        .url()
        .should('contain','register')
    })

    it("Navigate To Favorite Article",() =>{
        cy.get('.author').first().click()
        cy.xpath('//a[contains(text(),"Favorited Articles")]')
        .click();  
    })
})
