import puppeteer from 'puppeteer';

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const url = "https://www.mcexperienciasurvey.com";

    await page.goto(url);
    await page.setViewport({ width: 1080, height: 1024 });

    await page.waitForSelector('#NextButton');
    await page.click('#NextButton');
    console.log('Clicked on #NextButton');
    await delay(2000);

    await page.waitForSelector('label[for="Index_CountryPicker.19"]');
    await page.click('label[for="Index_CountryPicker.19"]');
    console.log('Clicked on the label');
    await delay(2000);

    await page.waitForSelector('#NextButton');
    await page.click('#NextButton');
    console.log('Clicked on #NextButton');
    await delay(2000);

    const getDateAsString = () => {
        const date = new Date();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };

    const getPastTime = (minutesOffset = 30) => {
        const date = new Date();
        date.setMinutes(date.getMinutes() - minutesOffset);
        return {
            hours: date.getHours().toString().padStart(2, '0'),
            minutes: date.getMinutes().toString().padStart(2, '0'),
        };
    };

    const pastTime = getPastTime();
    await page.waitForSelector('.coupon-length-4 ');
    await page.type('.coupon-length-4 ', 'PI2');
    console.log('Filled coupon field');
    await delay(2000);

    await page.type('#Index_VisitDateDatePicker', getDateAsString());
    console.log('Filled date');
    await delay(2000);

    await page.select('#InputHour', pastTime.hours);
    await page.select('#InputMinute', pastTime.minutes);
    console.log('Filled time');
    await delay(2000);

    await page.click('#NextButton');
    console.log('Clicked on #NextButton after filling form');


    // const handleRadioSelection = (radioId) => {
    //     return `div[aria-checked="false"][id="${radioId}"]`;
    // };

    // await clickRadio(handleRadioSelection('R000001.1'));
    // await page.click('#NextButton');
    // console.log('Clicked on #NextButton after selecting radio button R000001.1');

    // await clickRadio(handleRadioSelection('R000002.1'));
    // await page.click('#NextButton');
    // console.log('Clicked on #NextButton after selecting radio button R000002.1');

    // await clickRadio(handleRadioSelection('R000003.2'));
    // await page.click('#NextButton');
    // console.log('Clicked on #NextButton after selecting radio button R000003.2');

    // const getRandomChoice = () => (Math.random() < 0.5 ? 1 : 2);

    // const handleSatisfaction = () =>
    //     getRandomChoice() === 1 ? 'R000004.5' : 'R000004.4';
    // await clickRadio(handleRadioSelection(handleSatisfaction()));
    // await page.click('#NextButton');
    // console.log('Clicked on #NextButton after selecting satisfaction radio button');

    // const multipleSelectors = [
    //     () => (getRandomChoice() === 1 ? 'R000009.5' : 'R000009.4'),
    //     () => (getRandomChoice() === 1 ? 'R000010.5' : 'R000010.4'),
    //     () => (getRandomChoice() === 1 ? 'R000008.5' : 'R000008.4'),
    //     () => (getRandomChoice() === 1 ? 'R000006.5' : 'R000006.4'),
    //     () => (getRandomChoice() === 1 ? 'R000007.5' : 'R000007.4'),
    //     () => (getRandomChoice() === 1 ? 'R000012.5' : 'R000012.4'),
    // ];

    // for (const selector of multipleSelectors) {
    //     const selectedRadio = selector();
    //     console.log(`Selecting radio button with id: ${selectedRadio}`);
    //     await clickRadio(handleRadioSelection(selectedRadio));
    // }
    // await page.click('#NextButton');
    // console.log('Clicked on #NextButton after selecting multiple radio buttons');

    // await clickRadio(handleRadioSelection('R000013.1'));
    // await page.click('#NextButton');
    // console.log('Clicked on #NextButton after selecting radio button R000013.1');

    // const handleComingBack = () =>
    //     getRandomChoice() === 1 ? 'R000015.5' : 'R000015.4';
    // const handleRecommending = () =>
    //     getRandomChoice() === 1 ? 'R000016.10' : 'R000016.9';

    // await clickRadio(handleRadioSelection(handleComingBack()));
    // await clickRadio(handleRadioSelection(handleRecommending()));
    // await page.click('#NextButton');
    // console.log('Clicked on #NextButton after final radio selections');

    // await browser.close();
}

main().catch((error) => {
    console.error("Unhandled error:", error);
});
