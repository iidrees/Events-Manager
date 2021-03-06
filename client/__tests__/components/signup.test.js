import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount, render } from 'enzyme';

import { Redirect, withRouter } from 'react-router-dom';
import sinon from 'sinon';

import { Signup } from '../../src/components/Signup';
import { userSignup } from '../../src/actions/user';
import mockStore from './mocks/mockStore';

describe('Signup component', () => {
  const locations = [];
  const history = {
    push(location) {
      locations.push(location);
    }
  };
  const props = {
    user: {
      status: 'Success',
      message: 'message',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoZW50aWNhdGVkIjp0cnVlLCJpZCI6MSwiYWRtaW4iOnRydWUsInJvbGUiOiJzdXBlckFkbWluIiwiaXNTdXBlckFkbWluIjp0cnVlLCJuYW1lIjoiSWRyZWVzIiwiaWF0IjoxNTI3NTk5OTkzLCJleHAiOjE1Mjc2MzU5OTN9.UAzE5IOIN3RVO7E4JCOnwtzpp5vberbZn8jOflEf1JI'
    },
    onChange: () => {},
    onSubmit: () => {},
    dispatch: () => {}
  };

  describe('Signup tags and elements, classes and id', () => {
    it('should render without throwing an error', done => {
      expect(shallow(<Signup {...props} />).length).toEqual(1);
      done();
    });
    it('renders a h3 header', done => {
      expect(true).toBe(true);
      expect(shallow(<Signup {...props} />).find('#h3-signup').length).toBe(1);
      done();
    });
    it('renders a h1 tag with string "Events Manager"', done => {
      expect(
        shallow(<Signup {...props} />).exists(<h1 id="signup-event" />)
      ).toEqual(true);
      done();
    });

    it('renders a name input tag ', done => {
      expect(shallow(<Signup {...props} />).find('#name').length).toEqual(1);
      done();
    });

    it('renders a email input tag ', done => {
      expect(shallow(<Signup {...props} />).find('#email').length).toEqual(1);
      done();
    });
    it('renders a password input tag ', done => {
      expect(shallow(<Signup {...props} />).find('#password').length).toEqual(
        1
      );
      done();
    });
    it('renders a password-confirm input tag ', done => {
      expect(
        shallow(<Signup {...props} />).find('#password-confirm').length
      ).toEqual(1);
      done();
    });
    it('renders a form submit button tag ', done => {
      expect(shallow(<Signup {...props} />).find('#signup-btn').length).toEqual(
        1
      );
      done();
    });

    it('renders all divs ', done => {
      expect(render(<Signup {...props} />).find('div').length).toBeGreaterThan(
        0
      );
      done();
    });

    it('renders all p tags ', done => {
      expect(render(<Signup {...props} />).find('p').length).toBeGreaterThan(0);
      done();
    });

    it('renders all span tags ', done => {
      expect(render(<Signup {...props} />).find('span').length).toBeGreaterThan(
        0
      );
      done();
    });
    it('renders all label tags ', done => {
      expect(
        render(<Signup {...props} />).find('label').length
      ).toBeGreaterThan(0);
      done();
    });
  });

  describe('SIGNUP FORM INPUT', () => {
    it('should respond to changes in name field event state  ', done => {
      const wrapper = shallow(<Signup {...props} />);
      wrapper.find('#name').simulate('change', {
        target: {
          name: 'name',
          value: 'Felix Eba'
        }
      });
      expect(wrapper.state('name')).toEqual('Felix Eba');
      done();
    });

    it('should respond to change in email field event state ', done => {
      const wrapper = shallow(<Signup {...props} />);
      wrapper.find('#email').simulate('change', {
        target: {
          name: 'email',
          value: 'felix.amande@andela.com'
        }
      });
      expect(wrapper.state('email')).toEqual('felix.amande@andela.com');
      done();
    });

    it('should respond to change in email field event state ', done => {
      const wrapper = shallow(<Signup {...props} />);
      wrapper.find('#password').simulate('change', {
        target: {
          name: 'password',
          value: '111111112'
        }
      });
      expect(wrapper.state('password')).toEqual('111111112');
      done();
    });
    it('should respond to change in email field event state ', done => {
      const wrapper = shallow(<Signup {...props} />);
      wrapper.find('#password-confirm').simulate('change', {
        target: {
          name: 'confirmPassword',
          value: '111111112'
        }
      });
      expect(wrapper.state('confirmPassword')).toEqual('111111112');
      done();
    });
    it('should respond to change when form is submitted', done => {
      const wrapper = shallow(<Signup {...props} />);

      const action = wrapper.instance();
      const signup = jest.spyOn(wrapper.instance(), 'onSubmit');
      action.onSubmit({ preventDefault: () => {} });
      expect(signup).toBeCalled();
      done();
    });

    it('should respond to change when component mounts', done => {
      const data = {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoZW50aWNhdGVkIjp0cnVlLCJpZCI6MSwiYWRtaW4iOnRydWUsInJvbGUiOiJzdXBlckFkbWluIiwiaXNTdXBlckFkbWluIjp0cnVlLCJuYW1lIjoiSWRyZWVzIiwiaWF0IjoxNTI3NTk5OTkzLCJleHAiOjE1Mjc2MzU5OTN9.UAzE5IOIN3RVO7E4JCOnwtzpp5vberbZn8jOflEf1JI'
      };
      const user = {
        status: 'Unsuccessful'
      };
      const wrapper = shallow(
        <Signup {...props} user={user} history={history} token={data.token} />
      );

      const action = wrapper.instance();
      const componentDidMount = jest.spyOn(
        wrapper.instance(),
        'componentDidMount'
      );

      action.componentDidMount();
      expect(componentDidMount).toBeCalled();
      done();
    });
  });
});
