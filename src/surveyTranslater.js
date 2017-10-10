const tsv = require("node-tsv-json");
const fs = require('fs');

function nameToLetter(name) {
  switch (name) {
    case 'Vinstri-græn':
      return 'V'
    case 'Sjálfstæðisflokkurinn':
      return 'D'
    case 'Samfylkingin':
      return 'S'
    case 'Píratar':
      return 'P'
    case 'Flokkur fólksins':
      return 'F'
    case 'Miðflokkurinn':
      return 'M'
    case 'Framsóknarflokkurinn':
      return 'B'
    case 'Viðreisn':
      return 'C'
    case 'Björt framtíð':
      return 'A'
    case 'Dögun':
      return 'T'
    case 'Íslenska þjóðfylkingin':
      return 'E'
    case 'Annað':
      return 'Oth'
    default:
      return name 
  }

}
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
            let precentage = row[j].replace(',', '.')
            if (precentage === '') {
              precentage = 0
            } else {
              precentage = parseFloat(precentage)
            }

            survey.value.push({
              letter: nameToLetter(flokkar[j]),
              name: flokkar[j],
              precentage,
            })
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
