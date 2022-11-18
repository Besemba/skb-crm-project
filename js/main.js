// Прописываем функцию загрузки таблицы
// Для начала загрузим данные API
async function loadData() {
  const response = await fetch('http://localhost:3000/api/clients');
  const clientsData = await response.json();

  // Создаем функцию, которая убирает все пробелы из инпута и выводит значение одной строкой, она понадобится позже
  function getSpacelessNameValue(InputName) {
    const split = InputName.value.split(' ');
    const filter = split.filter(element => element.trim().length > 0);
    const answer = filter.join('');
    return answer;
  }

  //  Прописываем функцию загрузки таблицы
  function loadTable(data) {
    // Очищаем таблицу перед созданием
    const tableBody = document.querySelector('.table-body');
    tableBody.innerHTML = '';

    // Создаем для каждого клиента свою строку в таблице
    for (let client of data) {
      const clientItem = document.createElement('div');
      clientItem.classList.add('row', 'align-items-center', 'table-body__item');

      const clientIdColumn = document.createElement('div');
      clientIdColumn.classList.add('col', 'table-body__col', 'table-body-id');
      clientIdColumn.textContent = client.id;

      const clientNameColumn = document.createElement('div');
      clientNameColumn.classList.add('col', 'table-body__col', 'table-body-name');
      let fullName = [client.surname, client.name, client.lastName].join(' ');
      clientNameColumn.textContent = fullName;

      const clientCreateDateColumn = document.createElement('div');
      clientCreateDateColumn.classList.add('col', 'table-body__col', 'table-body-create');

      const createDateContent = document.createElement('div');
      createDateContent.classList.add('table-body__date');
      const createDate = new Date(client.createdAt);
      createDateContent.textContent = createDate.toLocaleDateString();

      const createTimeContent = document.createElement('div');
      createTimeContent.classList.add('table-body__time');
      const createTime = new Date(client.createdAt);
      createTimeContent.textContent = createTime.toLocaleTimeString().slice(0, -3);

      const clientChangeDateColumn = document.createElement('div');
      clientChangeDateColumn.classList.add('col', 'table-body__col', 'table-body-changes');

      const changeDateContent = document.createElement('div');
      changeDateContent.classList.add('table-body__date');
      const changeDate = new Date(client.updatedAt);
      changeDateContent.textContent = changeDate.toLocaleDateString();

      const changeTimeContent = document.createElement('div');
      changeTimeContent.classList.add('table-body__time');
      const changeTime = new Date(client.updatedAt);
      changeTimeContent.textContent = changeTime.toLocaleTimeString().slice(0, -3);

      const clientContactsColumn = document.createElement('div');
      clientContactsColumn.classList.add('col', 'table-body__col', 'table-body-contacts');

      // В зависимости от типа контакта добавляем соответствующую иконку
      for (contact of client.contacts) {
        const contactLink = document.createElement('a');
        contactLink.classList.add('table-body__contact-link');
        let contactValue = contact.value;
        clientContactsColumn.append(contactLink);
        if (contact.type == 'Телефон') {
          contactLink.innerHTML = `<svg class="table-body__contact-svg phone-link" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.7">
        <circle cx="8" cy="8" r="8" fill="#9873FF"/>
        <path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/>
        </g>
        </svg>
        <div class="table-body__contact-tooltip">Телефон: ${contactValue}</div>`;
        } else if (contact.type == 'Email') {
          contactLink.innerHTML = `<svg class="table-body__contact-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z" fill="#9873FF"/>
        </svg>
        <div class="table-body__contact-tooltip">Email: ${contactValue}</div>`;
        } else if (contact.type == 'VK') {
          contactLink.innerHTML = `<svg class="table-body__contact-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.7">
        <path d="M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z" fill="#9873FF"/>
        </g>
        </svg>
        <div class="table-body__contact-tooltip">VK: ${contactValue}</div>`;
        } else if (contact.type == 'Facebook') {
          contactLink.innerHTML = `<svg class="table-body__contact-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.7">
        <path d="M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z" fill="#9873FF"/>
        </g>
        </svg>
        <div class="table-body__contact-tooltip">Facebook: ${contactValue}</div>`;
        } else {
          contactLink.innerHTML = `<svg class="table-body__contact-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z" fill="#9873FF"/>
        </svg>
        <div class="table-body__contact-tooltip">${contactValue}</div>`;
        }
        // Скрываем иконки контакта, если их больше 5-ти
        if (client.contacts.indexOf(contact) > 3 && client.contacts.length > 5) {
          contactLink.classList.add('hidden-contact-link');
        }
      }
      // Если иконок контакта больше 5-ти, добавляем кнопку показа остальных скрытых
      if (client.contacts.length > 5) {
        const showMoreIcon = document.createElement('a');
        showMoreIcon.classList.add('table-body__contact-link', 'table-body__show-more-icon');
        // Добавляем тултип к кнопке
        const showMoreTooltip = document.createElement('div');
        showMoreTooltip.classList.add('table-body__contact-tooltip');

        const numberOfHiddenContacts = client.contacts.length - 4;
        // В зависимости от количества скрытых контактов выбираем окончание для слова "Контакт"
        if (numberOfHiddenContacts == 1) {
          showMoreTooltip.textContent = `Показать ещё ${numberOfHiddenContacts} контакт`;
        } else if (numberOfHiddenContacts <= 4 && numberOfHiddenContacts >= 2) {
          showMoreTooltip.textContent = `Показать ещё ${numberOfHiddenContacts} контакта`;
        } else {
          showMoreTooltip.textContent = `Показать ещё ${numberOfHiddenContacts} контактов`;
        }
        // Добавляем кнопке текст и размещаем её в DOM
        showMoreIcon.textContent = `+${numberOfHiddenContacts}`;
        showMoreIcon.append(showMoreTooltip);
        clientContactsColumn.append(showMoreIcon);
        // По клику на кнопку показа контактов убираем саму кнопку и показываем контакты
        showMoreIcon.addEventListener('click', showMoreContacts);

        function showMoreContacts() {
          const contactsList = this.parentNode.childNodes;
          for (let contact of contactsList) {
            contact.classList.remove('hidden-contact-link');
          }
          showMoreIcon.classList.add('hidden-contact-link');
        }
      }
      // Продолжаем создание строки для клиента
      const clientActionsColumn = document.createElement('div');
      clientActionsColumn.classList.add('col', 'table-body__col', 'table-body-actions');

      const editClientBtn = document.createElement('div');
      editClientBtn.classList.add('table-body__edit-btn');
      editClientBtn.textContent = 'Изменить';

      const deleteClientBtn = document.createElement('div');
      deleteClientBtn.classList.add('table-body__delete-btn');
      deleteClientBtn.textContent = 'Удалить';

      // Размещаем все элементы в DOM
      clientActionsColumn.append(editClientBtn);
      clientActionsColumn.append(deleteClientBtn);

      clientChangeDateColumn.append(changeDateContent);
      clientChangeDateColumn.append(changeTimeContent);

      clientCreateDateColumn.append(createDateContent);
      clientCreateDateColumn.append(createTimeContent);

      clientItem.append(clientIdColumn);
      clientItem.append(clientNameColumn);
      clientItem.append(clientCreateDateColumn);
      clientItem.append(clientChangeDateColumn);
      clientItem.append(clientContactsColumn);
      clientItem.append(clientActionsColumn);

      tableBody.append(clientItem);

      // Функцция закрытия модального окна
      function closePopup(modalElement) {
        modalElement.remove();
      }

      // Функция вызова окна для удаления клиента
      function deleteClientModal() {
        // Создаем модальное окно
        const popupBackground = document.createElement('div');
        popupBackground.classList.add('popup-container', 'animate__animated', 'animate__fadeIn');
        popupBackground.classList.add('is-open-popup');

        body.append(popupBackground);

        const popup = document.createElement('div');
        popup.classList.add('popup', 'popup-delete-client', 'animate__animated', 'animate__fadeIn', 'animate__zoomIn');

        popupBackground.append(popup);

        const popupCloseBtn = document.createElement('a');
        popupCloseBtn.classList.add('popup__close-icon');
        popupCloseBtn.innerHTML = `<svg width="29" height="29" viewbox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
        d="M22.2333 7.73333L21.2667 6.76666L14.5 13.5334L7.7333 6.7667L6.76664 7.73336L13.5333 14.5L6.76666 21.2667L7.73333 22.2333L14.5 15.4667L21.2666 22.2334L22.2333 21.2667L15.4666 14.5L22.2333 7.73333Z"
        fill="#B0B0B0" />
        </svg>`;

        const popupHeading = document.createElement('h2');
        popupHeading.classList.add('popup__heading');
        popupHeading.textContent = 'Удалить клиента';

        const clientParagraph = document.createElement('p');
        clientParagraph.textContent = `Вы действительно хотите удалить данного клиента?`;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('popup__delete-btn', 'popup__save-btn');
        deleteBtn.textContent = 'Удалить';

        const popupCancelBtn = document.createElement('a');
        popupCancelBtn.classList.add('popup__cancel-icon');
        popupCancelBtn.textContent = 'Отмена';

        popup.append(popupCloseBtn);
        popup.append(popupHeading);
        popup.append(clientParagraph);
        popup.append(deleteBtn);
        popup.append(popupCancelBtn);

        // Находим id клиента для его удаления из массива
        const client = editClientBtn.parentNode.parentNode.firstChild.textContent;

        // Закрываем модальное окно по клику на кнопки и вне окна
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

        // Вызываем функцию удаления клиента
        deleteBtn.addEventListener('click', () => {
          deleteClient(client);
          popupBackground.classList.add('animate__fadeOut');
          popup.classList.add('animate__fadeOut');
          setTimeout(() => {
            closePopup(popupBackground);
          }, 200);
        })
      }

      // Добавляем обработчик на кнопку удалить клиента
      deleteClientBtn.addEventListener('click', deleteClientModal);

      // Функция удаления клиента
      async function deleteClient(client) {
        const response = await fetch(`http://localhost:3000/api/clients/${client}`, {
          method: 'DELETE',
        });
        loadData();
        loadTable(clientsData);
      }

      // Добавляем обработчик на кнопку "Изменить" для клиента
      editClientBtn.addEventListener('click', () => {
        const client = editClientBtn.parentNode.parentNode.firstChild.textContent;
        changeClientPopup(client);
      });

      // Запускаем функцию изменения клиента
      async function changeClientPopup(client) {
        const response = await fetch(`http://localhost:3000/api/clients/${client}`);
        const data = await response.json();

        // Создаём модальное окно
        const popupBackground = document.createElement('div');
        popupBackground.classList.add('popup-container', 'animate__animated', 'animate__fadeIn');
        popupBackground.classList.add('is-open-popup');

        body.append(popupBackground);

        const popup = document.createElement('div');
        popup.classList.add('popup', 'popup-change-client', 'animate__animated', 'animate__fadeIn', 'animate__zoomIn');

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
        popupHeading.textContent = 'Изменить данные';

        const clientId = document.createElement('p');
        clientId.classList.add('popup__person-id');
        clientId.textContent = `ID: ${client}`;

        popupTop.append(popupHeading);
        popupTop.append(clientId);

        const popupForm = document.createElement('form');
        popupForm.classList.add('popup__name-form');
        popupForm.setAttribute('method', "post");

        popup.append(popupForm);

        const popupLabelSurname = document.createElement('label');
        popupLabelSurname.classList.add('popup__name-label');

        const upLabelSurname = document.createElement('div');
        upLabelSurname.classList.add('popup__up-label', 'is-visiable');
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
        popupInputSurname.value = data.surname;

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
        upLabelName.classList.add('popup__up-label', 'is-visiable');
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
        popupInputName.value = data.name;

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
        upLabelLastName.classList.add('popup__up-label', 'is-visiable');
        upLabelLastName.textContent = 'Отчество';

        popupLabelLastName.append(upLabelLastName);

        const popupInputLastName = document.createElement('input');
        popupInputLastName.classList.add('popup__name-input', 'popup__name');
        popupInputLastName.type = 'text';
        popupInputLastName.name = 'name';
        popupInputLastName.placeholder = 'Отчество';
        popupInputLastName.value = data.lastName;

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

        const popupDeleteClientBtn = document.createElement('a');
        popupDeleteClientBtn.classList.add('popup__cancel-icon');
        popupDeleteClientBtn.textContent = 'Удалить клиента';

        popupForm.append(popupAddContactBtn);
        popupForm.append(errorMessage);
        popupForm.append(saveBtn);
        popupForm.append(popupDeleteClientBtn);

        // Запускаем удаление клиента по клику на кнопку "Удалить клиента" в модальном окне
        popupDeleteClientBtn.addEventListener('click', deleteClientModal);

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

        for (let i of data.contacts) {
          const type = i.type;
          const value = i.value;
          newContactForm(type, value);
        }

        // Добавляем контакт
        addContactTitle.addEventListener('click', () => {
          newContactForm();
        });

        // Выполняем функцию добавления формы для нового контакта
        function newContactForm(type = "Телефон", value = null) {
          validateMessage();
          //Сразу задаём инпуту телефона соответствующую маску
          const phoneMask = new Inputmask("+7 (999) 999-99-99");

          // Отображаем главный контейнер
          addContactContent.style.display = 'block';

          // Меняем паддинг контейнеру при добавлении контакта
          popupAddContactBtn.style.paddingBottom = '26px'

          // Создаем элементы формы
          const contactForm = document.createElement('div');
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

          // Создаём первый инпут
          const contactInput = document.createElement('input');
          contactInput.classList.add('contact-form__input');
          contactInput.placeholder = 'Введите данные контакта';
          // Присваиваем инпуту значение контакта, если таковой имеется
          contactInput.value = value;

          const deleteBtn = document.createElement('div');
          deleteBtn.classList.add('contact-form__delete-btn');
          deleteBtn.innerHTML = `<svg width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#B0B0B0"/></svg>`;

          // Помещаем все элементы внутрь друг друга
          contactTypeSelect.append(telephoneOption);
          contactTypeSelect.append(emailOption);
          contactTypeSelect.append(facebookOption);
          contactTypeSelect.append(vkOption);
          contactTypeSelect.append(otherOption);

          contactSelect.append(contactTypeSelect);

          contactForm.append(contactSelect);
          contactForm.append(contactInput);
          contactForm.append(deleteBtn);

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
          function startSelect() {
            $(".select-contact-type").selectmenu();
          }
          startSelect()
          // Присваиваем селекту значение типа контакта, если таковой имеется
          const contactSelectValue = contactSelect.lastChild.lastChild;
          contactSelectValue.textContent = type;
          // При создании нового контакта по умолчанию значение селекта - "Телефон", поэтому навешиваем его инпуту маску номера и нужные атрибуты
          if (type == 'Телефон') {
            contactInput.classList.add('phone-contact-type');
            contactInput.name = 'tel';
            contactInput.type = 'tel';
            phoneMask.mask(contactInput);
          }

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
          const response = await fetch(`http://localhost:3000/api/clients/${client}`, {
            method: 'PATCH',
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
            loadTable(clientsData);
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
    }
  }
  // Вызываем функцию загрузки таблицы с данными API
  loadTable(clientsData);

  // Добавляем сортировку по id по нажатию на шапку
  // По возрастанию
  function sortIdAscending(a, b) {
    const idA = a.id;
    const idB = b.id;
    return idA - idB;
  }
  // По убыванию
  function sortIdDescending(a, b) {
    const idA = a.id;
    const idB = b.id;
    return idB - idA;
  }

  // Сразу ищем все нужные селекторы для выполнения сортировки
  const idSortBtn = document.querySelector('#sort-id');
  const nameSortBtn = document.querySelector('#sort-name');
  const createDateSortBtn = document.querySelector('#sort-create');
  const changeDateSortBtn = document.querySelector('#sort-changes');
  const sortTable = document.querySelector('.table-body');
  const tableHeadId = document.querySelector('.table-head-id');
  const tableHeadName = document.querySelector('.table-head-name');
  const tableHeadCreate = document.querySelector('.table-head-create');
  const tableHeadChange = document.querySelector('.table-head-changes');

  // Сортируем по ID
  idSortBtn.addEventListener('click', () => {
    // Добавляем и убираем таблице класс сортировки по нажатию, и если этот класс есть, то выполняем сортировку по возрастанию, если нет - по убыванию
    sortTable.classList.toggle('sort-id');
    const sortIdTable = document.querySelector('.sort-id');
    if (sortIdTable) {
      // Также не забываем добавлять и убирать класс для кнопки, чтобы менять картинку стрелки
      tableHeadId.classList.remove('descending-sort');
      clientsData.sort(sortIdAscending);
      loadTable(clientsData);
    } else {
      tableHeadId.classList.add('descending-sort');
      clientsData.sort(sortIdDescending);
      loadTable(clientsData);
    }
  });

  // Добавляем сортировку по имени по алфавиту
  function sortFullNameAlphabet(a, b) {
    const nameA = a.surname + a.name + a.lastName;
    const nameB = b.surname + b.name + b.lastName;
    return nameA.localeCompare(nameB);
  }
  // Добавляем сортировку по имени против алфавита
  function sortFullNameReverseAlphabet(a, b) {
    const nameA = a.surname + a.name + a.lastName;
    const nameB = b.surname + b.name + b.lastName;
    return nameB.localeCompare(nameA);
  }

  // Сортируем по имени
  nameSortBtn.addEventListener('click', () => {
    // Добавляем и убираем таблице класс сортировки по нажатию, и если этот класс есть, то выполняем сортировку по возрастанию, если нет - по убыванию
    sortTable.classList.toggle('sort-name');
    const sortIdTable = document.querySelector('.sort-name');
    if (sortIdTable) {
      tableHeadName.classList.remove('descending-sort');
      clientsData.sort(sortFullNameAlphabet);
      loadTable(clientsData);
    } else {
      tableHeadName.classList.add('descending-sort');
      clientsData.sort(sortFullNameReverseAlphabet);
      loadTable(clientsData);
    }
  });

  // Добавляем сортировку по дате по возрастанию
  function sortCreateDateUp(a, b) {
    let dateA = new Date(a.createdAt);
    let dateB = new Date(b.createdAt);
    return dateA - dateB;
  }
  function sortCreateDateDown(a, b) {
    let dateA = new Date(a.createdAt);
    let dateB = new Date(b.createdAt);
    return dateB - dateA;
  }

  // Сортируем по дате создания
  createDateSortBtn.addEventListener('click', () => {
    // Добавляем и убираем таблице класс сортировки по нажатию, и если этот класс есть, то выполняем сортировку по возрастанию, если нет - по убыванию
    sortTable.classList.toggle('sort-name');
    const sortIdTable = document.querySelector('.sort-name');
    if (sortIdTable) {
      tableHeadCreate.classList.remove('descending-sort');
      clientsData.sort(sortCreateDateUp);
      loadTable(clientsData);
    } else {
      tableHeadCreate.classList.add('descending-sort');
      clientsData.sort(sortCreateDateDown);
      loadTable(clientsData);
    }
  });

  // Добавляем сортировку по дате по возрастанию
  function sortChangeDateUp(a, b) {
    let dateA = new Date(a.updatedAt);
    let dateB = new Date(b.updatedAt);
    return dateA - dateB;
  }
  function sortChangeDateDown(a, b) {
    let dateA = new Date(a.updatedAt);
    let dateB = new Date(b.updatedAt);
    return dateB - dateA;
  }

  // Сортируем по дате изменения
  changeDateSortBtn.addEventListener('click', () => {
    // Добавляем и убираем таблице класс сортировки по нажатию, и если этот класс есть, то выполняем сортировку по возрастанию, если нет - по убыванию
    sortTable.classList.toggle('sort-name');
    const sortIdTable = document.querySelector('.sort-name');
    if (sortIdTable) {
      tableHeadChange.classList.remove('descending-sort');
      clientsData.sort(sortChangeDateUp);
      loadTable(clientsData);
    } else {
      tableHeadChange.classList.add('descending-sort');
      clientsData.sort(sortChangeDateDown);
      loadTable(clientsData);
    }
  });

  // Реализуем поиск
  // Находим селектор поиска
  const searchInput = document.querySelector('.header__input');
  // Определяем переменную таймаута
  let timeoutId;
  //  Функция фильтрации массива клиентов по поисковику
  function filterList() {
    // Берем значение поисковика, убираем из него пробелы и сращиваем воедино с помощью функции и приводим к строчным буквам
    const inputValueLowerCase = (getSpacelessNameValue(searchInput)).toLowerCase();
    // Непосредственно фильтруем массив клиентов по ФИО, в зависимости от того, включает ли ФИО значение поисковика и выводим таблицу с отфильтрованными клиентами
    const filteredData = clientsData.filter(client => (client.surname + client.name + client.lastName).toLowerCase().includes(inputValueLowerCase));
    loadTable(filteredData);
    // Также сделаем видимой надпись "Совпадений не найдено", если поиск ничего не найдёт
    const noCoincidence = document.querySelector('.clients__no-coincidence');
    if (filteredData.length === 0) {
      noCoincidence.classList.remove('hidden');
    } else {
      noCoincidence.classList.add('hidden');
    }
  }
  // Функция таймера
  function searchWithDelay() {
    // Сразу сбрасываем таймер
    clearTimeout(timeoutId);
    // Стваим таймер на выполнение функции фильтрации в 300 мс
    timeoutId = setTimeout(filterList, 300);
  }
  // Вызываем функцию таймера от ввода значения в поисковик
  searchInput.addEventListener('input', searchWithDelay);
}
// Вызываем функцию закрузки данных
loadData();


















