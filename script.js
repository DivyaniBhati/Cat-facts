let facts = document.querySelectorAll(".facts");

facts.forEach((factCard) => {
  factCard.addEventListener("mouseenter", async function () {
    do {
      fact = await getfacts();
    } while (fact.length > 170);

    console.log(fact.length);
    let p = document.querySelectorAll(".card-back p");
    p.forEach((data) => {
      data.innerText = fact;
    });
  });
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
