const LoadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then((json) => displayCategories(json.categories))
        .catch(err => console.error("Error fetching categories:", err));
};

const loadCategoryWord =(id)=>{
    const url = `https://openapi.programming-hero.com/api/plants/${id}`;
    fetch(url)
    .then(res=>res.json())
    .then(plant=>console.log(plant));
}

// Display Category
const displayCategories = (categories) => {
    const categoriesDiv = document.getElementById('categories-div');
    categoriesDiv.innerHTML = "";

    if (!categories || !Array.isArray(categories)) {
        categoriesDiv.innerHTML = "<p>No categories found.</p>";
        return;
    }

    categories.forEach(category => {
    const catBtn = document.createElement("div");
    catBtn.innerHTML = `
            <button 
            onClick="loadCategoryWord('${category.category_name}')" 
            class="p-3 w-full text-left hover:bg-[#15803D] hover:text-white rounded-sm"
            >
                ${category.category_name}
            </button>
        `;
    categoriesDiv.append(catBtn);
    });


};

LoadCategories();
