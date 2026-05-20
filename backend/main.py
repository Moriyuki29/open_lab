from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import random
import math

app = FastAPI()

# Reactからのリクエストを許可するCORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # 開発用．本番では localhost:3000 等に制限してください
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# eil51の座標データ（距離計算用）
eil51_nodes = [
    {"id": 1, "x": 37, "y": 52}, {"id": 2, "x": 49, "y": 49}, {"id": 3, "x": 52, "y": 64}, {"id": 4, "x": 20, "y": 26}, {"id": 5, "x": 40, "y": 30},
    {"id": 6, "x": 21, "y": 47}, {"id": 7, "x": 17, "y": 63}, {"id": 8, "x": 31, "y": 62}, {"id": 9, "x": 52, "y": 33}, {"id": 10, "x": 51, "y": 21},
    {"id": 11, "x": 42, "y": 41}, {"id": 12, "x": 31, "y": 32}, {"id": 13, "x": 5, "y": 25}, {"id": 14, "x": 12, "y": 42}, {"id": 15, "x": 36, "y": 16},
    {"id": 16, "x": 52, "y": 41}, {"id": 17, "x": 27, "y": 23}, {"id": 18, "x": 17, "y": 33}, {"id": 19, "x": 13, "y": 13}, {"id": 20, "x": 57, "y": 58},
    {"id": 21, "x": 62, "y": 42}, {"id": 22, "x": 42, "y": 57}, {"id": 23, "x": 16, "y": 57}, {"id": 24, "x": 8, "y": 52}, {"id": 25, "x": 7, "y": 38},
    {"id": 26, "x": 27, "y": 68}, {"id": 27, "x": 30, "y": 48}, {"id": 28, "x": 43, "y": 67}, {"id": 29, "x": 58, "y": 48}, {"id": 30, "x": 58, "y": 27},
    {"id": 31, "x": 37, "y": 69}, {"id": 32, "x": 38, "y": 46}, {"id": 33, "x": 46, "y": 10}, {"id": 34, "x": 61, "y": 33}, {"id": 35, "x": 62, "y": 63},
    {"id": 36, "x": 63, "y": 69}, {"id": 37, "x": 32, "y": 22}, {"id": 38, "x": 45, "y": 35}, {"id": 39, "x": 59, "y": 15}, {"id": 40, "x": 5, "y": 6},
    {"id": 41, "x": 10, "y": 17}, {"id": 42, "x": 21, "y": 10}, {"id": 43, "x": 5, "y": 64}, {"id": 44, "x": 30, "y": 15}, {"id": 45, "x": 39, "y": 10},
    {"id": 46, "x": 32, "y": 39}, {"id": 47, "x": 25, "y": 32}, {"id": 48, "x": 25, "y": 55}, {"id": 49, "x": 48, "y": 28}, {"id": 50, "x": 56, "y": 37},
    {"id": 51, "x": 30, "y": 40}
]
node_dict = {node["id"]: node for node in eil51_nodes}

class GARequest(BaseModel):
    population: List[List[int]]
    population_size: int = 50
    mutation_rate: float = 0.1

def calc_distance(route: List[int]) -> float:
    dist = 0.0
    for i in range(len(route)):
        n1 = node_dict[route[i]]
        n2 = node_dict[route[(i + 1) % len(route)]] # 終点から始点に戻る距離も含む
        dist += math.sqrt((n1['x'] - n2['x'])**2 + (n1['y'] - n2['y'])**2)
    return dist

def generate_initial_population(size: int) -> List[List[int]]:
    base_route = list(range(1, 52))
    return [random.sample(base_route, len(base_route)) for _ in range(size)]


# <=====================================ここに交叉を書き足す
def crossover(p1: List[int], p2: List[int]) -> List[int]:
    
    return child

# <=====================================ここに突然変異を書き足す．
def mutate(route: List[int], rate: float) -> List[int]:
    
    return route

@app.post("/api/ga")
def run_ga_generation(req: GARequest):
    pop = req.population
    # 初回リクエスト時（個体群が空の場合）は初期生成する
    if not pop:
        pop = generate_initial_population(req.population_size)

    # 適応度（距離の短さ）の評価
    scored_pop = [(route, calc_distance(route)) for route in pop]
    scored_pop.sort(key=lambda x: x[1]) # 距離が短い順にソート
    
    best_route = scored_pop[0][0]
    best_distance = scored_pop[0][1]

    new_pop = []
    # エリート保存（上位2個体をそのまま残す）
    new_pop.extend([scored_pop[0][0], scored_pop[1][0]])

    # 選択・交叉・突然変異による次世代生成
    while len(new_pop) < req.population_size:
        # トーナメント選択 (サイズ3)
        tour1 = random.sample(scored_pop, 3)
        tour2 = random.sample(scored_pop, 3)
        p1 = min(tour1, key=lambda x: x[1])[0]
        p2 = min(tour2, key=lambda x: x[1])[0]

        child = crossover(p1, p2) #交叉を記述
        child = mutate(child, req.mutation_rate) #突然変異を記述
        new_pop.append(child)

    return {
        "best_route": best_route,
        "best_distance": best_distance,
        "new_population": new_pop
    }