import 'i18next'
import { resources } from './i18n'

type Resources = typeof resources.en

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: Resources
  }
}
