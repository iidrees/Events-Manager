import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';

import { editCenter, imageUpload } from '../../src/actions/editCenter';
import * as types from '../../src/actions/types';
import * as edit from './mocks/addCenterMock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('TEST FOR EDIT CENTER', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should return the expected Action for EDIT_CENTER ', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          status: 'Success',
          Message: 'Center added successfully updated',
          data: edit.center[0]
        }
      });
    });

    const expectedActions = [
      {
        type: types.EDIT_CENTER,
        center: {
          status: 'Success',
          Message: 'Center added successfully updated',
          data: edit.center[0]
        }
      }
    ];

    const store = mockStore({});

    return store.dispatch(editCenter(1, edit.center[0])).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return the expected action for EDIT_CENTER_FAIL', () => {
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
        type: types.EDIT_CENTER_FAIL,
        error: {
          status: 'Unsuccessful',
          message: 'Center could not be added'
        }
      }
    ];

    const store = mockStore({});

    return store.dispatch(editCenter(1, edit.center[0])).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should return the expected action', () => {
    const centerData = {
      name: 'The Amity Center',
      location: 'Anthony Lagos',
      address: 'No 2, Lagos way, Lagos',
      owner: 'Idrees-kun',
      capacity: 23333,
      description: 'This is a center that is a state of the art blah blah blah',
      imgFile:
        'https://static.pexels.com/photos/169193/pexels-photo-169193.jpeg'
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          error: 'Image upload failed'
        }
      });
    });
    const expectedActions = [
      { type: types.EDIT_CENTER_START },
      {
        type: types.ADD_IMG_FAIL,

        error: 'Image upload failed'
      }
    ];
    const store = mockStore({});
    return store.dispatch(imageUpload(1, centerData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
