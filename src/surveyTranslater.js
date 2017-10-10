const tsv = require("node-tsv-json");
const fs = require('fs');

// Returns a promise that resolves in the data.

// TODO. just save the surveys to disk so 
// this becomes sync.
function getData() {
  return new Promise((res, rej) => {
    const options = {
      input: "surveyDataCollection/Fylgi.tsv",
      output: "Fylgi.json",
      parseRows: true,
    };
    tsv(options, (err, content) => {
      if (err) {
        rej(err)
      } else {
        const flokkar = content[0];
        const surveys = [];
        content.forEach((row) => {
          const survey = {
            lable: row[0],
            value: [],
          };
          for (let i = 1; i < flokkar.length; i++) {
            if (row[i] === '') {
              survey.value.push({
                letter: 'unknown',
                name: flokkar[i],
                precentage: 0,
              });
            } else {
              survey.value.push({
                letter: 'unknown',
                name: flokkar[i],
                precentage: row[i],
              });
            }
          }
          surveys.push(survey);
        });

        fs.writeFileSync(`${__dirname}/surveyDataCollection/fylgi.json`, JSON.stringify(surveys), (err) => {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });

        res(surveys);
      }
    });
  });
}

getData().then((data) => console.log(data));

// export default getData;