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
};

export default function Places({ places }: PlacesProps) {
	return (
		<section className='places-category'>
			<h2>Tytuł</h2>
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
		</section>
	);
}
