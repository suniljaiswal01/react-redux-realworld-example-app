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

    /**
     * This testcase is used to update the username of the logged in user
     */
    it("Update Username",()=>{
        cy.clickAndcheckURL(locator.settingPage.settingBtn,'settings')

        cy.enterText(locator.settingPage.userNameInput,'tempUserName1234')

        cy.clickElement(locator.settingPage.updateSettingBtn)
        .wait(3000)

        cy.clickAndcheckURL(locator.homePage.userProfileBtn,'tempUserName1234')
    })

    /**
     * This testcase is used to revert the updated username in the above testcase for the logged in user
     */
    it("Revert Username",()=>{
        cy.clickAndcheckURL(locator.settingPage.settingBtn,'settings')
        
        cy.enterText(locator.settingPage.userNameInput,'suniljaiswal')

        cy.clickElement(locator.settingPage.updateSettingBtn)
        .wait(3000)

        cy.clickAndcheckURL(locator.homePage.userProfileBtn,'suniljaiswal')
    })
})