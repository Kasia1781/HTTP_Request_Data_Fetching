export type PlaceProps = {
	id: number;
	title: string;
	image: {
		src: string;
		alt: string;
	};
};

type PlacesProps = {
	places: PlaceProps[];
	title: string;
	fallbackText: string;
	isLoading: boolean;
};

export default function Places({
	places,
	title,
	fallbackText,
	isLoading,
}: PlacesProps) {
	return (
		<section className='places-category'>
			<h2>{title}</h2>
			{places.length === 0 && <p className='fallback-text'>{fallbackText}</p>}
			{places.length > 0 && (
				<ul className='places'>
					{places.map((place) => (
						<li key={place.id} className='place-item'>
							<button>
								<img
									src={`http://localhost:3000/${place.image.src}`}
									alt={place.image.alt}
								/>
								<h3>{place.title}</h3>
							</button>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
