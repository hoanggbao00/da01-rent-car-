import { today } from '@/const';
import { IFiltersContext, IFiltersState } from '@/models/app';
import { ReactNode, createContext, useContext, useState } from 'react';

export const FiltersContext = createContext<IFiltersContext>(undefined as any);

const initialState: IFiltersState = {
  type: 'any',
  minPrice: 0,
  maxPrice: 500000000,
  minYear: 2000,
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
    setState(initialState);
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
