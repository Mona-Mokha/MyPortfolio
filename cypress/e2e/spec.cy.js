describe('check if the protected route works (projects)', () => {
  it('redirects the user to login when not authenticated', () => {
    cy.visit('/projects');
    cy.url().should('include', '/signin');
  });

  it('protected routes works', function() {
    cy.visit('localhost:3000')
    cy.get('#navbarNav a[href="/projects"]').click();
    cy.get('#email').click();
    cy.get('#email').type('mona@mona.com');
    cy.get('#password').type('123456{enter}');
    cy.get('#root button').click();
    cy.get('#navbarNav a[href="/projects"]').click();
    
  });
});



it('sign in workes', function() {
  cy.visit('localhost:3000')
  cy.get('#navbarNav a.btn-outline-primary').click();
  cy.get('#email').click();
  cy.get('#email').type('mona@mona.com');
  cy.get('#password').type('123456');
  cy.get('#root button').click();
  
});

it('sign out works', function() {
  cy.visit('localhost:3000')
  cy.get('#navbarNav a.btn-outline-primary').click();
  cy.get('#email').click();
  cy.get('#email').type('mona@mona.com');
  cy.get('#password').type('123456');
  cy.get('#root button').click();
  cy.get('#navbarNav button.btn').click();
  
});
