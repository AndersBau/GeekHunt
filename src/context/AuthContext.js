
/*Reading https://fatmali.medium.com/use-context-and-custom-hooks-to-share-user-state-across-your-react-app-ad7476baaf32 */
/**We will import this to the root index.js file. {children} will be <App/>.
 * ...state is user and dispatch component, so any user can access this context
*/
/**Overall, we will use AuthContext to create custom hook: useAuthContext */
import { createContext, useEffect, useReducer } from "react";
import { projectAuth } from "../firebase/fbConfig";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'SIGNIN':
      return { ...state, user: action.payload }
    case 'SIGNOUT':
      return { ...state, user: action.payload }
    case 'AUTH_IS_READY':
      return { user: action.payload, authIsReady: true }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authisReady: false
  })

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged(user => {
      dispatch({ type: 'AUTH_IS_READY', payload: user })
      unsub()
    })
  }, [])
  /**For testing
   *
   */
  // console.log('AuthContext State:', state);

  // dispatch({ type: ''})
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
