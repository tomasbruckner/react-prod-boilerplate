import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { PageLoadingComponent } from 'modules/common/components/PageLoading';
import { fakeTranslate } from 'utils/testUtils';

describe('Page loading', () => {
  it('Page loading simple', () => {
    const tree = renderer.create(<PageLoadingComponent t={fakeTranslate} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
