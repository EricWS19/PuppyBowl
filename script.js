const cohort = "2503-FTB-ET-WEB-AM";
const baseUrl = `https://fsa-puppy-bowl.herokuapp.com/api/${cohort}/players`;

document.addEventListener("DOMContentLoaded", () => {
  fetchAllPuppies();
});

async function fetchAllPuppies() {
  try {
    const response = await fetch(baseUrl);
    const { data } = await response.json();
    renderPuppies(data.players);
  } catch (err) {
    console.error("Failed to fetch puppies:", err);
  }
}

function renderPuppies(puppies) {
  const container = document.getElementById("puppy-container");
  container.innerHTML = "";

  puppies.forEach((puppy) => {
    const card = document.createElement("div");
    card.classList.add("puppy-card");

    card.innerHTML = `
      <h3>${puppy.name}</h3>
      <p>Breed: ${puppy.breed}</p>
      <img src="${puppy.imageUrl}" alt="${puppy.name}" width="150" />
      <button class="delete-button" data-id="${puppy.id}">Remove</button>
    `;

  
    const deleteButton = card.querySelector(".delete-button");
    if (deleteButton) {
      deleteButton.addEventListener("click", async (e) => {
        e.stopPropagation();
        console.log(`🗑️ Delete button clicked for puppy ID: ${puppy.id}`);
        try {
          await fetch(`${baseUrl}/${puppy.id}`, {
            method: "DELETE",
          });
          fetchAllPuppies();
        } catch (err) {
          console.error("Failed to delete puppy:", err);
        }
      });
    }

    card.addEventListener("click", async () => {
  try {
    const response = await fetch(`${baseUrl}/${puppy.id}`);
    const { data } = await response.json();
    renderSinglePuppy(data.player);
  } catch (err) {
    console.error("Failed to fetch single puppy:", err);
  }
  console.log("Card clicked!", puppy);

});

    container.appendChild(card);
  });
}

function renderSinglePuppy(puppy) {
  const detailsContainer = document.getElementById("single-puppy-details");

  console.log("🐶 Rendering single puppy:", puppy); // helps you verify it's being triggered

  detailsContainer.innerHTML = `
    <div class="puppy-detail-card">
      <h2>${puppy.name}</h2>
      <p><strong>Breed:</strong> ${puppy.breed}</p>
      <p><strong>Status:</strong> ${puppy.status}</p>
      <img src="${puppy.imageUrl}" alt="${puppy.name}" width="200" />
    </div>
  `;
}



const form = document.getElementById("add-puppy-form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("puppy-name").value;
  const breed = document.getElementById("puppy-breed").value;
  const imageUrl = document.getElementById("puppy-image").value;

  const newPuppy = { name, breed, imageUrl, status: "bench" };

  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPuppy),
    });
    const result = await response.json();
    console.log("New puppy added:", result);
    fetchAllPuppies();
    event.target.reset();
  } catch (err) {
    console.error("Failed to add puppy:", err);
  }
});
