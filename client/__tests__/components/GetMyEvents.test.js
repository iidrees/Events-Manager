import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount, render } from 'enzyme';

import sinon from 'sinon';

import { GetMyEvents } from '../../src/components/GetMyEvents';

describe('GetMyEvents component', () => {
  let props = {
    // status: '',
    myEvents: {
      status: 'Success',
      message: 'message',
      authenticated: true,
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoZW50aWNhdGVkIjp0cnVlLCJp' +
        'ZCI6MSwiYWRtaW4iOnRydWUsInJvbGUiOiJzdXBlckFkbWluIiwiaXNTdXBlckFkbWluI' +
        'jp0cnVlLCJuYW1lIjoiSWRyZWVzIiwiaWF0IjoxNTI3NTk5OTkzLCJleHAiOjE1Mjc2M' +
        'zU5OTN9.UAzE5IOIN3RVO7E4JCOnwtzpp5vberbZn8jOflEf1JI'
    },
    onChange: () => {},
    onSubmit: () => {},
    dispatch: () => {}
  };
  let wrapper = shallow(<GetMyEvents {...props} history={history} />);

  it('should render without throwing an error', () => {
    expect(shallow(<GetMyEvents {...props} />).length).toEqual(1);
  });

  it('should render the whole component when there are no events', () => {
    props = {
      // status: '',
      myEvents: {
        status: 'Unsuccessful',
        message: 'message',
        authenticated: true,
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoZW50aWNhdGVkIjp0cnV' +
          'lLCJpZCI6MSwiYWRtaW4iOnRydWUsInJvbGUiOiJzdXBlckFkbWluIiwiaXNTdXB' +
          'lckFkbWluIjp0cnVlLCJuYW1lIjoiSWRyZWVzIiwiaWF0IjoxNTI3NTk5OTkzLCJl' +
          'eHAiOjE1Mjc2MzU5OTN9.UAzE5IOIN3RVO7E4JCOnwtzpp5vberbZn8jOflEf1JI'
      },
      onChange: () => {},
      dispatch: () => {}
    };
    wrapper = shallow(<GetMyEvents {...props} />);
    expect(wrapper).toMatchSnapshot();
    const action = wrapper.instance();
    const onChange = jest.spyOn(wrapper.instance(), 'onChange');
    action.onChange();
    expect(onChange).toBeCalled();
    expect(wrapper.find('h1').length).toBe(1);
  });
  it('should render the whole component when there are no events', done => {
    props = {
      // status: '',
      myEvents: {
        status: 'Success',
        message: 'message',
        authenticated: true,
        events: [
          {
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
          }
        ],
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoZW50aWNhdGVkIjp0c' +
          'nVlLCJpZCI6MSwiYWRtaW4iOnRydWUsInJvbGUiOiJzdXBlckFkbWluIiwiaXNT' +
          'dXBlckFkbWluIjp0cnVlLCJuYW1lIjoiSWRyZWVzIiwiaWF0IjoxNTI3NTk5OTkz' +
          'LCJleHAiOjE1Mjc2MzU5OTN9.UAzE5IOIN3RVO7E4JCOnwtzpp5vberbZn8jOflEf1JI'
      },
      onChange: () => {},
      dispatch: () => {}
    };
    wrapper = shallow(<GetMyEvents {...props} />);
    const action = wrapper.instance();
    const onChange = jest.spyOn(wrapper.instance(), 'onChange');
    action.onChange();
    expect(onChange).toBeCalled();
    expect(wrapper.find('#myevent').length).toEqual(1);
    done();
  });
});
