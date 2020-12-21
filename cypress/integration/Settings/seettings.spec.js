/// <reference types = "cypress" />

describe("Updating User Detail",() =>{

    beforeEach(() =>{
        cy.fixture('BasicDetails').then(function (data) {
            cy.visit(data.AppUrl)        
            cy.login(data.email,data.password)
            cy.containText('//body','New Post')
          }) 
    })

    it("Update Username",()=>{
        cy.clickAndcheckURL('//a[contains(text(),"Settings")]','settings')

        cy.enterText('input[placeholder="Username"]','tempUserName1234')

        cy.clickElement('//button[text()="Update Settings"]')
        .wait(3000)

        cy.clickAndcheckURL('//a[img[@class="user-pic"]]','tempUserName1234')
    })

    it("Revert Username",()=>{
        cy.clickAndcheckURL('//a[contains(text(),"Settings")]','settings')
        
        cy.enterText('input[placeholder="Username"]','suniljaiswal')

        cy.clickElement('//button[text()="Update Settings"]')
        .wait(3000)

        cy.clickAndcheckURL('//a[img[@class="user-pic"]]','suniljaiswal')
    })
})