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
		name: 'Учёба',
		pages: [
			{ name: 'Расписание', link: '/edu/schedule' }
		],
	} as Category,
	{
		name: 'Учёба2',
		pages: [
			{ name: 'Расписание2', link: '/edu/schedule' }
		],
	} as Category
] as Category[];

