/// <reference types="cypress" />

const casual = require('casual-browserify')

var newuser={
    username:casual.first_name,
    email:casual.email,
}

describe("SignUp",()=>{
    it('Register with new user',()=>{
        
        cy.visit('http://localhost:4100')
        cy.clickElement('//a[text()="Sign up"]')
        cy.enterText('input[placeholder="Username"]',newuser.username)
        cy.enterText('input[placeholder="Email"]',newuser.email)
        cy.enterText('input[placeholder="Password"]',"Test@2020")
        cy.clickElement('button[type="submit"]')

        cy.xpath('//a[img[@class="user-pic"]]').invoke('text').should('eq',newuser.username)
    })

    it('Register with existing user',()=>{
        
        cy.visit('http://localhost:4100')
        cy.clickElement('//a[text()="Sign up"]')
        cy.enterText('input[placeholder="Username"]',"suniljaiswal")
        cy.enterText('input[placeholder="Email"]',"sunil10j@gmail.com")
        cy.enterText('input[placeholder="Password"]',"Test3212")
        cy.clickElement('button[type="submit"]')
        
        cy.containText('.error-messages','email has already been taken')
        cy.containText('.error-messages','username has already been taken')
    })

    it('Register with blank username',()=>{
        
        cy.visit('http://localhost:4100')
        cy.clickElement('//a[text()="Sign up"]')
        cy.enterText('input[placeholder="Email"]',"sunil10j@gmail.com")
        cy.enterText('input[placeholder="Password"]',"Test3212")
        cy.clickElement('button[type="submit"]')
        cy.containText('.error-messages',`username can't be blank`)
    })
})