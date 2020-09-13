'use strict';

/* взаимодействие со страницей profile и передача действий контроллеру
 * Подтянуть данные при открытии страницы
 * Отправка запроса при изменении пароля - отдельно :: по выполнении уведомление
 * Отправка запроса на изменение данных - отдельно :: по выполнении уведомление + новые данные вставить fetch
 * 
 */

$(document).ready(function() {
    
    //Собираем и подставляем данные - это EJS делает
       
    
    
    
    // нажатие клавиши отправки формы 
    $('#profileData_form').submit((e) => {
      
        /*
         * берем данные из полей
         * проверяем данный по валидации todo
         * передаем на сервер методом post
         * получаем ответ с сервера - 
         *      подставляем в форму
         *      уведомление показываем и если ошибка
         *   
         */
        e.preventDefault();
          
        const id =  $('div#userid').text();
        const email = $('#inputEmail').val();
        const name = $('#inputName').val();
        const position = $('#inputPosition').val();
        const departament = $('#inputDepartament').val();
        
        //формируем объект
        const profile = {
            Id: id,
            Email: email,
            Name: name,
            Position: position,
            Departament: departament
        };
        
        // отправляем пост запрос с объектом далее контроллер обрабатывает
        fetch('/profile', {
            method: 'PATH',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'origin-when-cross-origin',
            headers: {
                       'Accept': 'application/json',
                       "Content-Type": "application/json; charset=utf-8"
                       
            },
                    
                    body: JSON.stringify(profile)
                    
        })
        
        .then(result => {
            
        
            // получаю ответ если ответ 200 то 
            // редиректим на /login там будут флеш сообщения
            if(result.status === 200) {
                location.href = '/login';
                
            } else {
                // иначе показываем флеш сообщения и никуда не редиректим.
                
                let promise = result.text();
                
                promise.then(a => {
                    
                    let html = `<div class="alert alert-danger" role="alert">` + a + `</div>`
                
                    $('div#alert').append(html);
                });
                
            }
            
//            let a = result.json();
//            a.then(b => {
//                alert(b);
//            });
//            
                
          
                    
        })
       
        .catch(err => {
                     /*
                     * показываем флеш сообщение с ошибкой
                     */
                   
                   let promise = err.text();
                    promise.then(a => {
                        let html = `<div class="alert alert-danger" role="alert">` + a + `</div>`
                        $('div#alert').append(html);
                    });
                    
            
            
        });
                
        
        
    });
    
    
    
    
    
    // обработчик нажание кнопки изменения пароля
    $('#profilePass_form').click((e) => {
        /*
         * берем данные
         * проверяем все-ли верно
         * отправляем на сервер
         * если успешно от сервера то показываем уведомление
         * Если ошибка тоже уведомление
         * сбрасываем введенные значения.
         */
        
        const OldPassword = $('#inputOldPassword').val();
        const NewPassword = $('#inputNewPassword').val();
        const confirmPassword = $('#inputconfirmPassword').val();
        
        let password = {};
        
        
        fetch('/profile/passw', {
            method: 'PATH',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'origin-when-cross-origin',
            headers: {
                       'Accept': 'application/json',
                       "Content-Type": "application/json; charset=utf-8"
                       
            },
                    
                    body: JSON.stringify(password)
                    
        })
        
        .then(result => {
            
            
        })
        .catch(err => {
            
        });
        
        
        
    });
    
    
    
    
    
    // end ready document
});