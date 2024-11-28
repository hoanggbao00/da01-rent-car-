import { DateInput, DateValue } from '@mantine/dates';
import { ReactNode } from 'react';
import { BiCalendar } from 'react-icons/bi';

interface Props {
	label?: ReactNode;
	value?: DateValue | Date;
	minDate?: Date;
	onChange?: (value: DateValue | Date) => void;
}
export function SelectDate({ label, value, onChange, minDate }: Props) {
	return (
		<DateInput
			
			value={value}
			onChange={onChange}
			label={label}
			placeholder='Pick a date'
			width='100%'
			minDate={minDate}
			locale='vi'
			valueFormat={'DD/MM/YYYY'}
		/>
	);
}
