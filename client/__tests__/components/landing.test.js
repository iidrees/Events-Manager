import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount, render } from 'enzyme';

import sinon from 'sinon';

import { LandingPage } from '../../src/components/Landing';

describe('Landing component', () => {
  it('should render without throwing an error', done => {
    expect(shallow(<LandingPage />).length).toEqual(1);
    done();
  });

  it('should render while storing token in localstorage', done => {
    const wrapper = shallow(<LandingPage />);
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
