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

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login('test', 'test')
    })

    it('logged user can create a blog', function() {
      cy.contains('new blog').click()
      cy.get('#title-input').type('test title')
      cy.get('#author-input').type('test author')
      cy.get('#url-input').type('test url')
      cy.contains('create').click()

      cy.get('.notif').contains('successfully created')
      cy.get('.blog-list').contains('test title test author')
    })

    describe('three notes have been created', () => {
      beforeEach(function() {
        cy.createBlog('title one', 'one', 'url-one')
        cy.createBlog('title two', 'two', 'url-two')
        cy.createBlog('title three', 'three', 'url-three')
      })

      it.only('presses like button will increment likes', function() {
        cy.contains('title one').find('.view').click()
        cy.get('.like').click()

        cy.contains('likes:').should('include.text', 'likes: 1')
      })
    })
  })
})