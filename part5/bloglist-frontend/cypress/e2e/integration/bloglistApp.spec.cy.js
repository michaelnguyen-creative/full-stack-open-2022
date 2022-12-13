describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'test',
      name: 'Tester',
      password: 'test'
    })
    cy.visit('http://localhost:3000')
  })

  it('login form displays by default', function() {
    cy.contains('Log in to app')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username-input').type('test')
      cy.get('#password-input').type('test')
      cy.contains('login').click()

      cy.contains('Tester logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username-input').type('wrong-username')
      cy.get('#password-input').type('wrong-pass')
      cy.contains('login').click()

      cy.get('.notif').contains('error: ')
      cy.get('.notif').should('have.css', 'background-color', 'rgb(255, 87, 101)')
    })
  })
})