import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount, render } from 'enzyme';
import { MemoryRouter as Router, withRouter } from 'react-router-dom';
import sinon from 'sinon';

import { event } from '../actions/mocks/addEventMock';
import { editEvent, imageUpload } from '../../src/actions/editEvent';
import { EditEvent } from '../../src/components/EditEvent';

describe('EditEvent component', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error');
    console.error.mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });
  const locations = [];
  const history = {
    push(location) {
      locations.push(location);
    }
  };
  let props = {
    authenticated: true,
    editEvents: {
      status: 'Success',
      message: 'message',
      isLoading: true
    },
    match: {
      params: {
        id: 1
      }
    },
    centers: [],
    user: {},
    event: {},
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoZW50aWNhdGVkIjp0cnVlLCJpZCI6MSwiYWRtaW4iOnRydWUsInJvbGUiOiJzdXBlckFkbWluIiwiaXNTdXBlckFkbWluIjp0cnVlLCJuYW1lIjoiSWRyZWVzIiwiaWF0IjoxNTI3NTk5OTkzLCJleHAiOjE1Mjc2MzU5OTN9.UAzE5IOIN3RVO7E4JCOnwtzpp5vberbZn8jOflEf1JI',

    onChange: jest.fn(),
    onSubmit: jest.fn(),
    onImageChange: jest.fn(),
    dispatch: jest.fn()
  };
  let wrapper = shallow(<EditEvent {...props} />);
  it('should render without throwing an error', done => {
    expect(mount(<EditEvent {...props} />).length).toEqual(1);
    done();
  });

  it('should respond to full rendering', done => {
    props = {
      editEvents: {
        status: 'Unsuccessful'
      },
      centers: {
        centers: [
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
      },
      user: {},
      match: {
        params: {
          id: 1
        }
      },
      event: {
        status: '',
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
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoZW50aWNhdGVkIjp0cnVlLCJpZCI6MSwiYWRtaW4iOnRydWUsInJvbGUiOiJzdXBlckFkbWluIiwiaXNTdXBlckFkbWluIjp0cnVlLCJuYW1lIjoiSWRyZWVzIiwiaWF0IjoxNTI3NTk5OTkzLCJleHAiOjE1Mjc2MzU5OTN9.UAzE5IOIN3RVO7E4JCOnwtzpp5vberbZn8jOflEf1JI',

      onChange: jest.fn(),
      onSubmit: jest.fn(),
      onImageChange: jest.fn(),
      dispatch: jest.fn()
    };
    const eventData = {
      status: '',
      title: 'The Amity party',
      time: '10:00 PM',
      date: '21-03-2019',
      type: 'public',
      center: 'The Multi-purpose',
      description:
        'This is going to be the weirdest parry on the month of March',
      imgUrl: 'https://static.pexels.com/photos/169193/pexels-photo-169193.jpeg'
    };
    wrapper = mount(
      <Router>
        <EditEvent {...props} history={history} />
      </Router>
    );

    expect(wrapper.find('#form-event1').length).toEqual(1);
    expect(wrapper.setState(eventData));
    wrapper.find('form').simulate('submit');
    props.onImageChange({ preventDefault: () => {} });
    props.onSubmit({ preventDefault: () => {} });
    expect(props.onSubmit).toBeCalled();
    done();
  });

  it('should respond to submit and image upload clicks', done => {
    wrapper.find('#input-file').simulate('change', {
      target: {
        name: 'images',
        files: [{ data: 'lakjdlhasjhdljhajf', type: 'image/jpeg' }]
      }
    });

    expect(wrapper.state('images')).toEqual(undefined);
    done();
  });
  it('should respond to submit and image upload clicks', done => {
    wrapper.find('#input-file').simulate('change', {
      target: {
        name: 'images',
        files: [{ data: 'lakjdlhasjhdljhajf', type: 'image/jpg' }]
      }
    });

    expect(wrapper.state('images')).toEqual(undefined);
    done();
  });
});
