import { useState, useRef } from "react";
import TSPViewer from "./TSPViewer";
const GAPage = () => {
    // eil51のデフォルトの順番を初期表示用に使用
    const initialRoute = Array.from({ length: 51 }, (_, i) => i + 1);

    const [root, setRoot] = useState(initialRoute);
    const [distance, setDistance] = useState(null);
    const [generation, setGeneration] = useState(0); // 世代数のステートを追加
    const [isSearching, setIsSearching] = useState(false);
    const [mode, setMode] = useState("ga"); // "ga" または "ls" を保持するステート
    const[page, setPage] = useState("main");
    // アニメーションループを制御・中断するためのRef
    const isSearchingRef = useRef(false);
    // 現在の個体群を保持するためのRef
    const populationRef = useRef([]);

    const runGeneration = async () => {
        // 停止ボタンが押されたらループを抜ける
        if (!isSearchingRef.current) return;

        try {
            const url = "http://127.0.0.1:8000/api/tsp";
            let requestBody = {};
            if (mode === "ga") {
                requestBody = { population: populationRef.current, mode: "ga" };
            } 
            else if (mode === "ls") {
                const currentBest = populationRef.current.length > 0 
                    ? populationRef.current[0]
                    : (root.length > 0 ? root : initialRoute);
                requestBody = { 
                    population: [currentBest], 
                    mode: "ls" // バックエンドに伝えるモード情報
                };
            }
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody), // 変更：requestBody を指定
            });

            if (!response.ok) {
                throw new Error("ネットワークエラーが発生しました．");
            }

            const data = await response.json();
            
            // 状態を更新して画面を描画
            setRoot(data.best_route);
            setDistance(data.best_distance);
            setGeneration(prev => prev + 1); // 世代数を1増やす
            populationRef.current = data.new_population;

            // 少し待機してから次の世代を要求する
            setTimeout(() => {
                runGeneration();
            }, 50); 

        } catch (error) {
            console.error(error);
            alert("バックエンドとの通信に失敗しました．");
            isSearchingRef.current = false;
            setIsSearching(false);
        }
    };

    const toggleSearch = () => {
        if (isSearching) {
            // 停止処理
            isSearchingRef.current = false;
            setIsSearching(false);
        } else {
            // 開始処理
            isSearchingRef.current = true;
            setIsSearching(true);
            runGeneration();
        }
    };

    const resetSearch = () => {
        isSearchingRef.current = false;
        setIsSearching(false);
        populationRef.current = [];
        setRoot(initialRoute);
        setDistance(null);
        setGeneration(0); // リセット時に世代数も0に戻す
    };
    if (page === "video") {
        return (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <h2>解説ビデオ</h2>
                <p>ここにTSP（巡回セールスマン問題）に関するビデオを表示します。</p>
                
                {/* ビデオの配置エリア */}
                <div style={{ margin: "30px auto", maxWidth: "800px" }}>
                    {/* publicフォルダなどに配置した動画パス、またはYouTubeの埋め込み等に差し替えてください */}
                    <video 
                        controls 
                        style={{ width: "100%", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
                    >
                        <source src="../public/LStoGA.mp4" type="video/mp4" />
                        お使いのブラウザは動画タグをサポートしていません。
                    </video>
                </div>

                {/* 元のページに戻るボタン */}
                <div style={{ marginTop: "30px" }}>
                    <button 
                        onClick={() => setPage("main")} // メイン画面に戻す
                        style={{ 
                            padding: '10px 20px', 
                            fontSize: '16px', 
                            cursor: 'pointer',
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px'
                        }}
                    >
                        元のページに戻る
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div style={{ textAlign: 'center' }}>
            <TSPViewer root={root} />
            
            <div style={{ marginTop: '20px', gap: '10px', display: 'flex', justifyContent: 'center' }}>
                <button 
                    onClick={toggleSearch}
                    style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}
                >
                    {isSearching ? "探索停止" : "探索開始"}
                </button>
                <button 
                    onClick={resetSearch}
                    style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}
                >
                    リセット
                </button>
                <h1>{mode}</h1>
                <button
                    onClick={() => {
                        if (isSearching) {
                            isSearchingRef.current = false;
                            setIsSearching(false);
                            setMode("ga");
                        }
                        setMode("ga");
                    }}
                    style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}
                >
                    GAモード
                </button>
                <button
                    onClick={() => {
                        if (isSearching) {
                            isSearchingRef.current = false;
                            setIsSearching(false);
                        }
                        setMode("ls");
                    }}
                    style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}
                    //もし実行中の場合は一度探索を停止したうえでモードを切り替える。その後、探索を自動的に開始させる。

                >
                    局所探索モード
                </button>
            </div>
            
            {/* 距離と世代数の表示エリア */}
            {distance && (
                <div style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
                    <p style={{ margin: '5px 0' }}>現在の世代: {generation} 世代</p>
                    <p style={{ margin: '5px 0' }}>最短距離: {distance.toFixed(2)}</p>
                </div>
            )}
            <hr style={{ margin: '40px 0', border: '0', borderTop: '1px solid #ccc' }} />
            <div style={{ marginTop: '20px' }}>
                <button 
                    onClick={() => {
                        // ビデオページに行く際、もし探索中なら安全に停止させる
                        isSearchingRef.current = false;
                        setIsSearching(false);
                        // ビデオページに切り替え
                        setPage("video");
                    }}
                    style={{ 
                        padding: '12px 24px', 
                        fontSize: '16px', 
                        cursor: 'pointer', 
                        backgroundColor: '#007bff', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px' 
                    }}
                >
                    ビデオを見るページへ移動
                </button>
            </div>
        </div>
    );
};

export default GAPage;