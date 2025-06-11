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

  
    state.puppies = result.data.players;
  } catch (error) {
    console.error("Error fetching puppies:", error);
  }
}
fetchAllPuppies();
