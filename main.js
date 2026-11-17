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

  const cardEngine = document.createElement("div");
  cardEngine.setAttribute("class","engine-container");

  const engineSpaceBorderTopLeft = document.createElement("div");
  engineSpaceBorderTopLeft.setAttribute("class","engine-space-border");
  const engineSpaceBorderTopRight = engineSpaceBorderTopLeft.cloneNode(true);
  const engineSpaceBorderRight = engineSpaceBorderTopLeft.cloneNode(true);
  const engineSpaceBorderBottomRight = engineSpaceBorderTopLeft.cloneNode(true);
  const engineSpaceBorderBottomLeft = engineSpaceBorderTopLeft.cloneNode(true);
  const engineSpaceBorderLeft = engineSpaceBorderTopLeft.cloneNode(true);
  const engineSpaceBorderMiddle = engineSpaceBorderTopLeft.cloneNode(true);

  const engineSpaceTopLeft = document.createElement("div");
  engineSpaceTopLeft.setAttribute("class","engine-space");
  const engineSpaceTopRight = engineSpaceTopLeft.cloneNode(true);
  const engineSpaceRight = engineSpaceTopLeft.cloneNode(true);
  const engineSpaceBottomRight = engineSpaceTopLeft.cloneNode(true);
  const engineSpaceBottomLeft = engineSpaceTopLeft.cloneNode(true);
  const engineSpaceLeft = engineSpaceTopLeft.cloneNode(true);
  const engineSpaceMiddle = engineSpaceTopLeft.cloneNode(true);

  // get a list of element divs
  const listOfElements = convertShorthandToArrayOfElements(shorthand);
  engineSpaceMiddle.appendChild(listOfElements[0]);
  engineSpaceTopLeft.appendChild(listOfElements[1]);
  engineSpaceTopRight.appendChild(listOfElements[2]);
  engineSpaceRight.appendChild(listOfElements[3]);
  engineSpaceBottomRight.appendChild(listOfElements[4]);
  engineSpaceBottomLeft.appendChild(listOfElements[5]);
  engineSpaceLeft.appendChild(listOfElements[6]);

  const cardRenownSymbol = document.createElement("div");
  const cardRenownText = document.createElement("div");
  
  // insert data from passed variables
  cardName.innerText = name;
  cardRenownText.innerText = renown;

  // append engine spaces together
  engineSpaceBorderTopLeft.appendChild(engineSpaceTopLeft);
  engineSpaceBorderTopRight.appendChild(engineSpaceTopRight);
  engineSpaceBorderRight.appendChild(engineSpaceRight);
  engineSpaceBorderBottomRight.appendChild(engineSpaceBottomRight);
  engineSpaceBorderBottomLeft.appendChild(engineSpaceBottomLeft);
  engineSpaceBorderLeft.appendChild(engineSpaceLeft);
  engineSpaceBorderMiddle.appendChild(engineSpaceMiddle);

  const engineTopRow = document.createElement("div");
  engineTopRow.setAttribute("class","engine-container-row");
  const engineMiddleRow = engineTopRow.cloneNode(true);
  const engineBottomRow = engineTopRow.cloneNode(true);

  engineTopRow.appendChild(engineSpaceBorderTopLeft);
  engineTopRow.appendChild(engineSpaceBorderTopRight);

  engineMiddleRow.appendChild(engineSpaceBorderLeft);
  engineMiddleRow.appendChild(engineSpaceBorderMiddle);
  engineMiddleRow.appendChild(engineSpaceBorderRight);

  engineBottomRow.appendChild(engineSpaceBorderBottomLeft);
  engineBottomRow.appendChild(engineSpaceBorderBottomRight);

  cardEngine.appendChild(engineTopRow);
  cardEngine.appendChild(engineMiddleRow);
  cardEngine.appendChild(engineBottomRow);

  // append card elements to the card
  const cardContent = document.createElement("div");
  cardContent.appendChild(cardEngine);
  cardContent.appendChild(cardName);
  cardContent.appendChild(cardRenownSymbol).appendChild(cardRenownText);

  const cardDisplayArea = document.getElementById("card-display-area");
  cardDisplayArea.parentNode.insertBefore(cardContent, cardDisplayArea);

  cardContent.setAttribute("class","card");
  cardName.setAttribute("class","card-name");
  cardRenownSymbol.setAttribute("class","renown-gain");
  cardRenownText.setAttribute("class","card-renown-text");
}

