const request = require('supertest');
const app = require('./app')

describe('Test the book store API', () => {

  const testBook = {id: 1, title: 'Book 1', author: 'Author 1', published_date: '2022-01-01', price: 9.99}

	test('POST /books should create a new book', async () => {
    	const response = await request(app)
        	.post('/books')
        	.send(testBook)
      
      expect(response.status).toBe(201)
      expect(response.body).toEqual(testBook)
	});

	test('Test GET /books/1', async () => {
    	const response = await request(app)
        	.get('/books/1')
      
      expect(response.status).toBe(200)
      expect(response.body).toEqual(testBook)
	});

// 	test('Test PUT /books/1', () => {
//     	return request(app)
//         	.put('/books/1')
//         	.send({title: 'Updated Book 1', author: 'Updated Author 1', published_date: '2022-01-02', price: 19.99})
//         	.expect(200);
// 	});

// 	test('Test DELETE /books/1', () => {
//     	return request(app)
//         	.delete('/books/1')
//         	.expect(200);
// 	});

// 	test('Test GET /books', () => {
//     	return request(app)
//         	.get('/books')
//         	.expect(200);
// 	});
});

