import React from 'react';
import createStore from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from "@apollo/client";
import { ErrorLink, onError } from '@apollo/client/link/error';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import DropDown from './Features/DropDown/DropDown';

const store = createStore();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors){
    graphQLErrors.map((message, location, path) => {
      console.log(message);
    })
  }
})

const link = from([
  errorLink,
  new HttpLink({ uri: 'https://react.eogresources.com/graphql' })
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})


const App = () => (
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Wrapper>
        <Header />
        <DropDown />
        <ToastContainer />
      </Wrapper>
    </Provider>
  </MuiThemeProvider>
  </ApolloProvider>
);

export default App;
