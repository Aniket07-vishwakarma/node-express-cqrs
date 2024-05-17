const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { required: true, type: String },
  gender: { required: true, type: String },
  age: { required: true, type: Number },
  country: { required: true, type: String },
  status: { type: String, enum: [ 'Started', 'Cmpleted' ] },
});

module.exports = mongoose.model("UserInfo", userSchema);

// schema {
//   query: Query,
//   mutation: Mutation,
// }

// type Query {
//   getUserById(
//     id: String!    
//   ): user
//   getUsers: [user]
// }

// type Mutation {
//   createUser(
//     name: String!
//     age: Int!
//     email: String!
//   ): user
// }

// type user {
//   id: String
//   name: String
//   age: Int
//   email: String
// }

// import gql from "graphql-tag";
// import * as graphql from "graphql"

// const {print} = graphql();

// const getUserById = gql`
//   Query GetUserById($id: String!) {
//     getUserById(id: $id) {
//       name
//       age
//       email
//     }
//   }
// `

// const user = await axios({
//   url: "",
//   method: "Post",
//   data: {
//     query: print(getUserById),
//     variables: { id: "" },
//   }
// })