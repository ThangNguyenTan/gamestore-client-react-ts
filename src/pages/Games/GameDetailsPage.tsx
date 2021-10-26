import moment from 'moment'
import React, { FC, useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../state'
import { RootState } from '../../state/reducers'
import { createToast } from '../../utils'
import './game.css'
import { BuyGameModal } from './components'

const GameDetailsPage: FC = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { gameId } = useParams<{ gameId: string }>()

    const [isVisible, setIsVisible] = useState(false)

    const { currentUser } = useSelector((state: RootState) => state.authReducer)
    const { game, loading, error } = useSelector(
        (state: RootState) => state.getGameReducer
    )
    const {
        isInLibrary,
        loading: isInLibraryLoading,
        error: isInLibraryError,
    } = useSelector((state: RootState) => state.checkInLibraryReducer)

    const { getGame, checkInLibrary } = bindActionCreators(
        actionCreators,
        dispatch
    )

    useEffect(() => {
        getGame(gameId)
        checkInLibrary(parseInt(gameId, 10))
    }, [gameId])

    if (error) {
        createToast(error, 'error')
        history.push('/')
    }

    if (loading || !game) {
        return <h2>Loading...</h2>
    }

    const {
        gameName,
        gamePoster,
        gameTrailer,
        releaseDate,
        gameDescription,
        FeatureInstance,
        GenreInstance,
        DeveloperInstance,
        PublisherInstance,
    } = game

    const renderBuyNowButton = (): JSX.Element => {
        if (!currentUser) {
            return (
                <Link to="/signin" className="btn btn-primary btn-lg btn-block">
                    LOGIN TO BUY
                </Link>
            )
        }

        if (isInLibraryError) {
            return (
                <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                >
                    {isInLibraryError}
                </button>
            )
        }

        if (isInLibraryLoading) {
            return (
                <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                >
                    Loading...
                </button>
            )
        }

        if (isInLibrary) {
            return (
                <Link
                    to="/library"
                    className="btn btn-primary btn-lg btn-block"
                >
                    GO TO LIBRARY
                </Link>
            )
        }

        return (
            <button
                type="button"
                className="btn btn-primary btn-lg btn-block"
                onClick={() => {
                    setIsVisible(true)
                }}
            >
                BUY NOW
            </button>
        )
    }

    return (
        <>
            <h4 className="mb-4">{gameName}</h4>
            <BuyGameModal
                selectedGame={game}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
            />
            <Row>
                <Col lg={8} md={8} sm={12}>
                    <div className="game-details__trailer mb-4">
                        <iframe
                            width="100%"
                            height="500"
                            src={`${gameTrailer}?rel=0&amp;autoplay=1&mute=1`}
                            title={gameName}
                            frameBorder="0"
                            // eslint-disable-next-line max-len
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                    <div className="game-details__genre-feature mb-4">
                        <Row>
                            <Col md={6}>
                                <p>Genres</p>
                                <Link to="/">{GenreInstance.genreName}</Link>
                            </Col>
                            <Col md={6}>
                                <p>Features</p>
                                <Link to="/">
                                    {FeatureInstance.featureName}
                                </Link>
                            </Col>
                        </Row>
                    </div>
                    <div className="game-details__description">
                        <p>{gameDescription}</p>
                    </div>
                </Col>
                <Col lg={4} md={4} sm={12}>
                    <div
                        style={{
                            textAlign: 'center',
                        }}
                        className="game-details__poster"
                    >
                        <img
                            src={gamePoster}
                            alt={gameName}
                            style={{
                                width: '100%',
                            }}
                        />
                    </div>
                    <div className="game-details__actions mb-2 mt-2">
                        {renderBuyNowButton()}

                        {currentUser && (
                            <button
                                type="button"
                                className="btn btn-outline-dark btn-block"
                            >
                                Add to Wishlist
                            </button>
                        )}
                    </div>
                    <div className="game-details__meta">
                        <ul>
                            <li>
                                <span>Developer</span>
                                <span>{DeveloperInstance.developerName}</span>
                            </li>
                            <li>
                                <span>Publisher</span>
                                <span>{PublisherInstance.publisherName}</span>
                            </li>
                            <li>
                                <span>Release</span>
                                <span>
                                    {moment(releaseDate).format('MMM, DD YYYY')}
                                </span>
                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default GameDetailsPage
