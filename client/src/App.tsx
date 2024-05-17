import React from 'react'
import { MostRaised } from './components/MostRaised'
import { MostDonors } from './components/MostDonors'
import { TopTeam } from './components/TopTeam'
import { ListView } from './components/ListView'
import './App.css'

function App() {
  return (
    <div className="App">
      <h2>Org Level Leaderboard</h2>
      <div className="flexRow">
        <MostRaised recordType="organization" />
        <MostDonors recordType="organization" />
        <TopTeam recordType="organization" />
      </div>
      <h2>Campaign Level Leaderboard</h2>
      <div className="flexRow">
        <MostRaised recordType="campaign" />
        <MostDonors recordType="campaign" />
        <TopTeam recordType="campaign" />
      </div>
      <ListView />
    </div>
  )
}

export default App
