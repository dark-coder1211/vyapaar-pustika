// React Imports
import type { ReactNode } from 'react'

export type Skin = 'default' | 'bordered'

export type Mode = 'light' | 'dark'

export type SystemMode = 'light' | 'dark'

export type Direction = 'ltr' | 'rtl'

export type ChildrenType = {
  children: ReactNode
}

export type ThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'

export type BGThemeColor =
  | '#7367F0'
  | '#EF5350'
  | '#FFA000'
  | '#009688'
  | '#3b82f6'
  | '#14b8a6'
  | '#8092AD'
  | '#59180F'
  | '#d1aba0'
  | '#69a1b1'
  | '#346960'
  | '#acd0bf'
  | '#84cdf4'
  | '#9c6c6c'
  | '#14b8a6'
  | '#854d0e'


export type CardStatsVerticalProps = {
  title: string
  stats: string
  icon: ReactNode
  subtitle: string
  color?: ThemeColor
  BGColor?: BGThemeColor
  trendNumber: string
  trend?: 'positive' | 'negative'
}

export type HomeCardStatsVerticalProps = {
  title: string
  stats: string
  icon: ReactNode
  subtitle: string
  color?: ThemeColor
  BGColor?: BGThemeColor
  trend?: 'positive' | 'negative'
  unit: string
}
