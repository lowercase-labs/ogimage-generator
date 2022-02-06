import { readFileSync } from 'fs';
import { ParsedRequest } from './types';

const tailwindcss = readFileSync(`${__dirname}/../public/css/style.css`).toString();

const getCss = () => {
	return `
    <style>
        body {
            background-color: #fff;
            height: 100vh;
            display: flex;
            text-align: center;
            align-items: center;
            justify-content: center;
        }
        ${tailwindcss}
    </style>
    `;
}
const getHtmlTemplate = (imgDomain: string, imgTitle:string, imgDesc:string, templateID: number, color: string) => {
    let htmlString;
    switch(templateID) {
        case 1:
            htmlString = `
            <body class="border-t-8 border-${color}-600">
                <div class="container w-100">
                    <div class="spacer">
                        <div class="text-container text-left space-y-4">
                            <h3 class="text-xl text-${color}-900">${imgDomain}</h3>
                            <h2 class="sub-heading text-3xl">${imgDesc}</h2>
                        </div>
                    </div>
                </div>
            </body>
            `;
            break;
        case 2:
            htmlString = `
            <body class="border-t-8 border-${color}-600">
                <div class="container w-100">
                    <div class="spacer">
                        <div class="text-container text-left space-y-4">
                            <h3 class="text-xl text-${color}-900">${imgDomain}</h3>
                            <h1 class="font-bold text-5xl text-${color}-600">${imgTitle}</h1> 
                            <h2 class="sub-heading text-3xl">${imgDesc}</h2>
                        </div>
                    </div>
                </div>
            </body>
            `;
            break;
        default:
            htmlString = `
            <body class="border-t-8 border-${color}-600">
                <div class="container w-100">
                    <div class="spacer">
                        <div class="text-container text-left space-y-4">
                            <h3 class="text-xl text-${color}-900">${imgDomain}</h3>
                            <h1 class="font-bold text-5xl text-${color}-600">${imgTitle}</h1> 
                            <h2 class="sub-heading text-3xl">${imgDesc}</h2>
                        </div>
                    </div>
                </div>
            </body>
            `;
    }
    return htmlString;
}
export function getHtml(parsedReq: ParsedRequest) {
	const { imgDomain, imgTitle, imgDesc, templateID, color } = parsedReq;
	return `<!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>Generated Image</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
            </head>
            ${getCss()}
            ${getHtmlTemplate(imgDomain, imgTitle, imgDesc, templateID, color)}
        </html>`;
}
