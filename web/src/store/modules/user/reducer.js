export default function user(state = null, action) {
	switch (action.type) {
		case 'SET_USER_SUCCEEDED':
			return action.user;
		default:
			return state;
	}
}
