const playwright = require('playwright')
const { BingPage } = require('../models/Bing')
const { MainPage } = require('../models/Bing')

describe('Find crtweb.ru, follow contacts', () => {
    test('should display correct contacts', async () => {
        for (const browserType of ['chromium']) {
            const browser = await playwright[browserType].launch({
                headless: false, slowMo: 250
            })
            const context = await browser.newContext({
                viewport: { width: 1920, height: 1080 }
            })
            const page = await context.newPage()

            // Page object модель
            const bingPage = new BingPage(page)

            await bingPage.navigate()
            await bingPage.searchAndFollow('crtweb.ru')

            // const page1 = await page.waitForEvent('popup')

            const [page1] = await Promise.all([
                page.waitForEvent('popup'),
                page.click('text=/.*crtweb\.ru - Аутсорсинг веб и \..*/')
            ])

            // Проверяем, что у нас есть заголовок - мы на нужной странице
            const content = await page1.textContent('text="Надежные, быстрые, как свои "')
            expect(content).toBe('Надежные, быстрые, как свои ')

            // Пример под page object для заполнения формы
            // const mainPage = new MainPage(page)
            // await mainPage.sendForm()

            // Ждём  2 сек и делаем скрин
            await page1.waitForTimeout(2000)
            await page1.screenshot({ path: `screens/MainPage-${browserType}.png`, fullPage: true })

            // Переходим по клику на страницу контактов
            await page1.click('"Контакты"')

            // Проверяем корректность телефона
            const phone = await page1.textContent('"+7 (499) 113-68-89"')
            expect(phone).toBe('+7 (499) 113-68-89')

            // Проверяем корректность почты
            const mail = await page1.textContent('"mail@crtweb.ru"')
            expect(mail).toBe('mail@crtweb.ru')

            await page1.screenshot({ path: `screens/ContactPage-${browserType}.png` })
            await page.close()
            await page1.close()
            await context.close()
            await browser.close()
        }
    })
})