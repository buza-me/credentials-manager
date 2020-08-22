import moment from './moment.config';
import i18n from './i18n.config';
import './fetch.config';

i18n.on('languageChanged', (lang) => moment.locale(lang));

moment.locale(i18n.language);

window.moment = moment;
