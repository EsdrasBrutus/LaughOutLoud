import React, { useState } from "react";
import {
	Avatar,
	Button,
	Paper,
	Grid,
	Container,
	Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";

import useStyles from "./styles";

import { GoogleLogin } from "react-google-login";

const Auth = () => {
	const classes = useStyles();

	const [showPassword, setShowPassword] = useState(false);
	const [isSignUp, setIsSignUp] = useState(false);
	const handleSubmit = (e) => {
		e.preventDefault();
	};
	const handleChange = (e) => {};
	const switchMode = () => {
		setIsSignUp((prev) => !prev);
	};
	const handleClickShowPassword = () => {
		setShowPassword((prev) => !prev);
	};
	const googleSuccess = (response) => { };
	const googleFailure = (response) => { };

	return (
		<Container component="main" maxWidth="xs">
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant="h5">{isSignUp ? "Sign up" : "Login"}</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignUp && (
							<>
								<Input
									name="firstName"
									label="First Name"
									handeChange={handleChange}
									autoFocus
									half
								/>

								<Input
									name="lastName"
									label="Last Name"
									handeChange={handleChange}
									half
								/>
							</>
						)}
						<Input
							name="email"
							label="Email Address"
							handeChange={handleChange}
							type="email"
						/>
						<Input
							name="password"
							label="Password"
							handleChange={handleChange}
							type={showPassword ? "text" : "password"}
							handleClickShowPassword={handleClickShowPassword}
						/>
						{isSignUp && (
							<Input
								name="confirmPassword"
								label="Confirm Password"
								handeChange={handleChange}
								type="password"
								handleClickShowPassword={handleClickShowPassword}
							/>
						)}
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						{isSignUp ? "Sign up" : "Login"}
					</Button>
					<GoogleLogin
						clientId="Google ID"
						render={(renderProps) => (
							<Button
								className={classes.googleButton}
								color="primary"
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								fullWidth
								variant="contained"
							>
								<img
									src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
									alt="google logo"
								/>
									{isSignUp ? "Sign up with Google" : "Login with Google"}
							</Button>
						)}
						onSuccess={googleSuccess}
						onFailure={googleFailure}
						cookiePolicy="single_host_origin"
					/>
					<Grid container justify="flex-end">
						<Grid item>
							<Button onClick={switchMode}>
								{isSignUp
									? "Already have an account? Login"
									: "Don't have an account? Sign Up"}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default Auth;
