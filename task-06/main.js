let titleInput = document.getElementById("title");
let priceInput = document.getElementById("price");
let taxesInput = document.getElementById("taxes");
let quantityInput = document.getElementById("quantity");
let discountInput = document.getElementById("discount");
let totalSpan = document.getElementById("total");
let categoryInput = document.getElementById("category");
let submitButton = document.getElementById("submit");
let searchInput = document.getElementById("search-input");
let searchButton = document.getElementById("search-button");
let deleteAllDiv = document.getElementById("delete-all");
let tableContent = document.getElementById("table-content");

let titleError = document.getElementById("title-error");
let priceError = document.getElementById("price-error");
let categoryError = document.getElementById("category-error");

// Initialize products array from localStorage or create empty array
let products = localStorage.product ? JSON.parse(localStorage.product) : [];

// Current mode (create or update)
let currentMode = "create";
let productToUpdateIndex = null;

// Input fields for calculating total
priceInput.addEventListener("input", calculateTotal);
taxesInput.addEventListener("input", calculateTotal);
quantityInput.addEventListener("input", calculateTotal);
discountInput.addEventListener("input", calculateTotal);

// Submit button
submitButton.addEventListener("click", createProduct);

// Search input
searchInput.addEventListener("input", searchProducts);
searchButton.addEventListener("click", searchProducts);

// Calculate the total price
function calculateTotal() {
  let price = +priceInput.value || 0;
  let taxes = +taxesInput.value || 0;
  let quantity = +quantityInput.value || 1;
  let discount = +discountInput.value || 0;

  let result = price + taxes - quantity * discount;
  totalSpan.innerHTML = result.toFixed(2);
}

// Validate form inputs
function validateInputs() {
  let isValid = true;

  // Reset error messages
  titleError.style.display = "none";
  priceError.style.display = "none";
  categoryError.style.display = "none";

  // Validate title
  if (!titleInput.value) {
    titleError.style.display = "block";
    isValid = false;
  }

  // Validate price
  if (!priceInput.value || +priceInput.value <= 0) {
    priceError.style.display = "block";
    isValid = false;
  }

  // Validate quantity
  if (+quantityInput.value < 1) {
    priceError.style.display = "block";
    priceError.innerHTML = "Quantity can't be less than 1";
    isValid = false;
  }

  // Validate category
  if (!categoryInput.value) {
    categoryError.style.display = "block";
    isValid = false;
  }

  return isValid;
}

// Clear all input fields
function clearInputs() {
  titleInput.value = "";
  priceInput.value = "";
  taxesInput.value = "";
  quantityInput.value = "";
  discountInput.value = "";
  totalSpan.innerHTML = "00.00";
  categoryInput.value = "";

  // Reset error messages
  titleError.style.display = "none";
  priceError.style.display = "none";
  categoryError.style.display = "none";
}

// Product (create or update)
function createProduct() {
  if (!validateInputs()) {
    return;
  }

  let newProduct = {
    title: titleInput.value.toLowerCase(),
    price: priceInput.value,
    taxes: taxesInput.value || "0",
    quantity: quantityInput.value || "0",
    discount: discountInput.value || "0",
    total: totalSpan.innerHTML,
    category: categoryInput.value.toLowerCase(),
  };

  if (currentMode === "create") {
    products.push(newProduct);
    localStorage.setItem("product", JSON.stringify(products));
    clearInputs();
    displayProducts();
  } else {
    products[productToUpdateIndex] = newProduct;
    localStorage.setItem("product", JSON.stringify(products));
    clearInputs();
    displayProducts();

    currentMode = "create";
    submitButton.innerHTML = "Create";
    productToUpdateIndex = null;
  }
}

// Display all products in the table
function displayProducts() {
  let tableHTML = "";

  for (let i = 0; i < products.length; i++) {
    tableHTML += `
                  <tr>
                      <td>${i + 1}</td>
                      <td>${products[i].title}</td>
                      <td>${products[i].price}</td>
                      <td>${products[i].taxes}</td>
                      <td>${products[i].quantity}</td>
                      <td>${products[i].discount}</td>
                      <td>${products[i].total}</td>
                      <td>${products[i].category}</td>
                      <td><button onclick="prepareUpdate(${i})" id="update">Update</button></td>
                      <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
                  </tr>
                  `;
  }

  tableContent.innerHTML = tableHTML;
  dispalyDeleteAllButton();
}

// Prepare the form for updating a product
function prepareUpdate(index) {
  let product = products[index];

  titleInput.value = product.title;
  priceInput.value = product.price;
  taxesInput.value = product.taxes;
  quantityInput.value = product.quantity;
  discountInput.value = product.discount;
  categoryInput.value = product.category;
  calculateTotal();

  // Change to update mode
  currentMode = "update";
  submitButton.innerHTML = "Update";
  productToUpdateIndex = index;

  // Scroll to the form
  titleInput.focus();
}

// Delete a product
function deleteProduct(index) {
  if (confirm("Are you sure you want to delete this product?")) {
    products.splice(index, 1);
    localStorage.setItem("product", JSON.stringify(products));
    displayProducts();
  }
}

// Display the "Delete All" button
function dispalyDeleteAllButton() {
  if (products.length > 0) {
    deleteAllDiv.innerHTML = `
                              <button onclick="deleteAllProducts()" id="delete-all-btn">
                                  Delete All (${products.length} products)
                              </button>
                              `;
  } else {
    deleteAllDiv.innerHTML = "";
  }
}

// Delete all products
function deleteAllProducts() {
  if (confirm("Are you sure you want to delete ALL products?")) {
    products = [];
    localStorage.removeItem("product");
    displayProducts();
  }
}

// Search products
function searchProducts() {
  let searchTerm = searchInput.value.toLowerCase();

  if (!searchTerm) {
    displayProducts();
    return;
  }

  let filteredHTML = "";

  for (let i = 0; i < products.length; i++) {
    let product = products[i];

    // Check if title or category includes the search term
    if (
      product.title.includes(searchTerm) ||
      product.category.includes(searchTerm)
    ) {
      filteredHTML += createTableRow(i, product);
    }
  }

  tableContent.innerHTML =
    filteredHTML || "<tr><td colspan='10'>No products found</td></tr>";
}

// Create a table row for a product
function createTableRow(index, product) {
  return `
        <tr>
            <td>${index + 1}</td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.taxes}</td>
            <td>${product.quantity}</td>
            <td>${product.discount}</td>
            <td>${product.total}</td>
            <td>${product.category}</td>
            <td><button onclick="prepareUpdate(${index})" id="update">Update</button></td>
            <td><button onclick="deleteProduct(${index})" id="delete">Delete</button></td>
        </tr>
        `;
}

displayProducts();
