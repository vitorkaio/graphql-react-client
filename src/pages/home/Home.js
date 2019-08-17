import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'store/modules/user/actions';
import { Container, MyButton } from './HomeStyled';

const Home = ({ userReducer, userRequest, createUserRequest }) => {

  useEffect(() => {
    const requestUser = async () => {
      userRequest()
    }
    requestUser()
  }, [userRequest])

  const submitUser = () => {
    const user = {
      name: 'Sue',
      age: 35
    }
    createUserRequest(user)
  }

  const { load, user } = userReducer

  return(
    <Container>
      {
        load
        ?
        <h2>loading...</h2>
        :
        <h2>{user.name}</h2>
      }
      <MyButton onClick={submitUser}>
        <span>Send User</span>
      </MyButton>
    </Container>
  );
}

const mapStateToProps = state => ({
  userReducer: state.userReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators(userActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
