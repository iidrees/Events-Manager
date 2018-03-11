import userReducer from '../../src/reducers/userReducer';
import * as types from '../../src/actions/types';


describe('USER reducer test', () => {
	it('should return initial state', () => {
		const state = {
			authenticated: false,
			status: '',
			message: '',
			user: {
				name: 'Idrees Kun',
				email: 'tester@test.com',
				password: 'tester',
				confirmPassword: 'tester'
			}
		}
		const result = userReducer(state, {
			type: types.ADD_EVENT
		})

		expect(result).toEqual({			
			authenticated: false,
			status: '',
			message: '',
			user: {
				name: 'Idrees Kun',
				email: 'tester@test.com',
				password: 'tester',
				confirmPassword: 'tester'
			}
		})
	});
	it('should signup new user', () => {
		const state = {
			authenticated: false,
			status: '',
			message: '',
			user: {
				name: '',
				email: '',
				password: '',
				confirmPassword: ''
			}
		}

		const payload = { 
			message: 'You are successfully signed up',
			status: 'Success',
			authenticated: true,
			id: 1,
			user: {
				user: {
				name: 'Idrees',
				email: 'tester@test.com',
				password: 'tester',
				confirmPassword: 'tester'
				}
			},
			data: {
				data: {
					data: 'ka;lsfhdsj;fsalfkasfjas;ldjask;djaskd'
						}
					}
		}

		const token = 'ka;lsfhdsj;fsalfkasfjas;ldjask;djaskd';

		const result = userReducer(state, {
			type: types.SIGNED_UP, payload })

		expect(result).toEqual({
			message: 'You are successfully signed up',
			status: 'Success',
			authenticated: true,
			user: {
				name: 'Idrees',
				email: 'tester@test.com',
				password: 'tester',
				confirmPassword: 'tester'
				},
			data: {
				data: token
			}
		})
	});

	it('should show signup failed', () => {
		const state = {
			authenticated: false,
			status: '',
			message: ''
		}

		const payload = {
			message: 'User signup failed'
		}

		const result = userReducer(state, {
			type: types.SIGN_UP_FAIL, payload})

		expect(result).toEqual({
			message: 'User signup failed',
			status: 'Unsuccessful',
			authenticated: false
		});
	})
	it('should signin user', () => {
		const state = {
			authenticated: false,
			status: '',
			message: '',
			user: {
				name: '',
				email: '',
				password: '',
				confirmPassword: ''
			}
		}

		const payload = { 
			message: 'You are successfully signed in',
			status: 'Success',
			authenticated: true,
			id: 1,
			user: {
				user: {
				name: 'Idrees',
				email: 'tester@test.com',
				password: 'tester',
				}
			},
			data: {
				data: {
					data: 'ka;lsfhdsj;fsalfkasfjas;ldjask;djaskd'
						}
					}
		}

		const token = 'ka;lsfhdsj;fsalfkasfjas;ldjask;djaskd';
		const result = userReducer(state, {
			type: types.SIGNED_IN, payload
		})

		expect(result).toEqual({			
			authenticated: true,
			status: 'Success',
			message: 'You are successfully signed in',
			user: {
				name: 'Idrees',
				email: 'tester@test.com',
				password: 'tester',
			},
			data: {
				data: token
			}
		})
	})
	it('should show signin fail',  () => {
		const state = {
			authenticated: false,
			status: '',
			message: ''
		}

		const payload = {
			message: 'User signin failed'
		}

		const result = userReducer(state, {
			type: types.SIGN_IN_FAIL, payload})

		expect(result).toEqual({
			message: 'User signin failed',
			status: 'Unsuccessful',
			authenticated: false
		});
	})
})