import type { BGThemeColor } from '@/@core/types'

export interface CardData {
  key: string
  stats: string
  icon: JSX.Element
  title: string
  subtitle: string
  BGColor: BGThemeColor
  unit: string
  link: string
}

export interface CardPermissions {
  Entries: number
  Reports: number
  [key: string]: number // Index signature
}

export interface Data {
  Value: string
}

export interface RenderStatsProps {
  API: string
}
