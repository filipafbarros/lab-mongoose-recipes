const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // return Recipe.deleteMany();
  })
  .then(() => {
    // Iteration 2
    const recipe = {
      title: "Bacalhau à Brás",
      level: "intermediate",
      ingredients: [
        "bacalhau",
        "eggs",
        "potatos",
        "onions",
        "garlic",
        "bayleaves",
        "olives",
        "parsly",
        "olive oil",
      ],
      cuisine: "Portuguese",
      dishType: "main_course",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/3/39/Bacalhau_a_Bras.jpg",
      duration: 45,
      creator: "Filipa Baarros",
    };

    return Recipe.create(recipe);
  })
  .then((createdRecipe) => {
    console.log(`Created recipe: ${createdRecipe.title}`);
    // mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  })
  .then(() => {
    // Iteration 3
    return Recipe.insertMany(data);
  })
  .then((recipes) => {
    console.log("Recipes inserted successfully!");
    // Print the title of each recipe
    recipes.forEach((recipe) => {
      console.log(recipe.title);
    });
  })
  .catch((error) => {
    console.error("Error inserting recipes:", error);
  })
  .then(() => {
    // Iteration 4
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((updatedRecipe) => {
    console.log("Updated recipe:", updatedRecipe);
  })
  .catch((error) => {
    console.error("Error updating recipe:", error);
  })
  .then(() => {
    // Iteration 5
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((deletedRecipe) => {
    console.log("Deleted recipe:", deletedRecipe);
  })
  .catch((error) => {
    console.error("Error deleting recipe:", error);
  })
  .finally(() => {
    // Iteration 6 - Close the Database
    mongoose.connection
      .close()
      .then(() => {
        console.log("Database connection closed successfully.");
      })
      .catch((error) => {
        console.error("Error closing database connection:", error);
      });
  });
