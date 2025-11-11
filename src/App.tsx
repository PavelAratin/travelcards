import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { HomePage } from './Pages/HomePage'
import { FavoritesPage } from './Pages/FavoritesPage'
import { DetailPage } from './Pages/DetailPage'
import { CreateCardPage } from './Pages/CreateCardPage'

function App() {

  return (
    <>
      <Router>
        <Header></Header>
        <main>
          <Routes>
            <Route path='/' element={<HomePage></HomePage>}></Route>
            <Route path='/favorites' element={<FavoritesPage></FavoritesPage>}></Route>
            <Route path='/product/:id' element={<DetailPage></DetailPage>}></Route>
            <Route path='/create' element={<CreateCardPage></CreateCardPage>}></Route>
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
