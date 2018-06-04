import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount, render } from 'enzyme';

import sinon from 'sinon';

import localStorageMock from './mocks/localStorageMock';

import { NavBarMain } from '../../src/components/NavBarMain';

window.localStorage = localStorageMock;
window.localStorage.token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiYWRtaW4iOnRydWUsInJvbGUiOiJBZG1pbiIsImlzU3VwZXJBZG1pbiI6ZmFsc2UsIm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNTIzNDUyMjcwLCJleHAiOjE1MjM0ODgyNzB9.veeRWGTKnmU9qiZSG3H9aM3cbFUIBOKFfJJzSKLSijk';
describe('NavBarMain component', () => {
  const locations = [];
  const location = {};
  const history = {
    push(path) {
      locations.push(path);
    }
  };
  let props = {
    user: {
      status: 'Success',
      message: 'message',
      authenticated: true,
      admin: true,
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiYWRtaW4iOnRydWUsInJvbGUiOiJBZG1pbiIsImlzU3VwZXJBZG1pbiI6ZmFsc2UsIm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNTIzNDUyMjcwLCJleHAiOjE1MjM0ODgyNzB9.veeRWGTKnmU9qiZSG3H9aM3cbFUIBOKFfJJzSKLSijk'
    },
    onChange: () => {},
    onSubmit: () => {},
    dispatch: () => {}
  };
  let wrapper = shallow(
    <NavBarMain {...props} history={history} location={location} />
  );

  describe('NavBar and buttons', () => {
    it('should render without throwing an error', done => {
      wrapper = mount(
        <NavBarMain {...props} history={history} location={location} />
      );

      expect(wrapper.length).toEqual(1);
      expect(wrapper.find('div').length).toBeGreaterThan(0);
      expect(wrapper.find('#nav-logo').length).toBe(1);

      expect(wrapper.find('nav').length).toBe(1);
      done();
    });
  });
});
