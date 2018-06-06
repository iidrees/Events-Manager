import addCenterReducer from '../../src/reducers/addCenterReducer';
import * as types from '../../src/actions/types';

describe('Add Center reducer Test', () => {
  const centers = [
    {
      name: 'The UNILAG CENTER',
      location: 'Lagos',
      address: 'Akoka, Yaba Lagos State',
      owner: 'The Idrees entertainment',
      capacity: 10000,
      description:
        'This is a center that can allow you grove as much as you may need to',
      userId: 1
    }
  ];

  xit('Should return initial state', () => {
    const state = {
      status: '',
      message: '',
      data: []
    };

    const result = addCenterReducer(state, {
      type: types.ADD_EVENT
    });

    expect(result).toEqual({
      status: '',
      message: '',
      data: []
    });
  });

  xit('Should return the state after center added', () => {
    const state = {
      status: '',
      message: '',
      data: []
    };

    const center = {
      message: 'Center Added Successfully',
      data: {
        data: []
      }
    };

    const result = addCenterReducer(state, {
      type: types.ADD_CENTER,
      center
    });

    expect(result).toEqual({
      status: 'Success',
      authenticated: true,
      message: 'Center Added Successfully',
      data: []
    });
  });

  xit('Should return state when add fails', () => {
    const state = {
      status: '',
      message: '',
      data: []
    };
    const error = {
      message: 'Center could not be added'
    };

    const result = addCenterReducer(state, {
      type: types.ADD_CENTER_FAIL,
      error
    });

    expect(result).toEqual({
      status: 'Unsuccessful',
      message: 'Center could not be added',
      data: []
    });
  });
});
