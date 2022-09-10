import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	collection,
	getDocs,
	query,
	where,
	orderBy,
	limit,
	startAfter,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';

const Offers = () => {
	const [listings, setListings] = useState(null);
	const [loading, setLoading] = useState(true);

	const params = useParams();

	useEffect(() => {
		const fetchListings = async () => {
			try {
				// Get Reference
				const listingsRef = collection(db, 'listings');

				// Create Query
				const q = query(
					listingsRef,
					where('offer', '==', true),
					orderBy('timestamp', 'desc'),
					limit(10)
				);

				// Execute Query
				const querySnap = await getDocs(q);

				const listings = [];

				querySnap.forEach((doc) => {
					return listings.push({
						id: doc.id,
						data: doc.data(),
					});
				});

				setListings(listings);
				setLoading(false);
			} catch (error) {
				toast.error('Oops... Something went wrong, Please try again.');
			}
		};

		fetchListings();
	}, []);

	return (
		<div className='category'>
			<header>
				<p className='pageHeader'>Offers</p>
			</header>

			{loading ? (
				<Spinner />
			) : listings && listings.length > 0 ? (
				<>
					<main>
						<ul className='categoryListings'>
							{listings.map((l) => (
								<ListingItem listing={l.data} id={l.id} key={l.id} />
							))}
						</ul>
					</main>
				</>
			) : (
				<p>No current offers</p>
			)}
		</div>
	);
};

export default Offers;
