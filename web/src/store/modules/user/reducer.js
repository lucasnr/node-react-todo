const INITIAL_STATE = {};

export default function user(state = INITIAL_STATE, action) {
	switch (action.type) {
		case '@USER/SIGNIN_USER_SUCCEEDED':
			return { signed: action.user };
		case '@USER/UPDATE_USER_SUCCEEDED':
			return { signed: action.user, response: {} };
		case '@USER/UPDATE_USER_FAILED':
			return { ...state, response: action.response };
		case '@USER/REMOVE_USER':
			return INITIAL_STATE;
		default:
			return state;
	}
}
