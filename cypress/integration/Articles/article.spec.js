/// <reference types = "cypress" />

const casual = require('casual-browserify')

describe("New Article",() =>{
    beforeEach(() =>{
        cy.fixture('BasicDetails').then(function (data) {
            cy.visit(data.AppUrl)        
            cy.login(data.email,data.password)
            cy.xpath('//body')
            .should("contain.text","New Post")
          })     
    })


    it("Creating New Article",() =>{
        cy.clickElementByXpath(`//a[contains(text(),"New Post")]`)
        let Articletitle = casual.title
        cy.enterTextByCss('[placeholder="Article Title"]',Articletitle)
        cy.enterTextByCss(`[placeholder="What's this article about?"]`,casual.short_description)
        cy.enterTextByCss(`[placeholder="Write your article (in markdown)"]`,casual.short_description)
        cy.enterTextByCss(`[placeholder="Enter tags"`,casual.word)
        
        cy.clickElementByXpath(`//button[text()="Publish Article"]`)
        cy.containText('.banner',Articletitle)
    })

    it("Editing an Article",() =>{

        cy.clickElementByXpath(`//a[img[@class="user-pic"]]`)
       
        cy.containText('.user-info','Profile Settings')
     
        cy.reload()

        cy.clickElementByCss(`.preview-link`)
      
        cy.clickXpathAndcheckURL('//a[contains(text(),"Edit Article")]','editor')
        .wait(3000)
        
        let Articletitle = casual.title
        cy.enterTextByCss(`[placeholder="Article Title"]`,Articletitle)

        cy.clickElementByXpath(`//button[text()="Publish Article"]`)

        cy.containText('.banner',Articletitle)
    })

    it("Deleting an Article",() =>{
        cy.clickElementByXpath(`//a[img[@class="user-pic"]]`)
     
        cy.reload()

        cy.clickElementByCss(`.preview-link`)

        cy.clickXpathAndcheckURL('//button[contains(text(),"Delete Article")]','http://localhost:4100/')
    })
})