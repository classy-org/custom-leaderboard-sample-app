import { Member } from './member'

export type FundraisingPageStatus =
  | 'active'
  | 'inactive'
  | 'deleted'
  | 'pending_questions'
  | 'pending_approval'
  | 'pending_more_info'

export type FundraisingPageTeamRole = 'primary-captain' | 'co-captain'

export interface APIv2FundraisingPage {
  id: number
  alias: string
  average_donation?: number
  campaign_id: number
  canonical_url: string
  commitment_id: number
  cover_photo_id: number
  created_at: string
  currency_code?: string
  designation_id: number
  ended_at?: string
  fundraising_team_id?: number
  goal?: number
  intro_text: string
  is_tribute?: boolean
  is_primary: boolean
  largest_donation?: number
  logo_id?: number
  logo_url?: string
  member?: Member
  member_email_text?: string
  member_id: number
  organization_id: number
  percent_to_goal?: number
  progress_bar_amount?: string
  raw_currency_code: string
  raw_goal: number
  started_at: string
  status: FundraisingPageStatus
  parent_id: number
  questions: []
  supporter_id: number
  team_role: FundraisingPageTeamRole
  thank_you_text: string
  thankyou_email_text: string
  title: string
  total_donations?: number
  total_donors?: string
  total_hard_credits?: string
  total_raised?: number
  total_soft_credits?: string
  updated_at?: string
}