const colors = {
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
  Oth: '#008b80',
}

export default function(partyLetter) {
  if (colors[partyLetter]) return colors[partyLetter]
  else return '#222'
}
