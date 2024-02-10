import './App.css'
import Appbar from "./components/Appbar/Appbar";
import {Route, Routes} from "react-router-dom";
import NewQuote from "./components/NewQuotes/NewQuote";
import Quotes from "./components/Quotes/Quotes";

function App() {

  return (
    <>
      <header><Appbar/></header>
      <main>
        <Routes>
          <Route path="/" element={<Quotes/>} />
          <Route path="/quote/:id" element={<Quotes/>} />
          <Route path="/new-quotes" element={<NewQuote/>} />
          <Route path="/posts/:id/edit" element={<NewQuote/>} />
        </Routes>
      </main>
    </>
  )
}

export default App
