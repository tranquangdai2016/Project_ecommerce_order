import { searchReducer } from "../../client/src/reducers/searchReducer";

const rootReducer = combineReducers({
    search: searchReducer,
});

export default rootReducer;