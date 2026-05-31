import { useState } from "react"
import HomePage from "./pages/HomePage"
import CipherPage from "./pages/CipherPage"
import GamePage from "./pages/GamePage"
import GAPage from './pages/GAPage'
import SlidePage from "./pages/HIUSlidePage"
import Petri from "./pages/Petri"
function App() {
  const [page, setPage] = useState("slide")

  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* 左 */}
      <div
        style={{
          width: "250px",
          background: "#222",
          color: "white",
          padding: "20px"
        }}
      >
        <h2 style={{ color: "red" }}>Open Lab</h2>

        <button onClick={() => setPage("slide")}>
          大学紹介
        </button>

        <button onClick={() => setPage("cipher")}>
          暗号づくり
        </button>

        <button onClick={() => setPage("game")}>
          暗号ゲーム
        </button>

        <button onClick={() => setPage("ga")}>
          巡回セールスマン問題
        </button>

        <button onClick={() => setPage("petri")}>
          ペトリネット
        </button>
      </div>

      {/* 右 */}
      <div style={{ flex: 1, padding: "20px" }}>

        {page === "home" && <HomePage />}
        {page === "cipher" && <CipherPage />}
        {page === "game" && <GamePage />}
        {page === "ga" && <GAPage />}
        {page === "slide" && <SlidePage />}
        {page === "petri" && <Petri></Petri>}

      </div>
    </div>
  )
}



export default App