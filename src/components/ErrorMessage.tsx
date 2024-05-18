type ErrorMessageProps = {
	title: string;
	message: string;
	onClose: () => void;
};

export default function ErrorMessage({
	title,
	message,
	onClose,
}: ErrorMessageProps) {
	return (
		<div className='error'>
			<h2>{title}</h2>
			<p>{message}</p>
			<div id='confirmation-actions'>
				<button onClick={onClose} className='button'>
					OK
				</button>
			</div>
		</div>
	);
}
