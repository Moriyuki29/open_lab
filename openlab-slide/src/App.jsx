import { useState } from "react"
import HomePage from "./pages/HomePage"
import CipherPage from "./pages/CipherPage"
import GamePage from "./pages/GamePage"
function App() {
  const [page, setPage] = useState("home")

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

        <button onClick={() => setPage("home")}>
          大学紹介
        </button>

        <button onClick={() => setPage("cipher")}>
          暗号づくり
        </button>

        <button onClick={() => setPage("game")}>
          暗号ゲーム
        </button>
      </div>

      {/* 右 */}
      <div style={{ flex: 1, padding: "20px" }}>

        {page === "home" && <HomePage />}
        {page === "cipher" && <CipherPage />}
        {page === "game" && <GamePage />}

      </div>
    </div>
  )
}



export default App