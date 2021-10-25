import React, { FC, useEffect, useState, useRef } from 'react'
import { Row, Col, Form, FormControl, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { Paginator } from '../../components'
import { actionCreators } from '../../state'
import { RootState } from '../../state/reducers'
import './browse.css'
import { BrowseFilter } from './components'

const BrowsePage: FC = () => {
    const dispatch = useDispatch()

    const nameInputFieldRef = useRef<any>()

    const [searchedName, setSearchedName] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [sortBy, setSortBy] = useState('releaseDate')
    const [sortVariation, setSortVariation] = useState('DESC')
    const [searchedGenres, setSearchedGenres] = useState<number[]>([])
    const [searchedFeatures, setSearchedFeatures] = useState<number[]>([])

    const {
        games,
        gamePageObject,
        loading: gamesLoading,
        error: gamesError,
    } = useSelector((state: RootState) => state.findGamesReducer)

    const { findGames } = bindActionCreators(actionCreators, dispatch)

    useEffect(() => {
        findGames(
            searchedName,
            searchedGenres,
            searchedFeatures,
            sortBy,
            sortVariation,
            currentPage
        )
    }, [
        searchedName,
        searchedGenres,
        searchedFeatures,
        sortBy,
        sortVariation,
        currentPage,
    ])

    const onSubmitSearchName = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        setSearchedName(nameInputFieldRef.current!.value)
    }

    const renderGameItems = (): JSX.Element | JSX.Element[] => {
        if (gamesError) {
            return (
                <div className="ml-auto mr-auto text-center">
                    <h4>{gamesError}</h4>
                </div>
            )
        }

        if (gamesLoading) {
            return (
                <div className="ml-auto mr-auto text-center">
                    <h4>Loading...</h4>
                </div>
            )
        }

        if (games.length === 0) {
            return (
                <div className="ml-auto mr-auto text-center">
                    <h4>Oops, sorry we don&apos;t have that game now</h4>
                </div>
            )
        }

        return games.map((game) => {
            return (
                <Col lg={3} md={4} sm={6} key={game.id}>
                    <Link
                        to={`/games/details/${game.id}`}
                        className="game-item"
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
                        <h6 className="game-item__price">${game.gamePrice}</h6>
                    </Link>
                </Col>
            )
        })
    }

    const handleChangeSort = (
        e: React.ChangeEvent<HTMLSelectElement>
    ): void => {
        const sortByValue = e.target.value
        if (sortByValue === 'gamePrice_ASC') {
            setSortBy('gamePrice')
            setSortVariation('ASC')
            return
        }
        if (sortByValue === 'gameName') {
            setSortBy('gameName')
            setSortVariation('ASC')
            return
        }
        setSortBy(e.target.value)
        setSortVariation('DESC')
    }

    return (
        <div id="browse-page">
            <h3 className="mb-4">Browse Your Game</h3>

            <Row className="browse-page-row">
                <Col lg={9} md={9} sm={12}>
                    <div className="browse__main">
                        <Row>{renderGameItems()}</Row>
                    </div>
                    <Paginator
                        pageObject={gamePageObject}
                        setCurrentPage={setCurrentPage}
                        toTop
                    />
                </Col>
                <Col lg={3} md={3} sm={12}>
                    <div className="browse__filter">
                        <div className="browse-filter__name mb-4">
                            <Form onSubmit={onSubmitSearchName}>
                                <FormControl
                                    type="text"
                                    placeholder="Search"
                                    className="mr-sm-2"
                                    ref={nameInputFieldRef}
                                />

                                <Button type="submit" variant="primary">
                                    <i className="fas fa-search" />
                                </Button>
                            </Form>
                        </div>
                        <div className="browse-filter__sort mb-4">
                            <select
                                onChange={handleChangeSort}
                                className="form-control"
                            >
                                <option value="releaseDate">
                                    Release Date
                                </option>
                                <option value="gameName">Aphabetical</option>
                                <option value="gamePrice_ASC">
                                    Price: Low to High
                                </option>
                                <option value="gamePrice">
                                    Price: High to Low
                                </option>
                            </select>
                        </div>
                        <BrowseFilter
                            searchedGenres={searchedGenres}
                            setSearchedGenres={setSearchedGenres}
                            searchedFeatures={searchedFeatures}
                            setSearchedFeatures={setSearchedFeatures}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default BrowsePage
