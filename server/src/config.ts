import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT || 5000
export const API_VERSION = process.env.API_VERSION
export const HOST = process.env.HOST || ''
export const CLIENT_ID = process.env.CLIENT_ID
export const CLIENT_SECRET = process.env.CLIENT_SECRET
export const ORGANIZATION_ID = process.env.ORGANIZATION_ID
export const CAMPAIGN_ID = process.env.CAMPAIGN_ID
