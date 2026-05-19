import { useState } from "react"
function CipherPage() {

  const gridSize = 6
  const letters = [
    "ば", "ら", "カ", "い", "ら", "は",
    "レ", "く", "昨", "カ", "オ", "日",
    "レ", "ー", "ム", "も", "1", "ー",
    "カ", "ラ", "今", "度", "イ", "レ",
    "日", "作", "ー", "く", "明", "ス",
    "る", "日", "と", "で", "し", "も"
  ]
  const [angle, setAngle] = useState(0)
  const [showMask, setShowMask] = useState(true)
  return (

    <div
      style={{
        display: "flex",
        flexDirection: "column",

        justifyContent: "center",
        alignItems: "center",

        height: "100vh",

        backgroundColor: "#f3f3f3"
      }}
    >
      <div 
        style={{ 
          display: "flex", gap: "20px" 
        }}>
        <button
          onClick={() => setAngle(angle - 90)}

          style={{
            marginBottom: "20px",
            padding: "10px 20px",
            fontSize: "20px"
         }}
        >
        左回転
        </button>
        <button
          onClick={() => setAngle(angle + 90)}

          style={{
            marginBottom: "20px",
            padding: "10px 20px",
            fontSize: "20px"
          }}
        >
          右回転
        </button>
        <button
          onClick={() => setShowMask(!showMask)}
          style={{
            marginBottom: "20px",
            padding: "10px 20px",
            fontSize: "20px"
          }}
        >
          マスクの表示/非表示
        </button>
      </div>


      {/* 親 */}
      <div
        style={{
          position: "relative",

          width: "510px",
          height: "510px"
        }}
      >

        {/* 文字グリッド */}
        <div
          style={{
            display: "grid",

            gridTemplateColumns: `repeat(${gridSize}, 80px)`,
            gridTemplateRows: `repeat(${gridSize}, 80px)`,

            gap: "5px"
          }}
        >

          {Array.from({ length: gridSize * gridSize }).map((_, index) => (

            <div
              key={index}

              style={{
                width: "80px",
                height: "80px",

                border: "none",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                fontSize: "30px",

                backgroundColor: "white"
              }}
            >
              {letters[index]}
            </div>

          ))}

        </div>

        {/* マスク */}
        {showMask && (
        <img
          src="/マスク画像.png"
          alt="マスク"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "510px",
            height: "510px",
            transform: `rotate(${angle}deg)`,
            transition: "0.5s",
            pointerEvents: "none"
          }}
        />
        )}

      </div>

    </div>

  )
}

export default CipherPage