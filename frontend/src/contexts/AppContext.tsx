import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, WishlistItem, Product } from '../types';

interface AppState {
  cart: CartItem[];
  wishlist: WishlistItem[];
  isSearchOpen: boolean;
  searchQuery: string;
}

type AppAction = 
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number; selectedColor?: string; selectedSize?: string } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'TOGGLE_SEARCH'; payload?: boolean }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'CLEAR_CART' };

const initialState: AppState = {
  cart: [],
  wishlist: [],
  isSearchOpen: false,
  searchQuery: '',
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => 
        item.product.id === action.payload.product.id &&
        item.selectedColor === action.payload.selectedColor &&
        item.selectedSize === action.payload.selectedSize
      );
      
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item === existingItem
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, {
            product: action.payload.product,
            quantity: action.payload.quantity,
            selectedColor: action.payload.selectedColor,
            selectedSize: action.payload.selectedSize,
          }],
        };
      }
    }
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload),
      };
    
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    
    case 'ADD_TO_WISHLIST': {
      const existingWishlistItem = state.wishlist.find(item => item.product.id === action.payload.id);
      if (existingWishlistItem) return state;
      
      return {
        ...state,
        wishlist: [...state.wishlist, { product: action.payload }],
      };
    }
    
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.product.id !== action.payload),
      };
    
    case 'TOGGLE_SEARCH':
      return {
        ...state,
        isSearchOpen: action.payload !== undefined ? action.payload : !state.isSearchOpen,
      };
    
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };
    
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}