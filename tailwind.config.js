module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./app/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
      colors: {
        'vyatsu-blue': '#4080F5',
        'vyatsu-darkblue': '#2E6DCB',
      },
    },
    fontFamily: {
      'sans': ['Roboto'],
      'roboto': ['Roboto', 'sans-serif'],
    }
	},
	variants: {},
	plugins: [],
};
