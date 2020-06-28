import React, { useState, createContext } from 'react';

export const CurrentUserContext = createContext();
export const Web3ModalContext = createContext();

const Store = ({children}) => {
  const [currentUser, setCurrentUser] = useState();
  const [web3Modal, setWeb3Modal] = useState();

  return (
    <Web3ModalContext.Provider value={[web3Modal, setWeb3Modal]}>
      <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
        {children}
      </CurrentUserContext.Provider>
    </Web3ModalContext.Provider>
  );
};

export default Store;
