import axios from 'axios'
import {
  getOrganizationFundraisingPages,
  GetOrganizationFundraisingPagesAPIResult,
} from './organizations/fundraisingPages'
import {
  getOrganizationFundraisingTeams,
  GetOrganizationFundraisingTeamsAPIResult,
} from './organizations/fundraisingTeams'
import {
  getCampaignFundraisingPages,
  GetCampaignFundraisingPagesAPIResult,
} from './campaigns/fundraisingPages'
import {
  getCampaignFundraisingTeams,
  GetCampaignFundraisingTeamsAPIResult,
} from './campaigns/fundraisingTeams'
import { getAccessToken } from './auth'
import { APIv2FundraisingPage } from '../../../types/fundraisingPage'
import { APIv2FundraisingTeam } from '../../../types/fundraisingTeam'

jest.mock('axios')

describe('api requests', () => {
  beforeEach(async () => {
    jest.clearAllMocks()
  })

  describe('getAccessToken', () => {
    it('should return access token on successful request', async () => {
      const mockAccessToken = 'mockAccessToken'
      const mockResponseData = { access_token: mockAccessToken }

      ;(axios.post as jest.Mock).mockResolvedValueOnce({
        data: mockResponseData,
      })

      const response = await getAccessToken()

      expect(response.data.access_token).toEqual(mockAccessToken)
      expect(axios.post).toHaveBeenCalledTimes(1)
      expect(axios.post).toHaveBeenCalledWith(
        `https://test-env.org/oauth2/auth`,
        {
          client_id: 'xxxxxxxxxx',
          client_secret: 'yyyyyyyyy',
          grant_type: 'client_credentials',
        }
      )
    })
  })

  it('should throw error on failed request', async () => {
    const errorMessage = 'Failed to fetch access token'

    ;(
      axios.post as jest.MockedFunction<typeof axios.post>
    ).mockRejectedValueOnce(new Error(errorMessage))

    await expect(getAccessToken()).rejects.toThrow(errorMessage)
    expect(axios.post).toHaveBeenCalledTimes(1)
  })

  describe('getCampaignFundraisingPages', () => {
    it('should fetch campaign fundraising pages with correct parameters', async () => {
      const mockAccessToken = 'mockAccessToken'
      const mockSort = 'mockSort'
      const fundraisingPages = [
        { id: 1, name: 'Fundraising Page 1' },
        { id: 2, name: 'Fundraising Page 2' },
      ] as unknown as APIv2FundraisingPage[]

      const mockResponseData = {
        data: fundraisingPages,
      } as GetCampaignFundraisingPagesAPIResult

      ;(axios.get as jest.Mock).mockResolvedValueOnce({
        data: mockResponseData,
      })

      const result = await getCampaignFundraisingPages(
        mockAccessToken,
        mockSort
      )

      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get).toHaveBeenCalledWith(
        `https://test-env.org/2.0/campaigns/8008/fundraising-pages?aggregates=true&with=member&sort=mockSort&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${mockAccessToken}`,
          },
        }
      )
      expect(result).toEqual({ data: mockResponseData })
      expect(result.data.data.length).toEqual(2)
    })
  })

  describe('getCampaignFundraisingTeams', () => {
    it('should fetch campaign fundraising teams with correct parameters', async () => {
      const mockAccessToken = 'mockAccessToken'
      const mockSort = 'mockSort'
      const fundarisingTeams = [
        { id: 1, name: 'Fundraising Team 1' },
        { id: 2, name: 'Fundraising Team 2' },
      ] as unknown as APIv2FundraisingTeam[]

      const mockResponseData = {
        data: fundarisingTeams,
      } as GetCampaignFundraisingTeamsAPIResult

      ;(axios.get as any).mockResolvedValueOnce({ data: mockResponseData })

      const result = await getCampaignFundraisingTeams(
        mockAccessToken,
        mockSort
      )

      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get).toHaveBeenCalledWith(
        `https://test-env.org/2.0/campaigns/8008/fundraising-teams?aggregates=true&with=member&sort=mockSort&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${mockAccessToken}`,
          },
        }
      )
      expect(result).toEqual({ data: mockResponseData })
      expect(result.data.data.length).toEqual(2)
    })
  })

  describe('getOrganizationFundraisingPages', () => {
    it('should fetch organization fundraising pages with correct parameters', async () => {
      const mockAccessToken = 'mockAccessToken'
      const mockSort = 'mockSort'
      const fundraisingPages = [
        { id: 1, name: 'Fundraising Page 1' },
        { id: 2, name: 'Fundraising Page 2' },
      ] as unknown as APIv2FundraisingPage[]

      const mockResponseData = {
        data: fundraisingPages,
      } as GetOrganizationFundraisingPagesAPIResult

      ;(axios.get as any).mockResolvedValueOnce({ data: mockResponseData })

      const result = await getOrganizationFundraisingPages(
        mockAccessToken,
        mockSort
      )

      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get).toHaveBeenCalledWith(
        `https://test-env.org/2.0/organizations/1992/fundraising-pages?aggregates=true&with=member&sort=mockSort&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${mockAccessToken}`,
          },
        }
      )
      expect(result).toEqual({ data: mockResponseData })
      expect(result.data.data.length).toEqual(2)
    })
  })

  describe('getOrganizationFundraisingTeams', () => {
    it('should fetch organization fundraising teams with correct parameters', async () => {
      const mockAccessToken = 'mockAccessToken'
      const mockSort = 'mockSort'
      const fundarisingTeams = [
        { id: 1, name: 'Fundraising Team 1' },
        { id: 2, name: 'Fundraising Team 2' },
      ] as unknown as APIv2FundraisingTeam[]

      const mockResponseData = {
        data: fundarisingTeams,
      } as GetOrganizationFundraisingTeamsAPIResult

      ;(axios.get as any).mockResolvedValueOnce({ data: mockResponseData })

      const result = await getOrganizationFundraisingTeams(
        mockAccessToken,
        mockSort
      )

      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get).toHaveBeenCalledWith(
        `https://test-env.org/2.0/organizations/1992/fundraising-teams?aggregates=true&with=member&sort=mockSort&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${mockAccessToken}`,
          },
        }
      )
      expect(result).toEqual({ data: mockResponseData })
      expect(result.data.data.length).toEqual(2)
    })
  })
})
