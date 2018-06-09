import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount, render } from 'enzyme';
import { MemoryRouter as Router, withRouter } from 'react-router-dom';
import sinon from 'sinon';
import { centers } from '../actions/mocks/getCentersMocks';

import { Center } from '../../src/components/Center';

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
    centers: {
      status: 'Success',
      centers: centers
    },
    match: {
      params: {
        id: 1
      }
    },
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoZW50aWNhdGVkIjp0cnVlLCJpZCI6MSwiYWRtaW4iOnRydWUsInJvbGUiOiJzdXBlckFkbWluIiwiaXNTdXBlckFkbWluIjp0cnVlLCJuYW1lIjoiSWRyZWVzIiwiaWF0IjoxNTI3NTk5OTkzLCJleHAiOjE1Mjc2MzU5OTN9.UAzE5IOIN3RVO7E4JCOnwtzpp5vberbZn8jOflEf1JI',
    onChange: jest.fn(),
    dispatch: jest.fn()
  };

  it('should render component without throwing error', done => {
    expect(
      mount(
        <Router>
          <Center {...props} history={history} />
        </Router>
      ).length
    ).toEqual(1);
    done();
  });
  it('should render the toast when the status was unsuccessful', done => {
    props = {
      authenticated: true,
      user: {},
      centers: {
        status: 'Unsuccessful',
        centers: []
      },
      match: {
        params: {
          id: 1
        }
      },
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoZW50aWNhdGVkIjp0cnVlLCJpZCI6MSwiYWRtaW4iOnRydWUsInJvbGUiOiJzdXBlckFkbWluIiwiaXNTdXBlckFkbWluIjp0cnVlLCJuYW1lIjoiSWRyZWVzIiwiaWF0IjoxNTI3NTk5OTkzLCJleHAiOjE1Mjc2MzU5OTN9.UAzE5IOIN3RVO7E4JCOnwtzpp5vberbZn8jOflEf1JI',
      onChange: jest.fn(),
      dispatch: jest.fn()
    };

    let wrapper = mount(
      <Router>
        <Center {...props} history={history} />
      </Router>
    );
    expect(wrapper.find('div').length).toBeGreaterThan(2);

    done();
  });
  it('should the "No Centers Available" view ', done => {
    props = {
      authenticated: true,
      user: {},
      centers: {},
      match: {
        params: {
          id: 1
        }
      },
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoZW50aWNhdGVkIjp0cnVlLCJpZCI6MSwiYWRtaW4iOnRydWUsInJvbGUiOiJzdXBlckFkbWluIiwiaXNTdXBlckFkbWluIjp0cnVlLCJuYW1lIjoiSWRyZWVzIiwiaWF0IjoxNTI3NTk5OTkzLCJleHAiOjE1Mjc2MzU5OTN9.UAzE5IOIN3RVO7E4JCOnwtzpp5vberbZn8jOflEf1JI',
      onChange: jest.fn(),
      dispatch: jest.fn()
    };

    let wrapper = mount(
      <Router>
        <Center {...props} history={history} />
      </Router>
    );
    expect(wrapper.find('h1').length).toEqual(1);

    done();
  });
});
