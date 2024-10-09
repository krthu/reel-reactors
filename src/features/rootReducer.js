import { combineReducers } from "redux";
import shopppingCartSlice from "./shopppingCartSlice";

const rootReducer = combineReducers ({
    shoppingCart: shopppingCartSlice,

});

export default rootReducer;