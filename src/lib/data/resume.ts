import type { ResumeData } from '$lib/types';

export const resume: ResumeData = {
	name: 'Harsh Parmar',
	title: 'Full-Stack Developer',
	location: 'Ahmedabad, India',
	email: 'harshparmar0421@gmail.com',
	phone: '+91-9537128189',
	github: 'https://github.com/harshp421',
	summary:
		"I'm a Full Stack Developer with 1.5+ years of experience shipping production apps — from a live urban-planning platform to an org-wide component library. I thrive on turning complex ideas into elegant, performant web applications.",
	skills: [
		{
			category: 'Languages',
			items: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3']
		},
		{
			category: 'Frameworks',
			items: ['React.js', 'Next.js', 'SvelteKit', 'Angular', 'Ionic', 'Node.js', 'Express.js']
		},
		{
			category: 'Styling',
			items: ['Tailwind CSS', 'shadcn/ui', 'Material UI', 'Bootstrap']
		},
		{
			category: 'Databases',
			items: ['MongoDB', 'Firebase', 'BigQuery']
		},
		{
			category: 'Cloud & Maps',
			items: ['Google Cloud Platform', 'Google Maps API', 'Mappls Map', 'OpenStreetMap']
		},
		{
			category: 'Tools',
			items: ['Git', 'GitHub', 'REST APIs', 'Baserow', 'RevenueCat', 'Razorpay', 'OTPless']
		}
	],
	experience: [
		{
			role: 'Full Stack Developer',
			company: 'Oizom',
			location: 'Ahmedabad',
			period: 'Jan 2025 — Present',
			description: [
				'Built and own a full-stack internal admin tool used daily org-wide for device lifecycle, inventory, configurations, assembly, and IoT sensor management.',
				'Handled complete front-end architecture and contributed to back-end API development (Node.js, Express.js).',
				'Developed the Oizom Design System — 25+ reusable components in SvelteKit, TypeScript, Tailwind CSS, and shadcn/ui — adopted across all products.',
				'Worked cross-functionally with product, design, hardware, and operations teams to align requirements and deliver features.'
			],
			stack: ['SvelteKit', 'TypeScript', 'Node.js', 'Express.js', 'Tailwind CSS', 'shadcn/ui']
		},
		{
			role: 'Software Developer Intern',
			company: 'Oizom',
			location: 'Ahmedabad',
			period: 'May 2024 — Dec 2024',
			description: [
				'Worked on multiple innovation projects for internal and client use across the organization.',
				'Built LawFinder — a legal data visualization tool mapping IPC to BNS, IEA to BSA, and CRPC to BNSS with real-time updates via Indiankanoon RSS feed.',
				'Developed the AiRowl informational website, presenting product features and air quality data from Oizom\'s AiRowl device.',
				'Communicated directly with clients for requirement gathering and delivered feedback-driven iterations.'
			],
			stack: [
				'SvelteKit',
				'Angular',
				'Ionic',
				'Firebase',
				'GCP',
				'Node.js',
				'Tailwind CSS',
				'TypeScript'
			]
		},
		{
			role: 'Front-End Developer Intern',
			company: 'WebOccult Technologies',
			location: 'Ahmedabad',
			period: 'Jan 2023 — Jun 2023',
			description: [
				'Developed and maintained reusable React components, improving code efficiency and long-term maintainability.',
				'Built responsive web pages using HTML5, CSS3, Bootstrap, and JavaScript aligned with design specifications.',
				'Strengthened JavaScript fundamentals through delivery of small, self-contained functional projects.'
			],
			stack: ['React.js', 'HTML5', 'CSS3', 'Bootstrap', 'JavaScript']
		}
	],
	projects: [
		{
			title: 'TownPlanMap',
			subtitle: 'Future Cities on Google Maps',
			description: [
				'Production platform visualizing India\'s proposed town planning schemes and industrial zones on an interactive map.',
				'Cut map/API infrastructure costs from ₹5,000/day to ₹0 by migrating from MapMyIndia to an open-source alternative.',
				'Led front-end redevelopment from SvelteKit to Angular + Ionic for cross-platform support.',
				'Integrated Razorpay payment gateway and RevenueCat for in-app purchases.'
			],
			stack: ['SvelteKit', 'Angular', 'Ionic', 'Firebase', 'Google Maps', 'Razorpay', 'TypeScript'],
			liveUrl: 'https://townplanmap.com',
			company: 'Oizom'
		},
		{
			title: 'Internal Admin Tool',
			subtitle: 'Device & Inventory Management',
			description: [
				'Full-stack internal admin tool adopted org-wide for managing inventory, devices, configurations, parts, assemblies, and sensor metadata.',
				'Owned complete front-end architecture and contributed to back-end API development.',
				'Improved operational efficiency by centralizing device management into a single unified interface.'
			],
			stack: ['SvelteKit', 'Node.js', 'Express.js', 'TypeScript', 'Tailwind CSS'],
			company: 'Oizom'
		},
		{
			title: 'Oizom Design System',
			subtitle: 'Reusable Component Library',
			description: [
				'Scalable component library with 25+ components in SvelteKit using Tailwind CSS, shadcn/ui, and TypeScript.',
				'Standardized UI across all Oizom products.',
				'Collaborated closely with the design team to translate Figma designs into reusable, accessible components.'
			],
			stack: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'],
			company: 'Oizom'
		},
		{
			title: 'LawFinder',
			subtitle: 'Legal Data Visualization',
			description: [
				'Legal data visualization tool mapping IPC to BNS, IEA to BSA, and CRPC to BNSS by sections and chapters.',
				'Real-time updates via Indiankanoon RSS feed integration.'
			],
			stack: ['React.js', 'Next.js', 'Tailwind CSS', 'shadcn/ui'],
			company: 'Oizom'
		}
	],
	education: [
		{
			institution: 'KS School of Business Management, Ahmedabad',
			degree: 'M.Sc. (CA & IT)',
			period: '2023 — 2025',
			gpa: '3.33 / 5.00'
		},
		{
			institution: 'KS School of Business Management, Ahmedabad',
			degree: 'B.Sc. (CA & IT)',
			period: '2020 — 2023',
			gpa: '3.00 / 5.00'
		}
	],
	socialLinks: [
		{ name: 'GitHub', url: 'https://github.com/harshp421' },
		{ name: 'Email', url: 'mailto:harshparmar0421@gmail.com' },
		{ name: 'Phone', url: 'tel:+919537128189' }
	]
};
