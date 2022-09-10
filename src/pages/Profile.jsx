import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import { db } from '../firebase.config';
import { updateDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const Profile = () => {
	const auth = getAuth();
	const [changeDetails, setChangeDetails] = useState(false);
	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	});

	const { name, email } = formData;

	const navigate = useNavigate();

	const onLogout = () => {
		auth.signOut();
		navigate('/sign-in');
	};

	const onSubmit = async () => {
		try {
			if (auth.currentUser.displayName !== name) {
				// Update display name in firebase
				await updateProfile(auth.currentUser, {
					displayName: name,
				});
				// Update in DB
				const userRef = doc(db, 'users', auth.currentUser.uid);
				await updateDoc(userRef, {
					name,
				});
			}
		} catch (error) {
			toast.error('Oops... Something went wrong, please try again');
		}
	};

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};
	return (
		<div className='profile'>
			<header className='profileHeader'>
				<p className='pageHeader'>My Profile</p>
				<button type='button' onClick={onLogout} className='logOut'>
					Logout
				</button>
			</header>
			<main>
				<div className='profileDetailsHeader'>
					<p className='profileDetailsText'>Personal Details</p>
					<p
						className='changePersonalDetails'
						onClick={() => {
							changeDetails && onSubmit();
							setChangeDetails((prevState) => !prevState);
						}}
					>
						{changeDetails ? 'done' : 'change'}
					</p>
				</div>
				<div className='profileCard'>
					<form>
						<input
							type='text'
							id='name'
							className={!changeDetails ? 'profileName' : 'profileNameActive'}
							disabled={!changeDetails}
							value={name}
							onChange={onChange}
						/>
						<input
							type='email'
							id='email'
							className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
							disabled={!changeDetails}
							value={email}
							onChange={onChange}
						/>
					</form>
				</div>
			</main>
		</div>
	);
};

export default Profile;