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
    cy.xpath('//button[text()="Sign in"]').click().wait(2000)
  })

Cypress.Commands.add('enterTextByXpath', (element, text) => {
    cy.xpath(element)
    .clear()
    .type(text)
    .should('contain.value',text)
  })

Cypress.Commands.add('enterTextByCss', (element, text) => {
    cy.get(element)
    .clear()
    .type(text)
    .should('contain.value',text)
  })

Cypress.Commands.add('clickElementByXpath', (element) => {
    cy.xpath(element)
    .first()
    .click()
  })

Cypress.Commands.add('clickElementByCss', (element) => {
    cy.get(element)
    .first()
    .click()
  })


Cypress.Commands.add('clickXpathAndcheckURL', (element,expectedURL) => {
    cy.xpath(element)
    .first()
    .click()
    .url()
    .should('contain',expectedURL)
  })

  Cypress.Commands.add('clickCssAndcheckURL', (element,expectedURL) => {
    cy.get(element)
    .first()
    .click()
    .url()
    .should('contain',expectedURL)
  })

  Cypress.Commands.add('containText', (element,text) => {
    cy.get(element)
    .should('contain.text',text)
  })