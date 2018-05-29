import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';

import { editEvent } from '../../src/actions/editEvent';
import * as types from '../../src/actions/types';
import * as edit from './mocks/addEventMock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('TEST FOR ADD CENTER', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should return the expected Action for EDIT_EVENT ', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          status: 'Success',
          Message: 'Event added successfully updated',
          data: edit.event[0]
        }
      });
    });

    const expectedActions = [
      {
        type: types.EDIT_EVENT,
        event: {
          status: 'Success',
          Message: 'Event added successfully updated',
          data: edit.event[0]
        }
      }
    ];

    const store = mockStore({});

    return store.dispatch(editEvent(edit.event[0], 1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return the expected action for EDIT_EVENT_FAIL', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          status: 'Unsuccessful',
          message: 'Event could not be editted'
        }
      });
    });

    const expectedActions = [
      {
        type: types.EDIT_EVENT_FAIL,
        error: {
          status: 'Unsuccessful',
          message: 'Event could not be editted'
        }
      }
    ];

    const store = mockStore({});

    return store.dispatch(editEvent(1, edit.event[0])).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
