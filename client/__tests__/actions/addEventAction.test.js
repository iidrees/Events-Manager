import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';

import { addEvent } from '../../src/actions/addEventActions';
import * as types from '../../src/actions/types';
import { event } from './mocks/addEventMock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)

describe('TEST FOR ADD EVENTS', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should return the expected Action for GET_EVENTS', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response:{
          status: 'Success',
          Message: 'Event added successfully',
          data: event[0]
        }
      });
    });

    const expectedActions = [
      {
        type: types.GET_EVENT,
        event: event[0]
      }
    ]

    const store = mockStore({})

    return store.dispatch(addEvent(event[0],1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return the expected action for ADD_EVENT_FAIL', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response:{
          status: 'Unsuccessful',
          message: 'Event could not be added'
        }
      });
    });

    const expectedActions = [
      {
        type: types.ADD_EVENT_FAIL,
        error: {
          status: 'Unsuccessful',
          message: 'Event could not be added',
        }
      }
    ]

    const store = mockStore({})

    return store.dispatch(addEvent(event[0],1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

})