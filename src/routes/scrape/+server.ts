import { LINKED_IN_URL } from '$lib/server/constants';
import { json } from '@sveltejs/kit';
import puppeteer from 'puppeteer';

const getQuotes = async () => {
	const browser = await puppeteer.launch({
		headless: false,
		defaultViewport: null
	});

	const page = await browser.newPage();

	await page.goto(LINKED_IN_URL, {
		waitUntil: 'domcontentloaded'
	});

	console.log('fetching data');
	const quotes = await page.evaluate(() => {
		const elements = document.querySelectorAll('.job-search-card');

		return Array.from(elements).map((element) => {
			const title = (element.querySelector('.base-search-card__title') as HTMLElement).innerText;
			const link = (element.querySelector('.base-card__full-link') as HTMLAnchorElement).href;
			const company = (element.querySelector('.base-search-card__subtitle') as HTMLElement)
				.innerText;
			const location = (element.querySelector('.job-search-card__location') as HTMLElement)
				.innerText;

			return { title, link, company, location };
		});
	});

	await browser.close();

	return quotes;
};

export async function GET() {
	const quotes = await getQuotes();
	return json(quotes);
}
