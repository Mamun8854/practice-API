const loadPhones = (searchText) => {
  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then((res) => res.json())
    .then((data) => displayPhones(data.data));
};
const displayPhones = (phones) => {
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.textContent = "";
  phones.forEach((phone) => {
    console.log(phone);

    const noFoundMessage = document.getElementById("warning-message");
    // console.log(noFoundMessage);
    if (phones.length == 0) {
      noFoundMessage.classList.remove("d-none");
      phonesContainer.textContent = "";
    } else {
      noFoundMessage.classList.add("d-none");
    }
    const newPhoneDiv = document.createElement("div");
    newPhoneDiv.classList.add("col");
    newPhoneDiv.innerHTML = `
        <div class="card h-100 p-4">
         <img src="${phone.image}" class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">Phone Name : ${phone.phone_name}</h5>
                <p class="card-text">Brand Name : ${phone.brand}</p>
            </div>
        </div>
    `;
    phonesContainer.appendChild(newPhoneDiv);
  });
};

document.getElementById("btn-search").addEventListener("click", function () {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  //   console.log(searchText);
  loadPhones(searchText);
});

loadPhones();
