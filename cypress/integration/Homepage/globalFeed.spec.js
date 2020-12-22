/// <reference types = "cypress" />

describe("Global Feed- Before Login", () => {

    let locator;

    before(()=>{
      cy.fixture('Locators').then(data=>{
        locator = data
      })
    })

    beforeEach(() => {
        cy.visit("http://localhost:4100/")
    })

    it("Navigating to first article", () => {
        cy.clickElement(locator.articlePage.articleLink)
    })


    it("Navigating to first user", () => {
        cy.clickElement(locator.articlePage.articleAuthorlink)
    })

    it.skip("Adding Article To Favorite", () => {
        cy.clickAndcheckURL(locator.articlePage.favoriteBtn, "register")
    })
})


describe("User Flow", () => {
    let locator;

    before(()=>{
      cy.fixture('Locators').then(data=>{
        locator = data
      })
    })

    beforeEach(() => {
        cy.visit("http://localhost:4100/")
    })

    it.skip("Follow user", () => {
        cy.clickElement(locator.articlePage.articleAuthorlink)
        cy.clickAndcheckURL(locator.articlePage.articleFollowBtn, "register")
    })

    it("Navigate To Favorite Article", () => {
        cy.clickElement(locator.articlePage.articleAuthorlink)
        cy.clickElement(locator.userPage.favoriteArtilePage)
    })
})

describe("Pagination Check", () => {
    let locator;

    before(()=>{
      cy.fixture('Locators').then(data=>{
        locator = data
      })
    })

    beforeEach(() => {
        cy.fixture('BasicDetails').then(function (data) {
            cy.visit(data.AppUrl)
            cy.login(data.email, data.password)
            cy.containText('//body', 'New Post')
        })
    })

    it("Navigate to random page from Global Feed", () => {
        cy.intercept('articles').as('articleList')
        cy.clickElement(locator.homePage.globalFeedBtn)
        cy.wait('@articleList')

        cy.get(locator.homePage.paginationLink).last().invoke('text').then(lastPage => {
            let pageNumber = Math.floor(Math.random() * parseInt(lastPage)) + 1
            let pageLink = '//a[@class="page-link" and text()="' + pageNumber + '"]'
            cy.clickElement(pageLink)
            cy.xpath('//li[a[@class="page-link" and text()="' + pageNumber + '"]]').should('have.class', 'active')
        })
    })

    it.skip("Navigate to random article page from user", () => {
        cy.intercept('articles').as('articleList')
        cy.visit('http://localhost:4100/@UdidactCamp2020')
        cy.wait('@articleList')

        cy.get(locator.homePage.paginationLink).last().invoke('text').then(lastPage => {
            let pageNumber = Math.floor(Math.random() * parseInt(lastPage)) + 2
            let pageLink = '//a[@class="page-link" and text()="' + pageNumber + '"]'
            cy.clickElement(pageLink)
            .wait(3000)
            cy.xpath("//div[div[a[@class='author' and not(text()='UdidactCamp2020')]]]").should('have.length',0)
        })
    })
})
