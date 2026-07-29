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

const fileName = 'Cards';
let cardDatabase = {};

//fetch google sheets file as a tsv
fetch(fileName).then(x => x.text()).then(processTSV).then(() => {});

//process tsv file
function processTSV(data) {
  // each row needs to be split the end-of-line character
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

  // provess different columns depending on the name of the sheet itself?
  // switch for process, product, grant, tool
}
