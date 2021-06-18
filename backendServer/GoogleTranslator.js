const puppeteer = require('puppeteer');

const userSettings = require("../settings.json")

class Google {
    constructor() {
        this.browser
        this.page

        this.originalLanguage = userSettings.Google.originalLanguage
        this.translationLanguage = userSettings.Google.translationLanguage
        this.inputTextboxID = userSettings.Google.inputTextboxID
        this.resultTextboxID = userSettings.Google.resultTextboxID
        this.initialPhrase = userSettings.Google.initialPhrase

        this.currentTranslationText = ""
        this.copiedText = ""
    }

    async stop() {
        await this.browser.close();
    }

    async activate() {
        this.browser = await this.launchBrowser()
        this.page = await this.browser.newPage();
        
        await this.page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
        await this.page.setDefaultNavigationTimeout(userSettings.DefaultNavigationTimeout); 
        //await this.page.goto(`https://papago.naver.com/?sk=${this.originalLanguage}&tk=${this.translationLanguage}`);
        await this.page.goto(`https://translate.google.com/?sl=${this.originalLanguage}&tl=${this.translationLanguage}&text=${this.initialPhrase}&op=translate`);

        await this.page.waitForSelector(this.inputTextboxID);
        await this.page.waitForSelector(this.resultTextboxID)
        
        //this.initiateTranslation(this.initialPhrase)
    }

    async launchBrowser() {
        let launchOptions = { headless: userSettings.hideBrowserWindowTrueOrFalse, defaultViewport: null, args: ['--start-maximized'] };
        let chromium = puppeteer.launch(launchOptions)
        return chromium;
    }

    async initiateTranslation(textToBeTranslated) {
        const input = await this.page.$(this.inputTextboxID);
        await input.click({ clickCount: 3 })
        await input.type("");
    
        await this.page.type(this.inputTextboxID, textToBeTranslated);
    }

    async translate(originalLanguage, targetLanguage, textToBeTranslated) {
        this.copiedText = textToBeTranslated

        const input = await this.page.$(this.inputTextboxID);
        await input.click({ clickCount: 3 })
        await input.type("");

        await this.page.focus(this.inputTextboxID);
        await this.page.goto(`https://translate.google.com/?sl=${this.originalLanguage}&tl=${this.translationLanguage}&text=${textToBeTranslated}&op=translate`);

    }

    async checkIfCurrentTranslationTextChanged(thisPage, resultTextboxID) {
        let textInTranslationBox = await this.returnTranslationText(thisPage, resultTextboxID)

        let result = false
    
        if (textInTranslationBox != this.currentTranslationText) {
            this.currentTranslationText = textInTranslationBox
            result = true
        }

        return result
    }
    
    async returnTranslationText(thisPage, resultTextboxID) {
        let translationText = await thisPage.evaluate((resultTextboxID) => {
            const element = document.querySelector(resultTextboxID);
            return element.textContent; // will return undefined if the element is not found
        }, resultTextboxID);

        return translationText
    }

    grabCopiedTextThenTranslate(copiedText) {
        this.copiedText = copiedText
        this.translate(this.originalLanguage, this.translationLanguage, this.copiedText)
    }

}

module.exports = Google