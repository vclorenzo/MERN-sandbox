import { Box, Button } from '@mui/material';
import { FormikValues } from 'formik';
import React from 'react';

interface Props {
	hasPrevious?: boolean;
	onBackClick: (values: FormikValues) => void;
	isLastStep: boolean;
}

const FormNavigation = ({ hasPrevious, onBackClick, isLastStep }: Props) => {
	return (
		<Box
			sx={{
				display: 'flex',
				marginTop: '50px',
				justifyContent: 'space-between',
			}}
		>
			{hasPrevious && (
				<Button
					type="button"
					variant="contained"
					color="primary"
					onClick={onBackClick}
				>
					Back
				</Button>
			)}
			<Button type="submit" variant="contained" color="primary">
				{isLastStep ? 'Submit' : 'Next'}
			</Button>
		</Box>
	);
};

export default FormNavigation;
