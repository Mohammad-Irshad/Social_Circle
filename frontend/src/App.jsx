import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Landing from './pages/Landing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <main>
        {/* <h1>This is the first page of the app.</h1> */}
        <Landing/>
      </main>
    </>
  )
}

export default App
