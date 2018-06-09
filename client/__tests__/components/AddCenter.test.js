import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount, render } from 'enzyme';

import { MemoryRouter as Router, withRouter } from 'react-router-dom';
import sinon from 'sinon';

import { AddCenter } from '../../src/components/AddCenter';

import mockStore from './mocks/mockStore';

describe('AddCenter component', () => {
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
    createCenter: {
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

  let wrapper = shallow(<AddCenter {...props} />);

  it('should render component without throwing error', () => {
    expect(mount(<AddCenter {...props} />).length).toEqual(1);
  });

  it('should respond to full rendering', done => {
    props = {
      centerData: {
        name: 'The Amity Center',
        location: 'Anthony Lagos',
        owner: 'Idrees-kun',
        capacity: 23333,
        description:
          'This is a center that is a state of the art blah blah blah',
        imgFile:
          'https://static.pexels.com/photos/169193/pexels-photo-169193.jpeg'
      },
      createCenter: {
        status: '',
        message: 'message',
        isLoading: false
      },

      user: {},
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoZW50aWNhdGVkIjp0cnVlLCJpZCI6MSwiYWRtaW4iOnRydWUsInJvbGUiOiJzdXBlckFkbWluIiwiaXNTdXBlckFkbWluIjp0cnVlLCJuYW1lIjoiSWRyZWVzIiwiaWF0IjoxNTI3NTk5OTkzLCJleHAiOjE1Mjc2MzU5OTN9.UAzE5IOIN3RVO7E4JCOnwtzpp5vberbZn8jOflEf1JI',
      onChange: jest.fn(),
      onSubmit: jest.fn(),
      onImageChange: jest.fn(),
      dispatch: jest.fn()
    };

    const centerData = {
      name: 'The Amity Center',
      location: 'Anthony Lagos',
      owner: 'Idrees-kun',
      capacity: 23333,
      description: 'This is a center that is a state of the art blah blah blah',
      imgUrl: 'https://static.pexels.com/photos/169193/pexels-photo-169193.jpeg'
    };
    wrapper = mount(<AddCenter {...props} />);

    expect(wrapper.find('#admin-form').length).toEqual(1);
    expect(wrapper.setState(centerData));
    wrapper.find('#admin-form').simulate('submit');
    props.onImageChange({ preventDefault: () => {} });
    props.onSubmit({ preventDefault: () => {} });
    expect(props.onSubmit).toBeCalled();
    expect(props.onImageChange).toBeCalled();
    done();
  });
  it('should respond to submit and image upload clicks', done => {
    props = {
      centerData: {
        name: 'The Amity Center',
        location: 'Anthony Lagos',
        owner: 'Idrees-kun',
        capacity: 23333,
        description:
          'This is a center that is a state of the art blah blah blah',
        imgFile:
          'https://static.pexels.com/photos/169193/pexels-photo-169193.jpeg'
      },
      createCenter: {
        status: 'Successful',
        message: 'message',
        isLoading: false
      },

      user: {},
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoZW50aWNhdGVkIjp0cnVlLCJpZCI6MSwiYWRtaW4iOnRydWUsInJvbGUiOiJzdXBlckFkbWluIiwiaXNTdXBlckFkbWluIjp0cnVlLCJuYW1lIjoiSWRyZWVzIiwiaWF0IjoxNTI3NTk5OTkzLCJleHAiOjE1Mjc2MzU5OTN9.UAzE5IOIN3RVO7E4JCOnwtzpp5vberbZn8jOflEf1JI',
      onChange: jest.fn(),
      onSubmit: jest.fn(),
      onImageChange: jest.fn(),
      dispatch: jest.fn()
    };

    wrapper.find('#file-center1').simulate('change', {
      target: {
        name: 'images',
        files: [{ data: 'lasiikdjlas', type: 'image/j' }]
      }
    });
    expect(wrapper.state('files')).toEqual(undefined);
    done();
  });

  it('should respond to change in email field event state ', done => {
    props = {
      centerData: {
        name: 'The Amity Center',
        location: 'Anthony Lagos',
        owner: 'Idrees-kun',
        capacity: 23333,
        description:
          'This is a center that is a state of the art blah blah blah',
        imgFile:
          'https://static.pexels.com/photos/169193/pexels-photo-169193.jpeg'
      },
      createCenter: {
        status: 'Unsuccessful',
        message: 'message',
        isLoading: false
      },

      user: {},
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoZW50aWNhdGVkIjp0cnVlLCJpZCI6MSwiYWRtaW4iOnRydWUsInJvbGUiOiJzdXBlckFkbWluIiwiaXNTdXBlckFkbWluIjp0cnVlLCJuYW1lIjoiSWRyZWVzIiwiaWF0IjoxNTI3NTk5OTkzLCJleHAiOjE1Mjc2MzU5OTN9.UAzE5IOIN3RVO7E4JCOnwtzpp5vberbZn8jOflEf1JI',
      onChange: jest.fn(),
      onSubmit: jest.fn(),
      onImageChange: jest.fn(),
      dispatch: jest.fn()
    };
    const wrapper = mount(<AddCenter {...props} />);
    wrapper.find('#example-text-input1').simulate('change', {
      target: {
        name: 'name',
        value: 'The amity event'
      }
    });
    expect(wrapper.state('name')).toEqual('The amity event');
    done();
  });
});
