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
    // アニメーションループを制御・中断するためのRef
    const isSearchingRef = useRef(false);
    // 現在の個体群を保持するためのRef
    const populationRef = useRef([]);

    const runGeneration = async () => {
        // 停止ボタンが押されたらループを抜ける
        if (!isSearchingRef.current) return;

        try {
            let url="";
            let requestBody={};
            if (mode === "ga") {
                url = "http://127.0.0.1:8000/api/ga";
                requestBody = { population: populationRef.current };
            } 
            else if (mode === "ls") {
                url = "http://127.0.0.1:8000/api/ls";
                const currentBest = populationRef.current.length > 0 
                 ? populationRef.current[0]
                 : initialRoute;
                requestBody = { population: currentBest };
            }
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    population: populationRef.current 
                }),
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
                <button
                    onClick={() => setMode("ga")}
                    style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}
                >
                    GAモード
                </button>
                <button
                    onClick={() => setMode("ls")}
                    style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}
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
        </div>
    );
};

export default GAPage;