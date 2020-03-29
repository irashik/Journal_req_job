// взаимодействие со странице JobList и передача действий контроллеру
/* 
 * 
 * @type type может это и будет контроллер??
 */

$(document).ready(function() {
    
     // cохранение изменений задачи при его редактировании
    $("#task_save").click(function(callback) {
        alert("button click method save");
        
        let url = "/JobList/save";
        
        
        //  получаем данные
        let task = {};
        
        // запрос на сервер - передаем параметры
        $.ajax({
            url: url,
            type: 'POST',
            success: function() {
                
            }
        });
        
    });
    
    // открытие подробного перечня полей
    $('#hidden').click(function() { 
       
         $('#hiddenDiv').css('display', "block");
               
       

       
        // нужно чтобы блок hiddenDiv стал видимым
        
        
    });
    
    // закрытие задачи - завершить - поменять статус
    $('#TaskClose').click(function() { 
       
         
        //        
           let Status = $('#Status').value;
       
       //и записать в базу данных
        
        
        
    });
    
    
    // добавление новой задачи
    $("#task_add").click(function(callback) {
        alert("button click method task_add");
        
        let url = "/JobList/add";
        
        let DateStart = $('#DateStart').value;
        let Name = $('#Name').value;
        let Profession = $('#Profession').value;
        let ExpenseTime = $('#ExpenseTime').value;
        
        let Description = $('#Description').value;
        let Resource = $('#Resource').value;
        let TypeTask = $('#TypeTask').value;
        let Status = $('#Status').value;
        let Priority = $('#Priority').value;
        let DateEnd = $('#DateEnd').value;
        let Responsible = $('#Responsible').value;
        let Creator = $('#Creator').value;
       
        let Foto = $('#foto-upload').value; // как корректно передать???

        
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