import Button from '../../controls/Button';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import * as PropTypes from 'prop-types';
import { NotificationVariantPropType } from '../NotificationDuck';
import { withStyles } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components/macro';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import { MdCheckCircle, MdClose, MdError, MdInfo, MdWarning } from 'react-icons/md';

const variantIcon = {
  success: MdCheckCircle,
  warning: MdWarning,
  error: MdError,
  info: MdInfo,
};

const notificationStyles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
});

const NotificationIcon = styled.span`
  margin-right: 8px;
  font-size: 20px;
  line-height: 20px;
  height: 20px;
  opacity: 0.9;
`;

const NotificationMessage = styled.span`
  display: flex;
  align-items: center;
`;

const NotificationContent = props => {
  const { classes, message, onClose, variant } = props;

  const Icon = variantIcon[variant];

  const messageComponent = (
    <NotificationMessage id="idNotification">
      <NotificationIcon>
        <Icon />
      </NotificationIcon>
      {message}
    </NotificationMessage>
  );

  const actionComponent = (
    <Button asIcon key="close" aria-label="Close" color="inherit" onClick={onClose}>
      <MdClose />
    </Button>
  );

  return (
    <SnackbarContent
      className={classes[variant]}
      aria-describedby="idNotification"
      message={messageComponent}
      action={actionComponent}
    />
  );
};

NotificationContent.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  variant: NotificationVariantPropType.isRequired,
};

export default withStyles(notificationStyles)(NotificationContent);
