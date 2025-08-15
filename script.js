// let url = "https://catfact.ninja/fact";
// let facts = document.querySelectorAll(".facts");

// facts.forEach((factCard) => {
//   let p = factCard.querySelector(".card-back p");

//   let locked = false; // card state

//   async function showFact() {
//     if (locked) return; // don't fetch new fact if locked

//     let fact;
//     let tries = 0;

//     do {
//       fact = await getfacts();
//       tries++;
//       if (tries > 10) break; // avoid infinite loop
//     } while (fact.length > 170);

//     p.innerText = fact;
//   }
//   const btns = factCard.parentElement.querySelector(".btns");
//   // Show fact + show button on hover
//   factCard.addEventListener("mouseenter", () => {
//     if (locked) return;

//     showFact();

//     // After flip finishes, show buttons
//     setTimeout(() => {
//       btns.classList.remove("hide");
//       btns.classList.add("show");
//     }, 300); // matches card flip duration
//   });

//   factCard.addEventListener("mouseleave", () => {
//     if (locked) return;
//     // Hide buttons first
//     btns.classList.remove("show");
//     btns.classList.add("hide");

//     // After buttons fade out, flip back
//     setTimeout(() => {
//       cardInner.style.transform = "rotateY(0deg)";
//     }, 300); // matches button fade duration
//   });

//   factCard.addEventListener("click", () => {
//     locked = !locked; // toggle lock state

//     if (locked) {
//       btns.classList.add("show");
//       btns.classList.remove("hide");
//     } else {
//       // Unlock → revert to normal
//       btns.classList.remove("show");
//       btns.classList.add("hide");
//       cardInner.style.transform = "rotateY(0deg)";
//     }
//   });
// });

// async function getfacts() {
//   let url = "https://catfact.ninja/fact";
//   try {
//     let res = await axios.get(url);
//     return res.data.fact;
//   } catch (e) {
//     console.log("ERROR - ", e);
//     return "NO FACT FOUND";
//   }
// }

let url = "https://catfact.ninja/fact";
let facts = document.querySelectorAll(".facts");

facts.forEach((factCard) => {
  let cardInner = factCard.querySelector(".card-inner");
  let p = factCard.querySelector(".card-back p");
  let btns = factCard.parentElement.querySelector(".btns");

  let flipped = false; // is card currently flipped?
  let locked = false; // click lock status

  // Fetch and set a fact
  async function showFact() {
    let fact;
    let tries = 0;
    do {
      fact = await getfacts();
      tries++;
      if (tries > 10) break;
    } while (fact.length > 170);
    p.innerText = fact;
  }

  // Flip and unflip functions
  function flipCard() {
    cardInner.style.transform = "rotateY(180deg)";
    flipped = true;
  }

  function unflipCard() {
    cardInner.style.transform = "rotateY(0deg)";
    flipped = false;
  }

  // Hover in → flip and show fact
  factCard.addEventListener("mouseenter", () => {
    if (!flipped) {
      flipCard();
      showFact();
    }
    btns.classList.add("show");
    btns.classList.remove("hide");
    // setTimeout(
    //   () => btns.classList.add("show") && btns.classList.remove("hide"),
    //   300
    // );
  });

  // Hover out → only unflip if not locked
  factCard.addEventListener("mouseleave", () => {
    if (!locked) {
      btns.classList.remove("show");
      btns.classList.add("hide");
      unflipCard();
    }
  });

  // Click → toggle lock state
  factCard.addEventListener("click", () => {
    locked = !locked;
    if (locked) {
      flipCard();
      btns.classList.add("show");
    } else {
      btns.classList.remove("show");
      unflipCard();
    }
  });

  // --- Button functionality ---
  let getMoreBtn = btns.querySelector("button:nth-child(2)");
  getMoreBtn.addEventListener("click", async (e) => {
    e.stopPropagation(); // avoid triggering the card click
    await showFact(); // just replace the fact text
  });
});

// Fetch API call
async function getfacts() {
  try {
    let res = await axios.get(url);
    return res.data.fact;
  } catch (e) {
    console.log("ERROR - ", e);
    return "NO FACT FOUND";
  }
}
