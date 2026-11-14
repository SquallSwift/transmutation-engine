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
    case "Grants":
      effect = cardData[1];
      renown = cardData[2];
      generateGrantCard(name, effect, renown);
      break;
    case "Processes":
      effect = cardData[1];
      generateProcessCard(name, effect);
      break;
    case "Products":
      let shorthand = cardData[1];
      renown = cardData[2];
      generateProductCard(name, shorthand, renown);
      break;
    case "Tools":
      effect = cardData[1];
      let eternal = cardData[2];
      renown = cardData[3];
      generateToolCard(name, effect, eternal, renown);
      break;
    default:
      document.getElementById('debug').innerText = "Card Type not recognised.";
  }
}

function generateEventCard(name, effect) {
  // example: 'Events'!C2:D8

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
  // example: 'Grants'!C2:E12

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
  // example: 'Processes'!C2:D10

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

  const cardGrid = document.getElementById("card-grid");
  cardGrid.setAttribute("class", "card-grid-process");

  cardContent.setAttribute("class","card process");
  cardPicture.setAttribute("class","process-picture");
  cardName.setAttribute("class","card-name");
  cardEffect.setAttribute("class","card-effect");
}

function generateProductCard(name, shorthand, renown) {
  // example: 'Products'!C2:E6

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
  // example: 'Tools'!C2:F27

  // create card elements
  const cardName = document.createElement("div");
  const cardEternalTag = document.createElement("div");
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

  if(eternal == "TRUE") {
    cardEternalTag.innerText = "Eternal";
    cardContent.appendChild(cardEternalTag);
    cardEternalTag.setAttribute("class","eternal-tag")
  }

  cardContent.appendChild(cardEffect);
  cardContent.appendChild(cardRenownSymbol).appendChild(cardRenownText);

  const cardDisplayArea = document.getElementById("card-display-area");
  cardDisplayArea.parentNode.insertBefore(cardContent, cardDisplayArea);

  cardContent.setAttribute("class","card");
  cardName.setAttribute("class","card-name");
  cardEffect.setAttribute("class","card-effect");
  cardRenownSymbol.setAttribute("class","renown-cost");
  cardRenownText.setAttribute("class","card-renown-text");
}

function convertShorthandToImage(shorthand) {
  // Shorthand will be written with the centre element's letter, followed by a dash, 
  // followed by each position that connects to it clockwise, starting from the top left position. 
  // Spaces mean an empty space.

  // grab each element of the shorthand into its own variable
  let centralElement = shorthand[0];
  let topLeftElement = shorthand[2];
  let topRightElement = shorthand[3];
  let rightElement = shorthand[4];
  let bottomRightElement = shorthand[5];
  let bottomLeftElement = shorthand[6];
  let leftElement = shorthand[7];

  // dynamically create each element as a coloured circle
}
