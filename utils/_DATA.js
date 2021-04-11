import AsyncStorage from '@react-native-async-storage/async-storage';

export const FLASHCARDS_STORAGE_KEY = 'MobileFlashcards:decks'

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

export function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function setDummyData() {
  AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks))
}

export function formatDecks(results) {
  return results == null
    ? setDummyData()
    : results
}