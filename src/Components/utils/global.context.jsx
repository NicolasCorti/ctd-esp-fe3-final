import { createContext } from "react";



import axios from "axios";
import { useContext, useState, useEffect, useReducer } from "react";

const initialFavState = {theme: "", data: []}

const favsReducer = (state, action) => {
                                        switch(action.type){
                                          case 'ADD_FAV':
                                            return [...state, action.payload]
                                        }
                                      }

const GlobalStates = createContext()

const reducer = (state, action) => {
                                    switch(action.type) {
                                      case 'SWITCH_LIGHT':
                                        return {theme: action.payload, data: 'light'}
                                      case 'SWITCH_DARK':
                                        return {theme: action.payload, data: 'dark'}
                                      default:
                                        throw new Error()
                                    }
                                  }



//export const initialState = {theme: "", data: []}

export const ContextGlobal = createContext(undefined);

export const ContextProvider = ({ children }) => {
  //Aqui deberan implementar la logica propia del Context, utilizando el hook useMemo

  const [data, setData] = useState([])
  const [stateFavs, dispatchFavs] = useReducer(favsReducer, initialFavState, initFav)
  const [state, dispatch] = useReducer(reducer, initialFavState)

  function initFav(initialState) {
    return localStorage.getItem("favs")
      ? JSON.parse(localStorage.getItem("favs"))
      : initialState;
  }

  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(stateFavs))
  }, [stateFavs])

  useEffect(() => {
    axios(state.url)
      .then(res => setData(res.data))
  },[state])

  return (
    <ContextGlobal.Provider value={{
                                    data, 
                                    state, 
                                    dispatch, 
                                    stateFavs,
                                    dispatchFavs
                                  }}>
      {children}
    </ContextGlobal.Provider>
  );
};

export const useGlobaStates = () =>{
  return useContext(GlobalStates)
}