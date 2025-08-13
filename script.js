let url = "https://catfact.ninja/fact";
let facts = document.querySelectorAll(".facts");

facts.forEach((factCard) => {
  let p = factCard.querySelector(".card-back p");

  async function showFact() {
    let fact;
    let tries = 0;

    do {
      fact = await getfacts();
      tries++;
      if (tries > 10) break; // avoid infinite loop
    } while (fact.length > 170);

    p.innerText = fact;
  }

  // Show fact + show button on hover
  factCard.addEventListener("mouseenter", () => {
    showFact();
  });
});

async function getfacts() {
  let url = "https://catfact.ninja/fact";
  try {
    let res = await axios.get(url);
    return res.data.fact;
  } catch (e) {
    console.log("ERROR - ", e);
    return "NO FACT FOUND";
  }
}
