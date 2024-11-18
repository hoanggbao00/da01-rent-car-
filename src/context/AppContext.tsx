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
	isPageLoading: false,
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

	const setRegion = useCallback((selectedRegion: Region) => {
		setState((prevState) => ({
			...prevState,
			selectedRegion,
		}));
	}, []);

	const setMake = useCallback((selectedMake: SelectItem) => {
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

	const setPageLoading = useCallback((value: boolean) => {
		setState((prevState) => ({
			...prevState,
			isPageLoading: value,
		}));
	}, []);

	return (
		<AppContext.Provider
			value={{
				state,
				setPageLoading,
				setRegion,
				setMake,
				setPickupDate,
				setReturnDate,
			}}
		>
			{state.isPageLoading && (
				<div
					style={{
						position: 'fixed',
						inset: 0,
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
						zIndex: 999,
						display: 'grid',
						placeItems: 'center',
					}}
				>
					<div className='loader'></div>
				</div>
			)}
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	const context = useContext(AppContext);
	return context;
};
