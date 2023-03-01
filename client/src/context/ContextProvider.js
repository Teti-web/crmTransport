import React, {createContext, useContext, useState} from 'react';

const StateContext = createContext();

const initialState={
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
}

export const ContextProvider = ({children}) =>{
    const [screenSize, setScreenSize] = useState(undefined);
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);

    const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

    return (
        <StateContext.Provider value={{
            activeMenu,
            setActiveMenu,
            screenSize,
            setScreenSize,
            handleClick,
            isClicked,
            initialState,
            setIsClicked
        }}>
           {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);