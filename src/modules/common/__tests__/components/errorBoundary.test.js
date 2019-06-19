import { ErrorBoundaryComponent } from 'modules/common/components/ErrorBoundary';
import React from 'react';
import * as PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { fakeLogger, fakeTranslate } from 'utils/testUtils';

const TestComponent = () => {
  return <div>Test Component</div>;
};

const TestComponentCrash = ({ data }) => {
  return <div>{data.nonExistentProperty.value}</div>;
};

TestComponentCrash.propTypes = {
  data: PropTypes.object.isRequired,
};

describe('Error boundary', () => {
  beforeEach(() => {
    jest.spyOn(global.console, 'error');
    global.console.error.mockImplementation(() => {});
  });

  afterEach(() => {
    global.console.error.mockRestore();
  });

  it('Without crash', () => {
    const tree = renderer
      .create(
        <ErrorBoundaryComponent t={fakeTranslate} logger={fakeLogger}>
          <TestComponent />
        </ErrorBoundaryComponent>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Crash', () => {
    const tree = renderer
      .create(
        <ErrorBoundaryComponent t={fakeTranslate} logger={fakeLogger}>
          <TestComponentCrash data={{}} />
        </ErrorBoundaryComponent>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Crash custom error', () => {
    const tree = renderer
      .create(
        <ErrorBoundaryComponent
          t={fakeTranslate}
          logger={fakeLogger}
          renderProp={() => <div>Custom error</div>}
        >
          <TestComponentCrash data={{}} />
        </ErrorBoundaryComponent>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
