document.addEventListener("DOMContentLoaded", () => {
  let cards = [];
  cards = getAllCards(cards);

  const form = document.querySelector("form");

  form.addEventListener("submit", () => {
    let name = document.querySelector("#name").value;
    let profession = document.querySelector("#profession").value;
    let email = document.querySelector("#email").value;

    let nameIsValid = validateName(name);
    let validProfession = validateProfession(profession);
    let validEmail = validateEmail(email);

    if (nameIsValid) {
      saveValuesInLocalStorage(name, validProfession, validEmail, cards);
      cards = getAllCards();

      // clear fields
      document.querySelector("#name").value =
        document.querySelector("#profession").value =
        document.querySelector("#email").value =
          "";
      document.querySelector("#name").focus();
    }
  });
});

function validateName(name) {
  return name.length >= 2;
}

function validateProfession(profession) {
  const EXPRESSION = "clerk";
  const REGEX = new RegExp(EXPRESSION, "g");

  return profession.replace(REGEX, "");
}

function validateEmail(email) {
  const emailRegex = /^[A-Z0-9._+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (emailRegex.test(email)) {
    return email;
  } else {
    return "valid@email.com";
  }
}

function saveValuesInLocalStorage(name, profession, email, cards) {
  let card = {
    name: name,
    profession: profession,
    email: email,
  };

  localStorage.setItem(cards.length, JSON.stringify(card));
}

function getAllCards() {
  let cards = [];
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = JSON.parse(localStorage.getItem(key));

    cards.push({
      key: key,
      name: value["name"],
      profession: value["profession"],
      email: value["email"],
    });
  }
  createCards(cards);

  return cards;
}

function createCards(cards) {
  let cardsContainer = document.querySelector("#cards-container");
  cardsContainer.innerHTML = "";

  cards.forEach((card) => {
    // main card content
    let divCard = document.createElement("div");
    divCard.classList.add("card");
    divCard.innerHTML = `Name: ${card["name"]}<br>Profession: ${card["profession"]}<br>Email: ${card["email"]}`;

    // delete button
    let deleteButton = document.createElement("span");
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click", () => {
      dissmissCard(deleteButton.parentElement, card["key"]);
    });

    divCard.appendChild(deleteButton);
    cardsContainer.appendChild(divCard);
  });
}

function dissmissCard(element, key) {
  element.remove();
  localStorage.removeItem(key);
}
