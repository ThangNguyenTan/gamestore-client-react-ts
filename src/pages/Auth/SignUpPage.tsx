import React, { FC, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { FormLabel, FormGroup } from 'react-bootstrap'
import './auth.css'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { IUserSignUp } from '../../interfaces'
import { createToast } from '../../utils/toastCreator'
import { actionCreators } from '../../state'
import { RootState } from '../../state/reducers'

const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(6, 'Must be at least 6 characters in length')
        .max(256, 'Must be below 256 characters in length')
        .required('This is a required field'),
    password: Yup.string()
        .min(6, 'Must be at least 6 characters in length')
        .max(256, 'Must be below 256 characters in length')
        .required('This is a required field'),
    confirmPassword: Yup.string()
        .required('This is a required field')
        .min(6, 'Must be at least 6 characters in length')
        .max(256, 'Must be below 256 characters in length')
        .test(
            'confirmPassword',
            'Comfirm password and password must be the same',
            (value, ctx) => {
                const { password } = ctx.parent
                return password === value
            }
        ),
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

    const { authSignUp } = bindActionCreators(actionCreators, dispatch)

    const onFinish = (values: IUserSignUp): void => {
        authSignUp(values)
        setIsSubmitted(true)
    }

    return (
        <div className="auth-page">
            <div>
                <h1 className="mb-3 text-center">Signup</h1>
                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={onFinish}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <FormGroup className="mb-3">
                                <FormLabel htmlFor="username">
                                    Username
                                </FormLabel>
                                <Field
                                    name="username"
                                    className="form-control"
                                />
                                {errors.username && touched.username ? (
                                    <div className="error-div">
                                        {errors.username}
                                    </div>
                                ) : null}
                            </FormGroup>

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
                                    className="form-control"
                                    type="password"
                                />
                                {errors.password && touched.password ? (
                                    <div className="error-div">
                                        {errors.password}
                                    </div>
                                ) : null}
                            </FormGroup>

                            <FormGroup className="mb-3">
                                <FormLabel htmlFor="confirmPassword">
                                    Confirm Password
                                </FormLabel>
                                <Field
                                    name="confirmPassword"
                                    className="form-control"
                                    type="password"
                                />
                                {errors.confirmPassword &&
                                touched.confirmPassword ? (
                                    <div className="error-div">
                                        {errors.confirmPassword}
                                    </div>
                                ) : null}
                            </FormGroup>

                            <button
                                type="submit"
                                className="btn btn-info btn-block"
                            >
                                Signup
                            </button>

                            <Link
                                to="/signin"
                                className="btn btn-outline-info btn-block"
                            >
                                Already have an account?
                            </Link>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default SignUpPage
