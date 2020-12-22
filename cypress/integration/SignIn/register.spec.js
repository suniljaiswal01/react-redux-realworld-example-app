/// <reference types="cypress" />

const casual = require('casual-browserify')

var newuser={
    username:casual.first_name,
    email:casual.email,
}

describe("SignUp",()=>{
    let locator;

    before(() => {
      cy.fixture('Locators').then(data => {
        locator = data
      })
    })

    it('Register with new user',()=>{
        
        cy.visit('http://localhost:4100')
        cy.clickElement(locator.registerPage.signUppageLink)
        cy.enterText(locator.registerPage.userNameInput,newuser.username)
        cy.enterText(locator.registerPage.emailInput,newuser.email)
        cy.enterText(locator.registerPage.passwordInput,"Test@2020")
        cy.clickElement(locator.registerPage.submitBtn)

        cy.xpath(locator.homePage.userProfileBtn).invoke('text').should('eq',newuser.username)
    })

    it('Register with existing user',()=>{
        
        cy.visit('http://localhost:4100')
        cy.clickElement(locator.registerPage.signUppageLink)
        cy.enterText(locator.registerPage.userNameInput,"suniljaiswal")
        cy.enterText(locator.registerPage.emailInput,"sunil10j@gmail.com")
        cy.enterText(locator.registerPage.passwordInput,"Test3212")
        cy.clickElement(locator.registerPage.submitBtn)
        
        cy.containText(locator.registerPage.errorMsgContainer,'email has already been taken')
        cy.containText(locator.registerPage.errorMsgContainer,'username has already been taken')
    })

    it('Register with blank username',()=>{
        
        cy.visit('http://localhost:4100')
        cy.clickElement(locator.registerPage.signUppageLink)
        cy.enterText(locator.registerPage.emailInput,"sunil10j@gmail.com")
        cy.enterText(locator.registerPage.passwordInput,"Test3212")
        cy.clickElement(locator.registerPage.submitBtn)
        
        cy.containText(locator.registerPage.errorMsgContainer,`username can't be blank`)
    })
})