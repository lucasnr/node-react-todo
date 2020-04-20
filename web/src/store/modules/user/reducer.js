const INITIAL_STATE = {
	signed: null,
	error: null,
};

export default function user(state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'SET_USER_SUCCEEDED':
			return { signed: action.user };
		case 'SET_USER_FAILED':
			return { ...state, error: action.error };
		case 'UPDATE_USER_SUCCEEDED':
			return { ...state, user: action.user, updateResponse: { error: false } };
		case 'UPDATE_USER_FAILED':
			return { ...state, updateResponse: { error: action.error } };
		case 'SIGNOUT_USER_SUCCEEDED':
			return INITIAL_STATE;
		default:
			return state;
	}
}
