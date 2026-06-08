import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const initialState = {
  cart: JSON.parse(localStorage.getItem('mv_cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('mv_wishlist') || '[]'),
  compareList: [],
  notification: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const exists = state.cart.find(i => i.id === action.bike.id);
      if (exists) return { ...state, notification: { msg: 'Already in enquiry list', type: 'info' } };
      return { ...state, cart: [...state.cart, action.bike], notification: { msg: 'Added to enquiry!', type: 'success' } };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(i => i.id !== action.id) };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'TOGGLE_WISHLIST': {
      const inList = state.wishlist.find(i => i.id === action.bike.id);
      return {
        ...state,
        wishlist: inList ? state.wishlist.filter(i => i.id !== action.bike.id) : [...state.wishlist, action.bike],
        notification: { msg: inList ? 'Removed from wishlist' : 'Added to wishlist ♥', type: 'success' },
      };
    }
    case 'CLEAR_NOTIFICATION':
      return { ...state, notification: null };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('mv_cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem('mv_wishlist', JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  useEffect(() => {
    if (state.notification) {
      const t = setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 2500);
      return () => clearTimeout(t);
    }
  }, [state.notification]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
      {state.notification && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          background: state.notification.type === 'success' ? '#1b5e20' : '#1565c0',
          color: '#fff', padding: '12px 20px', borderRadius: 2,
          fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 500,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          animation: 'fadeUp 0.3s ease',
        }}>
          {state.notification.msg}
        </div>
      )}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
