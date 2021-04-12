import {
  formatDecks,
  FLASHCARDS_STORAGE_KEY,
  generateUID
} from './_DATA.js'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function getInitialData () {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(results => formatDecks(JSON.parse(results)))
}

export function postDeck (title) {
  const newDeck = {
    id: generateUID(),
    title: title,
    questions: []
  }

  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [newDeck.id]: newDeck
  })).then(() => newDeck)
}

export function deleteDeck(id) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(decks => {
      decks = JSON.parse(decks)
      delete decks[id]
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks))
      return decks
    })
}

export function postQuestion (deckID, question, answer) {
  let newQuestion = {
    question: question,
    answer: answer
  }

  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
        .then(decks => {
          decks = JSON.parse(decks)
          decks[deckID].questions.push({
            question: question,
            answer: answer
          })
          AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks))
        })
        .then(() => [deckID, newQuestion])
}
