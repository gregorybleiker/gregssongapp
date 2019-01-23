import React, { Component } from 'react';

import validate from 'validate.js';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const initialState = {
  emailAddress: '',

  errors: null
};

class ResetPasswordDialog extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  resetPassword = () => {
    const constraints = {
      emailAddress: {
        email: true,
        presence: {
          allowEmpty: false
        }
      }
    };

    const { emailAddress } = this.state;
    
    const errors = validate({ emailAddress }, constraints);

    if (errors) {
      this.setState({ errors });
    } else {
      this.setState({
        errors: null
      }, () => {
        this.props.resetPassword(emailAddress);
      });
    }
  };

  handleExited = () => {
    this.setState(initialState);
  };

  handleKeyPress = (event) => {
    const key = event.key;

    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    if (key === 'Enter') {
      event.preventDefault();

      this.resetPassword();
    }
  };

  handleEmailAddressChange = (event) => {
    const emailAddress = event.target.value;

    this.setState({ emailAddress });
  };

  handleResetPasswordClick = () => {
    this.resetPassword();
  };

  render() {
    // Properties
    const { open, isResettingPassword } = this.props;

    // Events
    const { onClose } = this.props;

    const { emailAddress, errors } = this.state;

    return (
      <Dialog open={open} onClose={onClose} onExited={this.handleExited} onKeyPress={this.handleKeyPress}>
        <DialogTitle>
          Reset your password
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            An e-mail will be sent to your e-mail address containing instructions on how to reset your password.
          </DialogContentText>

          <div>
            <form>
              <TextField
                autoComplete="email"
                autoFocus
                error={(errors && errors.emailAddress) ? true : false}
                fullWidth
                helperText={(errors && errors.emailAddress) ? errors.emailAddress[0] : ''}
                margin="normal"
                onChange={this.handleEmailAddressChange}
                placeholder="E-mail address"
                required
                type="email"
                value={emailAddress}
              />
            </form>
          </div>
        </DialogContent>

        <DialogActions>
          <Button color="primary" onClick={onClose}>Cancel</Button>
          <Button color="primary" disabled={isResettingPassword} onClick={this.handleResetPasswordClick}>Reset Password</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ResetPasswordDialog;