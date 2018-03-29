import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';

import { deleteEvent } from '../../src/actions/deleteEventAction';
import * as types from '../../src/actions/types';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)

describe('TEST FOR DELETE EVENT', () => {
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
          Message: 'Event Successfuly Deleted'
        }
      });
    });
 
    const expectedActions = [
      {
        type: types.DELETE_EVENT,
        eventDeleted: {
          status: 'Success',
          Message: 'Event Successfuly Deleted'
        }
      }
    ]

    const store = mockStore({ })

    return store.dispatch(deleteEvent()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return the expected action for DELETE_EVENT_FAIL', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response:{
          status: 'Unsuccessful',
          message: 'Event could not be deleted'
        }
      });
    });

    const expectedActions = [
      {
        type: types.DELETE_EVENT_FAIL,
        //error: undefined
        error: {
           status: 'Unsuccessful',
           message: 'Event could not be deleted',
        }
      }
    ]

    const store = mockStore({})

    return store.dispatch(deleteEvent(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

})