/// <reference types="cypress" />

describe("Home Page Test Case", () => {

  beforeEach(() => {
    cy.visit("http://localhost:4100/")
  })

  it("Check navigation- Login,Signup,Home", () => {

    cy.clickXpathAndcheckURL('//a[@class="nav-link" and text()="Sign in"]', 'login')

    cy.clickElementByXpath(`//a[@class="nav-link" and text()="Home"]`)

    cy.containText('.banner','A place to share your knowledge.')
  
    cy.clickXpathAndcheckURL('//a[@class="nav-link" and text()="Sign up"]', 'register')

    cy.clickElementByCss(`.navbar-brand`)

    cy.containText('.banner','A place to share your knowledge.')
  })
})