import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyCTfu4Q8nnfZp8miTrOmYF07wtE7qg2-FI',
  authDomain: 'pzzaria-9cb56.firebaseapp.com',
  projectId: 'pzzaria-9cb56',
  storageBucket: 'pzzaria-9cb56.appspot.com',
  messagingSenderId: '246159515006',
  appId: '1:246159515006:web:7fa331a8b70d3cd0eba72f'
}

firebase.initializeApp(config)

export default firebase
