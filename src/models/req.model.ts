import {
  CarType,
  IBaseBookingProps,
  IBaseCarProps,
  IBaseProviderProps,
  IBaseUserProps,
} from './app';

export interface IReqCarProps extends IBaseCarProps {
  type: string;
}

export interface IReqProviderProps extends IBaseProviderProps {
  region_code: number;
}

export interface IReqBookingProps extends IBaseBookingProps {
  car_id: number;
  user_id: string;
}

export interface IReqUserProps extends IBaseUserProps {
  region_code?: number;
}

export interface IReqReviewProps {
  car_id: number;
  provider_id: string;
  user_id: string;
}
