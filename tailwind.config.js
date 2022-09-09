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
        'vyatsu-programs-universal': '#C0E2EF',
        'vyatsu-programs-common': '#FFF8B6',
        'vyatsu-programs-prof': '#C4EAAB',
        'vyatsu-programs-other': '#E9BBFF',
      },
      dropShadow: {
        'blue': '0 2px 30px rgba(34,47,162,0.2)',
        'button': '0px 12px 20px rgba(27, 96, 255, 0.25)'
      },
      boxShadow: {
        'side-blue': '0px 20px 20px rgba(46, 158, 203, 0.2)',
        'l-blue': '0px 0px 40px rgba(34, 47, 162, 0.1)',
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
