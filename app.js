console.log("JS file loaded");

const state = {
  puppies: [],
  selectedPuppy: null,
};

const COHORT_NAME = "2503-FTB-ET-WEB-AM";
const API_BASE_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${COHORT_NAME}/players`;

async function fetchAllPuppies() {
  try {
    const response = await fetch(`${API_BASE_URL}?limit=1000`);
    const result = await response.json();
    console.log("Fetched puppies:", result.data.players);

    // Save to state
    state.puppies = result.data.players;

    // Render to page
    renderAllPuppies();
  } catch (error) {
    console.error("Error fetching puppies:", error);
  }
}

function renderAllPuppies() {
  const puppyListContainer = document.getElementById("puppy-list");
  puppyListContainer.innerHTML = "";

  state.puppies.forEach((puppy) => {
    const card = document.createElement("div");
    card.classList.add("puppy-card");

    card.innerHTML = `
      <img src="${puppy.imageUrl}" alt="${puppy.name}" style="width:100%; border-radius: 6px;" />
      <h3>${puppy.name}</h3>
      <p><strong>Breed:</strong> ${puppy.breed}</p>
    `;

    puppyListContainer.appendChild(card);
  });
}

// Initial load
fetchAllPuppies();
