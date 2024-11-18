import { ComboboxItem, OptionsFilter } from '@mantine/core';
import { Region } from './models/res.model';

export const getDefaultSelectedRegion = (
	regions: Region[],
	region_code: string | null
): Region => {
	if (region_code) {
		return regions.filter(
			(region) => region.code.toString() === region_code
		)[0];
	}
	return {
		code: -1,
		name: '',
		created_at: ''
	};
};

export function formatDate(inputDate: Date | string): string {
	let date: Date;

	// Convert the input to a Date object if it's a string
	if (typeof inputDate === 'string') {
		date = new Date(inputDate);
	} else if (inputDate instanceof Date) {
		date = inputDate;
	} else {
		throw new Error('Invalid input. Please provide a Date or a date string.');
	}

	const formattedDate = `${date.getDate()}/${(date.getMonth() + 1)
		.toString()
		.padStart(2, '0')}/${date.getFullYear()}`;
	return formattedDate;
}

export const optionsFilter: OptionsFilter = ({ options, search }) => {
	const filtered = (options as ComboboxItem[]).filter((option) =>
		option.label?.toLowerCase().trim().includes(search.toLowerCase().trim())
	);

	filtered.sort((a, b) => a.label.localeCompare(b.label));
	return filtered;
};
