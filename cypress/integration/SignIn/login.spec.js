/// <reference types="cypress" />

describe("Login Test",()=>{

    beforeEach(() =>{
        cy.visit("http://localhost:4100/")
    })

    it("Valid Login - Correct Credentials" ,() =>{
      cy.fixture('BasicDetails').then(function (data) {
        cy.visit(data.AppUrl)        
        cy.login(data.email,data.password)
        cy.containText('//body','New Post')
      }) 
    })

    it("Invalid Login- Incorrect Email" ,() =>{
      cy.fixture('BasicDetails').then(function (data) {
        cy.visit(data.AppUrl)        
        cy.login("Wrongemail@gmail.com",data.password)
      }) 

      cy.containText('.error-messages','email or password is invalid')
    })

    it("Invalid Login- Incorrect password" ,() =>{
      cy.fixture('BasicDetails').then(function (data) {
        cy.visit(data.AppUrl)        
        cy.login(data.email,"wrongpasswrd")
      }) 

      cy.containText('.error-messages','email or password is invalid')
    })

    it("Navigation To Signup Page from login page" ,() =>{
        cy.clickAndcheckURL('//a[contains(@href,"login")]','login')
        cy.clickAndcheckURL('//a[text()="Need an account?"]','register')
    })
})