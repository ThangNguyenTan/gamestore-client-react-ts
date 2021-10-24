import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { actionCreators } from './state'
import { RootState } from './state/reducers/index'
import { TodoPage } from './pages'

const App: React.FC = () => {
    const amount = useSelector((state: RootState) => state.bankReducer)
    const dispatch = useDispatch()

    const { depositMoney, withdrawMoney, bankrupt } = bindActionCreators(
        actionCreators,
        dispatch
    )

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={() => (
                            <>
                                <h1 data-testid="balance-amount">{amount}</h1>
                                <button
                                    onClick={() => depositMoney(1000)}
                                    type="button"
                                >
                                    Deposit
                                </button>
                                <button
                                    onClick={() => withdrawMoney(1000)}
                                    type="button"
                                >
                                    Withdraw
                                </button>
                                <button
                                    onClick={() => bankrupt()}
                                    type="button"
                                >
                                    Bankrupt
                                </button>
                            </>
                        )}
                    />
                    <Route exact path="/todos" component={TodoPage} />
                </Switch>
            </Router>
        </div>
    )
}

export default App
