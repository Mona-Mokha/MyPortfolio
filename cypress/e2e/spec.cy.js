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

it('sign out works', function() {
    cy.visit('http://localhost:5173/')
    cy.get('#root a.btn-signin').click();
    cy.get('#email').click();
    cy.get('#email').type('mona@mona.com');
    cy.get('#password').type('123456{enter}');
    cy.get('#root button').click();
    cy.get('#root a[href="/projects"]').click();
    cy.get('#root a[href="/education"]').click();
    cy.get('#root button').click();
    cy.get('#root a[href="/projects"]').click();
    
});

// Invalid credentials should show error

it('invalid sign test', function() {
    cy.visit('http://localhost:5173/')
    cy.get('#root a.btn-signin').click();
    cy.get('#email').click();
    cy.get('#email').type('mona@mona.com');
    cy.get('#password').type('1234{enter}');
    cy.get('#root button').click();
    
});




