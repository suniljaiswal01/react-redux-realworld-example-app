/// <reference types="cypress" />

describe("Login Test", () => {
  let locator;

  before(() => {
    cy.fixture('Locators').then(data => {
      locator = data
    })
  })

  beforeEach(() => {
    cy.visit("http://localhost:4100/")
  })

  it("Valid Login - Correct Credentials", () => {
    cy.fixture('BasicDetails').then(function (data) {
      cy.visit(data.AppUrl)
      cy.login(data.email, data.password)
      cy.containText('//body', 'New Post')
    })
  })

  it("Invalid Login- Incorrect Email", () => {
    cy.fixture('BasicDetails').then(function (data) {
      cy.visit(data.AppUrl)
      cy.get(locator.loginpage.emailInput).type("Wrongemail@gmail.com")
      cy.get(locator.loginpage.passwordInput).type("Test@2020")
      cy.xpath(locator.loginpage.signInBtn).click()
    })

    cy.containText(locator.loginpage.errorMsgContainer, 'email or password is invalid')
  })

  it("Invalid Login- Incorrect password", () => {
    cy.fixture('BasicDetails').then(function (data) {
      cy.visit(data.AppUrl)
      cy.get(locator.loginpage.emailInput).type(data.userName)
      cy.get(locator.loginpage.passwordInput).type("Test@21020")
      cy.xpath(locator.loginpage.signInBtn).click()
    })

    cy.containText(locator.loginpage.errorMsgContainer, 'email or password is invalid')
  })

  it("Navigation To Signup Page from login page", () => {
    cy.clickAndcheckURL(locator.loginpage.loginPageLink, 'login')
    cy.clickAndcheckURL(locator.loginpage.needAnAccountLink, 'register')
  })
})