import React, { useState, useEffect } from 'react'
import { Card } from './Card'
import { APIv2FundraisingPage } from '../../../types/fundraisingPage'
import { formatAsCurrency } from '../utils/utils'

type MostRaisedProps = {
  recordType: 'organization' | 'campaign'
}

export const MostRaised = ({
  recordType = 'organization',
}: MostRaisedProps) => {
  const [fundraisingPage, setFundraisingPage] =
    useState<APIv2FundraisingPage | null>(null)

  const [isLoading, setIsLoading] = useState(true) // State to track loading state
  const [error, setError] = useState('') // State to track errors

  useEffect(() => {
    if (!isLoading) return

    fetch(
      `http://localhost:5000/fundraisingPages?sort=total_raised:desc&record_type=${recordType}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log('Most Raised', result)

          if (result && result.data) {
            setFundraisingPage(result.data[0])
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
          tag="MOST RAISED"
          metric={`${formatAsCurrency(fundraisingPage?.total_raised)} Raised`}
          name={fundraisingPage?.alias}
          image={fundraisingPage?.logo_url}
          description={`The fundraising page that has raised the most $$ at the ${recordType} level`}
        />
      )}
      {error && <p>What happened: {error}</p>}
    </div>
  )
}
