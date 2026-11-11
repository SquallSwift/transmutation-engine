const fileURL = 'https://docs.google.com/spreadsheets/d/1LhtMG9kChhOFR6Upqxm955IF2jBM8BchZ4NSBKF3uoY/edit?usp=sharing&output=tsv';
let cardDatabase = {};

//fetch google sheets file as a tsv
fetch(fileURL).then(x => x.text()).then(processTSV).then(() => {});

//process tsv file
function processTSV(retrievedData, cardType) {
  let retrievedDataValues = retrievedData.values;

  for (let i = 0; i < retrievedDataValues.length; i++) {
    let card = retrievedDataValues[i];
    generatedCard = generateCard(card, cardType);
  }
}

function generateCard(cardData, cardType) {
  let name = cardData[0];
  let effect;
  let renown;

  switch(cardType) {
    case "Events":
      effect = cardData[1];
      generateEventCard(name, effect);
      break;
    case "Grant":
      effect = cardData[1];
      renown = cardData[2];
      generateGrantCard(name, effect, renown);
    case "Process":
      effect = cardData[1];
      generateProcessCard(name, effect);
    case "Product":
      let shorthand = cardData[1];
      renown = cardData[2];
      generateProductCard(name, shorthand, renown);
    case "Tool":
      effect = cardData[1];
      let eternal = cardData[2];
      renown = cardData[3];
      generateToolCard(name, effect, eternal, renown);
    default:
      document.getElementById('debug').innerText = "Card Type not recognised.";
  }
}

function generateEventCard(name, effect) {
  // create card elements
  const cardPicture = document.createElement("div");
  const cardName = document.createElement("div");
  const cardEffect = document.createElement("div");
  
  // insert data from passed variables
  cardName.innerText = name;
  cardEffect.innerText = effect;
  
  // append card elements to the card
  const cardContent = document.createElement("div");
  cardContent.appendChild(cardPicture);
  cardContent.appendChild(cardName);
  cardContent.appendChild(cardEffect);

  const cardDisplayArea = document.getElementById("card-display-area");
  cardDisplayArea.parentNode.insertBefore(cardContent, cardDisplayArea);

  cardContent.setAttribute("class","card");
  cardPicture.setAttribute("class","event-picture");
  cardName.setAttribute("class","card-name");
  cardEffect.setAttribute("class","card-effect");
}

function generateGrantCard(name, effect, renown) {
  // create card elements
  const cardName = document.createElement("div");
  const cardEffect = document.createElement("div");
  const cardRenownSymbol = document.createElement("div");
  const cardRenownText = document.createElement("div");
  
  // insert data from passed variables
  cardName.innerText = name;
  cardEffect.innerText = effect;
  cardRenownText.innerText = renown;
  
  // append card elements to the card
  const cardContent = document.createElement("div");
  cardContent.appendChild(cardName);
  cardContent.appendChild(cardEffect);
  cardContent.appendChild(cardRenownSymbol).appendChild(cardRenownText);

  const cardDisplayArea = document.getElementById("card-display-area");
  cardDisplayArea.parentNode.insertBefore(cardContent, cardDisplayArea);

  cardContent.setAttribute("class","card");
  cardName.setAttribute("class","card-name");
  cardEffect.setAttribute("class","card-effect");
  cardRenownSymbol.setAttribute("class","renown-gain");
  cardRenownText.setAttribute("class","card-renown-text");
}

function generateProcessCard(name, effect) {
  // create card elements
  const cardPicture = document.createElement("div");
  const cardName = document.createElement("div");
  const cardEffect = document.createElement("div");
  
  // insert data from passed variables
  cardName.innerText = name;
  cardEffect.innerText = effect;
  
  // append card elements to the card
  const cardContent = document.createElement("div");
  cardContent.appendChild(cardPicture);
  cardContent.appendChild(cardName);
  cardContent.appendChild(cardEffect);

  const cardDisplayArea = document.getElementById("card-display-area");
  cardDisplayArea.parentNode.insertBefore(cardContent, cardDisplayArea);

  cardContent.setAttribute("class","card process");
  cardPicture.setAttribute("class","process-picture");
  cardName.setAttribute("class","card-name");
  cardEffect.setAttribute("class","card-effect");
}

function generateProductCard(name, shorthand, renown) {
  // create card elements
  const cardName = document.createElement("div");
  const cardPicture = document.createElement("div");
  const cardRenownSymbol = document.createElement("div");
  const cardRenownText = document.createElement("div");
  
  // insert data from passed variables
  cardName.innerText = name;
  cardPicture.innerText = shorthand; // TO DO: Create a method to convert shorthand into coded image
  cardRenownText.innerText = renown;
  
  // append card elements to the card
  const cardContent = document.createElement("div");
  cardContent.appendChild(cardPicture);
  cardContent.appendChild(cardName);
  cardContent.appendChild(cardRenownSymbol).appendChild(cardRenownText);

  const cardDisplayArea = document.getElementById("card-display-area");
  cardDisplayArea.parentNode.insertBefore(cardContent, cardDisplayArea);

  cardContent.setAttribute("class","card");
  cardPicture.setAttribute("class","product-picture");
  cardName.setAttribute("class","card-name");
  cardRenownSymbol.setAttribute("class","renown-gain");
  cardRenownText.setAttribute("class","card-renown-text");
}

function generateToolCard(name, effect, eternal, renown) {
  // this method needs to build the following:
  /*
        <div class="card">
          <div class="card-name">
            Tool Name
            <hr/>
          </div>
          <div class="eternal-tag">
            Eternal
            <hr/>
          </div>
          <div class="card-effect">
            Card Effect
          </div>
          <div class="renown-cost">
            <div class="card-renown-text">
              12
            </div>
          </div>
        </div>
  */
}
