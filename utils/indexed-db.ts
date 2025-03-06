// IndexedDB utility for storing and retrieving high scores

const DB_NAME = "pTonGameDB"
const DB_VERSION = 1
const STORE_NAME = "highScores"

interface HighScoreData {
  score: number
  timestamp: number
}

export const initDB = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      console.warn("IndexedDB not supported")
      resolve(false)
      return
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => {
      console.error("Error opening IndexedDB")
      resolve(false)
    }

    request.onsuccess = () => {
      resolve(true)
    }

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" })
      }
    }
  })
}

export const saveHighScore = (score: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => {
      console.error("Error opening IndexedDB")
      resolve(false)
    }

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      const transaction = db.transaction([STORE_NAME], "readwrite")
      const store = transaction.objectStore(STORE_NAME)

      const data: HighScoreData & { id: string } = {
        id: "userHighScore",
        score,
        timestamp: Date.now(),
      }

      const putRequest = store.put(data)

      putRequest.onsuccess = () => {
        resolve(true)
      }

      putRequest.onerror = () => {
        console.error("Error saving high score")
        resolve(false)
      }
    }
  })
}

export const getHighScore = (): Promise<number | null> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => {
      console.error("Error opening IndexedDB")
      resolve(null)
    }

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      const transaction = db.transaction([STORE_NAME], "readonly")
      const store = transaction.objectStore(STORE_NAME)

      const getRequest = store.get("userHighScore")

      getRequest.onsuccess = () => {
        if (getRequest.result) {
          resolve(getRequest.result.score)
        } else {
          resolve(null)
        }
      }

      getRequest.onerror = () => {
        console.error("Error getting high score")
        resolve(null)
      }
    }
  })
}

