import ErrorBoundary from 'modules/common/components/ErrorBoundary';
import * as PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import PageLoading from 'modules/common/components/PageLoading';

// styled by your own taste
const PageRoot = styled.div``;
const PageHeader = styled.div``;
const PageHeaderText = styled.div``;
const PageTitle = styled.div``;
const PageSubtitle = styled.div``;
const PageActions = styled.div``;

const PageLayout = ({ title, subtitle, actions, children, id, loading }) => {
  return (
    <PageRoot id={id}>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{title}</PageTitle>
          <PageSubtitle>{subtitle}</PageSubtitle>
        </PageHeaderText>
        {!loading && <PageActions>{actions}</PageActions>}
      </PageHeader>
      <ErrorBoundary>{loading ? <PageLoading /> : children}</ErrorBoundary>
    </PageRoot>
  );
};

PageLayout.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  actions: PropTypes.node,
  children: PropTypes.node,
  id: PropTypes.string,
  loading: PropTypes.bool,
};

PageLayout.defaultProps = {
  title: null,
  subtitle: null,
  actions: null,
  children: [],
  id: null,
  loading: false,
};

export default PageLayout;
