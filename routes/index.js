var express = require("express");
var router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
/*
  Route to fetch recipes based on the recipe name provided in the request body.
  Uses the EDAMAM API to search for recipes.
 */
router.post("/recipe", async (req, res) => {
  const recipeName = req.body.recipeName;
  try {
    const response = await axios.get(
      `https://api.edamam.com/search?q=${recipeName}&app_id=9fb851ae&app_key=f4ff5cdc983765fa461efde590364e44`
    );

    const recipeData = response.data;
    res.render("recipe", { recipeData }); // Render the result.ejs file and pass recipeData as a variable
  } catch (error) {
    res.status(500).send("Error fetching data from EDAMAM API");
  }
});
/*
  Route to fetch recipes based on the recipe name, "from", and "to" parameters provided in the URL.
 */
router.get("/recipe/:recipeName/:from/:to", async (req, res) => {
  const { recipeName, from, to } = req.params;

  try {
    const response = await axios.get(
      `https://api.edamam.com/search?q=${recipeName}&app_id=9fb851ae&app_key=f4ff5cdc983765fa461efde590364e44&from=${from}&to=${to}`
    );
    // console.log(response.data);
    const recipeData = response.data;
    res.render("recipe-details", { recipeData });
  } catch (error) {
    res.status(500).send("Error fetching recipe details from EDAMAM API");
  }
});
/*
  Route to find grocery stores selling a particular ingredient.
  Uses the Google Maps Places API to search for nearby grocery stores for that ingredient.
 */
router.get("/findingredient/:ingredient", async (req, res) => {
  const ingredient = req.params;

  try {
    const response =
      await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=show%20${ingredient}%20grocery%20shop%20near%20me&key=AIzaSyCchp4b3tIpoXCg80vnhbw2omVXLDVSaQw
    `);
    const ingredientData = response.data;

    res.render("ingredient-store", { ingredientData });
  } catch (error) {
    res.status(500).send("Error fetching recipe details from Maps API");
  }
});
module.exports = router;
