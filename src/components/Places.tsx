export type PlaceProps = {
	id: number;
	title: string;
	image: {
		src: string;
		alt: string;
	};
};

export default function Places({ title, image }: PlaceProps) {
	return (
		<section className='places-category'>
			<h2>{title}</h2>
			<ul className='places'>
				<li className='place-item'>
					<button>
						<img />
						<h3>{title}</h3>
					</button>
				</li>
			</ul>
		</section>
	);
}
