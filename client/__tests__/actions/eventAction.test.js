import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';

import { getMyEvents, detailEvent } from '../../src/actions/event';
import * as types from '../../src/actions/types';
import { events } from './mocks/getEventsMock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('TEST FOR THE GET EVENT ACTION', () => {
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
        response: {
          status: 'Success',
          Message: 'This are your events',
          data: events
        }
      });
    });

    const expectedActions = [
      {
        type: types.GET_MY_EVENTS,
        events: {
          status: 'Success',
          Message: 'This are your events',
          data: events
        }
      }
    ];

    const store = mockStore({});

    return store.dispatch(getMyEvents()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return the error response for EVENTS_FAILED', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          status: 'Unsuccessful',
          message: 'No event(s) Found'
        }
      });
    });

    const expectedActions = [
      {
        type: types.MY_EVENT_FAIL,
        err: {
          status: 'Unsuccessful',
          message: 'No event(s) Found'
        }
      }
    ];
    const store = mockStore({});
    return store.dispatch(getMyEvents()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

/* EVENT DETAILS TESTS */

describe('TEST FOR THE EVENT DETAIL ACTION', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should return the expected Action for GET_EVENT', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 'Success',
          Message: 'This is your event',
          data: events[0]
        }
      });
    });

    const expectedActions = [
      {
        type: types.GET_EVENT_DETAIL,
        event: {
          status: 'Success',
          Message: 'This is your event',
          data: events[0]
        }
      }
    ];

    const store = mockStore({});

    return store.dispatch(detailEvent()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return 404 error response', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          status: 'Unsuccessful',
          message: 'No event available, please post an event'
        }
      });
    });

    const expectedActions = [
      {
        type: types.EVENT_DETAIL_FAIL,
        error: {
          status: 'Unsuccessful',
          message: 'No event available, please post an event'
        }
      }
    ];
    const store = mockStore({});
    return store.dispatch(detailEvent()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return 400 error response', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          status: 'Unsuccessful',
          message: 'No such event is available'
        }
      });
    });

    const expectedActions = [
      {
        type: types.EVENT_DETAIL_FAIL,
        error: {
          status: 'Unsuccessful',
          message: 'No such event is available'
        }
      }
    ];

    const store = mockStore({});
    return store.dispatch(detailEvent()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
