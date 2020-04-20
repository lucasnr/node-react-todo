const INITIAL_STATE = {
	signed: null,
	error: null,
};

export default function user(state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'SIGNIN_USER_SUCCEEDED':
			return { signed: action.user };
		case 'SIGNIN_USER_FAILED':
			return { ...state, error: action.error };
		default:
			return state;
	}
}
