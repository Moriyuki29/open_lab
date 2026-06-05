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
  const buttonStyle = {
    width: "100%",             // 横幅いっぱいに広げて押しやすく
    padding: "12px 16px",      // しっかりとした押しごたえのある余白
    backgroundColor: "#333333e8",   // サイドバー（#222）より少し明るいグレーで立体感を出す
    color: "#ffffff",             // 文字は白
    border: "none",
    borderRadius: "6px",
    textAlign: "left",         // 文字を左寄せにするとメニュー感が出ます
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s",    // ふんわり動かすための設定
  };

  return (
    <div style={{ display: "flex", height: "100vh" ,}}>

      {/* 左 */}
      <div
        style={{
            width: "260px",
            background: "#1a1a1a", 
            color: "#ffffff",
            padding: "24px 16px 24px 16px",
            display: "flex",
            flexDirection: "column",
            height: "100vh",
          }}
      >
        <div style={{ marginBottom: "32px", textAlign: "center" }}>
          <h2 style={{ color: "#ef4444", margin: 0, fontSize: "24px", letterSpacing: "1px" }}>
            Open Lab
          </h2>
          <span style={{ fontSize: "11px", color: "#666" }}>研究室公開システム</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
          <span style={{ fontSize: "12px", color: "#666", fontWeight: "bold", paddingLeft: "4px" }}>
            NAVIGATION
        </span>
        <button onClick={() => setPage("slide")}
         style={{buttonStyle,
          backgroundColor: page === "slide" ? "#3b82f6" : "#333",
          fontWeight: page === "slide" ? "bold" : "normal",
          color: page === "slide" ? "#ffffff" : "#dbd8d8",

         }}
         >
          大学紹介
        </button>

        <button onClick={() => setPage("cipher")} style={{
          backgroundColor: page === "cipher" ? "#3b82f6" : "#333",
          fontWeight: page === "cipher" ? "bold" : "normal",
          color: page === "cipher" ? "#ffffff" : "#dbd8d8",
        }}>
          回転グリル暗号
        </button>


        <button onClick={() => setPage("ga")} style={{buttonStyle,
          backgroundColor: page === "ga" ? "#3b82f6" : "#333",
          fontWeight: page === "ga" ? "bold" : "normal",
          color: page === "ga" ? "#ffffff" : "#dbd8d8",
        }}>
          巡回セールスマン問題
        </button>

        <button onClick={() => setPage("petri")} style={{buttonStyle,
          backgroundColor: page === "petri" ? "#3b82f6" : "#333",
          fontWeight: page === "petri" ? "bold" : "normal",
          color: page === "petri" ? "#ffffff" : "#dbd8d8",
        }}>
          食事する哲学者問題
        </button>
        <button
          onClick={() => setPage("secret")}
          style={{
            //position: "absolute",
            marginTop: "600px",
            bottom: "10px",
            left: "10px",
            width: "230px",
            height: "40px",
            background: "#1a1a1a",       // 背景と同じ色で同化
            border: "none",           // 枠線を消す
            outline: "none",
            color: "#1a1a1a",            // 背景と同じ文字色
            cursor: "pointer",  
            transition: "background 0.3s" 
          }}
        >
          secret area
        </button>
        </div>
      </div>

      {/* 右 */}
      <div style={{ flex: 1, padding: "20px",margin: "0 auto",}}>

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