import axios, { AxiosResponse } from 'axios'
import { HOST, API_VERSION, CAMPAIGN_ID } from '../../config'
import { APIv2FundraisingTeam } from '../../../../types/fundraisingTeam'
import { PaginatedResponse } from '../../types/paginatedResponse'

export interface GetCampaignFundraisingTeamsAPIResult
  extends PaginatedResponse {
  data: APIv2FundraisingTeam[]
}

export const getCampaignFundraisingTeams = (
  accessToken: string,
  sort: string
): Promise<AxiosResponse<GetCampaignFundraisingTeamsAPIResult>> => {
  return axios.get(
    `${HOST}/${API_VERSION}/campaigns/${CAMPAIGN_ID}/fundraising-teams?aggregates=true&with=member&sort=${sort}&limit=5`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
}
