// Находим элементы, нужные для открытия и закрытия попапа
const addClientBtn = document.querySelector('.clients__button');
const body = document.querySelector('body');

// Вызываем окно создания клиента
addClientBtn.addEventListener('click', createNewClientPopup);

// Создаем функцию, которая убирает все пробелы из инпута и выводит значение одной строкой, она понадобится позже
function getSpacelessNameValue(InputName) {
  const split = InputName.value.split(' ');
  const filter = split.filter(element => element.trim().length > 0);
  const answer = filter.join('');
  return answer;
}

function createNewClientPopup() {
  // Создаём модальное окно добавления клиента
  const popupBackground = document.createElement('div');
  popupBackground.classList.add('popup-container', 'animate__animated', 'animate__fadeIn');
  popupBackground.classList.add('is-open-popup');

  body.append(popupBackground);

  const popup = document.createElement('div');
  popup.classList.add('popup', 'popup-create-new-client', 'animate__animated', 'animate__fadeIn', 'animate__zoomIn');

  popupBackground.append(popup);

  const popupCloseBtn = document.createElement('a');
  popupCloseBtn.classList.add('popup__close-icon');
  popupCloseBtn.innerHTML = `<svg width="29" height="29" viewbox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd"
    d="M22.2333 7.73333L21.2667 6.76666L14.5 13.5334L7.7333 6.7667L6.76664 7.73336L13.5333 14.5L6.76666 21.2667L7.73333 22.2333L14.5 15.4667L21.2666 22.2334L22.2333 21.2667L15.4666 14.5L22.2333 7.73333Z"
    fill="#B0B0B0" />
  </svg>`;

  popup.append(popupCloseBtn);

  const popupTop = document.createElement('div');
  popupTop.classList.add('popup__top');

  popup.append(popupTop);

  const popupHeading = document.createElement('h2');
  popupHeading.classList.add('popup__heading');
  popupHeading.textContent = 'Новый клиент';

  popupTop.append(popupHeading);

  const popupForm = document.createElement('form');
  popupForm.classList.add('popup__name-form');
  popupForm.setAttribute('method', "post");

  popup.append(popupForm);

  const popupLabelSurname = document.createElement('label');
  popupLabelSurname.classList.add('popup__name-label');

  const upLabelSurname = document.createElement('div');
  upLabelSurname.classList.add('popup__up-label');
  upLabelSurname.textContent = 'Фамилия';

  const spanUpLabelSurname = document.createElement('span');
  spanUpLabelSurname.textContent = '*';

  popupLabelSurname.append(upLabelSurname);
  upLabelSurname.append(spanUpLabelSurname);

  const popupInputSurname = document.createElement('input');
  popupInputSurname.classList.add('popup__name-input', 'popup__surname');
  popupInputSurname.type = 'text';
  popupInputSurname.name = 'surname';
  popupInputSurname.required = true;

  const popupSurnamePlaceholder = document.createElement('div');
  popupSurnamePlaceholder.classList.add('name-placeholder');
  popupSurnamePlaceholder.textContent = 'Фамилия';

  const spanSurname = document.createElement('span');
  spanSurname.textContent = '*';

  popupSurnamePlaceholder.append(spanSurname);
  popupLabelSurname.append(popupInputSurname);
  popupLabelSurname.append(popupSurnamePlaceholder);
  popupForm.append(popupLabelSurname);

  const popupLabelName = document.createElement('label');
  popupLabelName.classList.add('popup__name-label');

  const upLabelName = document.createElement('div');
  upLabelName.classList.add('popup__up-label');
  upLabelName.textContent = 'Имя';

  const spanUpLabelName = document.createElement('span');
  spanUpLabelName.textContent = '*';

  popupLabelName.append(upLabelName);
  upLabelName.append(spanUpLabelName);

  const popupInputName = document.createElement('input');
  popupInputName.classList.add('popup__name-input', 'popup__name');
  popupInputName.type = 'text';
  popupInputName.name = 'name';
  popupInputName.required = true;

  const popupNamePlaceholder = document.createElement('div');
  popupNamePlaceholder.classList.add('name-placeholder');
  popupNamePlaceholder.textContent = 'Имя';

  const spanName = document.createElement('span');
  spanName.textContent = '*';

  popupNamePlaceholder.append(spanName);
  popupLabelName.append(popupInputName);
  popupLabelName.append(popupNamePlaceholder);
  popupForm.append(popupLabelName);

  const popupLabelLastName = document.createElement('label');
  popupLabelLastName.classList.add('popup__name-label');

  const upLabelLastName = document.createElement('div');
  upLabelLastName.classList.add('popup__up-label');
  upLabelLastName.textContent = 'Отчество';

  popupLabelLastName.append(upLabelLastName);

  const popupInputLastName = document.createElement('input');
  popupInputLastName.classList.add('popup__name-input', 'popup__name');
  popupInputLastName.type = 'text';
  popupInputLastName.name = 'name';
  popupInputLastName.placeholder = 'Отчество';

  popupLabelLastName.append(popupInputLastName);
  popupForm.append(popupLabelLastName);

  const popupAddContactBtn = document.createElement('div');
  popupAddContactBtn.classList.add('popup__add-contact', 'add-contact');

  const addContactContent = document.createElement('div');
  addContactContent.classList.add('add-contact__content');

  const addContactTitle = document.createElement('div');
  addContactTitle.classList.add('add-contact__title');

  const addContactSpan = document.createElement('span');
  addContactSpan.classList.add('add-contact__span');

  const addContactHeading = document.createElement('h3');
  addContactHeading.classList.add('add-contact__heading');
  addContactHeading.textContent = 'Добавить контакт';

  addContactTitle.append(addContactSpan);
  addContactTitle.append(addContactHeading);

  popupAddContactBtn.append(addContactContent);
  popupAddContactBtn.append(addContactTitle);

  const errorMessage = document.createElement('p');
  errorMessage.classList.add('popup__error-message', 'hidden');

  const saveBtn = document.createElement('button');
  saveBtn.classList.add('popup__save-btn');
  saveBtn.type = 'submit';
  saveBtn.textContent = 'Сохранить';

  const popupCancelBtn = document.createElement('a');
  popupCancelBtn.classList.add('popup__cancel-icon');
  popupCancelBtn.textContent = 'Отмена';

  popupForm.append(popupAddContactBtn);
  popupForm.append(errorMessage);
  popupForm.append(saveBtn);
  popupForm.append(popupCancelBtn);

  // Создаём валидацию для формы
  const validation = new JustValidate('.popup__name-form', {
    errorFieldCssClass: 'invalid-popup-form',
  });

  validation
    .addField('.popup__surname', [
      {
        rule: 'required',
        errorMessage: 'Введите фамилию',
      },
    ])
    .addField('.popup__name', [
      {
        rule: 'required',
        errorMessage: 'Введите имя',
      },
    ])

  // Показываем или скрываем надпись над инпутом, в зависимости от того, написано ли что-нибудь в инпуте или нет
  popupInputSurname.addEventListener('input', () => {
    if (popupInputSurname.value) {
      upLabelSurname.classList.add('is-visiable');
    } else {
      upLabelSurname.classList.remove('is-visiable')
    }
  })

  popupInputName.addEventListener('input', () => {
    if (popupInputName.value) {
      upLabelName.classList.add('is-visiable');
    } else {
      upLabelName.classList.remove('is-visiable')
    }
  })

  popupInputLastName.addEventListener('input', () => {
    if (popupInputLastName.value) {
      upLabelLastName.classList.add('is-visiable');
    } else {
      upLabelLastName.classList.remove('is-visiable')
    }
  })

  // Функцция закрытия модального окна
  function closePopup(modalElement) {
    modalElement.remove();
  }

  // Создаём функцию для вывода сообщения об ошибке над кнопкой "Сохранить"
  function validateMessage() {
    const invalidInput = document.querySelector('.invalid-popup-form');
    if (invalidInput) {
      // Выводим сообщение перед кнопкой "Сохранить"
      errorMessage.classList.remove('hidden');
      const justValidateMessage = document.querySelector('.just-validate-error-label');
      // Добавляем тексту об ошибке значение сообщения об ошибке соответствующего инпута
      errorMessage.textContent = `Ошибка: ${justValidateMessage.textContent}`;
      popupAddContactBtn.style.marginBottom = '8px';
    }
  }

  // Добавляем обработчик на кнопку "Сохранить"
  popupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    validateMessage();

    const data = {
      // Ко всем значениям применяем функцию, которая убирает все пробелы, определённую в начале
      surname: getSpacelessNameValue(popupInputSurname),
      name: getSpacelessNameValue(popupInputName),
      lastName: getSpacelessNameValue(popupInputLastName),
      contacts: [],
    }

    const selectsAll = document.querySelectorAll('.ui-selectmenu-button');
    if (selectsAll) {
      for (let select of selectsAll) {
        const selectText = select.textContent;
        const input = select.parentNode.nextSibling;
        let contact = { type: selectText, value: input.value };
        data.contacts.push(contact);
      }
    }

    saveClient(data);
  });

  //Сразу задаём инпуту телефона соответствующую маску
  const phoneMask = new Inputmask("+7 (999) 999-99-99");

  // Создаем форму добавления контакта для клиента
  addContactTitle.addEventListener('click', newContactForm);

  // Выполняем функцию добавления формы для нового контакта
  function newContactForm() {
    validateMessage();

    // Отображаем главный контейнер
    addContactContent.style.display = 'block';

    // Меняем паддинг контейнеру при добавлении контакта
    popupAddContactBtn.style.paddingBottom = '26px'

    // Создаем элементы формы
    const contactForm = document.createElement('form');
    contactForm.classList.add('popup__contact-form', 'contact-form');

    const contactSelect = document.createElement('div');
    contactSelect.classList.add('contact-form__select');

    const contactTypeSelect = document.createElement('select');
    contactTypeSelect.classList.add('select-contact-type');
    contactTypeSelect.name = 'select-type';

    const telephoneOption = document.createElement('option');
    telephoneOption.value = 'Телефон';
    telephoneOption.textContent = 'Телефон';

    const emailOption = document.createElement('option');
    emailOption.value = 'Email';
    emailOption.textContent = 'Email';

    const facebookOption = document.createElement('option');
    facebookOption.value = 'Facebook';
    facebookOption.textContent = 'Facebook';

    const vkOption = document.createElement('option');
    vkOption.value = 'VK';
    vkOption.textContent = 'VK';

    const otherOption = document.createElement('option');
    otherOption.value = 'Другое';
    otherOption.textContent = 'Другое';

    // Создаём первый инпут и сразу присваеваем ему маску телефона и соответствующие атрибуты, т.к. первый контакт по дефолту добавляет номер телефона
    const contactInput = document.createElement('input');
    contactInput.classList.add('contact-form__input');
    contactInput.classList.add('phone-contact-type');
    contactInput.placeholder = 'Введите данные контакта';
    contactInput.name = 'tel';
    contactInput.type = 'tel';
    phoneMask.mask(contactInput);

    const deletetn = document.createElement('div');
    deletetn.classList.add('contact-form__delete-btn');
    deletetn.innerHTML = `<svg width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#B0B0B0"/></svg>`;

    // Помещаем все элементы внутрь друг друга
    contactTypeSelect.append(telephoneOption);
    contactTypeSelect.append(emailOption);
    contactTypeSelect.append(facebookOption);
    contactTypeSelect.append(vkOption);
    contactTypeSelect.append(otherOption);

    contactSelect.append(contactTypeSelect);

    contactForm.append(contactSelect);
    contactForm.append(contactInput);
    contactForm.append(deletetn);

    addContactContent.append(contactForm);

    // Добавляем валидацию всем полям контакта
    validation
      .addField('.contact-form__input', [
        {
          rule: 'required',
          errorMessage: 'Заполните данные контакта',
        },
      ])

    // Активируем jquery select
    $(function () {
      $(".select-contact-type").selectmenu();
    })

    // Работаем с селектом и инпутом
    // Вызываем функцию обработки формы по клику на селект
    const selects = document.querySelectorAll('.contact-form__select');
    for (let select of selects) {
      select.addEventListener('click', processingForm);
    }

    // Выполняем вызванную функцию
    function processingForm() {
      // Находим открытый в данный момент селект и его вложенные элементы
      const openMenu = document.querySelector("ul[aria-hidden='false']");
      const menuItems = openMenu.childNodes;

      // Запускаем цикл для каждого элемента меню
      for (let menuItem of menuItems) {
        // Убираем из выпадающего списка уже выбранный вариант путем добавления и изъятия нужного класса, который в CSS уже прописан как display: none
        const menuItemText = menuItem.textContent;
        if (menuItemText == this.childNodes[1].textContent) {
          menuItem.classList.add('selected-menu-item');
        } else {
          menuItem.classList.remove('selected-menu-item');
        }
        // Вызываем функцию маскирования инпута по нажатию на выбранный элемент меню
        menuItem.addEventListener('click', () => {
          // Находим именно тот инпут, который относится к данному селекту
          const nextInput = this.nextSibling;
          // Добавляем маски инпута в зависимости отвыбранного варианта
          if (menuItem.textContent == 'Телефон') {
            nextInput.classList.add('phone-contact-type');
            nextInput.classList.remove('email-contact-type');
            nextInput.classList.remove('vk-contact-type');
            nextInput.classList.remove('facebook-contact-type');
            nextInput.value = "";
            nextInput.name = 'tel';
            nextInput.type = 'tel';
          } else if (menuItem.textContent == 'Email') {
            nextInput.classList.add('email-contact-type');
            nextInput.classList.remove('phone-contact-type');
            nextInput.classList.remove('vk-contact-type');
            nextInput.classList.remove('facebook-contact-type');
            nextInput.value = "";
            nextInput.name = "email";
            nextInput.type = "email";
            nextInput.placeholder = "Введите данные контакта";
            if (nextInput.inputmask)
              nextInput.inputmask.remove()
          } else if (menuItem.textContent == 'VK') {
            nextInput.classList.add('vk-contact-type');
            nextInput.classList.remove('phone-contact-type');
            nextInput.classList.remove('email-contact-type');;
            nextInput.classList.remove('facebook-contact-type');
            nextInput.value = "";
            nextInput.name = "vk";
            nextInput.type = "text";
            nextInput.placeholder = "Введите данные контакта";
            if (nextInput.inputmask)
              nextInput.inputmask.remove()
          } else if (menuItem.textContent == 'Facebook') {
            nextInput.classList.add('facebook-contact-type');
            nextInput.classList.remove('phone-contact-type');
            nextInput.classList.remove('email-contact-type');
            nextInput.classList.remove('vk-contact-type');
            nextInput.value = "";
            nextInput.name = "facebook";
            nextInput.type = "text";
            nextInput.placeholder = "Введите данные контакта";
            if (nextInput.inputmask)
              nextInput.inputmask.remove()
          } else {
            nextInput.classList.add('other-contact-type');
            nextInput.classList.remove('phone-contact-type');
            nextInput.classList.remove('email-contact-type');
            nextInput.classList.remove('vk-contact-type');
            nextInput.classList.remove('facebook-contact-type');
            nextInput.value = "";
            nextInput.name = "other";
            nextInput.type = "text";
            nextInput.placeholder = "Введите данные контакта";
            if (nextInput.inputmask)
              nextInput.inputmask.remove()
          }
          const phoneInputMask = document.querySelectorAll('.phone-contact-type');
          phoneMask.mask(phoneInputMask);
        });
      }
    }

    //  Ставим лимит в 10 контактов
    if (addContactContent.childNodes.length == 10) {
      addContactTitle.style.display = 'none';
    }

    // Удаляем контакт по нажатию на крестик
    const contactDeleteBtns = document.querySelectorAll('.contact-form__delete-btn');
    for (let btn of contactDeleteBtns) {
      btn.addEventListener('click', deleteContact);
    }

    function deleteContact() {
      this.parentNode.remove();
      // Возвращаем паддинги, если удалим все контакты, и возвращаем кнопку добавления контакта , если контактов меньше 10
      if (addContactContent.childNodes.length == 0) {
        popupAddContactBtn.style.paddingBottom = '9px'
        addContactContent.style.display = 'none';
      } else if (addContactContent.childNodes.length < 10) {
        addContactTitle.style.display = 'flex';
      }
    }
  }

  // Закрываем попап принажатии на кнопки и вне окна
  popupCloseBtn.addEventListener('click', () => {
    popupBackground.classList.add('animate__fadeOut');
    popup.classList.add('animate__fadeOut');
    setTimeout(() => {
      closePopup(popupBackground);
    }, 200);
  });
  popupCancelBtn.addEventListener('click', () => {
    popupBackground.classList.add('animate__fadeOut');
    popup.classList.add('animate__fadeOut');
    setTimeout(() => {
      closePopup(popupBackground);
    }, 200);
  });
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('is-open-popup')) {
      popupBackground.classList.add('animate__fadeOut');
      popup.classList.add('animate__fadeOut');
      setTimeout(() => {
        closePopup(popupBackground);
      }, 200);
    }
  });
  async function saveClient(formData) {
    const response = await fetch('http://localhost:3000/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        surname: formData.surname,
        name: formData.name,
        lastName: formData.lastName,
        contacts: formData.contacts,
      })
    });
    if (response.status === 200 || response.status === 201) {
      // Если ответ сервера 200 или 201, то закрываем окно и обновляем страницу с новыми данными
      closePopup(popupBackground);
      loadData();
      // Далее с помощью у.о. выводим сообщения об ошибке, если что-то пошло не так
    } else if (response.status.toString().startsWith(5) || response.status === 404 || response.status === 422) {
      const errorStatus = document.createElement('p');
      errorStatus.classList.add('popup__error-message', 'hidden', 'error-status');
      popupForm.append(errorStatus);
      errorStatus.classList.remove('hidden');
      errorStatus.textContent = `Ошибка ${response.status}: ${response.statusText}`;
    } else {
      errorMessage.classList.remove('hidden');
      errorMessage.textContent = `Ошибка: Что-то пошло не так...`;
      popupAddContactBtn.style.marginBottom = '8px';
    }
  }

}


