/// <reference types = "cypress" />

describe("Updating User Detail",() =>{

    beforeEach(() =>{
        cy.fixture('BasicDetails').then(function (data) {
            cy.visit(data.AppUrl)        
            cy.login(data.email,data.password)
            cy.xpath('//body')
            .should("contain.text","New Post")
          }) 
    })

    it("Update Username",()=>{
        cy.clickXpathAndcheckURL('//a[contains(text(),"Settings")]','settings')

        cy.enterTextByCss('input[placeholder="Username"]','tempUserName1234')

        cy.clickElementByXpath('//button[text()="Update Settings"]')
        .wait(3000)

        cy.clickXpathAndcheckURL('//a[img[@class="user-pic"]]','tempUserName1234')
    })

    it("Revert Username",()=>{
        cy.clickXpathAndcheckURL('//a[contains(text(),"Settings")]','settings')
        
        cy.enterTextByCss('input[placeholder="Username"]','suniljaiswal')

        cy.clickElementByXpath('//button[text()="Update Settings"]')
        .wait(3000)

        cy.clickXpathAndcheckURL('//a[img[@class="user-pic"]]','suniljaiswal')
    })
})