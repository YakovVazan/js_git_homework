const usersArray = [
  {
    age: 16,
    name: "yossi",
    admin: true,
    grades: [20, 23, 50, 30],
    address: {
      city: "ashdod",
      houseNumber: 12,
    },
  },
  {
    age: 25,
    name: "yael",
    admin: false,
    grades: [50, 16, 100, 78],
    address: {
      city: "ashdod",
      houseNumber: 8,
    },
  },
  {
    age: 22,
    name: "idan",
    admin: false,
    grades: [100, 100, 100, 30],
    address: {
      city: "tel aviv",
      houseNumber: 40,
    },
  },
  {
    age: 29,
    name: "yarden king",
    admin: true,
    grades: [99, 99, 99, 99],
    address: {
      city: "kfar bialik",
      houseNumber: 1,
    },
  },
  {
    age: 34,
    name: "banu",
    admin: true,
    grades: [100, 100, 100, 100],
    address: {
      city: "ashdod",
      houseNumber: 16,
    },
  },
  {
    age: 57,
    name: "nabetjs",
    admin: false,
    grades: [3, 16, 0, 30],
    address: {
      city: "tel aviv",
      houseNumber: 12,
    },
  },
  {
    age: 15,
    name: "rongular",
    admin: true,
    grades: [92, 87, 69, 84],
    address: {
      city: "yafo",
      houseNumber: 12,
    },
  },
  {
    age: 10,
    name: "david",
    admin: false,
    grades: [20, 23, 50, 30],
    address: {
      city: "ashdod",
      houseNumber: 12,
    },
  },
  {
    age: 66,
    name: "liad",
    admin: false,
    grades: [92, 76, 77, 82],
    address: {
      city: "beit dagan",
      houseNumber: 112,
    },
  },
  {
    age: 34,
    name: "happy",
    admin: true,
    grades: [54, 23, 100, 30],
    address: {
      city: "beit dagan",
      houseNumber: 112,
    },
  },
];

document.addEventListener("DOMContentLoaded", () => {
  showAllUsers(usersArray);

  // listen to select
  let selection = document
    .querySelector("#users-filter")
    .addEventListener("input", () => {
      selection = document.querySelector("#users-filter").value;
    });

  // listen to button
  document.querySelector("#find").addEventListener("click", () => {
    let factor = document.querySelector("#factor").value;
    if (factor) {
      filterUsersByFactor(selection, factor);
    }
  });

  additionalButtons();
});

function showAllUsers(data) {
  let cardsArea = document.querySelector(".cards-area");

  // display all users
  data.forEach((user) => {
    let card = document.createElement("span");
    card.classList.add("card");
    card.innerHTML = `Name: ${user["name"]}<br> Age: ${user["age"]} <br> admin: ${user["admin"]} <br> Grades: ${user["grades"]} <br> City: ${user["address"].city} <br> House number: ${user["address"].houseNumber}`;
    cardsArea.appendChild(card);
  });
}

function filterUsersByFactor(selection, factor) {
  let cardsArea = document.querySelector(".cards-area");
  cardsArea.innerHTML = "";
  let filteredArray = [];

  switch (selection) {
    case "age":
      filteredArray = usersArray.filter((user) => {
        return user["age"] > factor;
      });
      break;
    case "name":
      filteredArray = usersArray.filter((user) => {
        return user["name"] === factor;
      });
      break;
    case "admin":
      filteredArray = usersArray.filter((user) => {
        return String(user["admin"]) === factor.toLowerCase();
      });
      break;
    case "grades":
      filteredArray = usersArray.filter((user) => {
        if (getAverage(user["grades"]) > factor) return user["grades"];
      });
      break;
    case "address":
      let type = factor.split(".")[0];
      let typeName = factor.split(".")[1];

      filteredArray = usersArray.filter((user) => {
        return user["address"][type] === typeName;
      });
      break;
    case "all":
      filteredArray = usersArray.filter((user) => {
        let allGradesGreater = user["grades"].every((grade) => {
          console.log(grade, factor);
          return grade > factor;
        });
        return allGradesGreater;
      });
      break;
    case "some":
      filteredArray = usersArray.filter((user) => {
        let someGradesGreater = user["grades"].some((grade) => {
          return grade > factor;
        });
        return someGradesGreater;
      });
      break;
    case "combination":
      filteredArray = usersArray.filter((user) => {
        return (
          getAverage(user["grades"]) < factor &&
          user["address"]["houseNumber"] > factor
        );
      });
      console.log(filteredArray);
      filteredArray.forEach((user) => {
        user["age"] += factor;
      });
      break;
    default:
      return;
  }

  showAllUsers(filteredArray);
}

function additionalButtons() {
  let all = document.querySelector("#all");
  let some = document.querySelector("#some");
  let combination = document.querySelector("#combination");

  all.addEventListener("click", () => {
    let factor = document.querySelector("#factor").value;
    filterUsersByFactor("all", factor);
  });
  some.addEventListener("click", () => {
    let factor = document.querySelector("#factor").value;
    filterUsersByFactor("some", factor);
  });
  combination.addEventListener("click", () => {
    let factor = document.querySelector("#factor").value;
    filterUsersByFactor("combination", factor);
  });
}

function getAverage(numsList) {
  let sum = numsList.reduce((total, num) => total + num, 0);
  let average = sum / numsList.length;
  return average;
}
