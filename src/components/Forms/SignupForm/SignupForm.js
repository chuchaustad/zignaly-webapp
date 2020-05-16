import React, {createRef, useState} from 'react';
import './SignupForm.scss';
import common from '../../../styles/common.module.scss';
import {Box, TextField, Checkbox, InputAdornment, FormControl, OutlinedInput, Popper} from '@material-ui/core';
import CustomButton from '../../CustomButton/CustomButton';
import {validateEmail, validateName, validatePassword} from '../../../helpers/validators';
// import ReCAPTCHA from "react-google-recaptcha";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PasswordStrength from '../../PasswordStrength';
import {useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';

const SignupForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showRepeatPassword, setShowRepeatPassword] = useState(false)
    const [anchorEl, setAnchorEl] = useState(undefined)
    const [gRecaptchaResponse, setCaptchaResponse] = useState('')
    const [strength, setStrength] = useState(0)
    const [passwordDoNotMatch, setPasswordDoNotMatch] = useState(false)
    const [loading, showLoading] = useState(false)
    const recaptchaRef = createRef()
    const dispatch = useDispatch()
    const {errors, handleSubmit, register, setError, clearError} = useForm()

    // componentDidMount() {
    //     const ref = saveRefCookie(this.props.location);
    //     this.setState({ref: ref})
    // }

    const handlePasswordChange = (e) => {
        setPasswordDoNotMatch(false)
        setAnchorEl(e.currentTarget)
        let howStrong = validatePassword(e.target.value)
        setStrength(howStrong)
        howStrong >= 4 ? clearError("password") : setError("password")
    }

    const handleRepeatPasswordChange = (e) => {
        setPasswordDoNotMatch(false)
        let howStrong = validatePassword(e.target.value)
        setStrength(howStrong)
        howStrong >= 4 ? clearError("repeatPassword") : setError("repeatPassword")
    }

    const onSubmit = (data) => {
        if(data.password && data.repeatPassword && data.password === data.repeatPassword){
            // showLoading(true)
            console.log(data)
            // const params = {
            //     projectId: projectId,
            //     firstName: data.firstName,
            //     email: data.email,
            //     password: data.password,
            //     subscribe: data.subscribe,
            //     ref: this.state.ref || null,
            //     array: true,
            //     gRecaptchaResponse: "abracadabra"
            // };
            // setCaptchaResponse('')
            // this.props.dispatch(signup(params, this.hideLoader));
        } else {
            setPasswordDoNotMatch(true)
        }
    }

    const onChangeReCAPTCHA = (value) => {
        setCaptchaResponse(value)
    }

    const onExpiredReCAPTCHA = () => {
        dispatch(alertError('Your solution to the ReCAPTCHA has expired, please resolve it again.'));
        setCaptchaResponse('')
    }

    const onErroredReCAPTCHA = () => {
        dispatch(alertError('Something went wrong with the ReCAPTCHA, try to reload the page if you can\'t signup.'));
        setCaptchaResponse('')
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box className="signup-form" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Popper
                    className={common.passwordStrengthBox}
                    placement="left"
                    transition
                    open={anchorEl ? true : false}
                    anchorEl={anchorEl}>
                    <PasswordStrength onClose={() => setAnchorEl(undefined)} strength={strength} />
                </Popper>
                <Box className="input-box" display="flex" flexDirection="column" justifyContent="start" alignItems="start">
                    <label className={common.customLabel}>Name</label>
                    <TextField
                        className={common.customInput}
                        fullWidth
                        type="text"
                        variant="outlined"
                        error={errors.name ? true : false}
                        name="name"
                        inputRef={register({required: true, minLength: 3})}
                        />
                </Box>
                <Box className="input-box" display="flex" flexDirection="column" justifyContent="start" alignItems="start">
                    <label className={common.customLabel}>Email address</label>
                    <TextField
                        className={common.customInput}
                        type="email"
                        fullWidth
                        variant="outlined"
                        error={errors.email ? true : false}
                        name="email"
                        inputRef={register({required: true, pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ })}
                        />
                </Box>

                <Box className="input-box" display="flex" flexDirection="column" justifyContent="start" alignItems="start">
                    <label className={common.customLabel}>Password</label>
                    <FormControl className={common.customInput} variant="outlined">
                        <OutlinedInput
                            type={showPassword ? 'text' : 'password'}
                            error={errors.password ? true : false}
                            name="password"
                            inputRef={register({required: true})}
                            onChange={handlePasswordChange}
                            onBlur={() => setAnchorEl(undefined)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <span className={common.pointer} onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </span>
                                </InputAdornment>
                            }
                            />
                    </FormControl>
                </Box>

                <Box className={"input-box " + (passwordDoNotMatch ? "no-margin" : "")} display="flex" flexDirection="column" justifyContent="start" alignItems="start">
                    <label className={common.customLabel}>Repeat Password</label>
                    <FormControl className={common.customInput} variant="outlined">
                        <OutlinedInput
                            type={showRepeatPassword ? 'text' : 'password'}
                            error={errors.repeatPassword ? true : false}
                            name="repeatPassword"
                            inputRef={register({required: true})}
                            onChange={handleRepeatPasswordChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <span className={common.pointer} onClick={() => setShowRepeatPassword(!showRepeatPassword)}>
                                        {showRepeatPassword ? <Visibility /> : <VisibilityOff />}
                                    </span>
                                </InputAdornment>
                            }
                            />
                    </FormControl>
                </Box>
                <Box minWidth="100%" display="flex" flexDirection="row" justifyContent="center">
                    {passwordDoNotMatch && <span className="error-text bold">Passwords do not match!</span>}
                </Box>
                <Box className="input-box checkbox">
                    <Box display="flex" flexDirection="row" justifyContent="start" alignItems="start">
                        <Checkbox
                            className={common.checkboxInput}
                            name="terms"
                            error={errors.terms ? "true" : "false"}
                            onChange={() => clearError("terms")}
                            inputRef={register({required: true})}
                        />
                        <Box className={"terms-box " + (errors.terms ? " error" : "")} display="flex" flexDirection="row" justifyContent="start" flexWrap="wrap">
                            <span className="text">I agree to</span>
                            <a href={`/legal/terms`} className="link">Terms and condition</a>
                            <span className="text">and</span>
                            <a href={`/legal/privacy`} className="link">privacy policy</a>
                        </Box>
                    </Box>
                </Box>

                <Box className="input-box checkbox">
                    <Box display="flex" flexDirection="row" justifyContent="start" alignItems="start">
                        <Checkbox
                            className={common.checkboxInput}
                            name="subscribe"
                            inputRef={register}
                        />
                        <span className={"terms-text"}>Subscribe to notifications</span>
                    </Box>
                </Box>

                {/* {envconfig.configureCaptcha &&
                    <Box className="input-box">
                        <ReCAPTCHA
                            ref={this.recaptchaRef}
                            sitekey="6LdORtMUAAAAAGLmbf3TM8plIRorVCEc9pVChix8"
                            onChange={this.onChangeReCAPTCHA}
                            onExpired={this.onExpiredReCAPTCHA}
                            onErrored={this.onErroredReCAPTCHA}/>
                    </Box>
                } */}

                <Box className="input-box button-box">
                    <CustomButton
                        type="submit"
                        className={"full submit-btn"}
                        loading={loading}>Register</CustomButton>
                </Box>
            </Box>
        </form>
    )
}

export default SignupForm;