let facts = document.querySelectorAll(".facts");

facts.forEach((factCard) => {
  let p = factCard.querySelector(".card-back p");
  // factCard.addEventListener("mouseenter", async function () {
  //   do {
  //     fact = await getfacts();
  //   } while (fact.length > 170);

  //   console.log(fact.length);
  //   let p = document.querySelectorAll(".card-back p");
  //   p.forEach((data) => {
  //     data.innerText = fact;
  //   });
  //   let btn1 = document.createElement("button");
  //   btn1.appendChild(".facts");
  // });
  // Fetch and show a fact
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

  // Hide button when mouse leaves
  factCard.addEventListener("mouseleave", () => {});
  // On "More Facts" click — fetch new fact
  btn1.addEventListener("click", showFact);
});

let url = "https://catfact.ninja/fact";

async function getfacts() {
  try {
    let res = await axios.get(url);
    return res.data.fact;
  } catch (e) {
    console.log("ERROR - ", e);
    return "NO FACT FOUND";
  }
}
