const tsv = require("node-tsv-json");
const fs = require('fs');

const nameToLetter = {
    Björt_framtíð: 'A',
    Framsóknarflokkurinn: 'B',
    Viðreisn: 'C',
    Sjálfstæðisflokkurinn: 'D',
    Íslenska_þjóðfylkingin: 'E',
    Flokkur_fólksins: 'F',
    Hægri_grænir: 'G',
    Húmanistaflokkurinn: 'H',
    Flokkur_heimilana: 'I',
    Regnboginn: 'J',
    Sturla_Jónsson: 'K',
    Lýðræðisvaktin: 'L',
    Miðflokkurinn: 'M',
    Borgarahreyfingin: 'O',
    Píratar: 'P',
    Alþýðufylkingin: 'R',
    Samfylkingin: 'S',
    Dögun: 'T',
    Vinstri_græn: 'V',
    Samstaða: 'C',
    Frjálslyndi_flokkurinn: 'F',
    Landsbyggðarflokkurinn: 'M',
    Annað: 'Oth',
};

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
        const flokkar = content[0]
        const surveys = []
        for (let i = 1; i < content.length; i++) {
          const row = content[i]
          const survey = {
            label: row[0],
            value: [],
          }
          for (let j = 1; j < flokkar.length; j++) {
            if (row[j]!== '') {
              let precentage = row[j].replace(',', '.')
              precentage = parseFloat(precentage).toFixed(2)
              survey.value.push({
                letter: nameToLetter[flokkar[j].replace(' ', '_').replace('-', '_')],
                name: flokkar[j],
                precentage,
              })
            }
          }
          surveys.push(survey)
        }

        fs.writeFileSync(`${__dirname}/surveyDataCollection/fylgi.json`, JSON.stringify(surveys), (err) => {
            if (err) {
                return console.log(err)
            }
            console.log("The file was saved!")
        })

        res(surveys)
      }
    })
  })
}

getData()

// export default getData
