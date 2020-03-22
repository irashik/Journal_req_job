// взаимодействие со странице JobList

$(document).ready(function() {
    $("#task_save").click(function(callback) {
        alert("button click method");
        
        let url = "/JobList/save";
        
        
        //  получаем данные
        let task = {};
        
        
        $.ajax({
            url: url,
            type: 'POST',
            success: function() {
                alert('Load was performed.');
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