import addCenterReducer from '../../src/reducers/addCenterReducer.js';
import * as types from '../../src/actions/types.js';


describe('Add Center reducer Test', () => {
	const center = [{
        name: 'The UNILAG CENTER',
        location: 'Lagos',
        address: 'Akoka, Yaba Lagos State',
        owner: 'The Idrees entertainment',
        capacity: 10000,
        description: 'This is a center that can allow you grove as much as you may need to',
        userId: 1
       }
      // {
      //   name: 'The MUSON',
      //   location: 'Lagos Island',
      //   address: 'Obalende',
      //   owner: 'The Idrees entertainment',
      //   capacity: 10000,
      //   description: 'This is a center that can allow you grove as much as you may need to',
      //   userId: 2
      // },
      ]


	it('Should return initial state', () => {
		const state = {
			status: '',
			message: '',
			data: []
		}

		const result = addCenterReducer(state, {
			type: types.ADD_EVENT
		})

		expect(result).toEqual({
			status: '',
			message: '',
			data: []
		})
	});

	it('Should return the state after center added', () => {
		const state = {
			status: '',
			message: '',
			data: []
		}

		const res = {
			message: 'Center Added Successfully',
			data: {	
				data: center
			}
		}

		const result = addCenterReducer(state, {
			type: types.ADD_CENTER, res
		})

		expect(result).toEqual({
			status: 'Success',
			authenticated: true,
			message: 'Center Added Successfully',
			data: [{
        name: 'The UNILAG CENTER',
        location: 'Lagos',
        address: 'Akoka, Yaba Lagos State',
        owner: 'The Idrees entertainment',
        capacity: 10000,
        description: 'This is a center that can allow you grove as much as you may need to',
        userId: 1
       }]
		})
	});

it('Should return state when add fails', () => {
	const state = { 
		  status: '',
		  message: '',
		  data: []
		}
		const err = {
			response: {
				data: {
					message:'Center could not be added'
				}
			}
		}

		const result = addCenterReducer(state, {
			type: types.ADD_CENTER_FAIL, err
		})

		expect(result).toEqual({
			status: 'Unsuccessful',
			message:'Center could not be added',
			data: []
		})
})

})