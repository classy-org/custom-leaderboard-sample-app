import React, { useState, useEffect } from 'react'
import { Card } from './Card'
import { APIv2FundraisingPage } from '../../../common/types/fundraisingPage'

type MostDonorsProps = {
  recordType: 'organization' | 'campaign'
}

export const MostDonors = ({
  recordType = 'organization',
}: MostDonorsProps) => {
  const [fundraisingPage, setFundraisingPage] =
    useState<APIv2FundraisingPage | null>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isLoading) return

    fetch(
      `http://localhost:5000/fundraisingPages?sort=total_donors:desc&record_type=${recordType}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log('Most Donors', result)

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
          tag="MOST DONORS"
          metric={`${parseInt(fundraisingPage?.total_donors || '0')} Donors`}
          name={fundraisingPage?.alias}
          image={fundraisingPage?.logo_url}
          description={`The fundraising page that has the largest number of donors at the ${recordType} level`}
        />
      )}
      {error && <p>What happened: {error}</p>}
    </div>
  )
}
