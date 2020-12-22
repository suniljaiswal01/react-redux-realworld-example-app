// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
    cy.get('input[placeholder="Email"]').type(username)
    cy.get('input[placeholder="Password"]').type(password)
    cy.intercept('feed').as('login')
    cy.xpath('//button[text()="Sign in"]').click()
    cy.wait('@login')
  })

Cypress.Commands.add('enterText', (element, text) => {
  
  if(element.startsWith('/'))
    cy.xpath(element).clear().type(text).should('contain.value',text)
  else
    cy.get(element).clear().type(text).should('contain.value',text)
  })

Cypress.Commands.add('clickElement', (element) => {

    if(element.startsWith('/'))
      cy.xpath(element).first().click()
    else
      cy.get(element).first().click()
  })

Cypress.Commands.add('clickAndcheckURL', (element,expectedURL) => {

  if(element.startsWith('/'))
      cy.xpath(element).first().click().url().should('contain',expectedURL)
    else
      cy.get(element).first().click().url().should('contain',expectedURL)
    
  })

  Cypress.Commands.add('containText', (element,text) => {

    if(element.startsWith('/'))
      cy.xpath(element).should('contain.text',text)
    else
      cy.get(element).should('contain.text',text)
  })