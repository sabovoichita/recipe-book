function loadRecipes() {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      insertRecipes(data.recipes);
    })
    .catch((error) => {
      console.error("Error fetching recipes:", error);
    });
}

function renderRecipe(recipe) {
  return `
      <li class="recipeItem">
        <img src="${recipe.image}" alt="${recipe.alt}" />
        <h2>${recipe.title}</h2>
        <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
        <a href="${recipe.link}" target="_blank">View Recipe</a>
      </li>
    `;
}

function insertRecipes(recipes) {
  const recipeList = document.querySelector(".recipeList");
  const recipeHTML = recipes.map(renderRecipe).join("");
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
async function initEvents() {
  document.body.innerHTML = createHTMLStructure();
  await loadRecipes();
}
initEvents();
