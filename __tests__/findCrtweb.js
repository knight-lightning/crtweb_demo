const playwright = require('playwright')
const { BingPage } = require('../models/Bing')
const { MainPage } = require('../models/MainPage')

describe('Find crtweb.ru, follow contacts', () => {
    test('should display correct contacts', async () => {
        for (const browserType of ['chromium']) {
            const browser = await playwright[browserType].launch({
                headless: true, slowMo: 250
            })
            const context = await browser.newContext({
                viewport: {
                    width: 1920,
                    height: 1080,
                    locale: 'ru-RU',
                    permissions: ['geolocation'],
                    geolocation: { latitude: 51.72, longitude: 36.18}
                 }
            })
            const page = await context.newPage()

            // Page object модель
            const bingPage = new BingPage(page)

            await bingPage.navigate()
            await bingPage.searchAndFollow('crtweb.ru')
            await page.waitForTimeout(2000)
            // Проверяем, что у нас есть заголовок - мы на нужной странице
            const content = await page.textContent('text="Надежные, быстрые, как свои "')
            expect(content).toBe('Надежные, быстрые, как свои ')

            // Пример под page object для заполнения формы
            // const mainPage = new MainPage(page)
            // await mainPage.sendForm()

            // Ждём  2 сек и делаем скрин
            await page.waitForTimeout(2000)
            await page.screenshot({ path: `screens/MainPage-${browserType}.png`})

            // Переходим по клику на страницу контактов
            await page.click('"Контакты"')

            // Проверяем корректность телефона
            const phone = await page.textContent('"+7 (499) 113-68-89"')
            expect(phone).toBe('+7 (499) 113-68-89')

            // Проверяем корректность почты
            const mail = await page.textContent('"mail@crtweb.ru"')
            expect(mail).toBe('mail@crtweb.ru')

            await page.screenshot({ path: `screens/ContactPage-${browserType}.png` })
            await page.close()
            await context.close()
            await browser.close()
        }
    })
})