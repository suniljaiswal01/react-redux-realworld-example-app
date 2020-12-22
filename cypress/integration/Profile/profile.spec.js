/// <reference types = "cypress" />

describe("Updating User Detail",() =>{
    let locator;

    before(()=>{
      cy.fixture('Locators').then(data=>{
        locator = data
      })
    })

    beforeEach(() =>{
        cy.fixture('BasicDetails').then(function (data) {
            cy.visit(data.AppUrl)        
            cy.login(data.email,data.password)
            cy.containText('//body','New Post')
          }) 
    })

    it("Check My Articles Page",()=>{

        cy.intercept('articles').as('articleList')
        cy.clickElement(locator.homePage.userProfileBtn)

        cy.wait('@articleList').then((interception)=>{
            var articleCount = interception.response.body.articlesCount
            if(articleCount>0){
                cy.clickElement(locator.articlePage.articleLink)
            }else{
                cy.log("No Article Present")
            }
        })
    })

    it("Check Favorited Articles Page",()=>{

        cy.clickElement(locator.homePage.userProfileBtn)

        cy.intercept('favorited').as('favoritedList')
        cy.clickElement(locator.userPage.favoriteArtilePage)

        cy.wait('@favoritedList').then((interception)=>{
            var articleCount = interception.response.body.articlesCount
            if(articleCount>0){
                cy.clickElement(locator.articlePage.articleLink)
            }else{
                cy.log("No Favorited Article Present")
            }
        })
    })
})