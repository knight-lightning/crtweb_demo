class BingPage {
    constructor(page) {
        this.page = page
    }
    async navigate() {
        await this.page.goto('https://www.google.com/') //Переходим в поисковик
    }
    async searchAndFollow(request) {
        await this.page.fill('input', request) // Вбиваем наш поисковый запрос
        await this.page.keyboard.press('Enter') //Жмём Enter

        await this.page.click('"https://crtweb.ru"') // Переходим на искомую страницу
    }
}

module.exports = { BingPage }