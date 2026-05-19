import { useState } from "react"

function HomePage() {

  const [page, setPage] = useState(0)

  const slides = [
    "/slides/スライド1.JPG",
    "/slides/スライド2.JPG",
    "/slides/スライド3.JPG",
    "/slides/スライド4.JPG",
  ]

  return (
    <div
        style={{
        backgroundColor: "#f3f3f3",
        minHeight: "100vh",

        display: "flex",
        flexDirection: "column",

        justifyContent: "center",
        alignItems: "center",

        padding: "20px"
        }}
    >

      <img
        src={slides[page]}
        style={{
          width: "80%",
          borderRadius: "10px",
          boxShadow: "0 0 20px rgba(0,0,0,0.2)"
        }}
      />

      <div style={{ marginTop: "20px" }}>

        <button
          onClick={() => {
              if (page > 0) {
              setPage(page - 1)
              }
          }}
          style={{ 
            padding: "12px 24px",
            backgroundColor: "#00ff88",
            color: "#111",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          ← 前へ
        </button>

        <button
          onClick={() => {
            if (page < slides.length - 1) {
                setPage(page + 1)
            }
          }}
          style={{              
            padding: "12px 24px",
            backgroundColor: "#00ff88",
            color: "#111",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          次へ →
        </button>

      </div>
    <p>
    {page + 1} / {slides.length}
    </p>

    </div>
  )
}

export default HomePage