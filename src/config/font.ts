import { Nunito, Work_Sans, EB_Garamond, Kaushan_Script, Alex_Brush } from 'next/font/google'


export const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['300','400','500','600', '700'],
  display: 'swap',
})
export const work_sans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  weight: ['300','400','500','600', '700'],
  display: 'swap',
})
export const eb_garamond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-eb-garamond',
  weight: ['400'],
  display: 'swap',
})


export const kaushan = Kaushan_Script({
  subsets: ['latin'],
  variable: '--font-kaushan',
  weight: ['400'],
  display: 'swap',
})


export const alex = Alex_Brush({
  subsets: ['latin'],
  variable: '--font-alex',
  weight: ['400'],
  display: 'swap',
})