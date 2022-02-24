const puppeteer = require('puppeteer');
module.exports.findProblem = async (difficulty) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const coreLoop = async () => {
        await page.goto(`https://leetcode.com/problemset/all/?difficulty=${difficulty}&page=1`);
        const [button] = await page.$x(`//span[contains(., 'Pick One')]`);
        if (button) {
            console.log('clicking');
            await button.click();
            await page.waitForNavigation();
        }
    }
    await coreLoop();
    let url = page.url();
    while (url.search(/login/) !== -1) {
        console.log('premium, rerolling');
        await coreLoop();
        url = page.url();
    }
    await browser.close();
    return url;
};

