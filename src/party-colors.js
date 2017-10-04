const colors = {
  V: '#336633',
  D: '#00aeef',
  S: '#b9272c',
  P: '#51297e',
  F: '#ee4d9b',
  B: '#99cc66',
  M: 'rgb(0,58,123)',
  C: '#f6a71d',
  A: '#931e7f',
  T: '#b49d31'
}

export default function(partyLetter) {
  if (colors[partyLetter]) return colors[partyLetter]
  else return '#222'
}
