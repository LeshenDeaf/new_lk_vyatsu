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
        'vyatsu-blue-shadow': 'rgba(46, 158, 203, 0.2)',
        'vyatsu-shadow': 'rgba(34, 47, 162, 0.2)',
        'vyatsu-shadow-light': 'rgba(34, 47, 162, 0.1)',
        'vytsu-review-button-shadow': 'rgba(27, 96, 255, 0.25)',
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
