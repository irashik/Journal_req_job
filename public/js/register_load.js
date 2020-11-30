// взаимодействие со странице register и передача действий контроллеру
/* 
 * 
 * @type type может это и будет контроллер??
 */

$(document).ready(function() {
    
    // нажатие клавиши отправки формы регистрации
    $('#register_form').submit((e) => {
      
        /*
         * берем данные из полей
         * проверяем данный по валидации
         * передаем на сервер методом post
         * получаем ответ с сервера - ничего не делаем
         * если ошибка - то показываем флеш сообщение с ошибкой, оставляем на странице
         * 
         */
        e.preventDefault();
          
        const email = $('#inputEmail').val();
        const password = $('#inputPassword').val();
        const name = $('#inputName').val();
        const position = $('#inputPosition').val();
        const departament = $('#inputDepartament').val();
      
        const register_data = {
            Email: email,
            Password: password,
            Name: name,
            Position: position,
            Departament: departament,
           
        };
      
        fetch('/register', {
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
                    
                    body: JSON.stringify(register_data)
                    
        })
        
        .then(result => {
            // получаю ответ если ответ 200 то 
            // редиректим на /login там будут флеш сообщения
            if(result.status === 200) {
                location.href = '/login';
                    // плюсом контроллер передает флеш сообщения на эту страницу
            } else {
                // иначе показываем флеш сообщения и никуда не редиректим.
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
                   let promise = err.text();
                    promise.then(a => {
                        let html = `<div class="alert alert-danger" role="alert">` + a + `</div>`
                        $('div#alert').append(html);
                    });
        });
        
    });
    
    
    
    
    
    // end ready document
});