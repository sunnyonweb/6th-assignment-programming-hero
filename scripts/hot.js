const categoryList = document.getElementById("category-list");
const cardContainer = document.getElementById("card-container");
const cartContainer = document.getElementById("cart-container");

const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((response) => response.json())
    .then((data) => {
      const reciveData = data.categories;
      showCategories(reciveData);
    });
};

const showCategories = (reciveData) => {
  reciveData.forEach((cat) => {
    categoryList.innerHTML += `
       <li class="list-none"> <button id="${cat.id}" class="w-[100%] text-left font-semibold  py-2 hover:bg-green-600 hover:text-white px-3  rounded-lg">${cat.category_name}</button></li>
        `;
  });
  categoryList.addEventListener("click", (e) => {
    const allBtn = document.querySelectorAll("button");
    allBtn.forEach((button) => {
      button.classList.remove("bg-green-600");
      button.classList.remove("text-white");
    });
    if (e.target.localName === "button") {
      // console.log(e.target.id)
      e.target.classList.add("bg-green-600");
      e.target.classList.add("text-white");
      treeByCategoris(e.target.id);
    }
  });
};

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;

  const res = await fetch(url);
  const details = await res.json();
  // console.log(details.plants)
  displayWordDetails(details.plants);
};

const displayWordDetails = (details) => {
  // console.log(details);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `<div class="text-left ">
        <h2 class="font-bold text-xl pt-3">${details.name}</h2>
        <img src="${details.image}" class="h-70 w-[100%] pt-3" alt="">
        <h4 class="font-bold pt-3">Category:<span class="font-medium"> ${details.category}</span></h4>
        <h4 class="font-bold pt-3">Price:<span class="font-medium"> ${details.price} ৳</span></h4>
        <h4 class="font-bold pt-3">Description:<span class="font-medium"> ${details.description}</span></h4>
        
      </div>`;
  document.getElementById("my_modal_5").showModal();
};

// [
//     {
//         "id": 1,
//         "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
//         "name": "Mango Tree",
//         "description": "A fast-growing tropical tree that produces delicious, juicy mangoes
//         "category": "Fruit Tree",
//         "price": 500
//     },
// ]

const treeByCategoris = (treeId) => {
  fetch(`https://openapi.programming-hero.com/api/category/${treeId}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(treeId)
      showItems(data.plants);
    });
};

const showItems = (plants) => {
  cardContainer.innerHTML = "";
  plants.forEach((plant) => {
    // console.log(plant.id)
    cardContainer.innerHTML += `

      <div class="bg-white p-4 rounded-lg shadow-sm  ">
        <div class="h-40 bg-gray-200 rounded-xl mb-3">
          <img src="${plant.image}" class="h-full w-full rounded-xl"  alt="">
        </div>
        <h3 id="tree-title" onclick="loadWordDetail(${plant.id})" class=" font-bold text-lg text-gray-800 mb-1 font-inter">${plant.name}</h3>
        <p class="text-sm text-gray-600 mb-2 font-inter">
         ${plant.description}
        </p>
        <div class="flex justify-between items-center h-fit">
        <span class="inline-block text-sm bg-green-100 text-green-700 px-2 py-1 rounded mb-3 font-inter">${plant.category}</span>
          <span id="price" class="font-semibold text-gray-800 mb-3 ">৳<span id="tree-price font-inter">${plant.price}</span></span>
        </div>
        <button id="add-cart" class="bg-green-600 font-inter w-full text-white text-sm px-4 py-3 mt-6 rounded-3xl hover:bg-green-700 cursor-pointer cart-btn">Add to Cart</button>
      </div>

        
        `;
  });
};
cardContainer.addEventListener("click", (e) => {
  if (e.target.innerText === "Add to Cart") {
    const treeName = e.target.parentNode.children[1].innerText;
    const treePrice =
      e.target.parentNode.children[3].children[1].children[0].innerText;

    // console.log(treeName, treePrice);

    const totalPriceGet = document.getElementById("total-price");
    const totalPrice = Number(totalPriceGet.innerText);
    const currentTotal = totalPrice + Number(treePrice);

    totalPriceGet.innerText = currentTotal;

    const cartContainer = document.getElementById("cart-container");

    const newCart = document.createElement("div");
    newCart.innerHTML = `
      <div class="flex cart-item justify-between items-start bg-green-50 p-3 rounded-lg mb-2">
        <div>
          <p class="font-semibold text-sm text-gray-900">${treeName}</p>
          <p class="text-sm text-gray-600">৳<span class="item-price">${treePrice}</span></p>
        </div>
        <button onclick="removeThisItem(this)" class="text-gray-400 text-xl cursor-pointer">
          <i class="fa-solid fa-xmark text-xs"></i>
        </button>
      </div>
    `;

    cartContainer.appendChild(newCart);
  }
});

function removeThisItem(button) {
  const item = button.closest(".cart-item");
  if (item) {
    const priceText = item.querySelector(".item-price").innerText;
    const price = Number(priceText);

    const totalPriceGet = document.getElementById("total-price");
    const currentTotal = Number(totalPriceGet.innerText);
    const newTotal = currentTotal - price;
    totalPriceGet.innerText = newTotal;

    item.remove();
  }
}

loadCategory();
treeByCategoris(2);
