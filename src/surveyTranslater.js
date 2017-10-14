const tsv = require('node-tsv-json')
const fs = require('fs')

const letterToColor = {
  A: '#931e7f',
  B: '#99cc66',
  C: '#f6a71d',
  D: '#00aeef',
  E: '#26286f',
  F: '#ee4d9b',
  G: '#316736',
  H: '#fc551c',
  I: '#fdfbfa',
  J: '#f3ff6d',
  K: '#fccbba',
  L: '#376697',
  M: 'rgb(0,58,123)',
  O: '#f59153',
  P: '#51297e',
  R: '#a10d1e',
  S: '#b9272c',
  T: '#b49d31',
  V: '#448f46',
  Oth: '#008b80'
}
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
  Annað: 'Oth'
}

// Returns a promise that resolves in the data.

// TODO. just save the surveys to disk so
// this becomes sync.
function getData() {
  return new Promise((res, rej) => {
    const options = {
      input: 'surveyDataCollection/Fylgi.tsv',
      output: 'Fylgi.json',
      parseRows: true
    }
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
            value: []
          }
          for (let j = 1; j < flokkar.length; j++) {
            if (row[j] !== '') {
              let percentage = row[j].replace(',', '.')
              percentage = parseFloat(percentage).toFixed(2)
              const letter = nameToLetter[flokkar[j].replace(' ', '_').replace('-', '_')] 
              const color = letterToColor[letter]
              survey.value.push({
                letter,
                name: flokkar[j],
                percentage,
                color,
              })
            }
          }
          surveys.push(survey)
        }

        fs.writeFileSync(
          `${__dirname}/surveyDataCollection/fylgi.json`,
          JSON.stringify(surveys),
          err => {
            if (err) {
              return console.log(err)
            }
            console.log('The file was saved!')
          }
        )
        res(surveys)
      }
    })
  })
}

getData()

// export default getData
