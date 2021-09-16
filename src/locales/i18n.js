import i18n from 'i18n-js'
import * as Localization from 'expo-localization'

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
  en: {
    date: {
      formats: {
        short: '%Y-%m-%d',
      },
    },
  },
  fr: {
    date: {
      formats: {
        short: '%d/%m/%Y',
      },
    },
  },
}
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale

i18n.fallbacks = true

export const addTranslation = locales => {
  Object.keys(locales).forEach(locale => {
    i18n.translations[locale] = {
      ...i18n.translations[locale],
      ...locales[locale],
    }
  })
}

export const tr = i18n.t

export default i18n
