'use client';
import { IAuthContext } from '@/models/app';
import {
	AuthResponse,
	AuthTokenResponse,
	Session,
	User,
} from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { ReactNode, createContext, useContext } from 'react';
import { useSupabase } from './SupabaseContext';

const AuthContext = createContext<IAuthContext>(undefined as any);

interface Props {
	children: ReactNode;
	session: Session | null;
	user?: User;
}
export const AuthContextProvider = ({ children, session, user }: Props) => {
	const supabase = useSupabase();
	const router = useRouter();

	const logInWithEmailPassword = async (
		email: string,
		password: string
	): Promise<AuthTokenResponse> => {
		const res = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		router.refresh();
		return res;
	};

	const signupWithEmailPassword = async (
		email: string,
		password: string,
		userDetails?: any
	): Promise<AuthResponse> => {
		const res = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${location.origin}/auth/callback`,
				data: { ...userDetails },
			},
		});

		router.refresh();
		return res;
	};

	const signInWithGoogle = async () => {
		const res = await supabase.auth.signInWithOAuth({ provider: 'google' });
		router.refresh();
		return res;
	};

	const logOut = async () => {
		const res = await supabase.auth.signOut();
		router.refresh();
		return res;
	};

	const updatePassword = async (
		email: string,
		oldPassword: string,
		newPassword: string
	) => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password: oldPassword,
		});

		// If password valid
		if (data.user?.id) {
			const { error } = await supabase.auth.updateUser({
				password: newPassword,
			});
			if (error) throw new Error(error.message);
			return true;
		}

		return false;
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				session,
				logOut,
				logInWithEmailPassword,
				signupWithEmailPassword,
				signInWithGoogle,
        updatePassword,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	return context;
};
