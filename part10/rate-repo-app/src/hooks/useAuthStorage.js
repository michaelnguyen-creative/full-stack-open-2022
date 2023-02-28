import { useContext } from "react";
import AuthStorageContext from '../contexts/AuthStorageContext'

export const useAuthStorage = () => {
  return useContext(AuthStorageContext)
}

export default AuthStorageContext