export interface Experience {
	role: string;
	company: string;
	location: string;
	period: string;
	description: string[];
	stack?: string[];
}

export interface Project {
	title: string;
	subtitle: string;
	description: string[];
	stack: string[];
	liveUrl?: string;
	githubUrl?: string;
	company?: string;
}

export interface Education {
	institution: string;
	degree: string;
	period: string;
	gpa: string;
}

export interface SocialLink {
	name: string;
	url: string;
}

export interface ResumeData {
	name: string;
	title: string;
	location: string;
	email: string;
	phone: string;
	github: string;
	summary: string;
	skills: { category: string; items: string[] }[];
	experience: Experience[];
	projects: Project[];
	education: Education[];
	socialLinks: SocialLink[];
}
