import { StackNavigator } from 'react-navigation'
import Login from './containers/Login'
import Signup from './containers/Signup'
import Signin from './containers/Signin'

const AuthRoutes = new StackNavigator(
  {
    Signup: { screen: Signup },
    Signin: { screen: Signin },
    Login: { screen: Login },
    Routes: { getScreen: () => require('./AppRoutes').default },
  },
  {
    initialRouteName: 'Signup',
    navigationOptions: { header: null },
  },
)

export default function Auth() {
  return <AuthRoutes />
}
