import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { CODReducer } from "./CODReducer";
import { drawerReducer } from "./drawerReducer";
import { searchReducer } from "./searchReducer";
import { userReducer } from "./userReducer";
import { couponReducer } from "./couponReducer";

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawerReducer,
<<<<<<< HEAD
  COD: CODReducer,
=======
  coupon: couponReducer,
>>>>>>> d581738bcad2dfd30f8a927b75fca993a49760cb
});

export default rootReducer;
