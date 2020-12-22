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

    it("Update Username",()=>{
        cy.clickAndcheckURL(locator.settingPage.settingBtn,'settings')

        cy.enterText(locator.settingPage.userNameInput,'tempUserName1234')

        cy.clickElement(locator.settingPage.updateSettingBtn)
        .wait(3000)

        cy.clickAndcheckURL(locator.homePage.userProfileBtn,'tempUserName1234')
    })

    it("Revert Username",()=>{
        cy.clickAndcheckURL(locator.settingPage.settingBtn,'settings')
        
        cy.enterText(locator.settingPage.userNameInput,'suniljaiswal')

        cy.clickElement(locator.settingPage.updateSettingBtn)
        .wait(3000)

        cy.clickAndcheckURL(locator.homePage.userProfileBtn,'suniljaiswal')
    })
})