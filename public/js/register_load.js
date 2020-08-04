// взаимодействие со странице JobList и передача действий контроллеру
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
        const departament = $('#inputDepartament');
      
        const register_data = {
            Email: email,
            Password: password,
            Name: name,
            Position: position,
            Departament:departament
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
                  
                    // тут также может быть ошибка показываем флеш сообщение
                    
                    console.log('request send true');
                    console.log(result);
                    
//                    <div class="alert alert-success" role="alert">
  //                      Это уведомление об успехе — check it out!
    //                    result
      //              </div>
                    
              
          
                    
        })
        .catch(err => {
                    
                    /*
                     * показываем флеш сообщение с ошибкой
                     */
                    
                    console.log('error from server');
                    alert('Возникла ошибка при регистрации' + err);
//                    
//                    <div class="alert alert-danger" role="alert">
                      //  Это уведомление об опасности — check it out!
                    //</div>
            
        });
                
        
        
    });
    
    
    
    
    
    
    
    // end ready document
});