/// <reference types="cypress" />

const casual = require('casual-browserify')

var newuser={
    username:casual.first_name,
    email:casual.email,
}

describe("SignUp",()=>{
    it('Register with new user',()=>{
        
        cy.visit('http://localhost:4100')
        cy.clickElementByXpath('//a[text()="Sign up"]')
        cy.enterTextByCss('input[placeholder="Username"]',newuser.username)
        cy.enterTextByCss('input[placeholder="Email"]',newuser.email)
        cy.enterTextByCss('input[placeholder="Password"]',"Test@2020")
        cy.clickElementByCss('button[type="submit"]')

        cy.xpath('//a[img[@class="user-pic"]]').invoke('text').should('eq',newuser.username)
    })

    it('Register with existing user',()=>{
        
        cy.visit('http://localhost:4100')
        cy.clickElementByXpath('//a[text()="Sign up"]')
        cy.enterTextByCss('input[placeholder="Username"]',"suniljaiswal")
        cy.enterTextByCss('input[placeholder="Email"]',"sunil10j@gmail.com")
        cy.enterTextByCss('input[placeholder="Password"]',"Test3212")
        cy.clickElementByCss('button[type="submit"]')
        
        cy.containText('.error-messages','email has already been taken')
        cy.containText('.error-messages','username has already been taken')
    })

    it('Register with blank username',()=>{
        
        cy.visit('http://localhost:4100')
        cy.clickElementByXpath('//a[text()="Sign up"]')
        cy.enterTextByCss('input[placeholder="Email"]',"sunil10j@gmail.com")
        cy.enterTextByCss('input[placeholder="Password"]',"Test3212")
        cy.clickElementByCss('button[type="submit"]')
        cy.containText('.error-messages',`username can't be blank`)
    })
})