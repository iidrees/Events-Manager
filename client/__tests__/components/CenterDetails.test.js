import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount, render } from 'enzyme';
import { MemoryRouter as Router, withRouter } from 'react-router-dom';
import sinon from 'sinon';

import { events } from '../actions/mocks/getEventsMock';
import { centerDetails, cancelEvent } from '../../src/actions/centerDetails';
import deleteCenter from '../../src/actions/deleteCenter';
import { DetailEvent, CenterDetails } from '../../src/components/CenterDetails';

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
    center: {
      id: 1,
      name: 'The Amity Center',
      location: 'Anthony Lagos',
      address: 'No 2, Lagos way, Lagos',
      owner: 'Idrees-kun',
      capacity: 23333,
      description: 'This is a center that is a state of the art blah blah blah',
      imgUrl: 'https://static.pexels.com/photos/169193/pexels-photo-169193.jpeg'
    },
    events,
    match: {
      params: {
        id: 1
      }
    },
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoZW50aWNhdGVkIjp0cnVlLCJpZCI6MSwiYWRtaW4iOnRydWUsInJvbGUiOiJzdXBlckFkbWluIiwiaXNTdXBlckFkbWluIjp0cnVlLCJuYW1lIjoiSWRyZWVzIiwiaWF0IjoxNTI3NTk5OTkzLCJleHAiOjE1Mjc2MzU5OTN9.UAzE5IOIN3RVO7E4JCOnwtzpp5vberbZn8jOflEf1JI',
    onDelete: jest.fn(),
    dispatch: jest.fn(),
    onCancel: jest.fn(),
    onChange: jest.fn()
  };
  let wrapper = shallow(
    <Router>
      <CenterDetails {...props} history={history} />
    </Router>
  );

  it('should render without throwing an error', () => {
    expect(
      mount(
        <Router>
          <CenterDetails {...props} history={history} />
        </Router>
      ).length
    ).toEqual(1);
  });
  expect(
    <Router>
      <CenterDetails {...props} history={history} />
    </Router>
  ).toMatchSnapshot();
});
