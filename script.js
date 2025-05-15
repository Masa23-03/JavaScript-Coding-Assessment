const apiURL = "https://dummyjson.com/quotes";
const ifstr = document.getElementById("ifFilter");
let myQuotes = [];

async function getAllQuotes() {
  try {
    const response = await fetch(apiURL);
    const quotesInJSON = await response.json();
    myQuotes = quotesInJSON.quotes;
    displayQuotes(myQuotes);
  } catch (error) {
    alert(error);
  }
}
function displayQuotes(allQuotes) {
  const quotesUl = document.querySelector("#quotesList");
  quotesUl.innerHTML = "";

  if (allQuotes.length === 0) {
    quotesUl.innerHTML = "<li>No quote matches your input!</li>";
  } else {
    for (const q of allQuotes) {
      quotesUl.innerHTML += `<li>${q.quote}</li>`;
    }
  }
}

function filterQuotes(keyword) {
  const filteredQuotes = [];
  for (const q of myQuotes) {
    if (q.quote.toLowerCase().includes(keyword.toLowerCase())) {
      //console.log(q.quote);
      filteredQuotes.push(q);
    }
  }
  displayQuotes(filteredQuotes);
}

async function Executer() {
  await getAllQuotes();
  ifstr.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      filterQuotes(e.target.value);
    }
  });
}

Executer();