function generateToolCard(name, effect, eternal, renown) {
  // example: 'Tools'!C2:F27

  // create card elements
  const cardName = document.createElement("div");
  const cardEffect = document.createElement("div");
  const toolCardFooter = document.createElement("div");
  const cardEternalTag = document.createElement("div");
  const cardRenownSymbol = document.createElement("div");
  const cardRenownText = document.createElement("div");
  
  // insert data from passed variables
  cardName.innerText = name;
  cardEffect.innerText = effect;
  cardRenownText.innerText = renown;

  if(eternal == "TRUE") {
    cardEternalTag.innerText = "Eternal";
  } else {
    cardEternalTag.innerText = "Once"
  }
  
  // append card elements to the card
  const cardContent = document.createElement("div");
  cardContent.appendChild(cardName);
  cardContent.appendChild(cardEffect);
  toolCardFooter.appendChild(cardEternalTag);
  toolCardFooter.appendChild(cardRenownSymbol).appendChild(cardRenownText);
  cardContent.appendChild(toolCardFooter);

  const cardDisplayArea = document.getElementById("card-display-area");
  cardDisplayArea.parentNode.insertBefore(cardContent, cardDisplayArea);

  cardContent.setAttribute("class","card");
  cardName.setAttribute("class","card-name");
  cardEffect.setAttribute("class","card-effect");
  toolCardFooter.setAttribute("class","tool-card-footer");
  cardEternalTag.setAttribute("class","eternal-tag")
  cardRenownSymbol.setAttribute("class","renown-cost");
  cardRenownText.setAttribute("class","card-renown-text");
}

function convertShorthandToArrayOfElements(shorthand) {
  // Shorthand will be written with the centre element's letter followed by each 
  // position that connects to it clockwise, starting from the top left position. 
  // Spaces means there is no element to be added.

  const element = document.createElement("div");
  const emptySlot = document.createElement("div");
  const listOfElements = [];

  // loop through each letter of the shorthand and identify which element needs to be added
  for (let i = 0; i < shorthand.length; i++) {
    element.innerText = shorthand.charAt(i)

    if (shorthand.charAt(i) == ".") {
      let clonedEmptySlot = emptySlot.cloneNode(true);
      listOfElements.push(clonedEmptySlot);
    } else {
      switch (shorthand.charAt(i)) {
       case "Q":
         element.setAttribute("class","elementCircle quicksilver");
         break;
       case "F":
         element.setAttribute("class","elementCircle fire");
         break;
       case "A":
         element.setAttribute("class","elementCircle air");
         break;
       case "W":
         element.setAttribute("class","elementCircle water");
         break;
       case "E":
         element.setAttribute("class","elementCircle earth");
         break;
       case "L":
         element.setAttribute("class","elementCircle lead");
         break;
       case "T":
         element.setAttribute("class","elementCircle tin");
         break;
       case "I":
         element.setAttribute("class","elementCircle iron");
         break;
       case "C":
         element.setAttribute("class","elementCircle copper");
         break;
       case "S":
         element.setAttribute("class","elementCircle silver");
         break;
       case "G":
         element.setAttribute("class","elementCircle gold");
         break;
       default:
         document.getElementById('debug').innerText = "Element " + i + ":  " + shorthand.charAt(i) + " not recognised.";
      }
      let clonedElement = element.cloneNode(true);
      listOfElements.push(clonedElement);
    }
  }

  return listOfElements;
}
