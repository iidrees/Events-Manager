import centerReducer from '../../src/reducers/centerReducer';
import * as types from '../../src/actions/types';




describe('Show and return event centers', () => {
  it('should return the initial state where no data is received from the API', () => {
    const initialState = [];
    const result = centerReducer(initialState, {
      type: types.ADD_CENTER
    })

    expect(result).toEqual(initialState)
  })

  it('should retuen an array of centers', () => {
    const initialState = [];

    const centersOne = [{
        id: 1,
        name: 'Muson Center',
        location: 'Lagos',
        status: 'Free',
        address: 'The Shrine',
        owner: 'The Civil Society',
        capacity: 2000,
        description: 'This venue is a great place to make things happen',
        userId: 1
      }]

      const centers = {
        message: 'Success',
        status: 'Success',
        data: {
          data: centersOne
        }
      }

      const result = centerReducer(initialState, {
        type: types.CENTERS_SUCCESS, centers
      })
      expect(result).toEqual(centersOne)
  })

  it('should return an error reducer', () => {
    const initialState = []

    const err = {
      data: {
        message: 'No Centers Found',
        Status: 'Unsuccessful'
      }
    }

    const result = centerReducer(initialState, {
      type: types.CENTERS_ERRORS, err
    })

    expect(result).toEqual(err.data)
  })
})