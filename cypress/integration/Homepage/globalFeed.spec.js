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

    /**
     * This testcase is used to navigate to first article present in the Global feed page before user is logged in
     * 
     */
    it("Navigating to first article", () => {
        cy.clickElement(locator.articlePage.articleLink)
    })

    /**
     * This testcase is used to navigate to first author present in the Global feed page before user is logged in
     */
    it("Navigating to first user", () => {
        cy.clickElement(locator.articlePage.articleAuthorlink)
    })

    /**
     * This testcase is used to mark first artile as favorite present in the Global feed page before user is logged in
     * Expected Result: User should be redirected to Register Page
     */
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

    /**
     * This testcase is to verify whether user is able to follow the author before logging into the application
     * Expected Result: User should be redirected to Register page
     */
    it.skip("Follow user", () => {
        cy.clickElement(locator.articlePage.articleAuthorlink)
        cy.clickAndcheckURL(locator.articlePage.articleFollowBtn, "register")
    })

    /**
     * This testcase is the verify whether user is above to navigate to author faviroted aritcle page
     */
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

    /**
     * This testcase randomly navigate to any of the page in the global feed page and check if the page is active 
     */
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

     /**
     * This testcase randomly navigate to any of the page in the author profile page 
     * and verify if all the artilce present in the page is for the specified author only 
     */   
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
