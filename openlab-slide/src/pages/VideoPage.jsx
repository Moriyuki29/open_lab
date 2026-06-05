import React from "react";
import { useNavigate } from "react-router-dom";

const VideoPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <h2>解説ビデオ</h2>
            <p>ここにTSP（巡回セールスマン問題）に関するビデオを表示します。</p>
            
            {/* ビデオの配置エリア */}
            <div style={{ margin: "30px auto", maxWidth: "800px" }}>
                {/* 一般的な <video> タグの例です。 
                  publicフォルダ等に動画（video.mp4など）を配置してパスを指定するか、
                  YouTubeの埋め込みコード（iframe）に差し替えてください。
                */}
                <video 
                    controls 
                    style={{ width: "100%", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
                >
                    <source src="/path/to/your/video.mp4" type="video/mp4" />
                    お使いのブラウザは動画タグをサポートしていません。
                </video>
            </div>

            {/* 元のページに戻るためのボタン */}
            <div style={{ marginTop: "30px" }}>
                <button 
                    onClick={() => navigate(-1)} // -1 で前の履歴（GAPage）に戻ります
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
};

export default VideoPage;