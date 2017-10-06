const tsv = require("node-tsv-json");
tsv({
  input: "Fylgi.tsv",
  output: "output.json",
  parseRows: true,
}, (err, content) => {
  if(err) {
    console.error(err);
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
    // surveys is an array with surveys in the same 
    // format as in surveys.js
  }
});
