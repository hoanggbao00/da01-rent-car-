import { useMantineColorScheme, Group } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

export function ThemeSwitcher() {
	const { colorScheme, setColorScheme } = useMantineColorScheme();

	const handleSwitchTheme = () => {
		setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
	};

	return (
		<Group justify='center'>
			<div className='flex flex-col justify-center'>
				<div
					className='relative cursor-pointer p-2 bg-gray-500/10 rounded-lg'
					onClick={handleSwitchTheme}
				>
					{colorScheme == 'dark' ? (
						<IconMoon size={16} color='yellow' />
					) : (
						<IconSun size={16} />
					)}
					<span className='sr-only'>Switch to light / dark version</span>
				</div>
			</div>
		</Group>
	);
}
