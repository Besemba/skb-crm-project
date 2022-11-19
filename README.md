# CRM система учеников онлайн-школы 
Итоговая работа курса "JavaScript базовый уровень" от онлайн школы Skillbox

### Цель проекта
Закрепить навыки JavaScript на практике

### Задачи: 
Разработка веб-интерфейса для CRM системы со следующими возможностями: 
- просмотр списка людей в виде таблицы;
- добавление нового клиента;
- изменение информации о существующем клиенте;
Pixel perfect адаптивная вёрстка по макету; <br>
Реализовать:
- Сортировка клиентов по полям id, ФИО, Дата;
- Поиск по ФИО;
- Валидация формы добавления и редактирования клиента;
- Отображение контактов клиента при наведении на соответствующую иконку;
- Отзывчивость интерактивных элементов (кнопки, ссылки и т.д. при наведении дают понять, что с ними можно взаимодействовать);
- Валидный код;

Для выполнения задания использовалась локальная база данных в корневой папке  <br>
### Для запуска приложения необходимо:
- Cкачать репозиторий
- Далее перейдите в папку с репозиторием, откройте командную строку и выполните команду 'node index', запустится локальный сервер
- После запуска сервера CRM система начнет работу, можно запускать в браузере файл index.html
- Для остановки сервера нажмите сочетание клавиш CTRL+C.

### В репозитории находится:
- файл "CRM.fig" с макетом сайта;
- техническое задание;
- файл README.md;
- файл index.html с вёрсткой;
- папка css со всеми файлами стилей;
- папка fonts со шрифтами;
- папка img с изображениями;
- папка js с javascript файлами;
- файлы .editorconfig, db.json, index.js, index.test.js, package.json, package-lock.json для функционирования локального сервера и локальной базы данных;

### В папке js находятся файлы:
- inputmask.min.js - для создания маски инпута, в частности для ввода номера телефона
- main.js - основной файл js, для отрисовки таблицы, создания модальных окон "изменить" и "удалить" и всего остального функционала
- new-client.js - для отдельной отрисовки модального окна создания нового клиента, т.к. модальные окна "новый клиент" и "изменить" немного отличаются по внешнему виду и функционалу

### В папке css находятся файлы:
- bootstrap-grid.min - Бутстрап файл для упрощения стилизации страницы, в частности для создания колонок определённой ширины
- normalize.css - для одинакового отображения страницы на разных браузерах
- styles.css - основной файл со стилями

Для реализации селекта выбора типа контакта использован jQuery  <br>
Для реализации валидации формы был использован плагин just-validate  <br>
Для анимации вывода модальных окон использован сайт Animate.css, подключен файл  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>  <br>

### Заключение
При выполнении работы была создана CRM система клиентов онлайн школы. Реализованы добавление, изменение, удаление и просмотр списка  клиентов. Также реализован поиск, сортировка, валидация добавления контактов клиента. Вёрстка адаптивная, pixel perfect, отзывчивые интерактивные элементы, код валидный. Все поставленные задачи были выполнены, а также выполнены дополнительные задания:
- анимация открытия модальных окон;
- валидация формы перед отправкой на сервер;

