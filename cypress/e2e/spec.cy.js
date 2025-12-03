it('sign in works', function() {
    cy.visit('http://localhost:5173/')
    cy.contains('Sign In').click();
    cy.get('#email').click();
    cy.get('#email').type('mona@mona.com');
    cy.get('#password').type('123456{enter}');
    cy.get('#root button').click();
    
});

it('protected routes works', function() {
    cy.visit('http://localhost:5173/')
    cy.get('#root a[href="/projects"]').click();
    cy.contains('Sign In').click();
    cy.get('#email').click();
    cy.get('#email').type('mona@mona.com');
    cy.get('#password').type('123456');
    cy.get('#root button').click();
    cy.get('#root a[href="/projects"]').click();
    cy.get('#root a[href="/services"]').click();
    cy.get('#root a[href="/education"]').click();
    cy.get('#root button').click();
    
});

describe("Admin Project Management", () => {

  it("adds a new project", () => {
    cy.visit("/admin/projects")

    cy.get("#title").type("Test Project")
    cy.get("#description").type("New description")
    cy.get('#root button[type="submit"]').click()

    cy.contains("Test Project") // success
  });

  it("edits a project", () => {
    cy.visit("/admin/projects")

    cy.contains("Test Project").click()  
    cy.get("#title").clear().type("Updated Project")
    cy.get('#root button[type="submit"]').click()

    cy.contains("Updated Project") 
  });

  it("deletes a project", () => {
    cy.visit("/admin/projects")

    cy.contains("Updated Project")
      .parent()
      .find(".delete-btn")
      .click()

    cy.contains("Updated Project").should("not.exist")
  });
});



