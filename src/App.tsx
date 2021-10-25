import React from 'react'
import './dark-bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.min.css'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import { NavigationBar } from './components'
import { SignUpPage, SignInPage } from './pages'

const App: React.FC = () => {
    return (
        <div className="App">
            <Router>
                <NavigationBar />
                <main>
                    <Container>
                        <Switch>
                            <Route exact path="/" component={() => <></>} />
                            <Route
                                exact
                                path="/signup"
                                component={SignUpPage}
                            />
                            <Route
                                exact
                                path="/signin"
                                component={SignInPage}
                            />
                        </Switch>
                    </Container>
                    <ToastContainer
                        position="bottom-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </main>
            </Router>
        </div>
    )
}

export default App
