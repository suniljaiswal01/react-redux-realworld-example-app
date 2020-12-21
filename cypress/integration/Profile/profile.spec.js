/// <reference types = "cypress" />

describe("Updating User Detail",() =>{

    beforeEach(() =>{
        cy.fixture('BasicDetails').then(function (data) {
            cy.visit(data.AppUrl)        
            cy.login(data.email,data.password)
            cy.containText('//body','New Post')
          }) 
    })

    it("Check My Articles Page",()=>{

        cy.intercept('articles').as('articleList')
        cy.clickElement(`//a[img[@class="user-pic"]]`)

        cy.wait('@articleList').then((interception)=>{
            var articleCount = interception.response.body.articlesCount
            if(articleCount>0){
                cy.clickElement(`.preview-link`)
            }else{
                cy.log("No Article Present")
            }
        })
    })

    it("Check Favorited Articles Page",()=>{

        cy.clickElement(`//a[img[@class="user-pic"]]`)

        cy.intercept('favorited').as('favoritedList')
        cy.clickElement(`//a[text()="Favorited Articles"]`)

        cy.wait('@favoritedList').then((interception)=>{
            var articleCount = interception.response.body.articlesCount
            if(articleCount>0){
                cy.clickElement(`.preview-link`)
            }else{
                cy.log("No Favorited Article Present")
            }
        })
    })
})