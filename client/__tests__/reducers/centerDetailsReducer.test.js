import centerDetailsReducer from '../../src/reducers/centerDetailsReducer';
import centerReducer from '../../src/reducers/centerReducer';
import * as types from '../../src/actions/types';

describe('Test for Center Details reducer', () => {
  const center = {
    name: 'The UNILAG CENTER',
    location: 'Lagos',
    address: 'Akoka, Yaba Lagos State',
    owner: 'The Idrees entertainment',
    capacity: 10000,
    description:
      'This is a center that can allow you grove as much as you may need to',
    userId: 1
  };

  it('Should return initial state when no data is recieved', () => {
    const state = {
      status: '',
      message: '',
      center: {},
      events: []
    };

    const result = centerDetailsReducer(state, {
      type: types.ADD_EVENT
    });
    expect(result).toEqual({
      status: '',
      message: '',
      center: {},
      events: []
    });
  });
  it('Should return the correct data for center Details', () => {
    const state = {
      status: '',
      message: '',
      center: {},
      events: []
    };

    const response = {
      message: 'This is the event center',
      data: {
        center,
        events: {
          count: 1,
          rows: [
            {
              title: 'The Amity Party',
              description: 'The Party for andelans',
              date: '12 - 02 - 2018',
              time: '12 AM',
              center: 'UNILAG ESTATE',
              type: 'private',
              userId: 1,
              centerId: 2
            }
          ]
        }
      }
    };

    const result = centerDetailsReducer(state, {
      type: types.GET_CENTER,
      response
    });
    expect(result).toEqual({
      status: 'Success',
      message: 'This is the event center',
      count: 1,
      authenticated: true,
      center,
      events: [
        {
          title: 'The Amity Party',
          description: 'The Party for andelans',
          date: '12 - 02 - 2018',
          time: '12 AM',
          center: 'UNILAG ESTATE',
          type: 'private',
          userId: 1,
          centerId: 2
        }
      ]
    });
  });
  it('Should return fail for any error returned', () => {
    const initialState = {};

    const error = {
      message: 'No centers available'
    };

    const result = centerDetailsReducer(initialState, {
      type: types.GET_CENTER_FAIL,
      error
    });
    console.log('the result', result);
    expect(result).toEqual({
      status: 'Unsuccessful',
      message: 'No centers available',
      authenticated: false
    });
  });

  xit('should delete a center', () => {
    const initialState = {};

    const centerDeleted = {
      message: 'center deleted successfully',
      status: 'Success',
      authenticated: true
    };

    const result = centerReducer(initialState, {
      type: types.DELETE_CENTER,
      centerDeleted
    });
    expect(result).toEqual({
      message: 'center deleted successfully',
      status: 'Success',
      authenticated: true
    });
  });
});
