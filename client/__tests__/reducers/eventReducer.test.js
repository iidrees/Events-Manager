/*Import event reducer to be tested and action types*/

import eventReducer from '../../src/reducers/eventReducer.js';
import * as types from '../../src/actions/types.js';

/* Test suits testing the event reducer*/
describe('GET all events reducer', () => {

	it('should return the initial state when no action is sent', () => {
		const state = { 
		  status: '',
		  message: '',
		  data: []
		}
		const result = eventReducer(state, {
			type: types.ADD_EVENT
		})
		expect(result).toEqual({ 
		  status: '',
		  message: '',
		  data: []
		})
	});

	it('reducer for GET_EVENTS', () => {
		const state = { 
		  
		  status: '',
		  message: '',
		  data: []
		}

		const events = { 
			message: 'These are your events',
			data: {
				data: ["1234"]
			}
		}

		const results = eventReducer(state, 
			{type: types.GET_EVENTS, events})
		expect(results).toEqual({
			
			status: 'Success',
			message: 'These are your events',
			data: ["1234"]
		})
	});

	it('should return error reducer', () => {
		const state = { 
		  status: '',
		  message: '',
		  data: []
		}
		const err = {
			response: {
				data: {
					message:'Data not available'
				}
			}
		}

		const result = eventReducer(state, {
			type: types.EVENT_FAILED, err
		})

		expect(result).toEqual({
			status: 'Unsuccessful',
			message: 'Data not available',
			data: []
		})
	});
})