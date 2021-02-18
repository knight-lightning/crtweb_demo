class BingPage {
    constructor(page) {
        this.page = page
    }
    async navigate() {
        await this.page.goto('https://www.google.com/') //Переходим в поисковик
    }
    async searchAndFollow(request) {
        try {
            await this.page.fill('input[aria-label="Найти"]', request)
        }
        catch {
            await this.page.fill('input[aria-label="Search"]', request)
        }
         // Вбиваем наш поисковый запрос
        await this.page.keyboard.press('Enter') //Жмём Enter

        await this.page.click('"Creative"') // Переходим на искомую страницу
    }
}

module.exports = { BingPage }