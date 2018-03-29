import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';

import { deleteCenter } from '../../src/actions/deleteCenterAction';
import * as types from '../../src/actions/types';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)

describe('TEST FOR DELETE CENTER', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should return the expected Action for DELETE_CENTER ', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response:{
          status: 'Success',
          Message: 'Center Successfuly Deleted'
        }
      });
    });

    const expectedActions = [
      {
        type: types.DELETE_CENTER,
        centerDeleted: {
          status: 'Success',
          Message: 'Center Successfuly Deleted'
        }
      }
    ]

    const store = mockStore({ })

    return store.dispatch(deleteCenter()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return the expected action for DELETE_CENTER_FAIL', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response:{
          status: 'Unsuccessful',
          message: 'Event could not be editted'
        }
      });
    });

    const expectedActions = [
      {
        type: types.DELETE_CENTER_FAIL,
        //error: undefined
        error: {
           status: 'Unsuccessful',
           message: 'Event could not be editted',
        }
      }
    ]

    const store = mockStore({})

    return store.dispatch(deleteCenter(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

})