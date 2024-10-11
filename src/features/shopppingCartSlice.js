import { createSlice } from "@reduxjs/toolkit";

const mockMovie = {
    "adult": false,
    "backdrop_path": "/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg",
    "genre_ids": [
        28,
        35,
        878
    ],
    "id": 533535,
    "original_language": "en",
    "original_title": "Deadpool & Wolverine",
    "overview": "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
    "popularity": 5099.804,
    "poster_path": "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    "release_date": "2024-07-24",
    "title": "Deadpool & Wolverine",
    "video": false,
    "vote_average": 7.746,
    "vote_count": 4015
}


const initialState = 
    //cartItems: [],
    [{
        item: mockMovie,
        count: 1,
        price: 129
    }]
;

const shoppingCartSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        addItem: (state, action) => {
          
            const foundItem = state.find(cartItem => cartItem.item.id === action.payload.item.id);

            if (foundItem){
                const newState = state.map(cartItem => {
                    if (cartItem.item.id === action.payload.item.id){
                        return {...cartItem, count: cartItem.count + 1}
                    } else {
                        return cartItem
                    }
                })
                return newState;

            } else {
                return[...state, {item: action.payload.item, count: 1, price: action.payload.price}]
            }
        },
        decrease: (state, action) => {
            const foundItem = state.find(cartItem => cartItem.item.id === action.payload.id);
            if (foundItem){
                if (foundItem.count > 1) {
                    const newState = state.map(cartItem => {
                        if (cartItem.item.id === action.payload.id){
                            return {...cartItem, count: cartItem.count -1}
                        } else {
                            return cartItem
                        }
                    })
                    return newState;
                }else {
                    return state.filter(cartItem => cartItem.item.id !== action.payload.id)
                }
                

                

            } else {
                return state;
            }
        },
        removeItem: (state, action) => {
            return state.filter(cartItem => cartItem.item.id !== action.payload.id)
        }

    },

});

export const { addItem, removeItem, decrease } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
