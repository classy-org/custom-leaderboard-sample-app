import axios, { AxiosResponse } from 'axios'
import { HOST, API_VERSION, ORGANIZATION_ID } from '../../config'
import { APIv2FundraisingTeam } from '../../../../types/fundraisingTeam'
import { PaginatedResponse } from '../../types/paginatedResponse'

export interface GetOrganizationFundraisingTeamsAPIResult
  extends PaginatedResponse {
  data: APIv2FundraisingTeam[]
}

export const getOrganizationFundraisingTeams = (
  accessToken: string,
  sort: string
): Promise<AxiosResponse<GetOrganizationFundraisingTeamsAPIResult>> => {
  return axios.get(
    `${HOST}/${API_VERSION}/organizations/${ORGANIZATION_ID}/fundraising-teams?aggregates=true&with=member&sort=${sort}&limit=5`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
}
