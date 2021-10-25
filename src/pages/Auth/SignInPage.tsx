import React, { FC, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { FormLabel, FormGroup } from 'react-bootstrap'
import './auth.css'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { IUserSignIn } from '../../interfaces'
import { createToast } from '../../utils/toastCreator'
import { actionCreators } from '../../state'
import { RootState } from '../../state/reducers'

const SigninSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Must be at least 6 characters in length')
        .max(256, 'Must be below 256 characters in length')
        .required('This is a required field'),
    email: Yup.string()
        .email('Invalid email')
        .required('This is a required field'),
})

const SignUpPage: FC = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [isSubmitted, setIsSubmitted] = useState(false)

    const { currentUser, loading, error } = useSelector(
        (state: RootState) => state.authReducer
    )

    useEffect(() => {
        if (currentUser) {
            history.push('/')
        }
    }, [currentUser])

    useEffect(() => {
        if (isSubmitted) {
            if (!loading) {
                if (error) {
                    createToast(error, 'error')
                } else {
                    createToast(`Welcome back, ${currentUser?.user.username}`)
                    history.push('/')
                }
                setIsSubmitted(false)
            }
        }
    }, [isSubmitted, loading, error])

    const { authSignIn } = bindActionCreators(actionCreators, dispatch)

    const onFinish = (values: IUserSignIn): void => {
        authSignIn(values)
        setIsSubmitted(true)
    }

    return (
        <div className="auth-page">
            <div>
                <h1 className="mb-3 text-center">Signin</h1>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={SigninSchema}
                    onSubmit={onFinish}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <FormGroup className="mb-3">
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Field
                                    name="email"
                                    type="email"
                                    className="form-control"
                                />
                                {errors.email && touched.email ? (
                                    <div className="error-div">
                                        {errors.email}
                                    </div>
                                ) : null}
                            </FormGroup>

                            <FormGroup className="mb-3">
                                <FormLabel htmlFor="password">
                                    Password
                                </FormLabel>
                                <Field
                                    name="password"
                                    type="password"
                                    className="form-control"
                                />
                                {errors.password && touched.password ? (
                                    <div className="error-div">
                                        {errors.password}
                                    </div>
                                ) : null}
                            </FormGroup>

                            <button
                                type="submit"
                                className="btn btn-primary btn-block"
                            >
                                Signin
                            </button>

                            <Link
                                to="/signup"
                                className="btn btn-outline-primary btn-block"
                            >
                                Do not have an account?
                            </Link>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default SignUpPage
