import { LINKED_IN_URL } from '$lib/server/constants';
import { json } from '@sveltejs/kit';
import puppeteer from 'puppeteer';

const searchLinkedIn = async () => {
	const browser = await puppeteer.launch({
		headless: true,
		defaultViewport: null
	});

	const page = await browser.newPage();

	await page.goto(LINKED_IN_URL, {
		waitUntil: 'domcontentloaded'
	});

	console.log('fetching data...');
	const cards = await page.evaluate(async () => {
		const elements = document.querySelectorAll('.job-search-card');

		return await Promise.all(
			Array.from(elements).map(async (element) => {
				const title = (element.querySelector('.base-search-card__title') as HTMLElement).innerText;
				const link = (element.querySelector('.base-card__full-link') as HTMLAnchorElement).href;
				const company = (element.querySelector('.base-search-card__subtitle') as HTMLElement)
					.innerText;
				const location = (element.querySelector('.job-search-card__location') as HTMLElement)
					.innerText;

				return { title, link, company, location };
			})
		);
	});

	await browser.close();
	console.log('data received.');

	return cards;
};

export async function GET() {
	const data = await searchLinkedIn();
	return json(data);
}
