/// <reference types = "cypress"/>

describe("Commenting on self blog", () => {

    beforeEach(() => {
        cy.fixture('BasicDetails').then(function (data) {
            cy.visit(data.AppUrl)
            cy.login(data.email, data.password)
            cy.containText('//body', 'New Post')
        })
    })

    it("Commenting On Article", () => {

        cy.intercept('articles').as('articleList')

        cy.clickElement(`//a[img[@class="user-pic"]]`)
        cy.wait(3000)
            .reload()

        cy.wait('@articleList').then((interception) => {
            var articleCount = interception.response.body.articlesCount
            if (articleCount > 0) {
                cy.clickElement(`.preview-link`)
                cy.enterText(`//div[@class="card-block"]/textarea`, "This is sample comment")
                cy.clickElement(`//button[text()="Post Comment"]`)
                cy.containText('.card-text', 'This is sample comment')
            } else {
                cy.log("No Article Present")
            }

        })
    })

    it("Delete Comment from Article", () => {

        cy.intercept('articles').as('articleList')

        cy.clickElement(`//a[img[@class="user-pic"]]`)
        cy.wait(3000)
            .reload()

        cy.wait('@articleList').then((interception) => {
            var articleCount = interception.response.body.articlesCount
            if (articleCount > 0) {
                cy.clickElement(`.preview-link`)
                cy.clickElement(`//div[@class="card-footer"]//i[@class="ion-trash-a"]`)
            } else {
                cy.log("No Article Present")
            }
        })
    })
})

describe("Commenting and deleting on others blog", () => {

    beforeEach(() => {
        cy.fixture('BasicDetails').then(function (data) {
            cy.visit(data.AppUrl)
            cy.login(data.email, data.password)
            cy.containText('//body', 'New Post')
        })
    })

    it("Commenting On Article", () => {
        cy.clickElement(`//a[text()="Global Feed"]`)

        let username = "suniljaiswal"
        let article = "//div[div[a[@class='author' and not(text()='" + username + "')]]]/following-sibling::a"
        cy.clickElement(article)

        cy.enterText(`//div[@class="card-block"]/textarea`, "This is sample comment")
        cy.clickElement(`//button[text()="Post Comment"]`)

        cy.containText('.card-text', 'This is sample comment')

        cy.clickElement(`//div[@class="card-footer"]//i[@class="ion-trash-a"]`)
    })
})