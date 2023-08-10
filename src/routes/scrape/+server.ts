import { DEFAULT_QUERY } from '$lib/server/constants.js';
import { json } from '@sveltejs/kit';
import puppeteer, { ElementHandle, Page } from 'puppeteer';
import getSummary from '../api/generate.js';

const getTextByClass = async (element: ElementHandle<Element> | Page, classText: string) => {
	return (await (await element.$(classText))?.evaluate((el) => el.textContent))?.trim() as string;
};

const getHrefByClass = async (element: ElementHandle<Element> | Page, classText: string) => {
	return (
		await (await element.$(classText))?.evaluate((el) => el.getAttribute('href'))
	)?.trim() as string;
};

const truncateString = (string = '', maxLength = 50) =>
	string.length > maxLength ? `${string.substring(0, maxLength)}…` : string;

interface LinkedInDataEntry {
	title: string;
	link: string;
	seniority: string;
	company: string;
	location: string;
	description: string;
}

const request = async (query: string) => {
	const browser = await puppeteer.launch({
		headless: false,
		defaultViewport: null
	});

	const page = await browser.newPage();
	const start = 0;
	const jobListPage = await fetch(
		`https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?trk=guest_homepage-basic_guest_nav_menu_jobs&start=${start}&keywords=${query}`
	);
	const html = await jobListPage.text();

	page.setContent(html);

	const jobIds = await page.$$eval('.job-search-card', (el) =>
		el.map((x) => x.getAttribute('data-entity-urn')?.replace(/[^0-9]/g, ''))
	);
	//console.log(jobIds);

	let data: LinkedInDataEntry[] = [];

	for (let i = 0; i < jobIds.length; i++) {
		const response = await fetch(
			'https://www.linkedin.com/jobs-guest/jobs/api/jobPosting/' + jobIds[i]
		);
		const html = await response.text();
		page.setContent(html);
		const seniority = await getTextByClass(page, '.description__job-criteria-text');
		const company = await getTextByClass(page, '.topcard__org-name-link');
		const title = await getTextByClass(page, '.topcard__link');
		const link = await getHrefByClass(page, '.topcard__link');
		const location = await getTextByClass(page, '.topcard__flavor--bullet');
		const raw = await getTextByClass(page, '.show-more-less-html__markup--clamp-after-5');
		const description = truncateString(raw);

		const pay = await getSummary(raw);
		console.log(pay);

		const entry = { title, link, seniority, company, location, description };
		//console.log(entry);
		if (entry.title) data = data.concat(entry);
	}

	await browser.close();

	return data;
};

export const GET = async ({ url }) => {
	const query = url.searchParams.get('query');
	const data = await request(query ? query : DEFAULT_QUERY);
	return json(data);
};
