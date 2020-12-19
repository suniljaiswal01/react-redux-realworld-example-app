/// <reference types="cypress" />

describe("Login Test",()=>{

    beforeEach(() =>{
        cy.visit("http://localhost:4100/")
    })

    it("Valid Login - Correct Credentials" ,() =>{
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
        .should("contain.text","New Post")
    })

    it("Invalid Login- Incorrect username" ,() =>{
        cy.xpath('//a[contains(@href,"login")]')
          .click()
          .url()
          .should('contain','login')
        cy.get('input[placeholder="Email"]')
        .type("sunilj@gmail.com")

        cy.get('input[placeholder="Password"]')
        .type('Test@2020')

        cy.xpath('//button[text()="Sign in"]')
        .click()

        cy.get('.error-messages')
        .should("contain.text","email or password is invalid")
    })

    it("Invalid Login- Incorrect password" ,() =>{
        cy.xpath('//a[contains(@href,"login")]')
          .click()
          .url()
          .should('contain','login')
        cy.get('input[placeholder="Email"]')
        .type("sunil10j@gmail.com")

        cy.get('input[placeholder="Password"]')
        .type('Test1@2020')

        cy.xpath('//button[text()="Sign in"]')
        .click()

        cy.get('.error-messages')
        .should("contain.text","email or password is invalid")
    })

    it("Navigation To Signup Page from login page" ,() =>{
        cy.xpath('//a[contains(@href,"login")]')
          .click()
          .url()
          .should('contain','login')

        cy.xpath('//a[text()="Need an account?"]')
          .click()
          .url()
          .should('contain','register')

    })
})