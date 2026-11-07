const eventDataColumns = {
  "id": 1,
  "image_link": 2,
  "name": 3,
  "effect": 4,
};
const grantDataColumns = {
  "id": 1,
  "image_link": 2,
  "name": 3,
  "effect": 4,
  "nenown": 5,
};
const processDataColumns = {
  "id": 1,
  "image_link": 2,
  "name": 3,
  "effect": 4,
};
const productDataColumns = {
  "id": 1,
  "image_link": 2,
  "name": 3,
  "renown": 4,
};
const toolDataColumns = {
  "id": 1,
  "image_link": 2,
  "name": 3,
  "effect": 4,
  "eternal": 5,
  "renown": 6,
};

const fileURL = 'https://docs.google.com/spreadsheets/d/1LhtMG9kChhOFR6Upqxm955IF2jBM8BchZ4NSBKF3uoY/edit?usp=sharing&output=tsv';
let cardDatabase = {};

//fetch google sheets file as a tsv
fetch(fileURL).then(x => x.text()).then(processTSV).then(() => {});

function processRow(rowValues, cardType) {
  let cardData = {};

  switch(cardType) {
    case "Events":
      for (let dataName in eventDataColumns) {
        cardData[dataName] = rowValues[eventDataColumns[dataName]];
      }
      break;
    case "Grant":
      for (let dataName in grantDataColumns) {
        cardData[dataName] = rowValues[grantDataColumns[dataName]];
      }
      break;
    case "Process":
      for (let dataName in processDataColumns) {
        cardData[dataName] = rowValues[processDataColumns[dataName]];
      }
      break;
    case "Product":
      for (let dataName in productDataColumns) {
        cardData[dataName] = rowValues[productDataColumns[dataName]];
      }
      break;
    case "Tool":
      for (let dataName in toolDataColumns) {
        cardData[dataName] = rowValues[toolDataColumns[dataName]];
      }
      break;
    default:
      document.getElementById('debug').innerText = "Card Type not recognised.";
  }

  return cardData;
}

//process tsv file
function processTSV(retrievedData, cardType) {
  // each row needs to be split by an end-of-line character
  let rows = retrievedData.split("\n");
  let id = 0;
  for (let i = 2; i < rows.length; i++) {
      let row = rows[i];
      let cardData = processRow(row.split("\t"), cardType);
      cardDatabase[id++] = cardData;
  }
  
  for (let card in cardDatabase) {
    document.getElementById('debug').innerText = card;
    
    card = generateCard(cardDatabase, cardType);
    document.body.appendChild(card);
  }
}

function generateCard(cardData, cardType) {
  let name = cardData[`name`];
  let effect;
  let renown;

  switch(cardType) {
    case "Events":
      effect = cardData[`effect`];
      generateEventCard(name, effect);
      break;
    case "Grant":
      effect = cardData[`effect`];
      renown = cardData[`renown`];
      generateGrantCard(name, effect, renown);
      break;
    case "Process":
      effect = cardData[`effect`];
      generateProcessCard(name, effect);
      break;
    case "Product":
      let shorthand = cardData[`shorthand`];
      renown = cardData[`renown`];
      generateProductCard(name, shorthand, renown);
      break;
    case "Tool":
      effect = cardData[`effect`];
      let eternal = cardData[`eternal`];
      renown = cardData[`renown`];
      generateToolCard(name, effect, eternal, renown);
      break;
    default:
      document.getElementById('debug').innerText = "Card Type not recognised.";
  }

}

function generateEventCard(name, effect) {
  // this method needs to build the following:
  /*
        <div class="card">
          <div class="event-picture"></div>
          <div class="card-name">
            Event Name
          </div>
          <div class="card-effect">
            Card Effect
          </div>
        </div>
  */

  let eventPicture = $(`div`, `event-picture`);
  let cardName = $(`div`, `card-name`, name);
  let cardEffect = $(`div`, `card-effect`, effect);
  let card = $(`div`, `card`, [eventPicture, cardName, cardEffect]);
  return card;
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
