/// <reference types = "cypress" />

describe("Global Feed- Before Login", () => {

    beforeEach(() => {
        cy.visit("http://localhost:4100/")
    })

    it("Navigating to first article", () => {
        cy.clickElement('.preview-link')
    })


    it("Navigating to first user", () => {
        cy.clickElement('.author')
    })

    it("Adding Article To Favorite", () => {
        cy.clickAndcheckURL('.ion-heart', "register")
    })
})


describe("User Flow", () => {
    beforeEach(() => {
        cy.visit("http://localhost:4100/")
    })

    it("Follow user", () => {
        cy.clickElement('.author')
        cy.clickAndcheckURL('.ion-plus-round', "register")
    })

    it("Navigate To Favorite Article", () => {
        cy.clickElement('.author')
        cy.clickElement('//a[contains(text(),"Favorited Articles")]')
    })
})

describe("Pagination Check", () => {
    beforeEach(() => {
        cy.fixture('BasicDetails').then(function (data) {
            cy.visit(data.AppUrl)
            cy.login(data.email, data.password)
            cy.containText('//body', 'New Post')
        })
    })

    it("Navigate to random page from Global Feed", () => {
        cy.intercept('articles').as('articleList')
        cy.clickElement(`//a[text()="Global Feed"]`)
        cy.wait('@articleList')

        cy.get('.page-link').last().invoke('text').then(lastPage => {
            let pageNumber = Math.floor(Math.random() * parseInt(lastPage)) + 1
            let pageLink = '//a[@class="page-link" and text()="' + pageNumber + '"]'
            cy.clickElement(pageLink)
            cy.xpath('//li[a[@class="page-link" and text()="' + pageNumber + '"]]').should('have.class', 'active')
        })
    })

    it("Navigate to random article page from user", () => {
        cy.intercept('articles').as('articleList')
        cy.visit('http://localhost:4100/@UdidactCamp2020')
        cy.wait('@articleList')

        cy.get('.page-link').last().invoke('text').then(lastPage => {
            let pageNumber = Math.floor(Math.random() * parseInt(lastPage)) + 2
            let pageLink = '//a[@class="page-link" and text()="' + pageNumber + '"]'
            cy.clickElement(pageLink)
            .wait(3000)
            cy.xpath("//div[div[a[@class='author' and not(text()='UdidactCamp2020')]]]").should('have.length',0)
        })
    })
})
