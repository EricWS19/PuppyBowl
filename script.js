document.addEventListener("DOMContentLoaded", () => {
  const cohort = "2503-FTB-ET-WEB-AM";
  const baseUrl = `https://fsa-puppy-bowl.herokuapp.com/api/${cohort}/players`;

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
      `;

      card.addEventListener("click", () => fetchSinglePuppy(puppy.id));
      container.appendChild(card);
    });
  }

  async function fetchSinglePuppy(id) {
    try {
      const res = await fetch(`${baseUrl}/${id}`);
      const result = await res.json();
      console.log("Fetched single puppy:", result.data.player);
    } catch (err) {
      console.error("Error fetching single puppy:", err);
    }
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
        body: JSON.stringify(newPuppy)
      });
      const result = await response.json();
      console.log("New puppy added:", result);
      fetchAllPuppies();
      event.target.reset();
    } catch (err) {
      console.error("Failed to add puppy:", err);
    }
  });

  fetchAllPuppies();
});
