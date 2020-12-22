/// <reference types = "cypress" />

const casual = require('casual-browserify')

describe("New Article", () => {

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


    it("Creating New Article", () => {
        cy.clickElement(locator.articlePage.newPostBtn)
        let Articletitle = casual.title
        cy.enterText(locator.articlePage.articleTitle, Articletitle)
        cy.enterText(locator.articlePage.articleDesc, casual.short_description)
        cy.enterText(locator.articlePage.articleMarkdown, casual.short_description)
        cy.enterText(locator.articlePage.articleTag, casual.word)

        cy.clickElement(locator.articlePage.publishBtn)
        cy.containText(locator.articlePage.articleBanner, Articletitle)
    })

    it("Editing an Article", () => {

        cy.clickElement(locator.homePage.userProfileBtn)

        cy.containText(locator.homePage.userInfoContainer, 'Profile Settings')

        cy.reload()

        cy.clickElement(locator.articlePage.articleLink)

        cy.clickAndcheckURL(locator.articlePage.editArticlebtn, 'editor')
            .wait(3000)

        let Articletitle = casual.title
        cy.enterText(locator.articlePage.articleTitle, Articletitle)

        cy.clickElement(locator.articlePage.publishBtn)

        cy.containText(locator.articlePage.articleBanner, Articletitle)
    })

    it("Deleting an Article", () => {
        cy.clickElement(locator.homePage.userProfileBtn)
        cy.reload()
        cy.clickElement(locator.articlePage.articleLink)
        cy.clickAndcheckURL(locator.articlePage.deleteArticleBtn, 'http://localhost:4100/')
    })

    it("verify Ui when no article is present", () => {
        
        cy.intercept("GET","/api/articles?limit=10&offset=0",{
            statusCode: 200,
            body: { "articles": [], "articlesCount": 0 }
        }).as('article')

        cy.clickElement(locator.homePage.globalFeedBtn)
        cy.wait('@article')

        cy.containText(locator.articlePage.articleListing,'No articles are here')
    })

})