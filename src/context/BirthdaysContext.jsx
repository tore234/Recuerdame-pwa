import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, onSnapshot, serverTimestamp, query, orderBy,
} from 'firebase/firestore'
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth'
import { db, auth, isFirebaseConfigured } from '../firebase/config'
import { sortByUpcoming } from '../utils/dateUtils'

const BirthdaysContext = createContext(null)

const LS_BIRTHDAYS = 'recuerdame_birthdays'
const LS_SETTINGS  = 'recuerdame_settings'

const DEFAULT_SETTINGS = {
  notificationDaysBefore: [1, 7],
  emailEnabled: false,
  whatsappEnabled: false,
  userEmail: '',
  userWhatsapp: '',
}

// ── Local-storage fallback when Firebase is not configured ──────────────────
function useLocalStorage() {
  const [birthdays, setBirthdays] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_BIRTHDAYS) || '[]') }
    catch { return [] }
  })

  const persist = (list) => {
    setBirthdays(list)
    localStorage.setItem(LS_BIRTHDAYS, JSON.stringify(list))
  }

  const addBirthday    = (data) => persist(sortByUpcoming([...birthdays, { ...data, id: crypto.randomUUID() }]))
  const updateBirthday = (id, data) => persist(sortByUpcoming(birthdays.map((b) => b.id === id ? { ...b, ...data } : b)))
  const deleteBirthday = (id) => persist(birthdays.filter((b) => b.id !== id))

  return { birthdays, loading: false, userId: 'local', addBirthday, updateBirthday, deleteBirthday }
}

// ── Firebase implementation ─────────────────────────────────────────────────
function useFirestore() {
  const [birthdays, setBirthdays] = useState([])
  const [loading,   setLoading]   = useState(true)
  const [userId,    setUserId]    = useState(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid)
      } else {
        try {
          const cred = await signInAnonymously(auth)
          setUserId(cred.user.uid)
        } catch (err) {
          console.error('Auth error:', err)
          setLoading(false)
        }
      }
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    if (!userId) return
    const q = query(collection(db, 'users', userId, 'birthdays'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q, (snap) => {
      setBirthdays(sortByUpcoming(snap.docs.map((d) => ({ id: d.id, ...d.data() }))))
      setLoading(false)
    }, (err) => {
      console.error('Firestore:', err)
      setLoading(false)
    })
    return () => unsub()
  }, [userId])

  const colRef = useCallback(
    () => collection(db, 'users', userId, 'birthdays'),
    [userId]
  )

  const addBirthday    = useCallback(async (data) => {
    await addDoc(colRef(), { ...data, createdAt: serverTimestamp() })
  }, [colRef])

  const updateBirthday = useCallback(async (id, data) => {
    await updateDoc(doc(db, 'users', userId, 'birthdays', id), data)
  }, [userId])

  const deleteBirthday = useCallback(async (id) => {
    await deleteDoc(doc(db, 'users', userId, 'birthdays', id))
  }, [userId])

  return { birthdays, loading, userId, addBirthday, updateBirthday, deleteBirthday }
}

// ── Provider ────────────────────────────────────────────────────────────────
export function BirthdaysProvider({ children }) {
  const store = isFirebaseConfigured ? useFirestore() : useLocalStorage()

  const [settings, setSettings] = useState(() => {
    try { return { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem(LS_SETTINGS) || '{}') } }
    catch { return DEFAULT_SETTINGS }
  })

  const saveSettings = useCallback((s) => {
    setSettings(s)
    localStorage.setItem(LS_SETTINGS, JSON.stringify(s))
  }, [])

  return (
    <BirthdaysContext.Provider value={{ ...store, settings, saveSettings }}>
      {children}
    </BirthdaysContext.Provider>
  )
}

export function useBirthdays() {
  const ctx = useContext(BirthdaysContext)
  if (!ctx) throw new Error('useBirthdays must be used inside BirthdaysProvider')
  return ctx
}
