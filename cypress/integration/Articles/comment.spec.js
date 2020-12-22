/// <reference types = "cypress"/>

describe("Commenting on self blog", () => {

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

    it("Commenting On Article", () => {

        cy.intercept('articles').as('articleList')
        cy.clickElement(locator.homePage.userProfileBtn)
        cy.reload().wait(3000)

        cy.wait('@articleList').then((interception) => {
            var articleCount = interception.response.body.articlesCount
            if (articleCount > 0) { 
                cy.clickElement(locator.articlePage.articleLink)
                cy.enterText(locator.articlePage.commentInput, "This is sample comment")
                cy.clickElement(locator.articlePage.postCommentBtn)
                cy.containText(locator.articlePage.commentContainer, 'This is sample comment')
            } else {
                cy.log("No Article Present")
            }

        })
    })

    it("Delete Comment from Article", () => {

        cy.intercept('articles').as('articleList')

        cy.clickElement(locator.homePage.userProfileBtn)
        cy.wait(3000)
            .reload()

        cy.wait('@articleList').then((interception) => {
            var articleCount = interception.response.body.articlesCount
            if (articleCount > 0) {
                cy.clickElement(locator.articlePage.articleLink)
                cy.clickElement(locator.articlePage.deleteCommentBtn)
            } else {
                cy.log("No Article Present")
            }
        })
    })
})

describe("Commenting and deleting on others blog", () => {

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

    it("Commenting On Article", () => {
        cy.clickElement(locator.homePage.globalFeedBtn)

        let username = "suniljaiswal"
        let article = "//div[div[a[@class='author' and not(text()='" + username + "')]]]/following-sibling::a"
        cy.clickElement(article)
        
        cy.enterText(locator.articlePage.commentInput, "This is sample comment")
        cy.clickElement(locator.articlePage.postCommentBtn)

        cy.containText(locator.articlePage.commentContainer, 'This is sample comment')
        
        cy.clickElement(locator.articlePage.deleteCommentBtn)
    })
})