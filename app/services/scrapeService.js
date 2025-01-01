const { Builder, By, Key, until } = require('selenium-webdriver');
const Trend = require('../models/trend');
const uuid = require('uuid');
const moment = require('moment');
const { Options } = require('selenium-webdriver/chrome');


const proxyURL = process.env.PROXY_URL
const scrapeTrends = async () => {
    const options = new Options();
    options.addArguments(`--proxy-server=${proxyURL}`);

    const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
        await loginToX(driver);
        const uniqueHashtags = await scrapeTrendingHashtags(driver);
        const record = prepareRecord(uniqueHashtags);
        const savedRecord = await saveRecord(record);
        return savedRecord;
    } catch (error) {
        console.error('Error during scraping:', error);
        throw error;
    } finally {
        await driver.quit();
    }
};

const loginToX = async (driver) => {
    await driver.get('https://x.com/i/flow/login');

    const usernameField = await driver.wait(
        until.elementLocated(By.css('[autocomplete="username"]')),
        10000
    );
    await usernameField.sendKeys(process.env.X_EMAIL, Key.RETURN);

    try {
        const verificationField = await driver.wait(
            until.elementLocated(By.css('[autocomplete="on"]')),
            5000
        );
        await verificationField.sendKeys(process.env.X_USERNAME, Key.RETURN);
    } catch {
        console.log('No extra verification field found, proceeding to password field.');
    }

    const passwordField = await driver.wait(
        until.elementLocated(By.css('[autocomplete="current-password"]')),
        10000
    );
    await passwordField.sendKeys(process.env.X_PASSWORD, Key.RETURN);

    await driver.sleep(5000);
};

const scrapeTrendingHashtags = async (driver) => {
    const trendsSection = await driver.findElement(By.css('[aria-label="Timeline: Trending now"]'));
    const trendingItems = await trendsSection.findElements(By.css(
        'div[dir="ltr"].css-146c3p1.r-bcqeeo.r-1ttztb7.r-qvutc0.r-37j5jr.r-a023e6.r-rjixqe.r-b88u0q.r-1bymd8e'
    ));
    if (!trendingItems || trendingItems.length === 0) {
        console.log('No trending items found.');
        return;
    }
    const trendingTexts = await Promise.all(trendingItems.map(async (item) => await item.getText()));
    const trendsObject = trendingTexts.reduce((acc, tags, index) => {
        acc[`nameoftrend${index + 1}`] = tags;
        return acc;
    }, {});
    return trendsObject;
};

const prepareRecord = (trendsObject) => {
    const ipUsed = proxyURL.split('@')[1]?.split(':')[0] || 'N/A';
    return {
        ...trendsObject,
        datetime: moment().toISOString(),
        ip_address: ipUsed,
    };
};

const saveRecord = async (record) => {
    const trendDoc = new Trend(record);
    const savedRecord = await trendDoc.save();
    return savedRecord;
};

module.exports = scrapeTrends;
