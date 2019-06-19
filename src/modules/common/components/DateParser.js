import React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';

export const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const DateParser = ({ time, utcOffset }) => {
  const parsedTime = moment(time);
  if (parsedTime.isValid()) {
    if (utcOffset) {
      parsedTime.utcOffset(utcOffset);
    }

    return <span>{parsedTime.format(DATE_FORMAT)}</span>;
  }

  return <span>{time}</span>;
};

DateParser.propTypes = {
  time: PropTypes.string,
  utcOffset: PropTypes.string,
};

DateParser.defaultProps = {
  time: null,
  utcOffset: '',
};

export default DateParser;
