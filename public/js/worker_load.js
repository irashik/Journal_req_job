/*
 * Для чего этот скрипт?
 * Поставить обработчик на кнопку
 * по нажатию собрать все данные из полей
 * 
 */



$(document).ready(function() {
    
    $("#worker_save").click(function(callback) {
        
        alert("button click method");
        
        let url = "/worker/add";
        
        
        //  получаем данные
        let worker = {};
        
        
        $.ajax({
            url: url,
            type: 'POST',
            success: function() {
                alert('Load was performed.');
            }
        });
        
        
        
        
//TODO
//
//function Update_info_dom() {
//    
//   let firstName  = document.getElemetnById('FirstName');
//   let lastName   = document.getElemetnById('LastName');
//   let profession = document.getElemetnById('Profession');
//   let quality    = document.getElemetnById('Quality');
//   let status     = document.getElemetnById('Status');
//   let comment    = document.getElemetnById('Comment');
//   
//  
        
        
//        
//        
//        
//        let response = await fetch(url, {
//            method: 'POST',
//            headers: { 
//                'Content-Type': 'application/json; charset=utf-8'
//            },
//            body: JSON.stringify(worker);
//        });
//        
//         let result = await response.json();
//        
//        
//        
//        if (response.ok) {
//            alert("Сохранено");
//        } else {
//            alert("Ошибка http: " + response.status);
//        }
//        
//        
    });
});