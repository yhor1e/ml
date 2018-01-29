
const ml = require('ml-regression'),
      csv = require('csvtojson'),
      SLR = ml.SLR;

const csvFilePath = 'Advertising.csv';

let csvData = [],
    X = [],
    y = [];

let regressionModel;

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

csv()
  .fromFile(csvFilePath)
  .on('json', (jsonObj) => {
    csvData.push(jsonObj);
  })
  .on('done', () => {
    dressData();
    performRegression();
  });

function performRegression() {
  regressionModel = new SLR(X, y);
  console.log(regressionModel.toString(3));
  predictOutput();
}

function dressData() {
  /**
   * One row of the data object looks like:
   * {
   *   TV: "10",
   *   Radio: "100",
   *   Newspaper: "20",
   *   "Sales": "1000"
   * }
   *
   * Hence, while adding the data points,
   * we need to parse the String value as a Float.
   */
  csvData.forEach((row) => {
    X.push(f(row.radio));
    y.push(f(row.sales));
  });
}

function f(s) {
  return parseFloat(s);
}

function predictOutput() {
  rl.question('Enter input X for prediction (Press CTRL+C to exit) : ', (answer) => {
    console.log(`At X = ${answer}, y =  ${regressionModel.predict(parseFloat(answer))}`);
    predictOutput();
  });
}
