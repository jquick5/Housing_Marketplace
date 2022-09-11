import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	collection,
	detDocs,
	query,
	orderBy,
	limit,
	getDocs,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';
import Spinner from './Spinner';

const Slider = () => {
	const [loading, setLoading] = useState(true);
	const [listings, setListings] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		const getListings = async () => {
			const listingsRef = collection(db, 'listings');
			const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5));
			const qSnap = await getDocs(q);

			let listings = [];

			qSnap.forEach((doc) => {
				return listings.push({
					id: doc.id,
					data: doc.data(),
				});
			});

			setListings(listings);
			setLoading(false);
		};

		getListings();
	}, []);

	if (loading) {
		return <Spinner />;
	}

	return (
		listings && (
			<>
				<p className='exploreHeading'>Recommended</p>
				<Swiper
					modules={[Navigation, Pagination, Scrollbar, A11y]}
					slidesPerView={1}
					pagination={{ clickable: true }}
					navigation
					autoplay={{
						delay: 3000,
						disableOnInteraction: false,
						pauseOnMouseEnter: true,
					}}
				>
					{listings.map(({ data, id }) => {
						return (
							<SwiperSlide
								key={id}
								onClick={() => navigate(`/category/${data.type}/${id}`)}
							>
								<div
									style={{
										background: `url(${data.imageUrls[0]}) center no-repeat`,
										backgroundSize: 'cover',
										padding: '150px',
									}}
									className='swiperSlideDiv'
								>
									<p className='swiperSlideText'>{data.name}</p>
									<p className='swiperSlidePrice'>
										${data.discountedPrice ?? data.regularPrice}{' '}
										{data.type === 'rent' && '/month'}
									</p>
								</div>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</>
		)
	);
};

export default Slider;
