document.getElementById("error").style.display = "none";

const searchMeal = () => {
  const search = document.getElementById("search-input");
  const searchValue = search.value;
  search.value = "";
  // console.log(searchValue);

  if (searchValue) {
    document.getElementById("error").style.display = "none";
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => getMeal(data.meals));
  } else {
    document.getElementById("error").style.display = "block";
  }
};
// searchMeal();

document.getElementById("errorSearch").style.display = "none";
const getMeal = (meals /* data */) => {
  // console.log(meals);

  const searchResult = document.getElementById("search-Result");
  searchResult.innerHTML = "";

  if (meals) {
    document.getElementById("errorSearch").style.display = "none";
    meals.forEach((meal) => {
      // console.log(meal);
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
              
      
      <div onclick="loadMealDetails(${meal?.idMeal})" class="card">
        <img src="${meal?.strMealThumb}" class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">${meal?.strMeal}</h5>
                <p class="card-text">
                  ${meal?.strInstructions.slice(0, 100)}
                </p>
                <a target ="_blank" href="${
                  meal?.strYoutube
                }" class="btn btn-primary">Go somewhere</a>
            </div>
      </div> 
     
                  
      `;
      searchResult.appendChild(div);
    });
  } else {
    document.getElementById("errorSearch").style.display = "block";
  }
};

const loadMealDetails = (mealId) => {
  console.log(mealId);

  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => showDetails(data.meals[0]));
};

const showDetails = (meal) => {
  console.log(meal);
  const shoeDetails = document.getElementById("showMeal");
  shoeDetails.innerHTML = "";

  const div = document.createElement("div");
  div.classList.add("details");
  div.innerHTML = `
  
  <div class="clickedMeal w-50">
  
  <img src="${
    meal?.strMealThumb
  }" class="card-img-top rounded-4 p-1" alt="..." />
          <div class="card-body ">
              <h5 class="card-title p-2">${meal?.strMeal}</h5>
              <p class="card-text p-3">
                ${meal?.strInstructions.slice(0, 100)}
              </p>
              <a target ="_blank" href="${
                meal?.strYoutube
              }" class="btn btn-primary my-4 mx-4">Go somewhere</a>
          </div>

  
  
  
  </div>
  
  `;
  shoeDetails.appendChild(div);
};
