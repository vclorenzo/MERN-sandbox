import { useField } from 'formik';
import TextField from '@mui/material/TextField';

const InputField = ({
	label,
	...props
}: {
	[x: string]: any;
	name: string;
}) => {
	const [field, meta] = useField(props);
	return (
		<TextField
			{...field}
			{...props}
			label={label}
			error={meta.touched && Boolean(meta.error)}
			helperText={meta.touched && meta.error ? meta.error : ''}
			variant="outlined"
			fullWidth
		/>
	);
};

export default InputField;
