'use strict';

/* взаимодействие со страницей profile и передача действий контроллеру
 * Подтянуть данные при открытии страницы
 * Отправка запроса при изменении пароля - отдельно :: по выполнении уведомление
 * Отправка запроса на изменение данных - отдельно :: по выполнении уведомление + новые данные вставить fetch
 * 
 */

$(document).ready(function() {
    
    //Собираем и подставляем данные - это EJS делает
       
    // нажатие клавиши отправки формы - изменение данных пользователя
    $('#save-profile').click((e) => {
        /*
         * берем данные из полей
         * проверяем данный по валидации todo
         * передаем на сервер методом post
         * получаем ответ с сервера - 
         *      подставляем в форму результат 
         *      уведомление показываем
         *      если ошибка - то уведомление
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
            method: 'PATCH',
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
               //показать сообщение что все ок. и поддтянуть новые данные
                let promise = result.json();
                promise.then(a => {
                    
                    console.log('данные на клиенте полученные: ' + JSON.stringify(a));
                    
                    // покажи сообщение
                    let html = `<div class="alert alert-success" role="alert">Данные успешно изменены</div>`
                    $('div#alert').append(html);
                    //обнови данные в полях
                    $('#inputEmail').val(a.Email);
                    $('#inputName').val(a.Name);
                    $('#inputPosition').val(a.Position);
                    $('#inputDepartament').val(a.Departament);
                    
                    
                    
                });
                
            } else {
                // иначе показываем флеш сообщения об ошибке
                
                let promise = result.text();
                
                promise.then(a => {
                    let html = `<div class="alert alert-danger" role="alert">` + a + `</div>`
                    $('div#alert').append(html);
                });
                
            }
            

                    
        })
        .catch(err => {
                     /*
                     * показываем флеш сообщение с ошибкой
                     */
                   
                    
                    
                        let html = `<div class="alert alert-danger" role="alert">` + err + `</div>`
                        $('div#alert').append(html);
                    
                    
            
        });
            
    });
    
    
    
    
    
    // обработчик нажание кнопки изменения пароля
    $('#save-password').click((e) => {
        /*
         * берем данные
         * проверяем все-ли верно
         * отправляем на сервер
         * если успешно от сервера то показываем уведомление
         * Если ошибка тоже уведомление
         * сбрасываем введенные значения.
         */
        
        e.preventDefault();


        
       
        // берем данные и собираем в объект для передачи
        let password = {
            OldPassword: $('input#OldPassword').val(),
            NewPassword: $('input#NewPassword').val(),
            ConfirmPassword: $('input#ConfirmPassword').val()

        };
        
        console.log(password);
        
        // валидация на стороне клиента
        if (password.OldPassword && password.NewPassword && password.ConfirmPassword &&
            password.NewPassword === password.ConfirmPassword) {
            
            
             // отправляю на сервер по запросу PATch controller changePassw
                fetch('/profile/passw', {
                    method: 'PATCH',
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
                    //уведомляем пользователя об успешном изменении
                    if (result.status === 200) {  
                        
                    let html = `<div class="alert alert-success" role="alert">Пароль успешно изменен</div>`
                        $('div#alert').append(html);
                    
                        $('input#OldPassword').val('');
                        $('input#NewPassword').val('');
                        $('input#ConfirmPassword').val('');
                    
                    
                    } else {
                        // берем тексит и сообщаем об ошибке
                        let promise = result.text();
                        
                        promise.then(a => {
                                let html = `<div class="alert alert-danger" role="alert">` + a + `</div>`
                                $('div#alert').append(html);
                                //обнулить поля ввода
                                
                                
                            $('input#OldPassword').val('');
                            $('input#NewPassword').val('');
                            $('input#ConfirmPassword').val('');
                                
                        });
                    }
                
                })
                .catch(err => {
                    // уведомляем пользователя об ошибке
                    let html = `<div class="alert alert-danger" role="alert">` + err + `</div>`
                    $('div#alert').append(html);
                    
                    $('input#OldPassword').val('');
                    $('input#NewPassword').val('');
                    $('input#ConfirmPassword').val('');
                
                    
                    
                });
            
            
            
            
        } else {
            alert('Проверьте введенные пароли');
            
            $('input#OldPassword').val('');
            $('input#NewPassword').val('');
            $('input#ConfirmPassword').val('');
                    
        }
        
        
    });
    
    
    
    
    
    // end ready document
});