/// <reference types = "cypress" />

describe("Profile Update",() =>{

    beforeEach(() =>{
        cy.visit("http://localhost:4100/")
        cy.xpath('//a[contains(@href,"login")]')
          .click()
          .url()
          .should('contain','login')
        cy.get('input[placeholder="Email"]')
        .type("sunil10j@gmail.com")

        cy.get('input[placeholder="Password"]')
        .type('Test@2020')

        cy.xpath('//button[text()="Sign in"]')
        .click()

        cy.xpath('//body')
        .should("contain.text","Settings")
    })

    it("Update Username",()=>{
        cy.xpath('//a[contains(text(),"Settings")]')
        .click()
        .url()
        .should('contain','settings')

        cy.get('input[placeholder="Username"]')
        .clear()
        .type("tempUserName1234")

        cy.xpath('//button[text()="Update Settings"]')
        .click()
        .wait(3000)


        cy.xpath('//a[img[@class="user-pic"]]')
        .click()
        .url()
        .should('contain','tempUserName1234')

    })

    it("Revert Username",()=>{
        cy.xpath('//a[contains(text(),"Settings")]')
        .click()
        .url()
        .should('contain','settings')

        cy.get('input[placeholder="Username"]')
        .clear()
        .type("suniljaiswal")

        cy.xpath('//button[text()="Update Settings"]')
        .click()
        .wait(3000)
        
        cy.xpath('//a[img[@class="user-pic"]]')
        .click()
        .url()
        .should('contain','suniljaiswal')

    })
})