import {
  IBaseCarType,
  IBaseBookingProps,
  IBaseCarProps,
  IBaseProviderProps,
  IBaseUserProps,
} from './app';

export interface IResCarType extends IBaseCarType {
  id?: number;
  created_at?: string;
}

export interface IResCarProps extends IBaseCarProps {
  id: number;
  created_at: string;
  type: string;
  regions: {
    code: number;
    name: string;
  };
}

export interface IResProviderProps extends IBaseProviderProps {
  created_at: string;
  region_code: number;
  region?: Region;
}

export interface IResBookingProps extends IBaseBookingProps {
  id: number;
  created_at: string;
  cars?: IResCarProps;
}


export interface Region {
  code:          number;
  name:          string | null;
  created_at: string;
}

export interface RegionDetail {
  old_name:      string;
  country:       string;
  country_code:  string;
  city:          string;
  lon:           number;
  lat:           number;
  result_type:   string;
  formatted:     string;
  address_line1: string;
  address_line2: string;
  category:      string;
  timezone:      any;
  plus_code:     string;
  rank:          any;
  place_id:      string;
}

export interface RegionDetailAPIRes {
  type:     string;
  features: Feature[];
}

interface Feature {
  type:       string;
  properties: RegionDetailProperties;
  bbox:       number[];
}

export interface RegionDetailProperties {
  old_name:      string;
  country:       string;
  country_code:  string;
  city:          string;
  lon:           number;
  lat:           number;
  result_type:   string;
  formatted:     string;
  address_line1: string;
  address_line2: string;
  category:      string;
  plus_code:     string;
  place_id:      string;
}

export interface IResUserProps extends IBaseUserProps {
  created_at: string;
  regions: Region;
}

export interface IResReviewProps {
  id: number;
  created_at: string;
  rate: number;
  comment: string;
  likes: number;
  dislikes: number;
  car_id: string;
  providers: IResProviderProps;
  users: IResUserProps;
}
