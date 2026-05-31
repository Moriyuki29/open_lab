import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Philosopher.css';

const STATES = {
  THINKING: '思考中',
  HUNGRY: '空腹（待機）',
  EATING: '食事中'
};

const ALGORITHMS = {
  NAIVE: 'naive',
  HIERARCHY: 'hierarchy',
  ARBITRATOR: 'arbitrator'
};

export default function PhilosopherSimulation() {
  const [numPhilosophers, setNumPhilosophers] = useState(5);
  const [algorithm, setAlgorithm] = useState(ALGORITHMS.NAIVE);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [deadlocked, setDeadlocked] = useState(false);

  const [philosophers, setPhilosophers] = useState(Array(5).fill(STATES.THINKING));
  const [forks, setForks] = useState(Array(5).fill(null));
  
  const tickRef = useRef();

  // 画面表示をやめ，裏側のコンソールにのみ出力する
  const logToConsole = useCallback((msg) => {
    console.log(`[シミュレーション] ${msg}`);
  }, []);

  // Nが変更された際にも呼び出せるように引数化
  const resetSimulation = useCallback((n = numPhilosophers) => {
    setPhilosophers(Array(n).fill(STATES.THINKING));
    setForks(Array(n).fill(null));
    setDeadlocked(false);
    setIsRunning(false);
    logToConsole(`シミュレーションをリセットしました．(N=${n})`);
  }, [numPhilosophers, logToConsole]);

  // Nの入力ハンドラー
  const handleNChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 2) {
      setNumPhilosophers(val);
      resetSimulation(val);
    }
  };

  const forceDeadlock = useCallback(() => {
    setAlgorithm(ALGORITHMS.NAIVE);
    setPhilosophers(Array(numPhilosophers).fill(STATES.HUNGRY));
    
    // 全員が一斉に左のフォーク（自分のインデックス - 1）を取得した状態を動的に生成
    const deadlockedForks = Array.from({ length: numPhilosophers }, (_, i) => (i + 1) % numPhilosophers);
    setForks(deadlockedForks);
    setDeadlocked(true);
    setIsRunning(false);
    logToConsole('【警告】全員が左のフォークを取得し，デッドロックが発生しました．');
  }, [numPhilosophers, logToConsole]);

  const runSimulationTick = useCallback(() => {
    if (deadlocked) return;

    setPhilosophers((prevPhilosophers) => {
      let nextPhilosophers = [...prevPhilosophers];
      let currentForks = [...forks];
      let stateChanged = false;
      const N = numPhilosophers;

      for (let i = 0; i < N; i++) {
        const leftFork = (i - 1 + N) % N; 
        const rightFork = i;              

        if (prevPhilosophers[i] === STATES.THINKING) {
          if (Math.random() < 0.3) {
            nextPhilosophers[i] = STATES.HUNGRY;
            logToConsole(`哲学者 ${i} が空腹になりました．`);
            stateChanged = true;
          }
        } 
        else if (prevPhilosophers[i] === STATES.HUNGRY) {
          if (algorithm === ALGORITHMS.NAIVE) {
            const hasLeft = currentForks[leftFork] === i;
            const hasRight = currentForks[rightFork] === i;

            if (!hasLeft && currentForks[leftFork] === null) {
              currentForks[leftFork] = i;
              logToConsole(`哲学者 ${i} が左のフォーク F${leftFork} を取得しました．`);
              stateChanged = true;
            } else if (hasLeft && !hasRight && currentForks[rightFork] === null) {
              currentForks[rightFork] = i;
              logToConsole(`哲学者 ${i} が右のフォーク F${rightFork} を取得しました．`);
              nextPhilosophers[i] = STATES.EATING;
              logToConsole(`哲学者 ${i} が食事を始めました．`);
              stateChanged = true;
            }
          } 
          else if (algorithm === ALGORITHMS.HIERARCHY) {
            const firstFork = Math.min(leftFork, rightFork);
            const secondFork = Math.max(leftFork, rightFork);
            
            const hasFirst = currentForks[firstFork] === i;
            const hasSecond = currentForks[secondFork] === i;

            if (!hasFirst && currentForks[firstFork] === null) {
              currentForks[firstFork] = i;
              logToConsole(`哲学者 ${i} がフォーク F${firstFork} を取得しました．`);
              stateChanged = true;
            } else if (hasFirst && !hasSecond && currentForks[secondFork] === null) {
              currentForks[secondFork] = i;
              logToConsole(`哲学者 ${i} がフォーク F${secondFork} を取得しました．`);
              nextPhilosophers[i] = STATES.EATING;
              logToConsole(`哲学者 ${i} が食事を始めました．`);
              stateChanged = true;
            }
          }
          else if (algorithm === ALGORITHMS.ARBITRATOR) {
            if (currentForks[leftFork] === null && currentForks[rightFork] === null) {
              currentForks[leftFork] = i;
              currentForks[rightFork] = i;
              nextPhilosophers[i] = STATES.EATING;
              logToConsole(`哲学者 ${i} が両方のフォークを取得し，食事を始めました．`);
              stateChanged = true;
            }
          }
        } 
        else if (prevPhilosophers[i] === STATES.EATING) {
          if (Math.random() < 0.4) {
            nextPhilosophers[i] = STATES.THINKING;
            currentForks[leftFork] = null;
            currentForks[rightFork] = null;
            logToConsole(`哲学者 ${i} が食事を終え，フォークを置きました．`);
            stateChanged = true;
          }
        }
      }

      if (algorithm === ALGORITHMS.NAIVE) {
        const allHungryAndHoldingLeft = nextPhilosophers.every(p => p === STATES.HUNGRY) && 
                                        currentForks.every((owner, forkIdx) => owner === (forkIdx + 1) % N);
        if (allHungryAndHoldingLeft) {
          setDeadlocked(true);
          setIsRunning(false);
          logToConsole('【警告】デッドロックを検知しました．シミュレーションを停止します．');
        }
      }

      if (stateChanged) {
        setForks(currentForks);
      }
      return nextPhilosophers;
    });
  }, [algorithm, forks, deadlocked, logToConsole, numPhilosophers]);

  useEffect(() => {
    if (isRunning) {
      tickRef.current = setInterval(runSimulationTick, speed);
    }
    return () => clearInterval(tickRef.current);
  }, [isRunning, speed, runSimulationTick]);

  const getPosition = (index, total, radius, offset = 0) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2 + offset;
    return {
      left: `calc(50% + ${Math.cos(angle) * radius}px)`,
      top: `calc(50% + ${Math.sin(angle) * radius}px)`,
    };
  };

  return (
    <div className="simulation-container">
      <header className="header">
        <h1>円卓の哲学者問題 シミュレータ</h1>
        <div className="controls">
          {/* N入力用のUIを追加 */}
          <label className="input-group">
            人数 (N):
            <input 
              type="number" 
              min="2" 
              max="15" 
              value={numPhilosophers} 
              onChange={handleNChange}
              className="n-input"
            />
          </label>

          <select 
            value={algorithm} 
            onChange={(e) => {setAlgorithm(e.target.value); resetSimulation(numPhilosophers);}}
          >
            <option value={ALGORITHMS.NAIVE}>素朴な実装（デッドロック発生）</option>
            <option value={ALGORITHMS.HIERARCHY}>解決策: リソース階層化</option>
            <option value={ALGORITHMS.ARBITRATOR}>解決策: ウェイターの導入</option>
          </select>
          <button 
            className={`btn ${isRunning ? 'btn-pause' : 'btn-play'}`}
            onClick={() => setIsRunning(!isRunning)}
            disabled={deadlocked}
          >
            {isRunning ? '一時停止' : '再生'}
          </button>
          <button className="btn btn-reset" onClick={() => resetSimulation(numPhilosophers)}>
            リセット
          </button>
          <button className="btn btn-danger" onClick={forceDeadlock}>
            デッドロック強制発生
          </button>
        </div>
      </header>

      <div className="main-content">
        <div className="table-area">
          {deadlocked && (
            <div className="deadlock-warning">DEADLOCK DETECTED</div>
          )}
          
          <div className="table-circle" />

          {philosophers.map((state, i) => {
            // Nの数に合わせて配置の半径も少し調整すると見栄えが良くなります
            const radius = Math.max(120, numPhilosophers * 25);
            const pos = getPosition(i, numPhilosophers, radius);
            let stateClass = '';
            if (state === STATES.THINKING) stateClass = 'phil-thinking';
            else if (state === STATES.HUNGRY) stateClass = 'phil-hungry';
            else stateClass = 'phil-eating';

            return (
              <div 
                key={`phil-${i}`}
                className={`philosopher ${stateClass}`}
                style={pos}
              >
                <span className="phil-name">哲学者 {i}</span>
                <span className="phil-state">{state}</span>
              </div>
            );
          })}

          {Array(numPhilosophers).fill(null).map((_, i) => {
            const radius = Math.max(120, numPhilosophers * 25);
            let pos;
            let isActive = false;
            
            if (forks[i] === null) {
              pos = getPosition(i, numPhilosophers, radius * 0.45, Math.PI / numPhilosophers);
            } else {
              const owner = forks[i];
              const isLeftFork = i === (owner - 1 + numPhilosophers) % numPhilosophers;
              const ownerAngleOffset = isLeftFork ? -Math.PI / 12 : Math.PI / 12;
              pos = getPosition(owner, numPhilosophers, radius * 0.7, ownerAngleOffset);
              isActive = true;
            }

            return (
              <div 
                key={`fork-${i}`}
                className={`fork ${isActive ? 'fork-active' : 'fork-idle'}`}
                style={pos}
              >
                F{i}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}