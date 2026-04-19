## 1. Architecture Design
```mermaid
graph TD
    A[前端应用] --> B[游戏逻辑]
    B --> C[Canvas渲染]
    B --> D[用户输入处理]
    B --> E[游戏状态管理]
    E --> F[机甲状态]
    E --> G[游戏规则]
    E --> H[碰撞检测]
```

## 2. Technology Description
- Frontend: React@18 + tailwindcss@3 + vite
- Initialization Tool: vite-init
- Backend: None (纯前端游戏)
- Database: None (游戏状态存储在内存中)
- 游戏渲染: HTML5 Canvas
- 动画处理: requestAnimationFrame
- 状态管理: React useState和useEffect

## 3. Route Definitions
| Route | Purpose |
|-------|---------|
| / | 游戏主页面 |
| /game | 游戏对战页面 |
| /game-over | 游戏结束页面 |

## 4. API Definitions
- 无后端API，游戏逻辑完全在前端实现

## 5. Server Architecture Diagram
- 无后端服务器架构

## 6. Data Model
### 6.1 Data Model Definition
```mermaid
erDiagram
    GAME ||--o{ MECH : contains
    GAME ||--o{ SCENE : contains
    MECH ||--o{ WEAPON : has
    MECH ||--o{ DEFENSE : has
    MECH ||--o{ MOVEMENT : has

    GAME {
        string id
        string state
        number player1Health
        number player2Health
        number player1Energy
        number player2Energy
        boolean gameOver
        string winner
    }

    MECH {
        string id
        number x
        number y
        number width
        number height
        number health
        number energy
        string direction
        boolean isDefending
        boolean isAttacking
    }

    SCENE {
        string id
        number width
        number height
        string background
    }

    WEAPON {
        string id
        string type
        number damage
        number cooldown
        number range
    }

    DEFENSE {
        string id
        number defenseValue
        number cooldown
        number energyCost
    }

    MOVEMENT {
        string id
        number speed
        number acceleration
        number deceleration
    }
```

### 6.2 Data Definition Language
- 无数据库，游戏状态使用JavaScript对象存储
