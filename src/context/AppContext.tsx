import { IAppContext, IAppState, SelectItem } from '@/models/app';
import { Region } from '@/models/res.model';
import { DateValue } from '@mantine/dates';
import {
	ReactNode,
	createContext,
	useCallback,
	useContext,
	useState,
} from 'react';

export const AppContext = createContext<IAppContext>(undefined as any);

const initialState: IAppState = {
	selectedRegion: undefined,
	carMake: undefined,
	pickupDate: undefined,
	returnDate: undefined,
};

interface Props {
	children: ReactNode;
}
export const AppContextProvider = ({ children }: Props) => {
	const [state, setState] = useState<IAppState>(initialState);

	const setRegion = useCallback((selectedRegion: Region | undefined) => {
		setState((prevState) => ({
			...prevState,
			selectedRegion,
		}));
	}, []);

	const setMake = useCallback((selectedMake: SelectItem | undefined) => {
		setState((prevState) => ({
			...prevState,
			carMake: selectedMake,
		}));
	}, []);

	const setPickupDate = useCallback((pickupDate: DateValue) => {
		setState((prevState) => ({
			...prevState,
			pickupDate,
		}));
	}, []);

	const setReturnDate = useCallback((returnDate: DateValue) => {
		setState((prevState) => ({
			...prevState,
			returnDate,
		}));
	}, []);

	return (
		<AppContext.Provider
			value={{
				state,
				setRegion,
				setMake,
				setPickupDate,
				setReturnDate,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	const context = useContext(AppContext);
	return context;
};
