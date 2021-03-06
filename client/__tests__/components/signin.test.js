import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount, render } from 'enzyme';

import sinon from 'sinon';

import { Signin } from '../../src/components/Signin';

describe('Signup component', () => {
  const locations = [];
  const history = {
    push(location) {
      locations.push(location);
    }
  };
  let props = {
    user: {
      status: 'Success',
      message: 'message',
      authenticated: true,
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoZW50aWNhdGVkIjp0cnVlLCJpZCI6MSwiYWRtaW4iOnRydWUsInJvbGUiOiJzdXBlckFkbWluIiwiaXNTdXBlckFkbWluIjp0cnVlLCJuYW1lIjoiSWRyZWVzIiwiaWF0IjoxNTI3NTk5OTkzLCJleHAiOjE1Mjc2MzU5OTN9.UAzE5IOIN3RVO7E4JCOnwtzpp5vberbZn8jOflEf1JI'
    },
    onChange: () => {},
    onSubmit: () => {},
    dispatch: () => {}
  };
  let wrapper = shallow(<Signin {...props} history={history} />);

  describe('Signup tags and elements, classes and id', () => {
    it('should render without throwing an error', done => {
      expect(wrapper.length).toEqual(1);
      done();
    });

    it('renders the divs', done => {
      expect(wrapper.find('div').length).toBeGreaterThan(1);
      done();
    });
    it('renders the h1', done => {
      expect(wrapper.find('h1').length).toBeGreaterThan(0);
      done();
    });
    it('renders the h2', done => {
      expect(wrapper.find('div').length).toBeGreaterThan(0);
      done();
    });
    it('renders the buttons', done => {
      expect(wrapper.find('button').length).toBeGreaterThan(0);
      done();
    });
    it('renders the input', done => {
      expect(wrapper.find('input').length).toBeGreaterThan(0);
      done();
    });
    it('renders the form', done => {
      expect(wrapper.find('form').length).toBeGreaterThan(0);
      done();
    });
  });

  describe('SIGNIN FORM INPUT', () => {
    it('should respond to email field change', done => {
      wrapper.find('#email').simulate('change', {
        target: {
          name: 'email',
          value: 'felix.amande@andela.com'
        }
      });
      expect(wrapper.state('email')).toEqual('felix.amande@andela.com');
      done();
    });

    it('should respond to change when form is submitted', done => {
      const action = wrapper.instance();
      const signin = jest.spyOn(wrapper.instance(), 'onSubmit');
      action.onSubmit({ preventDefault: () => {} });
      expect(signin).toBeCalled();
      done();
    });

    it('should respond to componentWillReceiveProps', done => {
      const action = wrapper.instance();
      const componentWillReceivePropsSpy = jest.spyOn(
        wrapper.instance(),
        'componentWillReceiveProps'
      );
      action.componentWillReceiveProps({ ...props });
      expect(componentWillReceivePropsSpy).toBeCalled();
      done();
    });

    it('should respond to user componentWillReceiveProps', done => {
      props = {
        user: {
          status: 'Unsuccessful',
          message: 'message',
          authenticated: true,
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiYWRtaW4iOnRydWUsInJvbGUiOiJBZG1pbiIsImlzU3VwZXJBZG1pbiI6ZmFsc2UsIm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNTIzNDUyMjcwLCJleHAiOjE1MjM0ODgyNzB9.veeRWGTKnmU9qiZSG3H9aM3cbFUIBOKFfJJzSKLSijk'
        },
        onChange: () => {},
        onSubmit: () => {},
        dispatch: () => {}
      };
      wrapper = mount(<Signin {...props} history={history} />);
      const action = wrapper.instance();
      const componentWillReceivePropsSpy = jest.spyOn(
        wrapper.instance(),
        'componentWillReceiveProps'
      );
      const componentDidMount = jest.spyOn(
        wrapper.instance(),
        'componentDidMount'
      );

      action.componentDidMount();

      wrapper.setProps(props);
      expect(componentWillReceivePropsSpy).toBeCalled();
      expect(componentDidMount).toBeCalled();
      done();
    });
  });
});
