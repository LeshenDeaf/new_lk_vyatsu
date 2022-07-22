export type NavLink = {
	id: number;
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
			{ id: 1, name: 'Расписание', link: '/edu/schedule' }
		],
	} as Category,
	{
		name: 'Учёба2',
		pages: [
			{ id: 2, name: 'Расписание2', link: '/edu/schedule' }
		],
	} as Category
] as Category[];

