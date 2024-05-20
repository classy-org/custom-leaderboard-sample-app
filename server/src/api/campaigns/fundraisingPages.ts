import axios, { AxiosResponse } from 'axios';
import { HOST, API_VERSION, CAMPAIGN_ID } from '../../config';
import { APIv2FundraisingPage } from '../../../../common/types/fundraisingPage';
import { PaginatedResponse } from '../../types/paginatedResponse';

export interface GetCampaignFundraisingPagesAPIResult extends PaginatedResponse {
  data: APIv2FundraisingPage[];
}

export const getCampaignFundraisingPages = (
  accessToken: string,
  sort: string
): Promise<AxiosResponse<GetCampaignFundraisingPagesAPIResult>> => {
  return axios.get(
    `${HOST}/${API_VERSION}/campaigns/${CAMPAIGN_ID}/fundraising-pages?aggregates=true&with=member&sort=${sort}&limit=5`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
