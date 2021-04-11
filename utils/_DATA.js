let decks = {
  'xj352vofupe1dqz9emx13r': {
    id: 'xj352vofupe1dqz9emx13r',
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  'vthrdm985a262al8qx3do': {
    id: 'vthrdm985a262al8qx3do',
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getDecks() {
  return new Promise((res, rej) => {
    setTimeout(() => res({...decks}), 1000)
  })
}

export function _getDeck(id) {
  return new Promise((res, rej) => {
    setTimeout(() => res(decks.id), 500)
  })
}

export function _saveDeck(title) {
  return new Promise((res, rej) => {
    const newDeck = {
      id: generateUID(),
      title: title,
      questions: []
    }

    setTimeout(() => {
      decks = {
        ...decks,
        [newDeck.id]: newDeck
      }

      res(newDeck)
    }, 500)
  })
}

export function _addQuestionToDeck(deckID, question) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      decks[deckID].questions.push(question)

      res([deckID, question])
    }, 500)
  })
}
