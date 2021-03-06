# Lost & Found Pets

![preview](https://i.imgur.com/PdEti5d.png)

# Task

Цього разу від вашої роботи залежить доля маленького цуцика, якого загубила дівчинка Маша. Її батьки
зібрали команду для пошуку Сірка. Ваша задача розробити веб-застосування SirkoSearch, яке б
допомогло команді пошуку реєструвати усіх знайдених тварин, та заяви інших дітей про загублених
тварин. Застосування повинно виконувати наступні функції:

1. Дозволяти переглядати мапу із маркерами, які позначають загублених та знайдених тварин та
   інформацію по ним.
2. Додавати на мапу маркери, що позначають загублених та знайдених тварин. По кліку на маркер
   користувачу повинно відображатися інформація:
   a. Тип маркера (занайдено\загублено)
   b. Вид тварини (собака, кіт, папуга)
   c. Порода тварин (набір для порід для кожного виду тварин має бути свій)
   d. Вік тварини
   e. Кольори тварини (кольори і окраси повинні обиратись із заданого набору)
   f. Контактна інформація для зв’язку із тим хто загубив\знайшов
   g. Фотографія тварини
3. Видаляти маркери у разі, якщо тварина вже знайдена або знайдений власник
4. Фільтрувати об’яви по всій інформації, що є по запису (тип, вид тварини, порода, колір,...)
5. Надавати можливість за заданим радіусом пошуку знаходити співпадіння між загубленими та
   знайденими тваринами (як це працює: ви задаєте радіус пошуку, на мапі показуються пари (або
   трійки, або скільки співпало) маркерів, які співпали за критерієм вид+порода)
6. Застосування повинно зберігати данні локально на комп’ютері користувача (це може бути файл,
   або local storage, або інше рішення)
7. Додаткові бали будуть нараховані, якщо застосування буде дозволяти редагувати переліки
   тварин, порід, кольорів, і так далі.
   Фотографії тварин завантажуються шляхом додання URL на зображення на зовнішніх ресурсах.

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
