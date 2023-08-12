import type { LinkedInDataEntry } from '$lib/constants';
import { DEFAULT_QUERY, MQ_TAGS } from '$lib/constants';
import { json } from '@sveltejs/kit';
import puppeteer, { ElementHandle, Page } from 'puppeteer';

const getTextByClass = async (element: ElementHandle<Element> | Page, classText: string) => {
	return (await (await element.$(classText))?.evaluate((el) => el.textContent))?.trim() as string;
};

const getHrefByClass = async (element: ElementHandle<Element> | Page, classText: string) => {
	return (
		await (await element.$(classText))?.evaluate((el) => el.getAttribute('href'))
	)?.trim() as string;
};

const getListItems = async (header: ElementHandle<HTMLElement>) => {
	let name = '';
	let sibling = await header?.evaluateHandle((el) => el.nextElementSibling);
	while (sibling?.asElement()) {
		sibling = sibling as ElementHandle<HTMLElement>;
		name = await sibling.evaluate((el) => el.nodeName);
		if (name === 'UL') {
			const quals = await Promise.all(
				(
					await sibling.$$('li')
				).map(async (qual) => (await qual.evaluate((el) => el.textContent)) as string)
			);
			return quals;
		}
		sibling = await sibling?.evaluateHandle((el) => el.nextElementSibling);
	}
	return [];
};

const truncateString = (string = '', maxLength = 200) =>
	string.length > maxLength ? `${string.substring(0, maxLength)}…` : string;

const request = async (query: string) => {
	const browser = await puppeteer.launch({
		headless: true,
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
	console.log(jobIds);

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
		const raw = await page.$('.show-more-less-html__markup--clamp-after-5');

		const headers = await raw?.$$('strong');
		const iter = headers ? headers : [];
		let quals: string[] = [];
		for (const header of iter) {
			const text = (await header.evaluate((el) => el.textContent))
				?.toLowerCase()
				.replace(':', '')
				.trim();
			if (MQ_TAGS.includes(text as string)) {
				quals = await getListItems(header);
			}
		}

		console.log(quals);
		const description = truncateString((await raw?.evaluate((el) => el.textContent)) as string);
		const entry = { title, link, seniority, company, location, description, quals };
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
