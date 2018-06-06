import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount, render } from 'enzyme';
import { MemoryRouter as Router, withRouter } from 'react-router-dom';
import sinon from 'sinon';

import { event } from '../actions/mocks/addEventMock';
import { editCenter, imageUpload } from '../../src/actions/editCenter';
import { EditCenter } from '../../src/components/EditCenter';

describe('Landing component', () => {
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
    // status: '',

    authenticated: true,
    updateCenter: {
      status: 'Success',
      message: 'message',
      isLoading: true
    },
    center: {},
    user: {},
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoZW50aWNhdGVkIjp0cnVlLCJpZCI6MSwiYWRtaW4iOnRydWUsInJvbGUiOiJzdXBlckFkbWluIiwiaXNTdXBlckFkbWluIjp0cnVlLCJuYW1lIjoiSWRyZWVzIiwiaWF0IjoxNTI3NTk5OTkzLCJleHAiOjE1Mjc2MzU5OTN9.UAzE5IOIN3RVO7E4JCOnwtzpp5vberbZn8jOflEf1JI',

    onChange: jest.fn(),
    onSubmit: jest.fn(),
    onImageChange: jest.fn(),
    dispatch: jest.fn()
  };
  let wrapper = shallow(<EditCenter {...props} history={history} />);
  it('should render without throwing an error', done => {
    expect(mount(<EditCenter {...props} />).length).toEqual(1);
    done();
  });

  it('should respond to full rendering', done => {
    props = {
      updateCenter: {
        status: 'Unsuccessful'
      },
      match: {
        params: {
          id: 1
        }
      },
      center: {
        center: {
          id: 1,
          name: 'The Amity Center',
          location: 'Anthony Lagos',
          address: 'No 2, Lagos way, Lagos',
          owner: 'Idrees-kun',
          capacity: 23333,
          description:
            'This is a center that is a state of the art blah blah blah',
          imgUrl:
            'https://static.pexels.com/photos/169193/pexels-photo-169193.jpeg'
        }
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
      address: 'No 2, Lagos way, Lagos',
      owner: 'Idrees-kun',
      capacity: 23333,
      description: 'This is a center that is a state of the art blah blah blah',
      imgUrl: 'https://static.pexels.com/photos/169193/pexels-photo-169193.jpeg'
    };
    wrapper = mount(
      <Router>
        <EditCenter {...props} history={history} />
      </Router>
    );

    expect(wrapper.find('#admin-form').length).toEqual(1);

    expect(wrapper.setState(centerData));
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
