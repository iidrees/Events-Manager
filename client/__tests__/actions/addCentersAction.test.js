import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';

import { addCenter } from '../../src/actions/addCenters';
import * as types from '../../src/actions/types';
import { center } from './mocks/addCenterMock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('TEST FOR ADD CENTER', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should return the expected Action for ADD_CENTER ', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          status: 'Success',
          Message: 'Center added successfully',
          data: center[0]
        }
      });
    });

    const expectedActions = [
      {
        type: types.ADD_CENTER,
        center: {
          status: 'Success',
          Message: 'Center added successfully',
          data: center[0]
        }
      }
    ];

    const store = mockStore({});

    return store.dispatch(addCenter(center[0])).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return the expected action for ADD_CENTER_FAIL', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          status: 'Unsuccessful',
          message: 'Center could not be added'
        }
      });
    });

    const expectedActions = [
      {
        type: types.ADD_CENTER_FAIL,
        error: {
          status: 'Unsuccessful',
          message: 'Center could not be added'
        }
      }
    ];

    const store = mockStore({});

    return store.dispatch(addCenter(center[0])).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
