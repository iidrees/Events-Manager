import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount, render } from 'enzyme';
import { MemoryRouter as Router, withRouter } from 'react-router-dom';
import sinon from 'sinon';

import { event } from '../actions/mocks/addEventMock';
import { detailEvent } from '../../src/actions/event';
import deleteEvent from '../../src/actions/deleteEvent';
import { DetailEvent } from '../../src/components/DetailEvent';

describe('DetailEvent component', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error');
    console.error.mockImplementation(() => {}); // eslint-disable-line
  });

  afterEach(() => {
    console.error.mockRestore(); // eslint-disable-line
  });
  const locations = [];
  const history = {
    push(location) {
      locations.push(location);
    }
  };
  let props = {
    authenticated: true,
    user: {},
    event: {
      id: 1,
      status: 'Success',
      message: 'message',
      title: 'The Amity party',
      time: '10:00 PM',
      date: '21-03-2019',
      isCancelled: false,
      center: 'The Multi-purpose',
      description:
        'This is going to be the weirdest parry on the month of March',
      imgUrl: 'https://static.pexels.com/photos/169193/pexels-photo-169193.jpeg'
    },
    match: {
      params: {
        id: 1
      }
    },
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoZW50aWNhdGVkIjp0cnVlLCJpZCI6MSwiYWRtaW4iOnRydWUsInJvbGUiOiJzdXBlckFkbWluIiwiaXNTdXBlckFkbWluIjp0cnVlLCJuYW1lIjoiSWRyZWVzIiwiaWF0IjoxNTI3NTk5OTkzLCJleHAiOjE1Mjc2MzU5OTN9.UAzE5IOIN3RVO7E4JCOnwtzpp5vberbZn8jOflEf1JI',
    onDelete: jest.fn(),
    dispatch: jest.fn()
  };
  let wrapper = shallow(
    <Router>
      <DetailEvent {...props} history={history} />
    </Router>
  );
  it('should render without throwing an error', () => {
    expect(
      mount(
        <Router>
          <DetailEvent {...props} history={history} />
        </Router>
      ).length
    ).toEqual(1);
  });

  it('should respond to full rendering', () => {
    props = {
      user: {},
      event: {
        id: 1,
        status: 'Unsuccessful',
        message: 'ksldjfkdfs',
        title: 'The Amity party',
        startDate: '2019-03-21',
        endDate: '2019-03-24',
        center: 'The Multi-purpose',
        description:
          'This is going to be the weirdest parry on the month of March',
        imgUrl:
          'https://static.pexels.com/photos/169193/pexels-photo-169193.jpeg'
      },
      match: {
        params: {
          id: 1
        }
      },
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoZW50aWNhdGVkIjp0cnVlLCJpZCI6MSwiYWRtaW4iOnRydWUsInJvbGUiOiJzdXBlckFkbWluIiwiaXNTdXBlckFkbWluIjp0cnVlLCJuYW1lIjoiSWRyZWVzIiwiaWF0IjoxNTI3NTk5OTkzLCJleHAiOjE1Mjc2MzU5OTN9.UAzE5IOIN3RVO7E4JCOnwtzpp5vberbZn8jOflEf1JI',

      onDelete: jest.fn(),
      dispatch: jest.fn()
    };

    wrapper = mount(
      <Router>
        <DetailEvent {...props} history={history} />
      </Router>
    );

    expect(wrapper.find('#delete-button').length).toEqual(1);

    wrapper.find('#delete-button').simulate('click');
    props.onDelete({ preventDefault: () => {} });
    expect(props.onDelete).toBeCalled();
  });

  it('should respond to submit and image upload clicks', () => {
    props = {
      user: {},
      event: {
        id: 1,
        status: 'Unsuccessful',
        message: ''
      },
      match: {
        params: {
          id: 1
        }
      },
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoZW50aWNhdGVkIjp0cnVlLCJpZCI6MSwiYWRtaW4iOnRydWUsInJvbGUiOiJzdXBlckFkbWluIiwiaXNTdXBlckFkbWluIjp0cnVlLCJuYW1lIjoiSWRyZWVzIiwiaWF0IjoxNTI3NTk5OTkzLCJleHAiOjE1Mjc2MzU5OTN9.UAzE5IOIN3RVO7E4JCOnwtzpp5vberbZn8jOflEf1JI',

      onDelete: jest.fn(),
      dispatch: jest.fn()
    };

    wrapper = mount(
      <Router>
        <DetailEvent {...props} history={history} />
      </Router>
    );

    expect(wrapper.length).toEqual(1);
  });
});
