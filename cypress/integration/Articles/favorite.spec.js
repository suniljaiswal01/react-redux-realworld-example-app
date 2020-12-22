/// <reference types='cypress'/>

describe("Adding Article as favorite",()=>{
    let titleName;
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

    /**
     * This testcase marks the first article created by others users as favorite.
     * It is ignore the article which is already marked as favorite by the logged in user
     */
    it("Marking Article as favorite",() =>{
        cy.intercept('articles').as('articleList')
        cy.clickElement(locator.homePage.globalFeedBtn)
        cy.wait('@articleList')
            
        let username = "suniljaiswal"
        let favoriteBtn = "//div[a[@class='author' and not(text()='" + username + "')]]/following-sibling::div/button[contains(@class,'btn-outline-primary')]/i"
        let favoriteCount = "//div[a[@class='author' and not(text()='" + username + "')]]/following-sibling::div//button[contains(@class,'btn-outline-primary')]"
    
        cy.xpath(favoriteCount).first().invoke('text').then(count=>{
            cy.intercept('favorite').as('addFavorite')
            cy.clickElement(favoriteBtn)
                .wait('@addFavorite')
            cy.xpath(favoriteCount).first().should('contain.text',parseInt(count)+1)

            cy.xpath("//div[div[a[@class='author' and not(text()='" + username + "')]]]/following-sibling::a/h1")
            .first().invoke('text').then(text =>{
                titleName = text
            })
        })
    })

    /**
     * This testcase check if the article marked as favorite in the above 
     * testcase is displayed in logged in users Favorited Article page
     */
    it("Checking if favorite article is displayed in My Favorited page",() =>{
        cy.intercept('articles').as('articleList')
        cy.clickElement(locator.homePage.userProfileBtn)
        cy.wait('@articleList')

        cy.intercept('favorited').as('favoritedList')
        cy.clickElement(locator.userPage.favoriteArtilePage)
        cy.wait('@favoritedList')
        
        cy.reload().wait(3000)
        cy.containText(locator.userPage.articleTitleLink,titleName)
        
    })

    /**
     * This testcase marks artile as dis-favorite which was marked as favorite in above testcase
     */
    it("Marking Article as dis-favorite",() =>{
        cy.intercept('articles').as('articleList')
        cy.clickElement(locator.homePage.userProfileBtn)
        cy.wait('@articleList')
        
        cy.intercept('favorited').as('favoritedList')
        cy.clickElement(locator.userPage.favoriteArtilePage)
        cy.wait('@favoritedList')

        cy.xpath(locator.userPage.articleTitleLink).should('contain.text',titleName).then(()=>{
            let artileLink = '//div[a[h1[text()="'+titleName+'"]]]//i'
            cy.clickElement(artileLink)
        })

        cy.reload()
        cy.xpath(locator.userPage.articleTitleLink).should('not.contain.text',titleName)
    })
})
