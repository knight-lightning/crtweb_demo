class BingPage {
    constructor(page) {
        this.page = page
    }
    async navigate() {
        await this.page.goto('https://www.bing.com/') //Переходим в поисковик
    }
    async searchAndFollow(request) {
        await this.page.fill('#sb_form_q', request) // Вбиваем наш поисковый запрос
        await this.page.keyboard.press('Enter') //Жмём Enter

        await this.page.click('li.b_algo div h2 a') // Переходим на искомую страницу
    }
}

module.exports = { BingPage }