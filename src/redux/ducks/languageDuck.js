import { changeLanguage } from 'i18n/i18nUtils';
import { createActionTypes } from 'redux/reduxUtils';

const LanguageDuck = {
  name: 'LanguageDuck',
};

const LANGUAGES = {
  en: { code: 'en', name: 'English' },
};

export const DEFAULT_LANGUAGE = 'en';
export const STORAGE_KEY = 'lang';

const localLanguage = window.localStorage.getItem(STORAGE_KEY);
const initialLanguage = localLanguage ? LANGUAGES[localLanguage] : LANGUAGES.en;

const initialState = {
  selectedLanguage: initialLanguage,
  availableLanguages: [LANGUAGES.en],
};

const actionTypes = createActionTypes(
  {
    setAvailableLanguages: 'setAvailableLanguages',
    setSelectedLanguage: 'setSelectedLanguage',
  },
  LanguageDuck.name,
);

LanguageDuck.reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.setAvailableLanguages:
      return { ...state, availableLanguages: [...payload] };

    case actionTypes.setSelectedLanguage:
      return { ...state, selectedLanguage: { ...payload } };

    default:
      return state;
  }
};

LanguageDuck.setSelectedLanguage = language => dispatch => {
  changeLanguage(language.code);
  window.localStorage.setItem(STORAGE_KEY, language.code);

  dispatch({
    type: actionTypes.setSelectedLanguage,
    payload: language,
  });
};

LanguageDuck.setAvailableLanguages = languages => dispatch => {
  const mappedLanguages = languages.map(lang => LANGUAGES[lang.toLowerCase()]);
  const localLanguageKey = window.localStorage.getItem(STORAGE_KEY);
  const languageExist = mappedLanguages.some(lang => lang.code === localLanguageKey);

  if (!languageExist) {
    window.localStorage.removeItem(STORAGE_KEY);
    dispatch({
      type: actionTypes.setSelectedLanguage,
      payload: LANGUAGES[DEFAULT_LANGUAGE],
    });
  }

  dispatch({
    type: actionTypes.setAvailableLanguages,
    payload: mappedLanguages,
  });
};

const getOwnState = state => {
  return state[LanguageDuck.name] || initialState;
};

LanguageDuck.getAvailableLanguages = state => getOwnState(state).availableLanguages;
LanguageDuck.getSelectedLanguage = state => getOwnState(state).selectedLanguage;

export default LanguageDuck;
