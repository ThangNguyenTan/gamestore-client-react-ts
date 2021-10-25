import React, { FC, useEffect, useState } from 'react'
import { Accordion, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../../state'
import { RootState } from '../../../state/reducers'

type Props = {
    searchedGenres: number[]
    setSearchedGenres: React.Dispatch<React.SetStateAction<number[]>>
    searchedFeatures: number[]
    setSearchedFeatures: React.Dispatch<React.SetStateAction<number[]>>
}

const BrowseFilter: FC<Props> = ({
    searchedGenres,
    setSearchedGenres,
    searchedFeatures,
    setSearchedFeatures,
}) => {
    const dispatch = useDispatch()

    const [currentKey, setCurrentKey] = useState(0)

    const { genres, loading: genreLoading, error: genreError } = useSelector(
        (state: RootState) => state.findGenresReducer
    )
    const {
        features,
        loading: featuresLoading,
        error: featuresError,
    } = useSelector((state: RootState) => state.findFeaturesReducer)

    const { findGenres, findFeatures } = bindActionCreators(
        actionCreators,
        dispatch
    )

    useEffect(() => {
        findGenres()
        findFeatures()
    }, [])

    const updateSearchGenres = (genreId: number): void => {
        if (searchedGenres.includes(genreId)) {
            setSearchedGenres(
                searchedGenres.filter((searchedGenre) => {
                    return searchedGenre !== genreId
                })
            )
            return
        }

        setSearchedGenres([...searchedGenres, genreId])
    }

    const updateSearchFeatures = (featureId: number): void => {
        if (searchedFeatures.includes(featureId)) {
            setSearchedFeatures(
                searchedFeatures.filter((searchedFeature) => {
                    return searchedFeature !== featureId
                })
            )
            return
        }

        setSearchedFeatures([...searchedFeatures, featureId])
    }

    const renderFilterGenres = (): JSX.Element | JSX.Element[] => {
        if (genreError) {
            return <p>{genreError}</p>
        }

        if (genreLoading) {
            return <p>Loading...</p>
        }

        return genres.map((genre) => {
            return (
                <div
                    className={`${
                        searchedGenres.includes(genre.id!) ? 'active' : ''
                    } filter-item`}
                    key={genre.id}
                    onClick={() => updateSearchGenres(genre.id!)}
                    role="presentation"
                >
                    <p>{genre.genreName}</p>
                    <i className="fas fa-check" />
                </div>
            )
        })
    }

    const renderFilterFeatures = (): JSX.Element | JSX.Element[] => {
        if (featuresError) {
            return <p>{featuresError}</p>
        }

        if (featuresLoading) {
            return <p>Loading...</p>
        }

        return features.map((feature) => {
            return (
                <div
                    className={`${
                        searchedFeatures.includes(feature.id!) ? 'active' : ''
                    } filter-item`}
                    key={feature.id}
                    onClick={() => updateSearchFeatures(feature.id!)}
                    role="presentation"
                >
                    <p>{feature.featureName}</p>
                    <i className="fas fa-check" />
                </div>
            )
        })
    }

    const cardHeaderStyle = {
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }

    return (
        <Accordion defaultActiveKey="0" activeKey={`${currentKey}`}>
            <Card className="mb-4">
                <Card.Header
                    as={Card.Header}
                    eventKey="0"
                    onClick={() => {
                        setCurrentKey(0)
                    }}
                    style={cardHeaderStyle}
                >
                    Genres
                    {currentKey === 0 ? (
                        <i className="fas fa-caret-down" />
                    ) : (
                        <i className="fas fa-caret-up" />
                    )}
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>{renderFilterGenres()}</Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Card.Header
                    as={Card.Header}
                    eventKey="1"
                    onClick={() => {
                        setCurrentKey(1)
                    }}
                    style={cardHeaderStyle}
                >
                    Features
                    {currentKey === 1 ? (
                        <i className="fas fa-caret-down" />
                    ) : (
                        <i className="fas fa-caret-up" />
                    )}
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                    <Card.Body>{renderFilterFeatures()}</Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

export default BrowseFilter
