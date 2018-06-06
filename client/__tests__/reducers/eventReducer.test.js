/*Import event reducer to be tested and action types*/

import myEventReducer from '../../src/reducers/myEventsReducer';
import * as types from '../../src/actions/types';

/* Test suits testing the event reducer*/
describe('GET all events reducer', () => {
  it('should return the initial state when no action is sent', () => {
    const state = {
      status: '',
      message: '',
      data: []
    };
    const result = myEventReducer(state, {
      type: types.ADD_EVENT
    });
    expect(result).toEqual({
      status: '',
      message: '',
      data: []
    });
  });

  it('reducer for GET_MY_EVENTS', () => {
    const state = {
      status: '',
      message: '',
      events: []
    };

    const events = {
      message: 'These are your events',
      status: 'Success',
      data: {
        count: 2,
        rows: [
          {
            id: 1,
            title: 'The Amity party',
            time: '10:00 PM',
            date: '21-03-2019',
            type: 'public',
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
            center: 'The Multi-purpose',
            description:
              'This is going to be the weirdest parry on the month of March',
            imgUrl:
              'https://static.pexels.com/photos/169193/pexels-photo-169193.jpeg'
          }
        ]
      }
    };

    const results = myEventReducer(state, {
      type: types.GET_MY_EVENTS,
      events
    });
    expect(results).toEqual({
      status: 'Success',
      message: 'These are your events',
      count: 2,
      events: [
        {
          id: 1,
          title: 'The Amity party',
          time: '10:00 PM',
          date: '21-03-2019',
          type: 'public',
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
          center: 'The Multi-purpose',
          description:
            'This is going to be the weirdest parry on the month of March',
          imgUrl:
            'https://static.pexels.com/photos/169193/pexels-photo-169193.jpeg'
        }
      ]
    });
  });

  it('should return error reducer', () => {
    const state = {
      status: '',
      message: '',
      data: []
    };
    const err = {
      message: 'Data not available',
      error: 'error'
    };

    const result = myEventReducer(state, {
      type: types.MY_EVENT_FAIL,
      err
    });

    expect(result).toEqual({
      status: 'Unsuccessful',
      message: 'Data not available',
      error: 'error',
      data: []
    });
  });

  it('should return DELETE_EVENT_FAIL error reducer', () => {
    const state = {
      status: '',
      message: '',
      data: []
    };
    const error = {
      error: 'Data not available'
    };

    const result = myEventReducer(state, {
      type: types.DELETE_EVENT_FAIL,
      error
    });

    expect(result).toEqual({
      authenticated: false,
      status: 'Unsuccessful',
      message: '',
      error: 'Data not available',
      data: []
    });
  });

  it('reducer for DELETE_EVENT', () => {
    const state = {
      events: [
        {
          id: 1,
          title: 'The Amity party',
          time: '10:00 PM',
          date: '21-03-2019',
          type: 'public',
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
          center: 'The Multi-purpose',
          description:
            'This is going to be the weirdest parry on the month of March',
          imgUrl:
            'https://static.pexels.com/photos/169193/pexels-photo-169193.jpeg'
        }
      ]
    };

    const eventDeleted = {
      eventId: 1,
      message: 'These are your events'
    };

    const results = myEventReducer(state, {
      type: types.DELETE_EVENT,
      eventDeleted
    });
    expect(results).toEqual({
      authenticated: true,
      status: 'Success',
      message: eventDeleted.message,
      events: [
        {
          id: 2,
          title: 'The Amity party',
          time: '10:00 PM',
          date: '21-03-2019',
          type: 'public',
          center: 'The Multi-purpose',
          description:
            'This is going to be the weirdest parry on the month of March',
          imgUrl:
            'https://static.pexels.com/photos/169193/pexels-photo-169193.jpeg'
        }
      ]
    });
  });
});
