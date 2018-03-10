import detailsEventReducer from '../../src/reducers/detailsEventReducer';
import * as types from '../../src/actions/types';


describe('Event details reducer test', () => {
  
  it('Should return initial state', () => {
    const initialState = {
      authenticated: false,
      status: '',
      message: '',
      data: []
    };

    const result = detailsEventReducer(initialState, {
      type: types.ADD_CENTER
    })
    expect(result).toEqual(initialState)
  })

  it('Should return an event data', () => {
    const initialState = {
      status: '',
      message: '',
      data: ''
    }

    const event= {
      message: 'This is your event',
      data: {
        data: [{
          id: 1,
          title: 'The Amity Party',
          description: 'The Party for andelans',
          date: '12 - 02 - 2018',
          time: '12 AM',
          center: 'UNILAG ESTATE',
          type: 'private',
          userId: 1,
          centerId: 2
        }]
      }
    }

    const result = detailsEventReducer(initialState, {
      type: types.GET_EVENT, event
    })

    expect(result).toEqual({
      authenticated:true,
      status: 'Success',
      message: 'This is your event',
      data: [{
        id: 1,
        title: 'The Amity Party',
        description: 'The Party for andelans',
				date: '12 - 02 - 2018',
				time: '12 AM',
				center: 'UNILAG ESTATE',
				type: 'private',
				userId: 1,
				centerId: 2
      }]
    })
  })
})