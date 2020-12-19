/// <reference types = "cypress"/>

describe("Commenting on self blog",() =>{

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

    it("Commenting On Article",() =>{
        cy.xpath('//a[img[@class="user-pic"]]')
        .click()

        cy.reload()

        cy.get('.preview-link')
        .first()
        .click()

        cy.xpath('//div[@class="card-block"]/textarea')
        .type("This is sample comment")

        cy.xpath('//button[text()="Post Comment"]')
        .click()

        cy.get('.card-text')
        .should('contain.text','This is sample comment')

    })

    it("Delete Comment from Article",() =>{
        cy.xpath('//a[img[@class="user-pic"]]')
        .click()

        cy.reload()
        
        cy.get('.preview-link')
        .first()
        .click()

        cy.xpath('//div[@class="card-footer"]//i[@class="ion-trash-a"]')
        .first()
        .click()
    })
})

describe("Commenting and deleting on others blog",() =>{

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

    it("Commenting On Article",() =>{
        cy.xpath('//a[text()="Global Feed"]')
        .click()

        let username = "suniljaiswal"
        let article = "//div[div[a[@class='author' and not(text()='"+username+"')]]]/following-sibling::a"

        cy.xpath(article)
        .first()
        .click()

        cy.xpath('//div[@class="card-block"]/textarea')
        .type("This is sample comment")

        cy.xpath('//button[text()="Post Comment"]')
        .click()

        cy.get('.card-text')
        .should('contain.text','This is sample comment')

        cy.xpath('//div[@class="card-footer"]//i[@class="ion-trash-a"]')
        .first()
        .click()    
    })
})