export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'
export const REMOVE_DECK = 'REMOVE_DECK'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

export function removeDeck(decks) {
  return {
    type: REMOVE_DECK,
    decks,
  }
}

export function addQuestion(deckID, question) {
  return {
    type: ADD_QUESTION,
    deckID: deckID,
    question: question
  }
}
