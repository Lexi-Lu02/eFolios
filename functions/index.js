/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({maxInstances: 10});

admin.initializeApp();

exports.countBooks = onRequest({cors: true, invoker: "public"},
    (req, res) => {
      cors(req, res, async () => {
        try {
          const booksCollection = admin.firestore().collection("books");
          const snapshot = await booksCollection.get();
          const count = snapshot.size;

          res.status(200).send({count});
        } catch (error) {
          console.error("Error counting books:", error.message);
          res.status(500).send("Error counting books");
        }
      });
    });

exports.getAllBooks = onRequest({cors: true, invoker: "public"},
    (req, res) => {
      cors(req, res, async () => {
        try {
          const booksCollection = admin.firestore().collection("books");
          const snapshot = await booksCollection.get();
          const books = [];

          snapshot.forEach((doc) => {
            books.push({
              id: doc.id,
              ...doc.data(),
            });
          });

          res.status(200).send(books);
        } catch (error) {
          console.error("Error getting all books:", error.message);
          res.status(500).send("Error getting all books");
        }
      });
    });

// Function to auto-capitalize book data when a new book is added
exports.capitalizeBookData = onDocumentCreated("books/{bookId}",
    async (event) => {
      const bookData = event.data.data();
      const bookId = event.params.bookId;

      console.log("Capitalization function triggered for document:", bookId);
      console.log("Original data:", bookData);

      // Capitalize title and author
      const capitalizedData = {
        ...bookData,
        title: bookData.title ? bookData.title.toUpperCase() : bookData.title,
        author: bookData.author ?
            bookData.author.toUpperCase() : bookData.author,
      };

      console.log("Capitalized data:", capitalizedData);

      try {
        await admin.firestore().collection("books").doc(bookId)
            .update(capitalizedData);
        console.log(`Book data capitalized for document: ${bookId}`);
        console.log("Update successful!");
      } catch (error) {
        console.error("Error capitalizing book data:", error);
      }
    });
