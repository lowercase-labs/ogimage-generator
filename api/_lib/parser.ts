import { Request } from 'express';
import { parse } from 'url';
import { ParsedRequest } from './types';
import metascraper from 'metascraper';
import desc from 'metascraper-description';
import title from 'metascraper-title';
import { getPage } from './chromium';

export async function parseURLRequest(req: Request, startSkipWord: string = '') {
	console.log('HTTP ' + req.url, startSkipWord);
	const { query } = parse(req.url || '/', true);
	const { url  } = query || {};
	const scraper = metascraper([title(), desc()]);
	const targetUrl = String(url) || '';
	const page = await getPage();
	await page.goto(targetUrl, { waitUntil: 'networkidle2' });
	const html = await page.content();

	const metadata = await scraper({ html, url: targetUrl });
	console.log(metadata);

	let extension = '', imgTitle = '', imgDesc = '';
	if (metadata) {
		imgTitle = metadata.title ? metadata.title : '';
		imgDesc = metadata.description ? metadata.description : '';
	}

	const parsedRequest: ParsedRequest = {
		fileType: extension === 'jpeg' ? extension : 'png',
		imgTitle: decodeURIComponent(imgTitle),
		imgDesc: imgDesc || '',
		logo: '',
		textColor: '',
		bgColor: 'black',
	};
	return parsedRequest;
}
