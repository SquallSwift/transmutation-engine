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

  switch(cardType) {
    case "Events":
      effect = cardData[1];
      generateEventCard(name, effect);
      break;
    default:
      document.getElementById('debug').innerText = "Card Type not recognised.";
  }
}

function generateEventCard(name, effect) {
  // create card card elements
  const eventPicture = document.createElement("div");
  const cardName = document.createElement("div");
  const cardEffect = document.createElement("div");
  
  // insert data from passed variables
  cardName.innerText = name;
  cardEffect.innerText = effect;
  
  // append card elements to the card
  const cardContent = document.createElement("div");
  cardContent.appendChild(eventPicture);
  cardContent.appendChild(cardName);
  cardContent.appendChild(cardEffect);

  document.getElementById('debug').innerText = "Finished generating. Appending card.";

  const cardDisplayArea = document.getElementById("card-display-area");
  cardDisplayArea.parentNode.insertBefore(cardContent, cardDisplayArea);
  cardContent.setAttribute("class","card");
  eventPicture.setAttribute("class","event-picture");
  cardName.setAttribute("class","card-name");
  cardEffect.setAttribute("class","card-effect");
}

function generateGrantCard(name, effect, renown) {
  // this method needs to build the following:
  /*
        <div class="card">
          <div class="card-name">
            Grant Name
            <hr/>
          </div>
          <div class="card-effect">
            Card Effect
          </div>
          <div class="renown-gain">
            <div class="card-renown-text">
              12
            </div>
          </div>
        </div>
  */
}

function generateProcessCard(name, effect) {
  // this method needs to build the following:
  /*
        <div class="card process">
          <div class="process-picture"></div>
          <div class="card-name">
            Process Name
          </div>
          <div class="card-effect">
            Card Effect
          </div>
        </div>
  */
}

function generateProductCard(name, shorthand, renown) {
  // this method needs to build the following:
  /*
        <div class="card">
          <div class="product-picture"></div>
          <div class="card-name">
            Product Name
            <hr/>
          </div>
          <div class="renown-gain">
            <div class="card-renown-text">
              12
            </div>
          </div>
        </div>
  */
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
