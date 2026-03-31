export type HunterRank = 'E' | 'D' | 'C' | 'B' | 'A' | 'S';

export interface Experience {
	role: string;
	company: string;
	location: string;
	period: string;
	duration: string;
	description: string[];
	stack?: string[];
	rank: HunterRank;
}

export interface Project {
	title: string;
	subtitle: string;
	description: string[];
	stack: string[];
	liveUrl?: string;
	githubUrl?: string;
	company?: string;
	rank: HunterRank;
	status?: 'completed' | 'in-progress' | 'upcoming';
	launchDate?: string;
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

export interface HunterStat {
	name: string;
	label: string;
	value: number;
	color: string;
}

export interface IndividualSkill {
	name: string;
	level: number;
	status: 'mastered' | 'active' | 'learning';
}

export interface MapMarker {
	id: string;
	x: number;
	y: number;
	label: string;
	zone: string;
	type: 'completed' | 'in-progress' | 's-rank';
	projectIndex: number;
}

export interface ResumeData {
	name: string;
	title: string;
	location: string;
	email: string;
	phone: string;
	github: string;
	summary: string;
	hunterLevel: number;
	hunterExp: number;
	hunterRank: HunterRank;
	hunterRankProgress: number;
	skills: { category: string; items: string[] }[];
	individualSkills: IndividualSkill[];
	stats: HunterStat[];
	experience: Experience[];
	projects: Project[];
	education: Education[];
	socialLinks: SocialLink[];
}

export const RANK_COLORS: Record<HunterRank, { text: string; border: string; bg: string; glow: string }> = {
	E: { text: 'text-gray-400', border: 'border-gray-500/20', bg: 'bg-gray-500/5', glow: '' },
	D: { text: 'text-emerald-400', border: 'border-emerald-500/20', bg: 'bg-emerald-500/5', glow: '' },
	C: { text: 'text-blue-400', border: 'border-blue-500/20', bg: 'bg-blue-500/5', glow: '' },
	B: { text: 'text-purple-400', border: 'border-purple-500/20', bg: 'bg-purple-500/5', glow: '' },
	A: { text: 'text-amber-400', border: 'border-amber-500/20', bg: 'bg-amber-500/5', glow: 'shadow-[0_0_12px_rgba(251,191,36,0.2)]' },
	S: { text: 'text-red-400', border: 'border-red-500/25', bg: 'bg-red-500/5', glow: 'shadow-[0_0_15px_rgba(239,68,68,0.25)]' }
};

export const MARKER_COLORS = {
	completed: { dot: 'bg-emerald-400', glow: 'shadow-[0_0_12px_rgba(16,185,129,0.4)]', border: 'border-emerald-400/30', text: 'text-emerald-400' },
	'in-progress': { dot: 'bg-blue-400', glow: 'shadow-[0_0_12px_rgba(59,130,246,0.4)]', border: 'border-blue-400/30', text: 'text-blue-400' },
	's-rank': { dot: 'bg-red-500', glow: 'shadow-[0_0_20px_rgba(239,68,68,0.5)]', border: 'border-red-500/40', text: 'text-red-400' }
};
