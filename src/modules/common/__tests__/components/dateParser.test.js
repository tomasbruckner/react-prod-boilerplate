import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import DateParser from 'modules/common/components/DateParser';

describe('Date parser', () => {
  it('Date parser component snapshot with time property as ISO string', () => {
    const tree = renderer
      .create(<DateParser utcOffset="+01:00" time="2019-02-25T08:45:14.130+0000" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Date parser component snapshot with time property as empty string', () => {
    const tree = renderer.create(<DateParser utcOffset="+01:00" time="" />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Date parser component snapshot with time property as null', () => {
    const tree = renderer.create(<DateParser utcOffset="+01:00" time={null} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
