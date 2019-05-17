import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
// import {compose} from 'redux';
// import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';

class AddClient extends Component {
    state = {
      firstName:'',
      lastName:'',
      email:'',
      phone:'',
      balance:'',
      description:''
    }

    onChange = (e) => {
      this.setState({[e.target.name]:e.target.value});
    }

    submit = e => {
      e.preventDefault()

      const {
        state,
        props: { firestore, history }
      } = this

      const newClient = {
        ...state,
        balance: state.balance === '' ? '0' : state.balance
      }

      firestore.add({ collection: 'clients' }, newClient).then(() => history.push('/'))
    }


  render(){
      return(
        <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName"> First Name </label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    minLength="2"
                    required
                    onChange={this.onChange}
                    value={this.state.firstName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName"> Last Name </label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    minLength="2"
                    required
                    onChange={this.onChange}
                    value={this.state.lastName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email"> Email </label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"

                    onChange={this.onChange}
                    value={this.state.email}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName"> Phone </label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    minLength="10"
                    required
                    onChange={this.onChange}
                    value={this.state.phone}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="balance"> Balance </label>
                  <input
                    type="text"
                    className="form-control"
                    name="balance"
                    onChange={this.onChange}
                    value={this.state.balance}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName"> Description of Services </label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    onChange={this.onChange}
                    value={this.state.description}
                  />
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary btn-black"
                  />

              </form>
            </div>

          </div>
        </div>
      </div>

      )
    }
  }

  AddClient.propTypes = {
    firestore:PropTypes.object.isRequired
  }

  export default firestoreConnect(AddClient);
