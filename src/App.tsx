import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'
import GameOverPage from './pages/GameOverPage'
import WorldMapPage from './pages/WorldMapPage'
import ExplorationPage from './pages/ExplorationPage'
import MechUpgradePage from './pages/MechUpgradePage'
import AchievementPage from './pages/AchievementPage'
import LevelPage from './pages/LevelPage'
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/game-over" element={<GameOverPage />} />
        <Route path="/world-map" element={<WorldMapPage />} />
        <Route path="/exploration/:locationId" element={<ExplorationPage />} />
        <Route path="/mech-upgrade" element={<MechUpgradePage />} />
        <Route path="/achievements" element={<AchievementPage />} />
        <Route path="/levels" element={<LevelPage />} />
      </Routes>
    </Router>
  )
}

export default App
