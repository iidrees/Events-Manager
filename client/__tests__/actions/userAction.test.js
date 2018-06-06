import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';

import { userSignup, userSignin, signOut } from '../../src/actions/user';
import * as types from '../../src/actions/types';
import { event } from './mocks/addEventMock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('TEST FOR ADD EVENTS', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should returnb expected action for SIGNED_UP action', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          status: 'Success',
          Message: 'User added successfully',
          data: {
            name: 'Felix Eba',
            email: 'Felix.andela@felix.com',
            token: 'lkashksahjflashfjlaksfh'
          }
        }
      });
    });

    const expectedActions = [
      {
        type: types.SIGNED_UP,
        payload: {
          status: 'Success',
          Message: 'User added successfully',
          data: {
            name: 'Felix Eba',
            email: 'Felix.andela@felix.com',
            token: 'lkashksahjflashfjlaksfh'
          }
        }
      }
    ];

    const store = mockStore({});

    return store
      .dispatch(
        userSignup({
          name: 'ldkshklfs',
          email: 'yrjkashdk',
          password: 'oiashdkj'
        })
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('should return the expected action for SIGN_UP_FAIL', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          status: 'Unsuccessful',
          message: 'user could not be added'
        }
      });
    });

    const expectedActions = [
      {
        type: types.SIGN_UP_FAIL,
        payload: {
          status: 'Unsuccessful',
          message: 'user could not be added'
        }
      }
    ];

    const store = mockStore({});

    return store
      .dispatch(
        userSignup({
          name: 'ldkshklfs',
          email: 'yrjkashdk',
          password: 'oiashdkj'
        })
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should returnb expected action for SIGNED_IN action', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 'Success',
          Message: 'User signed in successfully',
          data: {
            name: 'Felix Eba',
            email: 'Felix.andela@felix.com',
            token: 'lkashksahjflashfjlaksfh'
          }
        }
      });
    });

    const expectedActions = [
      { type: 'SIGN_IN' },
      {
        type: types.SIGNED_IN,
        payload: {
          status: 'Success',
          Message: 'User signed in successfully',
          data: {
            name: 'Felix Eba',
            email: 'Felix.andela@felix.com',
            token: 'lkashksahjflashfjlaksfh'
          }
        }
      }
    ];

    const store = mockStore({});

    return store
      .dispatch(
        userSignin({
          email: 'yrjkashdk',
          password: 'oiashdkj'
        })
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should return the expected action for SIGN_IN_FAIL', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          status: 'Unsuccessful',
          message: 'user could not be added'
        }
      });
    });

    const expectedActions = [
      { type: 'SIGN_IN' },
      {
        type: types.SIGN_IN_FAIL,
        payload: {
          status: 'Unsuccessful',
          message: 'user could not be added'
        }
      }
    ];

    const store = mockStore({});

    return store
      .dispatch(
        userSignin({
          name: 'ldkshklfs',
          email: 'yrjkashdk',
          password: 'oiashdkj'
        })
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
