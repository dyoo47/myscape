export interface LinkedInDataEntry {
	title: string;
	link: string;
	seniority: string;
	company: string;
	location: string;
	description: string;
	quals: string[];
}
export const LINKED_IN_URL =
	'https://www.linkedin.com/jobs/search?keywords=software%20engineer&location=United%20States&geoId=103644278&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0';
export const DEFAULT_QUERY = 'software engineer';
export const MQ_TAGS = [
	'minimum qualifications',
	'what you bring',
	'who you are',
	'requirements',
	'minimum requirements',
	'qualifications',
	'about you',
	"you're a match for our team if you"
];
