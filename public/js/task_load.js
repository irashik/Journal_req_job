// взаимодействие со странице JobList и передача действий контроллеру
/* 
 * 
 * @type type может это и будет контроллер??
 */

$(document).ready(function() {
    
     // cохранение задачи новой или редактирование.
    $("#task_save").click(function() {
        
        //alert("button click method save");
        
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
            Foto: Foto
            
        };
        
        // отладка - корректность взятия данных
        //console.log(JSON.stringify(task));
               
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

                     console.log('fetch result  ' + result.status);
                     console.log('result' + JSON.stringify(result));
                     
            
                     $('#DateStart_main').after("<p id=flash_info>Task Added</p>");
                                         
                     //  window.location.href = '/JobList';
                   
                     
                     setTimeout(() => {
                        window.location.href = '/JobList';
                      }, 500);
                       
                    

            })
                    .catch(err => {
                       // alert('task_load   ' + err);
                        console.log('catch error ' + err);
                        
                           $('#DateStart_main').after("<p id=flash_error>Ошибка</p>");

                        //$('#status_msg').innerHTML = err;
            });

    });
    
    
    
    
    
    
    
    // открытие подробного перечня полей
    $('#hidden').click(function() { 
       
         $('#hiddenDiv').css('display', "block");
                      
        // нужно чтобы блок hiddenDiv стал видимым
                
    });
       
    
    
    
    // закрытие задачи - завершить - поменять статус
        $('#TaskClose').click(function() { 
               
         
         //let a = $('#status_msg');
         
         
         //a.append("<p>Hello world</p>");
         
         $('#DateStart_main').after("<p id=flash_info>Task Added</p>");
         
         
         
         
         
         //a.insertAdjacentText('afterEnd', '<p>Hello World</p>');
                 

         //console.log('innerHtmL');
         
         
         
         
         
        // let Status = $('#Status').val();
       
       //и записать в базу данных
       
//       let url = '/JobList/close';
//        
//        fetch(url)
//                
//        
//            .then(data => {
//                 console.log(data);
//        
//        });
//        
//        
        
        
       
//            let response = await fetch(url, {
////                    method: 'get',
////                    mode: 'cors',
////                    cache: 'no-cache',
////                    credentials: 'same-origin',
////                    headers: {
////                        "Content-Type": 'application/json; charset=utf-8'
////                    },
////                    redirect: 'follow',
////                    referrerPolicy: 'origin-when-cross-origin',
//                    //body: JSON.stringify(task)
//
//            });
            
        //let result = response.json();
            
                    // получение ответа 
                     //.then(response => response.json())
            //обработка результата
                    
//                    .then(response => response.json())
//            
//                    .then(result => {
//
//                     console.log(response);
//                     console.log(result);
//                     console.log(result.status);
//                     
//                     // присвоить ответ блоку статус
//                     // 
//                     
//       
//       
//                    });
//        

        
    });
    
    
    
    
    
    
    
    
    
    // добавление новой задачи
    $("#task_add").click(function(callback) {
       
        alert("button click method task_add");
        
        let url = "/JobList/created";
        
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

        
        //  получаем данные
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
            Foto: Foto
            
        };
        
        
           
        // запрос на сервер - передаем параметры
        $.ajax({
            url: url,
            type: 'POST',
            accepts: 'application/json',    
            data: task,
            success: function() {
                $('#my-flash-message').innerHTML = 'Данные записаны';
                
            },
            error: function() {
                alert('что-то пошло не так и данные не переданы');
                $('#my-flash-message').innerHTML = 'Какая-то ошибка';

            }
            
        });
        
    });
    
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