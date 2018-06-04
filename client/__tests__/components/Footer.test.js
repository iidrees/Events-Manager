import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount, render } from 'enzyme';

import sinon from 'sinon';

import Footer from '../../src/components/Footer';

describe('Landing component', () => {
  it('should render without throwing an error', done => {
    expect(shallow(<Footer />).length).toEqual(1);
    expect(<Footer />).toMatchSnapshot();
    done();
  });
});
