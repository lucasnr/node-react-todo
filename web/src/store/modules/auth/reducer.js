const INITIAL_STATE = {
	token: null,
	error: null,
};

export default function user(state = INITIAL_STATE, action) {
	switch (action.type) {
		case '@USER/SIGNIN_USER_SUCCEEDED':
			return { token: action.token };
		case '@AUTH/SIGNOUT_USER_SUCCEEDED':
			return INITIAL_STATE;
		case '@AUTH/SIGNUP_USER_FAILED':
			return { error: action.error };
		case '@AUTH/SIGNIN_USER_FAILED':
			return { error: action.error };
		default:
			return state;
	}
}
