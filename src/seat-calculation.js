const EQUALIZING_SEATS = 9

function percentageX10(party) {
  return {
    letter: party.letter,
    percentage: party.percentage * 10
  }
}

const kjordaemaskipan = {
  Norðausturkjördæmi: 9,
  Norðvesturkjördæmi: 8,
  ReykjavíkurkjördæmiNorður: 9,
  ReykjavíkurkjördæmiSuður: 9,
  Suðurkjördæmi: 9,
  Suðvesturkjördæmi: 10
}

export default function(survey) {
  const normalizedSurvey = survey.map(percentageX10)

  const seatsByState = calculateSeats(normalizedSurvey)

  let parties = {}
  normalizedSurvey.forEach(
    party =>
      (parties[party.letter] = {
        surveyResult: party.percentage,
        seats: 0
      })
  )

  seatsByState
    .map(state => state.seats)
    .forEach(seats => seats.forEach(seat => parties[seat.letter].seats++))

  const partiesAboveFivePercent = removePartiesBelowPercent(5, parties)

  const equalizingSeats = calculateEqualizingSeats(partiesAboveFivePercent)

  const finalResult = parties
  equalizingSeats.forEach(
    ({ letter, denomination }) => {
      finalResult[letter].seats++
    }
  )

  survey.forEach((party) => {
    finalResult[party.letter].color = party.color
  })

  return finalResult
}

function DHondtCalculation(party, seatsInState) {
  let i = 0
  let array = []
  const currentSeats = party.seats ? party.seats : 0
  while (currentSeats + i + 1 < currentSeats + seatsInState) {
    array[i] = party.percentage / (currentSeats + i + 1)
    i++
  }
  return { letter: party.letter, denominations: array }
}

function filterOutSeats(seatsInState, partiesWithDenominations) {
  let seats = []
  partiesWithDenominations.forEach(({ letter, denominations }) => {
    seats = seats.concat(
      denominations.map(denomination => ({
        letter,
        denomination
      }))
    )
  })
  return seats
    .sort((a, b) => b.denomination - a.denomination)
    .slice(0, seatsInState)
}

function calculateSeatsForState(seatsInState, partyDistribution) {
  const partiesWithDenominations = partyDistribution.map(party =>
    DHondtCalculation(party, seatsInState)
  )
  const calculated = filterOutSeats(seatsInState, partiesWithDenominations)
  return calculated
}

function calculateSeats(survey) {
  return Object.keys(kjordaemaskipan).map(state => ({
    name: state,
    seats: calculateSeatsForState(kjordaemaskipan[state], survey)
  }))
}

function removePartiesBelowPercent(percent, parties) {
  return Object.keys(parties).reduce((newObject, partyLetter) => {
    if (parties[partyLetter].surveyResult >= percent * 10) {
      newObject[partyLetter] = parties[partyLetter]
      return newObject
    } else return newObject
  }, {})
}

function calculateEqualizingSeats(parties) {
  const calculatedEqualizedDenominations = Object.keys(
    parties
  ).map(partyLetter => {
    const { surveyResult, seats } = parties[partyLetter]
    return DHondtCalculation(
      {
        letter: partyLetter,
        percentage: surveyResult,
        seats
      },
      EQUALIZING_SEATS
    )
  })

  return filterOutSeats(EQUALIZING_SEATS, calculatedEqualizedDenominations)
}
