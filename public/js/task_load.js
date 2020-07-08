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
        let DateStart = $('#DateStart').val();
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
        
        
        let id = $('p#task-id.text-warning').text();
        
        console.log(id);
        
        
        
        //  подготавливаем json в соответствии со схемой mongodb
        let task = {
            DateStart: DateStart,
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
            $('#DateStart_main').after("<p class=text-warning> Task Added" + result + " </p>");

            


            // редирект на список задач.    
            window.location.href = '/JobList';
        
                       
                    

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
       
    
    
    
// закрытие задачи - завершить - поменять статус     ####################
    $('#TaskClose').click(function() { 
               
       /*
        * взять id задачи
        * вызвать метод close контроллера и передать id
        * 
        */  
       

        
    });
    
    
    
    
    
    
    
    
    
// добавление новой задачи
    $("#task_add").click(function() {
       
    
        
        
        
        
    
});







// открытие отдельной задачи
    $('button[data-target="edit_task_modal2"]').click((e) => {

        //console.log('open task');
        
        /*
         * открыть модальное окно
         * взять id из выбранного блока
         * получить значения из базы 
         * вставить значения в модальное окно
         * 
         */
        
        
        // удали предыдушую запись об id из модального окна
            $('#task-id').remove();
        
        // открыть модальное окно
        $('[data-target|="#edit_task_modal"]').trigger('click');
        
        //e.stopPropagation();
        e.preventDefault();
        
        //console.log('e.target:  ' + e.target);
        
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
        //
            
        fetch(url, {
            method: 'GET'
         
        })
                    // получение ответа - данные из базы по id
                       // сначала распарсим stream object
        .then(response => response.json())  
        
        .then(result => {
                     
                    //теперь берем данные из ответа и подставляем в поля модального окна 
                    //console.log(result);
                    
                    $('#DateStart').val(result.DateStart);
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
                    $('#DateStart_main').before('<p class=text-success id=task-id>' + result._id + '</p>');
        
                    

        })
            .catch(err => {
                //$('#DateStart_main').after("<p id=text-danger>Ошибка" + err + "</p>");
                console.log(err);
                
                       
        });

    
        
        
//        let DateStart = $('#DateStart').val();
//        let Name = $('#Name').val();
//        let Profession = $('#Profession').val();
//        let ExpenseTime = $('#ExpenseTime').val();
//        let Description = $('#Description').val();
//        let Resource = $('#Resource').val();
//        let TypeTask = $('#TypeTask').val();
//        let Status = $('#Status').val();
//        let Priority = $('#Priority').val();
//        let DateEnd = $('#DateEnd').val();
//        let Responsible = $('#Responsible').val();
//        let Creator = $('#Creator').val();
//        let Foto = $('#foto-upload').val(); // как корректно 
//        
//        
        
        
        
        
        
        
        
        
        });
    
    
    
    
    
    
    $('button[data-target="#edit_task_modal"]').click((e) => {
        
        
        console.log('нажатие на кнопку вызова модального');
        
        
        
    });

    
    
    
    // todo:
     /*
      * реализуй динамическое изменение:
      * При выборе элемента списка, появляются кнопки (изменить, удалить, завершить)
      * 
      */
     
     
     
        //todo
        /*
         * при открытии модального окна, должен проверяться параметр req.params.id
         * если она присутствуюет то он отображается в карточке задачи
         * если нет то "задача новая"
         */
        
        

    // метод присваивает определенной задачи статус - завершена + ставит дату завершения.
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // end ready document
});