import centerDetailsReducer from '../../src/reducers/centerDetailsReducer';
import centerReducer from '../../src/reducers/centerReducer';
import * as types from '../../src/actions/types';
import { events } from '../actions/mocks/getEventsMock';

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
    expect(result).toEqual({
      status: 'Unsuccessful',
      message: 'No centers available',
      authenticated: false
    });
  });

  it('Should return fail for any error returned', () => {
    const initialState = {
      status: '',
      message: '',
      center: {},
      events: []
    };

    const error = {
      message: 'No event available to be cancelled'
    };

    const result = centerDetailsReducer(initialState, {
      type: types.CANCEL_EVENT_FAIL,
      error
    });
    expect(result).toEqual({
      center: {},
      events: [],
      status: 'Unsuccessful',
      message: 'No event available to be cancelled',
      authenticated: false
    });
  });

  it('Should return the correct data for CANCEL_EVENT', () => {
    const state = {
      events,
      center
    };

    const response = {
      newEvent: {
        id: 1,
        title: 'The Amity party',
        time: '10:00 PM',
        date: '21-03-2019',
        type: 'public',
        isCancelled: true,
        center: 'The Multi-purpose',
        description:
          'This is going to be the weirdest parry on the month of March',
        imgUrl:
          'https://static.pexels.com/photos/169193/pexels-photo-169193.jpeg'
      }
    };

    const result = centerDetailsReducer(state, {
      type: types.CANCEL_EVENT,
      response
    });
    expect(result).toEqual({
      events: [
        {
          id: 1,
          title: 'The Amity party',
          time: '10:00 PM',
          date: '21-03-2019',
          type: 'public',
          isCancelled: true,
          center: 'The Multi-purpose',
          description:
            'This is going to be the weirdest parry on the month of March',
          imgUrl:
            'https://static.pexels.com/photos/169193/pexels-photo-169193.jpeg'
        },
        {
          id: 2,
          title: 'The Amity party',
          time: '10:00 PM',
          date: '21-03-2019',
          type: 'public',
          isCancelled: true,
          center: 'The Multi-purpose',
          description:
            'This is going to be the weirdest parry on the month of March',
          imgUrl:
            'https://static.pexels.com/photos/169193/pexels-photo-169193.jpeg'
        },
        {
          id: 3,
          title: 'The Amity party',
          time: '10:00 PM',
          date: '21-03-2019',
          type: 'public',
          isCancelled: true,
          center: 'The Multi-purpose',
          description:
            'This is going to be the weirdest parry on the month of March',
          imgUrl:
            'https://static.pexels.com/photos/169193/pexels-photo-169193.jpeg'
        },
        {
          id: 4,
          title: 'The Amity party',
          time: '10:00 PM',
          date: '21-03-2019',
          type: 'public',
          isCancelled: true,
          center: 'The Multi-purpose',
          description:
            'This is going to be the weirdest parry on the month of March',
          imgUrl:
            'https://static.pexels.com/photos/169193/pexels-photo-169193.jpeg'
        },
        {
          id: 5,
          title: 'The Amity party',
          time: '10:00 PM',
          date: '21-03-2019',
          isCancelled: true,
          type: 'public',
          center: 'The Multi-purpose',
          description:
            'This is going to be the weirdest parry on the month of March',
          imgUrl:
            'https://static.pexels.com/photos/169193/pexels-photo-169193.jpeg'
        }
      ],
      center
    });
  });
});
