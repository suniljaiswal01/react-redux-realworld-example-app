/// <reference types="cypress" />

describe("Home Page Test Case", () => {

  let locator;
  before(()=>{
    cy.fixture('Locators').then(data=>{
      locator = data
    })
  })
  beforeEach(() => {
    cy.visit("http://localhost:4100/")
  })

  it("Check navigation- Login,Signup,Home", () => {

    cy.clickAndcheckURL(locator.homePage.signBtn, 'login')

    cy.clickElement(locator.homePage.homelink)

    cy.containText(locator.homePage.banner,'A place to share your knowledge.')
  
    cy.clickAndcheckURL(locator.homePage.singUpbtn, 'register')

    cy.clickElement(locator.homePage.homeIcon)

    cy.containText(locator.homePage.banner,'A place to share your knowledge.')
  })
})