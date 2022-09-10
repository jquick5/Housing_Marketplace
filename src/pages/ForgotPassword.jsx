import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');

	const onChange = (e) => setEmail(e.target.value);

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const auth = getAuth();
			await sendPasswordResetEmail(auth, email);
			toast.success('Reset Email Sent');
		} catch (error) {
			toast.error('Oops... Something went wrong, please try again.');
		}
	};

	return (
		<div className='pageContainer'>
			<header>
				<p className='pageHeader'>Forgot Password</p>
			</header>
			<main>
				<form onSubmit={onSubmit}>
					<input
						type='email'
						className='emailInput'
						placeholder='Email'
						id='email'
						value={email}
						onChange={onChange}
					/>
					<Link to='/sign-in' className='forgotPasswordLink'>
						Sign In
					</Link>
					<div className='signInBar'>
						<div className='signInText'>Send Reset Link</div>
						<button className='signInButton'>
							<ArrowRightIcon fill='#fff' width='36px' height='36px' />
						</button>
					</div>
				</form>
			</main>
		</div>
	);
};

export default ForgotPassword;
