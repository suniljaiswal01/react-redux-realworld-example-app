/// <reference types = "cypress" />

const casual = require('casual-browserify')

describe("New Article", () => {
    beforeEach(() => {
        cy.fixture('BasicDetails').then(function (data) {
            cy.visit(data.AppUrl)
            cy.login(data.email, data.password)
            cy.containText('//body', 'New Post')
        })
    })


    it("Creating New Article", () => {
        cy.clickElement(`//a[contains(text(),"New Post")]`)
        let Articletitle = casual.title
        cy.enterText('[placeholder="Article Title"]', Articletitle)
        cy.enterText(`[placeholder="What's this article about?"]`, casual.short_description)
        cy.enterText(`[placeholder="Write your article (in markdown)"]`, casual.short_description)
        cy.enterText(`[placeholder="Enter tags"`, casual.word)

        cy.clickElement(`//button[text()="Publish Article"]`)
        cy.containText('.banner', Articletitle)
    })

    it("Editing an Article", () => {

        cy.clickElement(`//a[img[@class="user-pic"]]`)

        cy.containText('.user-info', 'Profile Settings')

        cy.reload()

        cy.clickElement(`.preview-link`)

        cy.clickAndcheckURL('//a[contains(text(),"Edit Article")]', 'editor')
            .wait(3000)

        let Articletitle = casual.title
        cy.enterText(`[placeholder="Article Title"]`, Articletitle)

        cy.clickElement(`//button[text()="Publish Article"]`)

        cy.containText('.banner', Articletitle)
    })

    it("Deleting an Article", () => {
        cy.clickElement(`//a[img[@class="user-pic"]]`)
        cy.reload()
        cy.clickElement(`.preview-link`)
        cy.clickAndcheckURL('//button[contains(text(),"Delete Article")]', 'http://localhost:4100/')
    })

    it("verify Ui when no article is present", () => {
        
        cy.intercept("GET","/api/articles?limit=10&offset=0",{
            statusCode: 200,
            body: { "articles": [], "articlesCount": 0 }
        }).as('article')

        cy.clickElement(`//a[text()="Global Feed"]`)
        cy.wait('@article')

        cy.containText('.article-preview','No articles are here')
    })

})