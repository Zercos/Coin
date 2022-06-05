import type { Moment } from 'moment'

export interface JwtPayload {
  iss?: string
  sub?: string
  aud?: string[] | string
  exp?: number
  nbf?: number
  iat?: number
  jti?: string
  utl?: string
  ufn?: string
}

export interface ICategory {
  id: number
  name: string
  limit: number
  description?: string
  creation_date: Moment
  active: boolean
}

export interface IPlanCategory extends ICategory {
  progressPercent: number
  spend: number
  tooltip: string
}
