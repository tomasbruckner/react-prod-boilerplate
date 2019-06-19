import React, { PureComponent } from 'react';
import PageLayout from '../layouts/PageLayout';
import NotAllowed from '../security/NotAllowed';

export class NotAllowedPageComponent extends PureComponent {
  render() {
    return (
      <PageLayout>
        <NotAllowed />
      </PageLayout>
    );
  }
}

export default NotAllowedPageComponent;
