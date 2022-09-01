// const loadPhones = async () => {
//   const res = await fetch(
//     "https://openapi.programming-hero.com/api/phones?search=iphone"
//   );
//   const data = res.json();
//   console.log(data);
// };

const loadPhones = (searchText, dataLimit) => {
  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then((res) => res.json())
    .then((data) => displayPhones(data.data, dataLimit));
};
const displayPhones = (phones, dataLimit) => {
  // console.log(phones);
  // display 10 phones
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }
  // No phone found message

  const noFoundMessage = document.getElementById("no-phone-message");
  // console.log(noFoundMessage);
  if (phones.length == 0) {
    noFoundMessage.classList.remove("d-none");
  } else {
    noFoundMessage.classList.add("d-none");
  }
  // Display all phones
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.textContent = ``;
  phones.forEach((phone) => {
    // console.log(phone);

    const newDiv = document.createElement("div");
    newDiv.classList.add("col");
    newDiv.innerHTML = `
    <div class="card p-4">
      <img src="${phone.image}" class="card-img-top" alt="...">
      <div class="card-body">
       <h5 class="card-title">Phone Name : ${phone.phone_name}</h5>
       <p class="card-text">Brand : ${phone.brand}</p>
       <button class="btn btn-primary" onclick="loadPhoneDetails('${phone.slug}')" data-bs-toggle="modal"
       data-bs-target="#phoneDetailsModal">Show Details</button>
      </div>
    </div>
    
    `;
    phonesContainer.appendChild(newDiv);
  });
  toggleSpinner(false);
};

// Search Field
const searchValueField = (dataLimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);
};

document.getElementById("btn-search").addEventListener("click", function () {
  searchValueField(10);
});

// With Enter key press Show Phones Code
document
  .getElementById("search-field")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchValueField(10);
    }
  });
// Loader Code

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

// Show All Phones Code

document.getElementById("btn-show-all").addEventListener("click", function () {
  searchValueField();
});

// Load Phone Details
const loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};

const displayPhoneDetails = (phone) => {
  // console.log(phone);
  const modalTitle = document.getElementById("phoneDetailsModalLabel");
  modalTitle.innerText = phone.name;
  const modalBody = document.getElementById("phone-details");
  modalBody.innerHTML = `
    <p>Release Date : ${
      phone.releaseDate ? phone.releaseDate : "Not Found Release Date"
    }</p>
    <p>Storage : ${
      phone.mainFeatures.storage
        ? phone.mainFeatures.storage
        : "No Storage Found"
    }</p>
    <p>Otheres : ${
      phone.others ? phone.others.Bluetooth : "No Information Of bluetooth"
    }</p>
  
  `;
};
loadPhones("apple");
