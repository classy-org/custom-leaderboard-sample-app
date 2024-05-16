import axios, { AxiosResponse } from 'axios'
import { HOST, API_VERSION, ORGANIZATION_ID } from '../../config'
import { APIv2FundraisingPage } from '../../../../types/fundraisingPage'
import { PaginatedResponse } from '../../types/paginatedResponse'

export interface GetOrganizationFundraisingPagesAPIResult
  extends PaginatedResponse {
  data: APIv2FundraisingPage[]
}

export const getOrganizationFundraisingPages = (
  accessToken: string,
  sort: string,
): Promise<AxiosResponse<GetOrganizationFundraisingPagesAPIResult>> => {
  return axios.get(
    `${HOST}/${API_VERSION}/organizations/${ORGANIZATION_ID}/fundraising-pages?aggregates=true&with=member&sort=${sort}&limit=5`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
}
