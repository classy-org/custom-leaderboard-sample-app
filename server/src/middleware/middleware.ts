import { getAccessToken } from '../api/auth'
import { Request, Response, NextFunction } from 'express'

// This is a simple middleware to handle token expiration and making requests when the token is expired or doesn't exist,
// assuring that only a single token is fetched to be reused across API requests rather than fetching a new token for each
// API request. This should be replaced with a more refined approach for production

export type TokenStore = {
  access_token?: string
  expires_at?: number
}

let isTokenRefreshing = false

// Accessible in memory variable for token and its expiration time
export const tokenStore: TokenStore = {
  access_token: undefined,
  expires_at: undefined,
}

// Middleware to check token expiration
export const tokenExpirationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  // If token is currently being refreshed, wait for it to complete, preventing synchronous frontend requests
  // from triggering an upstream request to get a new access token
  if (isTokenRefreshing) {
    await waitForTokenRefresh()
  }

  // If token doesn't exist or it's expired, fetch new access token
  if (!tokenStore.access_token || isTokenExpired()) {
    // Set the token refresh flag to prevent concurrent refreshes
    isTokenRefreshing = true
    try {
      const { data } = await getAccessToken()
      setTokenData(data.access_token, Date.now() + 6800) // providing a 400 second buffer from the actual expiration time
    } catch (e) {
      console.error('Error getting token', e.message)
      return res.status(500).json({ error: 'Error fetching access token' })
    } finally {
      // Reset the token refresh flag after token refresh is complete
      isTokenRefreshing = false
    }
  }

  // Token is valid, proceed
  next()
}

// Prevents concurrent requests to get an access token, assuring the first request to initiate that request
// blocks subsequent requests to get an access token, which can then be used for all incoming requests until it expires
export const waitForTokenRefresh = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (!isTokenRefreshing) {
        clearInterval(interval)
        resolve(true)
      }
    }, 100)
  })
}

// Function to check if token is expired
export const isTokenExpired = (): boolean => {
  return !!(tokenStore.expires_at && tokenStore.expires_at < Date.now())
}

// Function to set token and its expiration time in the tokenStore
export const setTokenData = (token: string, expirationTime: number) => {
  tokenStore.access_token = token
  tokenStore.expires_at = expirationTime
}
