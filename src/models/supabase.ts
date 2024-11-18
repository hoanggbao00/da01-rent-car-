export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	public: {
		Tables: {
			bookings: {
				Row: {
					car_id: number | null;
					created_at: string;
					id: number;
					pickupDate: string | null;
					provider_id: string | null;
					returnDate: string | null;
					status: string | null;
					totalPrice: number | null;
					user_id: string | null;
				};
				Insert: {
					car_id?: number | null;
					created_at?: string;
					id?: number;
					pickupDate?: string | null;
					provider_id?: string | null;
					returnDate?: string | null;
					status?: string | null;
					totalPrice?: number | null;
					user_id?: string | null;
				};
				Update: {
					car_id?: number | null;
					created_at?: string;
					id?: number;
					pickupDate?: string | null;
					provider_id?: string | null;
					returnDate?: string | null;
					status?: string | null;
					totalPrice?: number | null;
					user_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'bookings_car_id_fkey';
						columns: ['car_id'];
						isOneToOne: false;
						referencedRelation: 'cars';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'bookings_provider_id_fkey';
						columns: ['provider_id'];
						isOneToOne: false;
						referencedRelation: 'providers';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'bookings_user_id_fkey';
						columns: ['user_id'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			cars: {
				Row: {
					acAvailable: boolean | null;
					acWorking: boolean | null;
					color: string | null;
					created_at: string;
					description: string | null;
					engineCapacity: string | null;
					fuelType: string | null;
					id: number;
					images: string[] | null;
					make: string | null;
					maximumRentalPeriodInDays: number | null;
					minimumRentalPeriodInDays: number | null;
					model: string | null;
					numberOfBags: number | null;
					numberOfDoors: number | null;
					otherFeatures: string[] | null;
					pricePerDay: number | null;
					provider_id: string | null;
					region_code: number | null;
					seatingCapacity: number | null;
					slug: string | null;
					status: string | null;
					transmission: string | null;
					type: string | null;
					year: number | null;
				};
				Insert: {
					acAvailable?: boolean | null;
					acWorking?: boolean | null;
					color?: string | null;
					created_at?: string;
					description?: string | null;
					engineCapacity?: string | null;
					fuelType?: string | null;
					id?: number;
					images?: string[] | null;
					make?: string | null;
					maximumRentalPeriodInDays?: number | null;
					minimumRentalPeriodInDays?: number | null;
					model?: string | null;
					numberOfBags?: number | null;
					numberOfDoors?: number | null;
					otherFeatures?: string[] | null;
					pricePerDay?: number | null;
					provider_id?: string | null;
					region_code?: number | null;
					seatingCapacity?: number | null;
					slug?: string | null;
					status?: string | null;
					transmission?: string | null;
					type?: string | null;
					year?: number | null;
				};
				Update: {
					acAvailable?: boolean | null;
					acWorking?: boolean | null;
					color?: string | null;
					created_at?: string;
					description?: string | null;
					engineCapacity?: string | null;
					fuelType?: string | null;
					id?: number;
					images?: string[] | null;
					make?: string | null;
					maximumRentalPeriodInDays?: number | null;
					minimumRentalPeriodInDays?: number | null;
					model?: string | null;
					numberOfBags?: number | null;
					numberOfDoors?: number | null;
					otherFeatures?: string[] | null;
					pricePerDay?: number | null;
					provider_id?: string | null;
					region_code?: number | null;
					seatingCapacity?: number | null;
					slug?: string | null;
					status?: string | null;
					transmission?: string | null;
					type?: string | null;
					year?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: 'cars_provider_id_fkey';
						columns: ['provider_id'];
						isOneToOne: false;
						referencedRelation: 'providers';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'cars_region_code_fkey';
						columns: ['region_code'];
						isOneToOne: false;
						referencedRelation: 'regions';
						referencedColumns: ['code'];
					}
				];
			};
			providers: {
				Row: {
					avatar: string | null;
					businessRegistrationNumber: string | null;
					companyName: string | null;
					contactName: string | null;
					created_at: string;
					email: string | null;
					id: string;
					phone: string | null;
					region_code: number | null;
				};
				Insert: {
					avatar?: string | null;
					businessRegistrationNumber?: string | null;
					companyName?: string | null;
					contactName?: string | null;
					created_at?: string;
					email?: string | null;
					id: string;
					phone?: string | null;
					region_code?: number | null;
				};
				Update: {
					avatar?: string | null;
					businessRegistrationNumber?: string | null;
					companyName?: string | null;
					contactName?: string | null;
					created_at?: string;
					email?: string | null;
					id?: string;
					phone?: string | null;
					region_code?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: 'providers_id_fkey';
						columns: ['id'];
						isOneToOne: true;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'providers_region_code_fkey';
						columns: ['region_code'];
						isOneToOne: false;
						referencedRelation: 'regions';
						referencedColumns: ['code'];
					}
				];
			};
			regions: {
				Row: {
					created_at: string;
					code: number;
					name: string | null;
				};
				Insert: {
					created_at?: string;
					code?: number;
					name?: string | null;
				};
				Update: {
					created_at?: string;
					code?: number;
					name?: string | null;
				};
			};
			reviews: {
				Row: {
					car_id: number | null;
					comment: string | null;
					created_at: string;
					dislikes: number | null;
					id: number;
					likes: number | null;
					provider_id: string | null;
					rate: number | null;
					user_id: string | null;
				};
				Insert: {
					car_id?: number | null;
					comment?: string | null;
					created_at?: string;
					dislikes?: number | null;
					id?: number;
					likes?: number | null;
					provider_id?: string | null;
					rate?: number | null;
					user_id?: string | null;
				};
				Update: {
					car_id?: number | null;
					comment?: string | null;
					created_at?: string;
					dislikes?: number | null;
					id?: number;
					likes?: number | null;
					provider_id?: string | null;
					rate?: number | null;
					user_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'reviews_car_id_fkey';
						columns: ['car_id'];
						isOneToOne: false;
						referencedRelation: 'cars';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'reviews_provider_id_fkey';
						columns: ['provider_id'];
						isOneToOne: false;
						referencedRelation: 'providers';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'reviews_user_id_fkey';
						columns: ['user_id'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			users: {
				Row: {
					avatar: string | null;
					created_at: string;
					dateOfBirth: string | null;
					email: string | null;
					firstName: string | null;
					gender: string | null;
					id: string;
					lastName: string | null;
					phone: string | null;
					region_code: number | null;
					is_read: boolean | null;
				};
				Insert: {
					avatar?: string | null;
					created_at?: string;
					dateOfBirth?: string | null;
					email?: string | null;
					firstName?: string | null;
					gender?: string | null;
					id: string;
					lastName?: string | null;
					phone?: string | null;
					region_code?: number | null;
				};
				Update: {
					avatar?: string | null;
					created_at?: string;
					dateOfBirth?: string | null;
					email?: string | null;
					firstName?: string | null;
					gender?: string | null;
					id?: string;
					lastName?: string | null;
					phone?: string | null;
					region_code?: number | null;
					is_read: boolean | null;
				};
				Relationships: [
					{
						foreignKeyName: 'users_id_fkey';
						columns: ['id'];
						isOneToOne: true;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'users_region_code_fkey';
						columns: ['region_code'];
						isOneToOne: false;
						referencedRelation: 'regions';
						referencedColumns: ['code'];
					}
				];
			};
			notifications: {
				Row: {
					id: number;
					created_at: string;
					transfer_id: string;
					receiver_id: string;
					content: string;
					path: string | null;
					entity_name: string
				};
				Insert: {
					transfer_id: string;
					receiver_id: string;
					content: string;
					path: string | null;
					entity_name: string
				};
				Update: {
					transfer_id: string;
					receiver_id: string;
					content: string;
					path: string | null;
					entity_name: string
				};
				Relationships: [
					{
						foreignKeyName: 'notifications_transfer_id_fkey1';
						columns: ['transfer_id'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'notifications_receiver_id_fkey1';
						columns: ['receiver_id'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			}
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema['Tables'] & PublicSchema['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
	  }
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
			PublicSchema['Views'])
	? (PublicSchema['Tables'] &
			PublicSchema['Views'])[PublicTableNameOrOptions] extends {
			Row: infer R;
	  }
		? R
		: never
	: never;

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof PublicSchema['Tables']
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
	  }
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
	? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
			Insert: infer I;
	  }
		? I
		: never
	: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof PublicSchema['Tables']
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
	  }
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
	? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
			Update: infer U;
	  }
		? U
		: never
	: never;

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof PublicSchema['Enums']
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
	? PublicSchema['Enums'][PublicEnumNameOrOptions]
	: never;
