import { today } from '@/const';
import { IFiltersContext, IFiltersState } from '@/models/app';
import { ReactNode, createContext, useContext, useState } from 'react';
import { useAppContext } from './AppContext';
import { useRouter } from 'next/navigation';

export const FiltersContext = createContext<IFiltersContext>(undefined as any);

const initialState: IFiltersState = {
	type: 'any',
	minPrice: 0,
	maxPrice: 50000000,
	minYear: 1995,
	maxYear: today.getFullYear(),
	transmission: 'any',
	fuelType: 'any',
};

export const FiltersContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [state, setState] = useState<IFiltersState>(initialState);
	const { setMake, setPickupDate, setRegion, setReturnDate } = useAppContext();
	const { replace } = useRouter();

	const updateFilterProperty = (
		key: keyof IFiltersState,
		value: IFiltersState[keyof IFiltersState]
	) => {
		setState((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};

	const resetFilters = () => {
		setMake(undefined);
		setPickupDate(null);
		setRegion(undefined);
		setReturnDate(null);
		setState(initialState);

		replace('/cars?');
	};

	return (
		<FiltersContext.Provider
			value={{
				state,
				updateFilterProperty,
				resetFilters,
			}}
		>
			{children}
		</FiltersContext.Provider>
	);
};

export const useFiltersContext = () => {
	const context = useContext(FiltersContext);
	return context;
};
