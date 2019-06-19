import * as PropTypes from 'prop-types';

const languageProp = PropTypes.shape({
  code: PropTypes.string,
  name: PropTypes.string,
});

export default {
  selectedLanguageProp: languageProp,
  availableLanguages: PropTypes.arrayOf(languageProp),
};
