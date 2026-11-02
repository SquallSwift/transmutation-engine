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
const grantDataColumns = {
  "id": 1,
  "image_link": 2,
  "name": 3,
  "effect": 4,
  "nenown": 5,
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

function processRow(rowValues) {
  let cardData = {};
  for (let dataName in dataColumns) {
    cardData[dataName] = rowValues[dataColumns[dataName]];
  }
  return cardData;
}

//process tsv file
function processTSV(data) {
  // each row needs to be split by an end-of-line character
  let rows = data.split('\n');
  let id = 0;
  for (let i = 2; i < rows.length; i++) {
        let row = rows[i];
        let cardData = processRow(row.split('\t'));
        cardDatabase[id++] = cardData;
    }
    let cardElement;
    for (let cardName in cardDatabase) {
        cardElement = generateCard(cardDatabase[cardName]);
        document.body.appendChild(cardElement);
    }
}

function generateCard(cardData) {
  let name = $(`p`, `name`, cardData[`name`]);

  // process different columns depending on the name of the sheet itself?
  // switch for process, product, grant, tool
}
