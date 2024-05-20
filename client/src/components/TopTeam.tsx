import React, { useState, useEffect } from 'react'
import { Card } from './Card'
import { APIv2FundraisingTeam } from '../../../common/types/fundraisingTeam'
import { formatAsCurrency } from '../utils/utils'

type TopTeamProps = {
  recordType: 'organization' | 'campaign'
}

export const TopTeam = ({ recordType = 'organization' }: TopTeamProps) => {
  const [fundraisingTeam, setFundraisingTeam] =
    useState<APIv2FundraisingTeam | null>(null)

  const [isLoading, setIsLoading] = useState(true) // State to track loading state
  const [error, setError] = useState('') // State to track errors

  useEffect(() => {
    if (!isLoading) return

    fetch(
      `http://localhost:5000/fundraisingTeams?sort=total_raised:desc&record_type=${recordType}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log('Fundraising Team CAMPAIGN', result)

          if (result && result.data) {
            setFundraisingTeam(result.data[0])
            setIsLoading(false)
          }
        },
        (e) => {
          console.error('WHOOPS:', e)
          setIsLoading(false)
          setError(e)
        }
      )
  }, [isLoading])

  return (
    <div>
      {!isLoading && !error && (
        <Card
          tag="TOP TEAM"
          metric={`${formatAsCurrency(fundraisingTeam?.total_raised)} Raised`}
          name={fundraisingTeam?.name}
          image={fundraisingTeam?.logo_url}
          description={`The fundraising team that has raised the most $$ at the ${recordType} level`}
        />
      )}
      {error && <p>What happened: {error}</p>}
    </div>
  )
}
