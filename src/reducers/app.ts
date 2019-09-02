import initialState from '../constants/initialState';

type Action = {
	type: string;
	payload: object;
};

export default (state = initialState.app, action: Action) => {
	switch (action.type) {
		default:
			return state;
	}
};
