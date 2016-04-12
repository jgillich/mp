import { routerReducer} from "react-router-redux";
import { combineReducers} from "redux";
import trackReducer from "./track";
import playerReducer from "./player";
import userReducer from "./user";
import errorReducer from "./error";
import backendReducer from "./backend";

const rootReducer = combineReducers({
  backends: backendReducer,
  error: errorReducer,
  player: playerReducer,
  routing: routerReducer,
  tracks: trackReducer,
  user: userReducer,
});

export default rootReducer;
