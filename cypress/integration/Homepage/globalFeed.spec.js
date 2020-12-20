/// <reference types = "cypress" />

describe("Global Feed- Before Login",() =>{

    beforeEach(() =>{
        cy.visit("http://localhost:4100/")
    })

    it("Navigating to first article",() =>{
        cy.clickElementByCss('.preview-link')
    })

    
    it("Navigating to first user",() =>{
        cy.clickElementByCss('.author')
    })

    it("Adding Article To Favorite",() =>{
        cy.clickCssAndcheckURL('.ion-heart',"register")
    })
})


describe("User Flow",() =>{
    beforeEach(() =>{
        cy.visit("http://localhost:4100/")
    })

    it("Follow user",() =>{
        cy.clickElementByCss('.author')
        cy.clickCssAndcheckURL('.ion-plus-round',"register")
    })

    it("Navigate To Favorite Article",() =>{
        cy.clickElementByCss('.author')
        cy.clickElementByXpath('//a[contains(text(),"Favorited Articles")]')
    })
})
