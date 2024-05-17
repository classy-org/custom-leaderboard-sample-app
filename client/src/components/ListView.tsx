import React, { useState, useEffect } from 'react'
import { APIv2FundraisingPage } from '../../../types/fundraisingPage'
import { formatAsCurrency } from '../utils/utils'

export const ListView = () => {
  const [fundraisingPages, setFundraisingPages] = useState<
    APIv2FundraisingPage[]
  >([])

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isLoading) return

    fetch(
      `http://localhost:5000/fundraisingPages?sort=total_donors:desc&record_type=organization`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log('Most Donors', result)

          if (result && result.data) {
            setFundraisingPages(result.data)
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
    <>
      <h2>Organization Fundraising Page Leaderboard</h2>
      {!isLoading && !error && (
        <table>
          <caption>
            Data points from the organization&apos;s fundraising pages that have
            raised the most money
          </caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount Raised</th>
              <th>Total Donors</th>
              <th>Average Donation Amount</th>
            </tr>
          </thead>
          <tbody>
            {fundraisingPages.map((fP, index) => (
              <tr key={index}>
                <td>{fP.alias}</td>
                <td>{formatAsCurrency(fP.total_raised)}</td>
                <td>{Number(fP?.total_donors || 0)}</td>
                <td>{formatAsCurrency(fP.average_donation)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {error && <p>What happened: {error}</p>}
    </>
  )
}
