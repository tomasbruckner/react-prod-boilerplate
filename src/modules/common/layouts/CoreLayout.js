import ErrorBoundary from 'modules/common/components/ErrorBoundary';
import * as PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled from 'styled-components/macro';
import SidebarContent from './components/SidebarContent';

const RouteContent = styled.div``;
const SidebarWrapper = styled.div``;

class CoreLayout extends PureComponent {
  render() {
    const { children } = this.props;

    return (
      <SidebarWrapper>
        <SidebarContent />
        <ErrorBoundary>
          <RouteContent>{children}</RouteContent>
        </ErrorBoundary>
      </SidebarWrapper>
    );
  }
}

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default CoreLayout;
