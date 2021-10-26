import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import { Modal, Button, Row, Col, Alert } from 'react-bootstrap'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { IFindGameItem } from '../../../interfaces'
import { actionCreators } from '../../../state'
import { RootState } from '../../../state/reducers'

interface Props {
    selectedGame: IFindGameItem
    isVisible: boolean
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const BuyGameModal: FC<Props> = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { selectedGame, isVisible, setIsVisible } = props

    const { gameName, gamePoster, gamePrice } = selectedGame

    const handleClose = (): void => setIsVisible(false)

    const [sdkReady, setSdkReady] = useState(false)

    const orderPay = useSelector((state: RootState) => state.payOrderReducer)

    const { payOrder, clearPayOrder } = bindActionCreators(
        actionCreators,
        dispatch
    )

    const {
        loading: loadingPay,
        error: errorPay,
        success: successPay,
    } = orderPay

    const successPaymentHandler = (paymentResult: any): void => {
        dispatch(payOrder(selectedGame, paymentResult))
    }

    useEffect(() => {
        if (successPay) {
            history.push('/library')
        }
    }, [successPay])

    useEffect(() => {
        clearPayOrder()

        const addPayPalScript = async (): Promise<void> => {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API_URL}/config/paypal`
            )
            const script = document.createElement('script')
            script.type = 'text/javascript'
            // eslint-disable-next-line max-len
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}&disable-funding=card`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if (!window.paypal) {
            addPayPalScript()
        } else {
            setSdkReady(true)
        }
    }, [sdkReady])

    return (
        <Modal show={isVisible} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="payment-game-details mb-2">
                    <Row>
                        <Col md={4}>
                            <img
                                src={gamePoster}
                                alt={gameName}
                                className="img-fluid"
                            />
                        </Col>
                        <Col md={8}>
                            <h5 className="mb-4">{gameName}</h5>
                            <h4>${gamePrice}</h4>
                        </Col>
                    </Row>
                </div>
                <div className="paypal-payment">
                    {!sdkReady ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            {errorPay && (
                                <Alert variant="danger">{errorPay}</Alert>
                            )}
                            {loadingPay && <p>Loading...</p>}

                            <PayPalButton
                                amount={gamePrice}
                                onSuccess={successPaymentHandler}
                                style={{
                                    color: 'blue',
                                    label: 'buynow',
                                }}
                                options={{
                                    disableFunding: 'card',
                                }}
                            />
                        </>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default BuyGameModal
