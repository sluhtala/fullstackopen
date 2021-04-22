
Cypress.Commands.add('createBlog', ({ content }) => {
  const token = JSON.parse(sessionStorage.getItem('user-logged')).token;
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: content,
    headers: {
      'Authorization': `bearer ${token}`
    }
  })
  cy.visit('http://localhost:3000')
})

const testUser = {username:'username', password:'password', name:'Test User'};

describe('Blog app', function() {
  beforeEach(function() {
    sessionStorage.removeItem('user-logged');
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.request('POST', 'http://localhost:3003/api/users', testUser);
    cy.visit('http://localhost:3000');
  })

  it('login form is shown', function() {
    cy.contains('login to application');
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  })

  it ('log in success', function() {
    cy.get('#username-input').type('username');
    cy.get('#password-input').type('password');
    cy.get('#login-button').click();
    cy.contains('Test User logged in');
  })

  it ('log in failed', function() {
    cy.get('#login-button').click();
    cy.contains('login to application');
    cy.get('.notification')
    .should('contain', 'Wrong username or password')
    .and('have.css', 'color' , 'rgb(255, 0, 0)');
  })

  describe('when logged in', function (){

    beforeEach(function(){
      cy.request('POST', 'http://localhost:3003/api/login', {username: 'username', password:'password'})
      .then((respond)=>{
        sessionStorage.setItem('user-logged', JSON.stringify(respond.body))
        cy.visit('http://localhost:3000/');
      })
    })
    it('new blog can be created', function (){
      cy.get('.togglable-button').click();
      cy.get('#input-title').type('new blog');     
      cy.get('#input-author').type('author');     
      cy.get('#input-url').type('url');     
      cy.get('#create-button').click();
      cy.contains('new blog author');
    })

    describe('when blog is created', function(){
      beforeEach(function(){
        cy.get('.togglable-button').click();
        cy.get('#input-title').type('new blog');     
        cy.get('#input-author').type('author');     
        cy.get('#input-url').type('url');     
        cy.get('#create-button').click();
      })

      it('blog can be liked', function (){
        cy.contains('show').click();
        cy.contains('0 like');
        cy.contains('like').click();
        cy.contains('1 like');
      })

      it('blog can be deleted', function (){
        cy.contains('show').click();
        cy.contains('delete').click();
        cy.on('window:confirm', () => true);
        cy.contains('new blog author').should('not.exist');
      })

      it ('delete blog with wrong user', function (){
        cy.contains('logout').click();
        const secondUser = {username: 'second', password: 'password', name: 'second use'};
        cy.request('POST', 'http://localhost:3003/api/users', secondUser);
        cy.get('#username-input').type('second');
        cy.get('#password-input').type('password');
        cy.get('#login-button').click();
        cy.contains('show').click();
        cy.contains('delete').click();
        cy.contains('new blog author');
      })
      
      describe('when multiple blogs', function (){
        beforeEach(function(){
          const newPost2 = {title:'newpost2',author:'author',url:'url',likes:3}
          const newPost3 = {title:'newpost3',author:'author',url:'url',likes:5}
          const newPost4 = {title:'newpost4',author:'author',url:'url',likes:4}

          cy.createBlog({content: newPost2});
          cy.createBlog({content: newPost3});
          cy.createBlog({content: newPost4});
        })
        it('blogs are ordered by likes', function (){
          cy.get(':nth-child(5) > .togglable-button').click();
          cy.get(':nth-child(6) > .togglable-button').click();
          cy.get(':nth-child(7) > .togglable-button').click();
          cy.get(':nth-child(8) > .togglable-button').click();

          cy.get(':nth-child(5) > .togglable-content > .full-blog > :nth-child(3)').as('post1')
          cy.get('@post1').contains('5')
          cy.get(':nth-child(6) > .togglable-content > .full-blog > :nth-child(3)').as('post2')
          cy.get('@post2').contains('4')
          cy.get(':nth-child(7) > .togglable-content > .full-blog > :nth-child(3)').as('post3')
          cy.get('@post3').contains('3')
          cy.get(':nth-child(8) > .togglable-content > .full-blog > :nth-child(3)').as('post4')
          cy.get('@post4').contains('0')
        })
      })

    })

  })
}) 