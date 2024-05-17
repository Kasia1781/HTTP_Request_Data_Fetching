type ErrorMessageProps = {
	title: string;
	message: string;
};

export default function ErrorMessage({ title, message }: ErrorMessageProps) {
	return (
		<div className='error'>
			<h2>{title}</h2>
			<p>{message}</p>
			<div id='confirmation-actions'>
				<button className='button'>OK</button>
			</div>
		</div>
	);
}
