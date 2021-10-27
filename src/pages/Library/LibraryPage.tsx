import React, { FC, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../state'
import { RootState } from '../../state/reducers'

const LibraryPage: FC = () => {
    const dispatch = useDispatch()

    const { loading, error, orders } = useSelector(
        (state: RootState) => state.getLibraryReducer
    )

    const { getLibrary } = bindActionCreators(actionCreators, dispatch)

    useEffect(() => {
        getLibrary()
    }, [])

    const renderGameItems = (): JSX.Element | JSX.Element[] => {
        if (error) {
            return (
                <div className="ml-auto mr-auto text-center">
                    <h4>{error}</h4>
                </div>
            )
        }

        if (loading) {
            return (
                <div className="ml-auto mr-auto text-center">
                    <h4>Loading...</h4>
                </div>
            )
        }

        if (orders.length === 0) {
            return (
                <div className="ml-auto mr-auto text-center">
                    <h4>Oops, you do not have any games right now</h4>
                    <Link to="/" className="btn btn-primary btn-lg">
                        Go browse for them
                    </Link>
                </div>
            )
        }

        return orders.map((order) => {
            const { GameInstance: game } = order

            return (
                <Col lg={3} md={4} sm={6} key={game.id}>
                    <Link
                        to={`/games/details/${game.id}`}
                        className="game-item library"
                    >
                        <div className="game-item__poster">
                            <img
                                src={game.gamePoster}
                                alt={game.gameName}
                                className="img-fluid"
                            />
                        </div>
                        <h4 className="game-item__name">{game.gameName}</h4>
                        <h5 className="game-item__meta">
                            {game.DeveloperInstance.developerName} |{' '}
                            {game.PublisherInstance.publisherName}
                        </h5>
                    </Link>
                </Col>
            )
        })
    }

    return (
        <div>
            <h3 className="mb-4">Your Library</h3>
            <Row>{renderGameItems()}</Row>
        </div>
    )
}

export default LibraryPage
