const request = require('supertest');
const app = require('./app')

describe('Test the book store API', () => {

  const testBook = {id: 1, title: 'Book 1', author: 'Author 1', published_date: '2022-01-01', price: 9.99}

  describe('Test POST /books', () => {
    test('POST /books should create a new book', async () => {
    	const response = await request(app)
        .post('/books')
        .send(testBook)
    
      expect(response.status).toBe(201)
      expect(response.body).toEqual(testBook)
	  });

    test('POST /books should return 400 if body is null', async () => {
      const response = await request(app)
        .post('/books')
        .send(null)

      expect(response.status).toBe(400)
      expect(response.body).toEqual({ message: 'Error adding book, please try again.' })
    })
  }) 

  describe('Test GET /books/1', () => {
    test('GET /books/1 should retrieve book with id=1', async () => {
    	const response = await request(app)
        .get('/books/1')
      
      expect(response.status).toBe(200)
      expect(response.body).toEqual(testBook)
	  });

    test('GET /books/1 should return 404 if book is not found', async () => {
    	const response = await request(app)
        .get('/books/100')
      
      expect(response.status).toBe(404)
      expect(response.body).toEqual({ message: 'The book you are requesting was not found, please try again.' })
	  });
  })

  describe('Test PUT /books/1', () => {
    test('PUT /books/1 should update book with id=1', async () => {
      const updatedBook1 = {title: 'Updated Book 1', author: 'Updated Author 1', published_date: '2022-01-02', price: 19.99}
    	const response = await  request(app)
        .put('/books/1')
        .send(updatedBook1)
      
      expect(response.status).toBe(200)
      expect(response.body).toEqual({ ...updatedBook1, id: 1})
	  });

    test('PUT /books/1 should return 404 if book is not found', async () => {
    	const response = await  request(app)
        .put('/books/100')
        .send({title: 'Updated Book 100', author: 'Updated Author 100', published_date: '2022-01-02', price: 19.99})
      
      expect(response.status).toBe(404)
      expect(response.body).toEqual({ message: 'Book was not found.' })
	  });
  })

  describe('Test DELETE /books/1', () => {
    test('DELETE /books/1 should remove book with id=1', async () => {
    	const response = await request(app)
        .delete('/books/1')
      
      expect(response.status).toBe(200)
      expect(response.body).toEqual({ id: 1, deleted: true })
	  });

    test('DELETE /books/1 should return 404 if book is not found', async () => {
    	const response = await request(app)
        .delete('/books/100')
      
      expect(response.status).toBe(404)
      expect(response.body).toEqual({ message: 'Book was not found.' })
	  });
  })

  describe('Test POST /books', () => {
    test('GET /books should return an array of all books', async () => {
    	const response = await request(app)
        .get('/books')
      
      expect(response.status).toBe(200)
      expect(response.body).toEqual(expect.any(Array))
	  });
  })
});

