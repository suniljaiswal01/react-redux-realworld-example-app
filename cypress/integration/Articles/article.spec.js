/// <reference types = "cypress" />

describe("New Article",() =>{

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
        .should("contain.text","New Post")
    })


    it("Creating New Article",() =>{
        cy.xpath('//a[contains(text(),"New Post")]')
        .click()

        cy.get('[placeholder="Article Title"]')
        .type('TestTitle')
        .should('contain.value','TestTitle')

        cy.get(`[placeholder="What's this article about?"]`)
        .type('Sample Testing Article')
        .should('contain.value','Sample Testing Article')
    
        cy.get('[placeholder="Write your article (in markdown)"]')
        .type('This is for testing')
        .should('contain.value','This is for testing')
    
        cy.get('[placeholder="Enter tags"]')
        .type('Test')
        .should('contain.value','Test')

        cy.xpath('//button[text()="Publish Article"]').click()

        cy.get('.banner')
        .should('contain.text',"Test")
    })

    it("Editing an Article",() =>{
        cy.xpath('//a[img[@class="user-pic"]]')
        .click()

        cy.get('.user-info')
        .should('contain.text','Profile Settings')

        cy.reload()

        cy.get('.preview-link')
        .first()
        .click()

        cy.xpath('//a[contains(text(),"Edit Article")]')
        .click()
        .url()
        .should('contain','editor')

        cy.get('[placeholder="Enter tags"]')
        .wait(2000)
        .type('Test')
        .should('contain.value','Test')

        cy.xpath('//button[text()="Publish Article"]').click()

        cy.get('.banner')
        .should('contain.text',"Test")

    })

    it("Deleting an Article",() =>{
        cy.xpath('//a[img[@class="user-pic"]]')
        .click()
     
        cy.reload()

        cy.get('.preview-link')
        .first()
        .click()


        cy.xpath('//button[contains(text(),"Delete Article")]')
        .click()
        .url()
        .should('eq','http://localhost:4100/')
    })

    
})