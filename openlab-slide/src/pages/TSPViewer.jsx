import React from 'react';
import eil51 from '../mapData/Eil51'

const TSPViewer = ({ root = [] }) => {
  const scale = 10;
  const padding = 40;
  
  const svgWidth = 63 * scale + padding * 2;
  const svgHeight = 69 * scale + padding * 2;

  // 座標変換のヘルパー関数（SVGはY軸が下向きなのを補正）
  const getSvgCoords = (x, y) => {
    return {
      cx: x * scale + padding,
      cy: svgHeight - (y * scale + padding)
    };
  };

  // IDから座標を高速に引けるようにMapを作成
  const nodeMap = new Map(eil51.map(point => [point.id, point]));

  // root配列から polyline 用のポイント文字列（"x1,y1 x2,y2 ..."）を生成
  const polylinePoints = root
    .map(id => {
      const point = nodeMap.get(id);
      if (!point) return null;
      const { cx, cy } = getSvgCoords(point.x, point.y);
      return `${cx},${cy}`;
    })
    .filter(Boolean)
    .join(' ');

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <svg
        width={svgWidth}
        height={svgHeight}
        style={{ 
          backgroundColor: '#f3f4f6', 
          borderRadius: '8px', 
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
        }}
      >
        {/* 1. 経路の描画（点の下に配置するため先に描画） */}
        {root.length > 0 && (
          <polyline
            points={polylinePoints}
            fill="none"
            stroke="#3b82f6" // 経路は見やすい青色
            strokeWidth="2"
            strokeLinejoin="round"
          />
        )}

        {/* 2. 点とラベルの描画 */}
        {eil51.map((point) => {
          const { cx, cy } = getSvgCoords(point.x, point.y);

          return (
            <g key={point.id}>
              <circle
                cx={cx}
                cy={cy}
                r={5}
                fill="#ef4444" // 点は赤色
              />
              <text
                x={cx + 8}
                y={cy + 4}
                fontSize="11"
                fill="#374151"
                fontFamily="sans-serif"
                fontWeight="bold"
              >
                {point.id}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default TSPViewer;