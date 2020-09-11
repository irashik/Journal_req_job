// взаимодействие со странице JobList и передача действий контроллеру
/* 
 * 
 * @type type может это и будет контроллер??
 */

$(document).ready(function() {
    
    // cохранение задачи новой 
    $("#task_save").click(function() {
        
        /*
         * @type jQuery
         * создаем курсор ожидания пока происходит запрос
         * после получения ответа от контроллера:
         *      ставим таймаут на полсекунды
         *      выводим сообщение в блок модального окна
         *      если ошибка то не закрываем окно
         *      если нормально то закрываем окно и редирект на /task/JobList
         *      
         */
        
        $('#DateStart_main').after("<div class=\"spinner-border\" "+ 
                "role=\"status\"><span class=\"sr-only\"> "+
                "Loading...</span></div>");        
        
        // получим данные из полей
        let Name = $('#Name').val();
        let Profession = $('#Profession').val();
        let ExpenseTime = $('#ExpenseTime').val();
        let Description = $('#Description').val();
        let Resource = $('#Resource').val();
        let TypeTask = $('#TypeTask').val();
        let Status = $('#Status').val();
        let Priority = $('#Priority').val();
        let DateEnd = $('#DateEnd').val();
        let Responsible = $('#Responsible').val();
        let Creator = $('#Creator').val();
        let Foto = $('#foto-upload').val(); // как корректно передать???
        
        let id = $('p#task-id.text-success').text();
       
        console.log('текущий статус задачи: ' + Status);
        
       // если тип задачи выбран выполнено, то добавляем дату закрытия
        if (!DateEnd) {
            if (Status === 'Выполнено') {
            
            DateEnd = new Date();
            }
        }
       
        
        
        //  подготавливаем json в соответствии со схемой mongodb
        let task = {
            Name: Name,
            Profession: Profession,
            ExpenseTime: ExpenseTime,
            Description: Description,
            Resource: Resource,
            TypeTask: TypeTask,
            Status: Status,
            Priority: Priority,
            DateEnd: DateEnd,
            Responsible: Responsible,
            Creator: Creator,
            Foto: Foto,
            id: id
        };
        
        // отладка - корректность взятия данных
        console.log(JSON.stringify(task));
        
        
        let url = '/JobList/saved';
            
        fetch(url, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    redirect: 'follow',
                    referrerPolicy: 'origin-when-cross-origin',
                    headers: {
                            'Accept': 'application/json',
                            "Content-Type": "application/json; charset=utf-8"
                        
                        
        },
                    
                    body: JSON.stringify(task)
                    

        })
                    // получение ответа 
            .then(result => {

            // добавить надпись в модальном окне о результате выполнения
            $('#DateStart_main').after("<p class=text-success> Task Added" + result + " </p>");

            

            // если присутсвует значение строки поиска то перейти по ссылке с параметром
               let search_str = $('#input-search').val();

               if (search_str) {
                   // создаю URL с параметром
                    let url ='/Joblist'+ '?' + 'search=' + search_str;
                
                    //отправляю запрос на сервер для перезагрузки страницы.
                    location.href = url;
                   
               } else {
                        // редирект на список задач.    
                        window.location.href = '/JobList';
               
               }
            
        
            
                       
                    

        })
            .catch(err => {
                $('#DateStart_main').after("<p id=text-danger>Ошибка" + err + "</p>");

                       
        });

    });
    
    
    //################################################
    
    
    
    
    
    
    
    
    
    // открытие подробного перечня полей #########################
    $('#hidden').click(function() { 
        $('#hiddenDiv').css('display', "block");
        // нужно чтобы блок hiddenDiv стал видимым
    });
       
    // добавление новой задачи
    $("#task_add").click(function() {
        
    
    });

    
    $('[data-target|="#edit_task_modal"]').click(() => {
        console.log('modal window opened');
        
    });
    
    
    
    // по открытию модального окна поместить курсор в поле ввода названия задачи.
    $('#edit_task_modal').on('shown.bs.modal', function () {
        $('#Name').trigger('focus');
             
    });


    // открытие отдельной задачи
    $('button[data-target="edit_task_modal2"]').click((e) => {
        /*
         * открыть модальное окно
         * взять id из выбранного блока
         * получить значения из базы 
         * вставить значения в модальное окно
         */
              
        // открыть модальное окно
        $('[data-target|="#edit_task_modal"]').trigger('click');
        //e.stopPropagation();
        e.preventDefault();

        let id;
        try {
            if (e.target.id) {
               id = e.target.id;
            } else if (e.target instanceof HTMLSpanElement) {
                 console.log('span element');
                 //todo реализуй тут нормально 
                 // сейчас просто во всех элементах id вставляю
        }
        } catch (e) {
           alert('попробуйте еще раз. Error: ' + e);
           console.log('Ошибка: ' + e);
        }
            
        console.log('this id: ' + id);
        //взять данные из базы данных --- 
         let url = '/JobList/' + id;
        //делаем запрос get на контроллер task.open
                    
        fetch(url, {
            method: 'GET'
        })
                // получение ответа - данные из базы по id
                // сначала распарсим stream object
        .then(response => response.json())  
        .then(result => {
                     
                    //теперь берем данные из ответа и подставляем в поля модального окна 
                    //console.log(result);
                    
                   // преобразовать дату
                    let date = new Date(result.DateStart);
                    
                    console.log('result.DateStart=== ' + date);
                    
                    let options = {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric'
                    };

                    let DateStart = date.toLocaleString('ru', options);

                    console.log('input string data= ' + DateStart);
                    
                    
                    $('#DateStart').text('Дата создания задачи: ' + DateStart);
                    
                    $('#Name').val(result.Name);
                    $('#Profession').val(result.Profession);
                    $('#ExpenseTime').val(result.ExpenseTime);
                    $('#Description').val(result.Desctiption);
                    $('#Resource').val(result.Resource);
                    $('#TypeTask').val(result.TypeTask);
                    $('#Status').val(result.Status);
                    $('#Priority').val(result.Priority);
                    $('#DateEnd').val(result.DateEnd);
                    $('#Responsible').val(result.Responsible);
                    $('#Creator').val(result.Creator);
                    
                    $('#foto-upload').val(result.Foto); // как корректно ??? отдельный запрос?

                      //покажем id задачи
                    $('#DateStart').before('<p class=text-success id=task-id>' + result._id + '</p>');
        
        })
            .catch(err => {
                //$('#DateStart_main').after("<p id=text-danger>Ошибка" + err + "</p>");
                console.log(err);
                       
        });

        });
    
    
    
    
    // todo:
     /*
      * реализуй динамическое изменение:
      * При выборе элемента списка, появляются кнопки (изменить, удалить, завершить)
      * 
      */
     
    
    
    // обработка скрытия окна    
    $('#edit_task_modal').on('hide.bs.modal', function () {
    // нужно удалить все предыдущие записи из полей. (очистить)
        $('#DateStart').text('');
        $('#Name').val('');
        $('#Profession').val('');
        $('#ExpenseTime').val('');
        $('#Description').val('');
        $('#Resource').val('');
        $('#TypeTask').val('');
        $('#Status').val('');
        $('#Priority').val('');
        $('#DateEnd').val('');
        $('#Responsible').val('');
        $('#Creator').val('');
        $('#foto-upload').val('');
        $('p#task-id.text-success').remove();
   
    });


    // удаление задачи
    $("#task-del").click(() => {
       /* получить id задачи
        * передать контроллеру
        * получить ответ, сообщить что все ОК (или не сообщать?)
        * редирект на список задач
        */
        let id = $('p#task-id.text-success').text();
        console.log(id);
        let url = '/JobList/' + id;

        fetch(url, {
            method: 'DELETE'
         
        })
                    // получение ответа - данные из базы по id
                    // сначала распарсим stream object
                    // .then(response => response.json())  
        
        .then(result => {
            console.log(result);
            // сообщить что задача удалена
            alert('Задача id ' + id + ' успешно удалена');
            // редирект на список задач.    
            window.location.href = '/JobList';
        })
            .catch(err => {
                console.log(err);
        });
    });

    
    
    // кнопка поиск
    // todo реализуй через submit form - меньше кода.
    $('#btn-search').click((e) => {
         /*
          * берем значение из поля ввода
          * делаем запрос на сервер
          * получаем запрос, обрабатываем 
          * 
          */
        
        e.preventDefault();
        
        // беру строку поискового запроса из поля инпут
        let search_str = $('#input-search').val();
                
        // создаю URL с параметром
        let url ='/Joblist'+ '?' + 'search=' + search_str;
                
        //отправляю запрос на сервер для перезагрузки страницы.
        location.href = url;


        // вернуть значение поискового запроса обратно в строку
        //$('#input-search').val(search_str);

        
        
        
    });
    
    
    //Поиск по фильтру локомотивы. TypeTask - ремонт.локом.
    $('#filter1').click((e) => {
        e.preventDefault();
        
        let search_str = 'Ремонт локом.';
              
        // создаю URL с параметром
        let url ='/Joblist'+ '?' + 'typetask=' + search_str;
                
        //отправляю запрос на сервер для перезагрузки страницы.
        location.href = url;
        
        
    });
    
     //Поиск по фильтру заявки - статус-Заявка
    $('#filter2').click((e) => {
        e.preventDefault();
                
        let search_str = 'Заявка';
        // создаю URL с параметром
        let url ='/Joblist'+ '?' + 'status=' + search_str;
                
        //отправляю запрос на сервер для перезагрузки страницы.
        location.href = url;
        
        
    });
    
    
    
    
    // end ready document
});