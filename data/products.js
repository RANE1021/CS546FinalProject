// /// \file recipes.js
// /// \brief Provides functions to operate on the Recipe Collection
// /// \cite https://docs.mongodb.com/manual/reference/
// /// \cite https://github.com/Stevens-CS546/CS-546-WS-Summer-1/tree/master/Lecture%20Code/lecture_6
//
// let MongoClient = require('mongodb').MongoClient;
// let runStartup = require("../advanced_startup_docs.js");
// let settings = require('../config.js');
// let uuidv4 = require('uuid/v4');
// let ObjectId = require('mongodb').ObjectID;
//
// let fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;
//
// runStartup().then(function () {
//     console.log("\nMongoDB collection initialized. Currently empty . . .\n");
// });
//
// MongoClient.connect(fullMongoUrl)
//     .then(function (db) {
//         let recipeCollection = db.collection("recipes");
//
//         // get the ID and title of all recipes in the collection
//         exports.getAllRecipes = function () {
//             return recipeCollection.find({}, {_id:1, title:1}).toArray();
//         };
//
//         // gets all attributes of recipe for given ID
//         exports.getRecipeByID = function (id) {
//             // console.log("getrecipebyId looking for object id "+id);
//             if (id === undefined) return Promise.reject("You must provide an ID");
//
//             return recipeCollection
//                 .findOne({ _id: id})
//         };
//
//         // get comments for given recipe ID
//         exports.getCommentsByRecipeID = function (recipeId) {
//             if (recipeId === undefined) return Promise.reject("You must provide an ID");
//
//             return recipeCollection.find({ _id: recipeId }, {"comments._id": any, _id, title, "comments.poster": any, "comments.comment": any}).limit(1).toArray().then(function (listOfComments) {
//                 if (listOfComments.length === 0) throw "Could not find comments for recipe id of " + id;
//                 return listOfComments[0];
//             });
//         };
//
//         // get comment for given comment ID
//         exports.getCommentByCommentID = function (commentId) {
//             if (commentId === undefined) return Promise.reject("You must provide an ID");
//
//             return recipeCollection.find({ "comments._id": commentId }).limit(1).toArray().then(function (listOfComments) {
//                 if (listOfComments.length === 0) throw "Could not find comment with id of " + id;
//                 return listOfComments[0];
//             });
//         };
//
//         // insert recipe (new entry)
//         exports.insertRecipe = function (title, ingredients, steps) {
//             if(typeof title !== "string")
//                 return Promise.reject("No title provided");
//
//             if(!Array.isArray(ingredients)) {
//                 ingredients = [];
//             }
//
//             if(!Array.isArray(steps)){
//                 steps = [];
//             }
//             let newRecipe = {
//                 _id: uuidv4(),
//                 title: title,
//                 ingredients: {
//                     name: ingredients[0].name,
//                     amount: ingredients[0].amount
//                 },
//                 steps: steps,
//                 comments: []
//             };
//             return recipeCollection
//             .insertOne(newRecipe)
//             .then((newInsertInformation) => {
//                 return newInsertInformation.insertedId;
//             })
//             .then((newId) => {
//                 return recipeCollection.find({_id: newId}).toArray();
//             });
//         };
//
//         // update recipe (only for fields supplied)
//         /// \remark ID cannot be undefined
//         exports.updateRecipe = function(id, updatedRecipe){
//             console.log("Entered update for recipe ID"+id);
//
//             let updatedRecipeData = {};
//
//             if(updatedRecipe.title){
//                 updatedRecipeData.title = updatedRecipe.title;
//             }
//
//             if(updatedRecipe.ingredients){
//                 updatedRecipeData.ingredients = updatedRecipe.ingredients;
//             }
//
//             if(updatedRecipe.steps){
//                 updatedRecipeData.steps = updatedRecipe.steps;
//             }
//
//             let updateCommand = {
//                 $set: updatedRecipeData
//             }
//
//             return recipeCollection.updateOne({_id: id}, updateCommand)
//             .then((result) => {
//                 return this.getRecipeByID(id);
//             });
//         }
//
//         // delete recipe for given recipe id
//         exports.removeRecipe = function (id, updatedRecipe) {
//             return recipeCollection.removeOne({ _id: id })
//             .then((deletionInfo) => {
//                 if(deletionInfo.deletedCount === 0) {
//                     throw(`Could not delete recipe with id of ${id}`);
//                 }
//                 else {}
//             });
//         };
//
//         // insert comment for given recipe id
//         exports.insertComment = function(id, updatedRecipe) {
//             let updatedRecipeData = {};
//
//             let newComment = {
//                 _id: uuidv4(),
//                 poster: updatedRecipe.poster,
//                 comment: updatedRecipe.comment
//             };
//
//             updatedRecipeData.comments = newComment;
//
//             let updateCommand = {
//                 $push: updatedRecipeData
//             }
//
//             return recipeCollection.updateOne({_id: id}, updateCommand)
//             .then((result) => {
//                 return this.getRecipeByID(id);
//             });
//         }
//
//         // update comment for given recipe id
//         exports.updateComment = function(recipeId, commentId, updatedRecipe) {
//             let updatedRecipeData = {};
//
//             let newComment = {
//                 poster: updatedRecipe.poster,
//                 comment: updatedRecipe.comment
//             };
//
//             updatedRecipeData.comments = newComment;
//
//             let updateCommand = {
//                 $set: updatedRecipeData
//             }
//
//             return recipeCollection.updateOne({"comments._id":commentId}, updateCommand)
//             .then((result) => {
//                 return this.getRecipeByID(recipeId);
//             });
//         }
//
//         // delete comment for given comment id
//         exports.deleteComment = function(commentId, newComment) {
//             return recipeCollection.removeOne({ "comments._id" : commentId })
//             .then((deletionInfo) => {
//                 if(deletionInfo.deletedCount === 0) {
//                     throw(`Could not delete comment with id of ${commentId}`);
//                 }
//                 else {}
//             });
//         }
//     });
