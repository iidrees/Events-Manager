import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';

import getCenters from '../../src/actions/getCentersAction';
import * as types from '../../src/actions/types';
import { centers }from './mocks/getCentersMocks';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)
const history = createBrowserHistory();

describe('Test for the getCentersAction', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should create CENTER_SUCCESS after successfully fetching centers', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status:200,
        response: {
          status: 'Success',
          message: 'Centers found',
          data: centers
        }

      });
    });

    const expectedActions = [ 
      { 
        type: types.CENTERS_SUCCESS, 
        centers: {
          status: 'Success',
          message: 'Centers found',
          data: centers
        }
      }
    ]

    

   

    const store = mockStore({centers: {} })

    return store.dispatch(getCenters()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return No Centers Found', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          status: 'Unsuccessful',
          message: 'No Centers Found'
        }
      });
    });

    const expectedActions = [
      { 
        type: types.CENTERS_ERRORS, 
        error: {
          status: 'Unsuccessful',
          message: 'No Centers Found'
        }
      }
    ]

    const store = mockStore({centers: {} })

    return store.dispatch(getCenters()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

  });
});