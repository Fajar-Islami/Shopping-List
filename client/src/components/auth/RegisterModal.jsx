import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../action/authAction';
import { clearErrors } from '../../action/errorAction'

class RegisterModal extends Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    // dari bawah
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg })
      } else {
        this.setState({ msg: null })
      }
    }

    // If authenticated, close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        console.log('auth');
        console.log('sekarang', this.state.modal);
        this.toggle();
      }
    }
  }

  toggle = () => {
    // Clear errors, menghilangkan tulisan error setelah gagal daftar
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = (e) => {
    // Siapa tau input banyak, jadi ditampung dalam array dalam object
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);

    const { name, email, password } = this.state;

    // Create User object
    const newUser = {
      name,
      email,
      password
    }

    // Attempt to register
    this.props.register(newUser)

  }

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" placeholder="Name" onChange={this.onChange} className="mb-3" />
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" placeholder="Email" onChange={this.onChange} className="mb-3" />
                <Label for="password">Name</Label>
                <Input type="password" name="password" id="password" placeholder="Password" onChange={this.onChange} className="mb-3" />
                <Button color="dark" style={{ marginTop: '2rem' }} block >Register</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

// Dikirim dari reducer/index.jsx
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal)
