use('graphqlDB');

// db.books.find();

db.books.aggregate([
    { $group: { _id: { name: "$name", genre: "$genre" } } }
]);

// db.authors.find();
// db.books.find();