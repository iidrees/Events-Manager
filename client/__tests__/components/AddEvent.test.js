import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount, render } from 'enzyme';

import { MemoryRouter as Router, withRouter } from 'react-router-dom';
import sinon from 'sinon';

import { AddEvent } from '../../src/components/AddEvent';

import mockStore from './mocks/mockStore';

describe('AddEvent component', () => {
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
    event: {
      status: 'Success',
      message: 'message',
      isLoading: true
    },
    user: {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoZW50aWNhdGVkIjp0cnVlLCJpZCI6MSwiYWRtaW4iOnRydWUsInJvbGUiOiJzdXBlckFkbWluIiwiaXNTdXBlckFkbWluIjp0cnVlLCJuYW1lIjoiSWRyZWVzIiwiaWF0IjoxNTI3NTk5OTkzLCJleHAiOjE1Mjc2MzU5OTN9.UAzE5IOIN3RVO7E4JCOnwtzpp5vberbZn8jOflEf1JI'
    },
    onChange: () => {},
    onSubmit: () => {},
    dispatch: () => {}
  };

  let wrapper = shallow(<AddEvent {...props} />);

  it('should render component without throwing error', () => {
    expect(mount(<AddEvent {...props} />).length).toEqual(1);
  });

  it('should respond to full rendering', done => {
    props = {
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
    wrapper = mount(<AddEvent {...props} />);

    expect(wrapper.find('#add-event-form').length).toEqual(1);
    expect(wrapper.setState(eventData));
    wrapper.find('form').simulate('submit');
    props.onImageChange({ preventDefault: () => {} });
    props.onSubmit({ preventDefault: () => {} });
    expect(props.onSubmit).toBeCalled();
    expect(props.onImageChange).toBeCalled();
    done();
  });
  it('should respond to submit and image upload clicks', done => {
    wrapper.find('#input-file1').simulate('change', {
      target: {
        name: 'images',
        files: [{ data: 'lasiikdjlas', type: 'image/jpeg' }]
      }
    });

    expect(wrapper.state('images')).toEqual(undefined);
    done();
  });
  it('should respond to submit and image upload clicks', done => {
    wrapper.find('#input-file1').simulate('change', {
      target: {
        name: 'files',
        files: [{ data: 'aj,shkjd', type: 'image/jpg' }]
      }
    });

    expect(wrapper.state('#input-file1')).toEqual(undefined);
    done();
  });
  it('should respond to change in email field event state ', done => {
    const wrapper = mount(<AddEvent {...props} />);
    wrapper.find('#add-event-form1').simulate('change', {
      target: {
        name: 'title',
        value: 'The amity event'
      }
    });
    expect(wrapper.state('title')).toEqual('The amity event');
    done();
  });
});
