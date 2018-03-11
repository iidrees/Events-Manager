import centerDetailsReducer from '../../src/reducers/CenterDetailsReducer';
import * as types from '../../src/actions/types';


describe('Test for Center Details reducer', () => {

	const centerDetails = [{
        name: 'The UNILAG CENTER',
        location: 'Lagos',
        address: 'Akoka, Yaba Lagos State',
        owner: 'The Idrees entertainment',
        capacity: 10000,
        description: 'This is a center that can allow you grove as much as you may need to',
        userId: 1,
        data: {
          data: {
						events: [{
								title: 'The Amity Party',
                description: 'The Party for andelans',
								date: '12 - 02 - 2018',
								time: '12 AM',
								center: 'UNILAG ESTATE',
								type: 'private',
								userId: 1,
								centerId: 2
										}]
									}
								}
       }
      ]


	it('Should return initial state when no data is recieved', () => {
		const state = { 
		status: '',
		message: '',
		data: [],
		events: []
		}


		const result = centerDetailsReducer(state, {
			type: types.ADD_EVENT
		})
		expect(result).toEqual({ 
		status: '',
		message: '',
		data: [],
		events: []
		})
	});
	xit('Should return the correct data for center Details', () => {
		const state = { 
		status: '',
		message: '',
		data: [],
		events: []
		}

		const center = {
			message: 'This is the event center',
			data: {
				data: centerDetails,
				
			}
		}

		const result = centerDetailsReducer(state, {
			type: types.GET_CENTER, center
		})
		expect(result).toEqual({ 
		status: 'Success',
		message: 'This is the event center',
		authenticated: true,
		data: centerDetails,
      events: [{
				title: 'The Amity Party',
        description: 'The Party for andelans',
        date: '12 - 02 - 2018',
        time: '12 AM',
        center: 'UNILAG ESTATE',
        type: 'private',
        userId: 1,
        centerId: 2
			}]
		})
	});
	it('Should return fail for any error returned');
})