// require express and other modules
const express = require('express');
const app = express();
// Express Body Parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Set Static File Directory
app.use(express.static(__dirname + '/public'));


/************
 * DATABASE *
 ************/

const db = require('./models');

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', (req, res) => {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object. [DONE]
  res.json({
    message: 'Welcome to my app api!',
    documentationUrl: '', //leave this also blank for the first exercise
    baseUrl: '', //leave this blank for the first exercise
    endpoints: [
      {method: 'GET', path: '/api', description: 'Describes all available endpoints'},
      {method: 'GET', path: '/api/profile', description: 'Data about me'},
      {method: 'GET', path: '/api/books/', description: 'Get All books information'},
      // TODO: Write other API end-points description here like above [DONE]
      {method: 'POST', path: '/api/books/', description: 'Sumbits a book information'},
      {method: 'PUT', path: '/api/books/:id', description: 'Updates a book information given an id'},
      {method: 'DELETE', path: '/api/books/:id', description: 'Deletes a book information given an id'},
      


    ]
  })
});
// TODO:  Fill the values [DONE]
app.get('/api/profile', (req, res) => {
  res.json({
    'name': 'Román the not from Rome roman',
    'homeCountry': 'Republic of Undefined',
    'degreeProgram': 'Dealing with life',//informatics or CSE.. etc
    'email': 'romanreypedrero@gmail.com',
    'deployedURLLink': '',//leave this blank for the first exercise
    'apiDocumentationURL': '', //leave this also blank for the first exercise
    'currentCity': 'Not Rome',
    'hobbies': ['Cloud Computing', 'Cloud Strategy', 'Clothes', 'Actually I prefer sunny days']

  })
});
/*
 * Get All books information
 */
app.get('/api/books/', (req, res) => {
  /*
   * use the books model and query to mongo database to get all objects
   */
  db.books.find({}, function (err, books) {
    if (err) throw err;
    /*
     * return the object as array of json values
     */
    res.json(books);
  });
});
/*
 * Add a book information into database
 */

let availableId = 1;
app.post('/api/books/', (req, res) => {

  /*
   * New Book information in req.body
   */
  console.log(req.body.title);
  /*
   * TODO: use the books model and create a new object [DONE]
   * with the information in req.body
   */
    const book = new db.books(req.body);
    book.save(err => {
      if(err) Error(err)
      else console.log('Book saved')
    })

  /*
   * return the new book information object as json
   */

  var newBook = book;
  res.json(newBook);
});

/*
 * Update a book information based upon the specified ID
 */
app.put('/api/books/:id', (req, res) => {
  /*
   * Get the book ID and new information of book from the request parameters
   */
  const bookId = req.params.id;
  const bookNewData = req.body;
  console.log(`book ID = ${bookId} \n Book Data = ${bookNewData}`);

  /*
   * TODO: use the books model and find using the bookId and update the book information [DONE]
   */

  db.books.findByIdAndUpdate(bookId, req.body, (err, book) => {
    if(err) Error(err)}
    ).then(()=> {
  
    /*
     * Send the updated book information as a JSON object
     */
    var updatedBookInfo = req.body;
    res.json(updatedBookInfo);
  });
  
  })



/*
 * Delete a book based upon the specified ID
 */
app.delete('/api/books/:id', (req, res) => {
  /*
   * Get the book ID of book from the request parameters
   */
  const bookId = req.params.id;
  /*
   * TODO: use the books model and find using
   * the bookId and delete the book [DONE]
   */
  db.books.findByIdAndDelete(bookId, (err, book) => {
    if(err) Error(err)}
    ).then(()=> {

    /*
     * Send the updated book information as a JSON object
     */
   
  var deletedBook = book;
  res.json(deletedBook);
  });


  /*
   * Send the deleted book information as a JSON object
   */
  var deletedBook = {};
  res.json(deletedBook);
});


/**********
 * SERVER *
 **********/

// listen on the port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log('Express server is up and running on http://localhost:3000/');
});
