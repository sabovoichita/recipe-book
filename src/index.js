import "./style.css";

function loadRecipes() {
  return fetch("recipes.json")
    .then(response => response.json())
    .then(data => {
      insertRecipes(data);
    })
    .catch(error => {
      console.error("Error fetching recipes:", error);
    });
}

function renderRecipe(recipe) {
  return `
      <li class="recipeItem">
        <img src="${recipe.image}" alt="${recipe.alt}" loading="lazy" />
        <h2>${recipe.title}</h2>
        <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
        <a href="${recipe.link}" target="_blank">View Recipe</a>
      </li>
    `;
}

function insertRecipes(recipes) {
  const recipeList = document.querySelector(".recipeList");
  const recipeHTML = recipes.map(renderRecipe).join(""); // Map over the recipes directly
  recipeList.innerHTML = recipeHTML;
}

function createHTMLStructure() {
  return `
      <header>
        <h1>Recipe Book</h1>
      </header>
      <div class="recipesContainer">
        <ul id="recipeList" class="recipeList"></ul>
      </div>
    `;
}

function waitForImagesToLoad() {
  const images = document.querySelectorAll("img");
  const promises = Array.from(images).map(img => {
    return new Promise((resolve, reject) => {
      if (img.complete) {
        resolve();
      } else {
        img.onload = resolve;
        img.onerror = reject;
      }
    });
  });
  return Promise.all(promises);
}

async function initEvents() {
  document.body.innerHTML = createHTMLStructure();

  await loadRecipes();

  try {
    await waitForImagesToLoad();
    console.log("All images have been loaded!");
  } catch (error) {
    console.error("Error loading images:", error);
  }
}

initEvents();
