export type NavLink = {
	name: string;
	link: string;
};

export type Category = {
	name: string;
	pages: NavLink[];
};

export const NavList = [
	{
		name: 'Доступные',
		pages: [{ name: 'Главная', link: '/' }],
	} as Category,
	{
		name: 'Учёба',
		pages: [
			{ name: 'Расписание', link: '/edu/schedule' },
			{ name: 'Программы', link: '/edu/programms' },
		],
	} as Category,
	{
		name: 'Учёба2',
		pages: [{ name: 'Расписание2', link: '/edu/schedule' }],
	} as Category,
] as Category[];
