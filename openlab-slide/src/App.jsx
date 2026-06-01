import { useState } from "react"
import HomePage from "./pages/HomePage"
import CipherPage from "./pages/CipherPage"
import GamePage from "./pages/GamePage"
import GAPage from './pages/GAPage'
import SlidePage from "./pages/HIUSlidePage"
import Petri from "./pages/Petri"
import SecretMahjongPage from "./pages/SecretMahjongPage"
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
        <button
          onClick={() => setPage("secret")}
          style={{
            //position: "absolute",
            marginTop: "360px",
            bottom: "10px",
            left: "10px",
            width: "230px",
            height: "40px",
            background: "#222",       // サイドバーと同じ色で同化
            border: "none",           // 枠線を消す
            outline: "none",
            color: "#222",            // 文字色も同じ色にして見えなくする
            cursor: "pointer",        // マウスが乗っても指マークにしない
            transition: "background 0.3s" // 隠し要素だとわからせるための微調整用
          }}
          // オプション：ダブルクリックじゃないと開かないようにするとさらに難易度が上がって面白いです
          // onDoubleClick={() => setPage("secret")}
        >
          {/* ここにこっそり秘密のメッセージを入れておいても、色同化で見えません */}
          secret area
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
        {page === "secret" && <SecretMahjongPage />}
      </div>
    </div>
  )
}



export default App