import centerReducer from '../../src/reducers/centerReducer';
import * as types from '../../src/actions/types';

describe('Show and return event centers', () => {
  it('should return the initial state where no data is received from the API', () => {
    const initialState = [];
    const result = centerReducer(initialState, {
      type: types.ADD_CENTER
    });

    expect(result).toEqual(initialState);
  });

  it('should retuen an array of centers', () => {
    const initialState = {
      status: '',
      message: '',
      centers: []
    };

    const centersOne = [
      {
        id: 1,
        name: 'Muson Center',
        location: 'Lagos',
        status: 'Free',
        address: 'The Shrine',
        owner: 'The Civil Society',
        capacity: 2000,
        description: 'This venue is a great place to make things happen',
        userId: 1
      }
    ];

    const centers = {
      authenticated: true,
      message: 'Success',
      status: 'Success',
      data: {
        rows: [
          {
            id: 1,
            name: 'Muson Center',
            location: 'Lagos',
            status: 'Free',
            address: 'The Shrine',
            owner: 'The Civil Society',
            capacity: 2000,
            description: 'This venue is a great place to make things happen',
            userId: 1
          }
        ],
        count: 1
      }
    };

    const result = centerReducer(initialState, {
      type: types.CENTERS_SUCCESS,
      centers
    });
    expect(result).toEqual({
      authenticated: true,
      message: 'Success',
      status: 'Success',
      centers: [
        {
          id: 1,
          name: 'Muson Center',
          location: 'Lagos',
          status: 'Free',
          address: 'The Shrine',
          owner: 'The Civil Society',
          capacity: 2000,
          description: 'This venue is a great place to make things happen',
          userId: 1
        }
      ],
      count: 1
    });
  });

  it('should return an error reducer', () => {
    const initialState = [];

    const error = {
      authenticated: false,
      message: 'No Centers Found',
      status: 'Unsuccessful',
      error: 'errors'
    };

    const result = centerReducer(initialState, {
      type: types.CENTERS_ERRORS,
      error
    });

    expect(result).toEqual(error);
  });

  xit('should delete a center', () => {
    const initialState = {};

    const centers = [
      {
        id: 1,
        name: 'The UNILAG CENTER',
        location: 'Lagos',
        address: 'Akoka, Yaba Lagos State',
        owner: 'The Idrees entertainment',
        capacity: 10000,
        description:
          'This is a center that can allow you grove as much as you may need to',
        userId: 1
      },
      {
        id: 2,
        name: 'The UNILAG CENTER',
        location: 'Lagos',
        address: 'Akoka, Yaba Lagos State',
        owner: 'The Idrees entertainment',
        capacity: 10000,
        description:
          'This is a center that can allow you grove as much as you may need to',
        userId: 2
      }
    ];
    const centerDeleted = {
      message: 'center deleted successfully',
      status: 'Success',
      centers,
      authenticated: true
    };

    const result = centerReducer((initialState.state['centers'] = centers), {
      type: types.DELETE_CENTER,
      centerDeleted
    });

    expect(result).toEqual({
      message: 'center deleted successfully',
      status: 'Success',
      centers: centers,
      authenticated: true
    });
  });
});
