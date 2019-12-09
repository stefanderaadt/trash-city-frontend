const defaultState = {
    progress: 0
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return {
                ...state,
                progress: 0
            };

        case 'ON_LOADING':
            return {
                ...state,
                progress: action.payload
            };

        case 'ON_LOADED':
            return {
                ...state,
                progress: 100
            };

        default:
            return state;
    }
};
