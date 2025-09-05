import { createI18n } from 'vue-i18n'
import { DEFAULT_LANG } from '../configs/language'

import messages from '../i18n'
const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: DEFAULT_LANG,
    messages
})

export default i18n