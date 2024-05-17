import { AxiosResponse } from 'axios'
import { Request, Response, NextFunction } from 'express'
import * as authModule from '../api/auth'
import * as middleWareModule from './middleware'

jest.mock('../api/auth')

describe('tokenExpirationMiddleware', () => {
  beforeEach(() => {
    // Reset token store before each test
    middleWareModule.tokenStore.access_token = undefined
    middleWareModule.tokenStore.expires_at = undefined
    jest.clearAllMocks()
  })

  it('should call next() if token is valid', async () => {
    middleWareModule.tokenStore.access_token = 'valid_token'
    middleWareModule.tokenStore.expires_at = Date.now() + 1000 // Token expires in 1 second

    const mockRequest = {} as Request
    const mockResponse = {} as Response
    const next = jest.fn() as NextFunction

    await middleWareModule.tokenExpirationMiddleware(
      mockRequest,
      mockResponse,
      next
    )

    expect(next).toHaveBeenCalled()
  })

  it('should fetch a new token if token is expired', async () => {
    middleWareModule.tokenStore.expires_at = Date.now() - 1000 // Token expired 1 second ago

    jest
      .spyOn(authModule, 'getAccessToken')
      .mockReturnValue(
        Promise.resolve({ data: { access_token: 'new_token' } }) as Promise<
          AxiosResponse<authModule.AuthResponse, any>
        >
      )

    const mockRequest = {} as Request
    const mockResponse = {} as Response
    const next = jest.fn() as NextFunction

    await middleWareModule.tokenExpirationMiddleware(
      mockRequest,
      mockResponse,
      next
    )

    expect(authModule.getAccessToken).toHaveBeenCalledTimes(1)
    expect(middleWareModule.tokenStore.access_token).toBe('new_token')
    expect(middleWareModule.tokenStore.expires_at).toBeGreaterThan(Date.now()) // New expiration time is in the future
    expect(next).toHaveBeenCalled()
  })

  it('should handle error when fetching token fails', async () => {
    const errorMessage = 'Failed to fetch token'
    jest
      .spyOn(authModule, 'getAccessToken')
      .mockRejectedValue(new Error(errorMessage))

    const mockRequest = {} as Request
    const mockResponse: Response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any
    const next = jest.fn() as NextFunction

    await middleWareModule.tokenExpirationMiddleware(
      mockRequest,
      mockResponse,
      next
    )

    expect(authModule.getAccessToken).toHaveBeenCalledTimes(1)
    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Error fetching access token',
    })
    expect(next).not.toHaveBeenCalled()
  })

  it('should wait for token refresh if token is currently refreshing', async () => {
    jest
      .spyOn(authModule, 'getAccessToken')
      .mockReturnValue(
        Promise.resolve({ data: { access_token: 'new_token' } }) as Promise<
          AxiosResponse<authModule.AuthResponse, any>
        >
      )

    const mockRequest = {} as Request
    const mockResponse = {} as Response
    const next = jest.fn() as NextFunction

    setTimeout(() => {
      jest
        .spyOn(middleWareModule, 'waitForTokenRefresh')
        .mockReturnValue(Promise.resolve(true))
    }, 100)

    await middleWareModule.tokenExpirationMiddleware(
      mockRequest,
      mockResponse,
      next
    )

    expect(next).toHaveBeenCalled()
  })

  it('should return false if the token has not expired', async () => {
    middleWareModule.setTokenData('some_token', Date.now() + 5000)
    const isExpired = middleWareModule.isTokenExpired()

    expect(isExpired).toBe(false)
  })

  it('should return true if the token has expired', async () => {
    middleWareModule.setTokenData('some_token', Date.now() - 5000)
    const isExpired = middleWareModule.isTokenExpired()

    expect(isExpired).toBe(true)
  })

  it('should set the tokenStore properties', async () => {
    middleWareModule.setTokenData('some_token', 1234)

    expect(middleWareModule.tokenStore.access_token).toBe('some_token')
    expect(middleWareModule.tokenStore.expires_at).toBe(1234)
  })
})
