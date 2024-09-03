import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../../slices/modalSlice';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function ConfirmCreditCardModal() {
	// const [open, setOpen] = useState(false)
	// const handleOpen = () => setOpen(true);

	// @ts-ignore
	const { modals } = useSelector((state) => state.modals);
	const dispatch = useDispatch();
	const handleClose = () => {
		dispatch(
			setModal({
				addCreditCardInfo: false,
				confirmCreditCardInfo: false,
				cancelCreditCardInfo: false,
				successCreditCardInfo: false,
				errorCreditCardInfo: false,
			})
		);
	};

	return (
		<div>
			<Modal
				open={modals.confirmCreditCardInfo}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						CONFIRM
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
					</Typography>
					<Button onClick={handleClose}>CLOSE</Button>
				</Box>
			</Modal>
		</div>
	);
}
