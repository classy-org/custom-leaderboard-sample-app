import { Member } from './member'

export interface APIv2FundraisingTeam {
    average_donation?: number
    campaign_id: number
    canonical_url: string
    city: string
    country: string
    cover_photo_id: number
    cover_photo_url: string
    created_at: string
    currency_code: string
    description: string
    designation_id: number
    goal: number
    id: number
    logo_id: number
    logo_url: string
    name: string
    net_credit_balance?: number
    organization_id?: number
    parent_id?: number
    percent_to_goal?: number
    postal_code: string
    raw_currency_code: string
    raw_goal: number
    root_id: number
    state: string
    status: 1 | 2 | 3 | 4 | 5
    team_lead_id: number
    team_lead_supporter_id: number
    team_policy_id: number
    thank_you_text: string
    total_donations?: string
    total_donors?: string
    total_fundraisers?: string
    total_hard_credits?: string
    total_raised?: number
    total_soft_credits?: string
    updated_at: string
  }
  