import React, { useState, useEffect, createContext } from 'react';
import Web3Modal from 'web3modal';
import { w3connect, providerOptions, createWeb3User } from '../utils/auth';
import { getChainData } from '../utils/chains';

export const CurrentUserContext = createContext();
export const Web3ModalContext = createContext();

const Store = ({children}) => {
  const [currentUser, setCurrentUser] = useState();
  const [web3Modal, setWeb3Modal] = useState(
    new Web3Modal({
      network: getChainData(+process.env.REACT_APP_CHAIN_ID).network, // optional
      providerOptions, // required
      cacheProvider: true,
    }),
  );

  useEffect(() => {
    const initCurrentUser = async () => {
      try {
        const w3c = await w3connect(web3Modal);
        setWeb3Modal(w3c);

        const [account] = await w3c.web3.eth.getAccounts();
        let user = createWeb3User(account);
        setCurrentUser(user);
      } catch (e) {
        console.error(`Could not log in with web3`);
      }
    };

    if (web3Modal.cachedProvider) {
      // initCurrentUser();
    }
  }, [web3Modal, currentUser]);

  return (
    <Web3ModalContext.Provider value={[web3Modal, setWeb3Modal]}>
      <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
        {children}
      </CurrentUserContext.Provider>
    </Web3ModalContext.Provider>
  );
};

export default Store;
