/// <reference types = "cypress"/>

describe("Commenting on self blog",() =>{

    beforeEach(() =>{
        cy.fixture('BasicDetails').then(function (data) {
            cy.visit(data.AppUrl)        
            cy.login(data.email,data.password)
            cy.xpath('//body')
            .should("contain.text","New Post")
          }) 
    })

    it("Commenting On Article",() =>{
        cy.clickElementByXpath(`//a[img[@class="user-pic"]]`)
        cy.wait(3000)
        .reload()

        cy.get('.preview-link').then(($link)=>{
            cy.clickElementByCss(`.preview-link`)
            cy.enterTextByXpath(`//div[@class="card-block"]/textarea`,"This is sample comment")
            cy.clickElementByXpath(`//button[text()="Post Comment"]`)
            cy.containText('.card-text','This is sample comment')
        })

        
        

    })

    it("Delete Comment from Article",() =>{
        cy.clickElementByXpath(`//a[img[@class="user-pic"]]`)
        cy.wait(3000)
        .reload()

        cy.get('.preview-link').then(($link)=>{
            cy.clickElementByCss(`.preview-link`)
            cy.clickElementByXpath(`//div[@class="card-footer"]//i[@class="ion-trash-a"]`)
        })
    })
})

describe("Commenting and deleting on others blog",() =>{

    beforeEach(() =>{
        cy.fixture('BasicDetails').then(function (data) {
            cy.visit(data.AppUrl)        
            cy.login(data.email,data.password)
            cy.xpath('//body')
            .should("contain.text","New Post")
          })     
    })

    it("Commenting On Article",() =>{
        cy.clickElementByXpath(`//a[text()="Global Feed"]`)

        let username = "suniljaiswal"
        let article = "//div[div[a[@class='author' and not(text()='"+username+"')]]]/following-sibling::a"
        cy.clickElementByXpath(article)

        cy.enterTextByXpath(`//div[@class="card-block"]/textarea`,"This is sample comment")
        cy.clickElementByXpath(`//button[text()="Post Comment"]`)

        cy.containText('.card-text','This is sample comment')
        
        cy.clickElementByXpath(`//div[@class="card-footer"]//i[@class="ion-trash-a"]`) 
    })
})