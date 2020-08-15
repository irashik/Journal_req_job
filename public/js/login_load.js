// взаимодействие со странице Login и передача действий контроллеру
/* 
 * 
 * 
 */

$(document).ready(function() {
    // нажатие клавиши отправки формы регистрации
    $('#login-form').submit((e) => {
      
        /*
         * берем данные из полей
         * проверяем данный по валидации
         * передаем на сервер методом post
         * получаем ответ с сервера - ничего не делаем
         * если ошибка - то показываем флеш сообщение с ошибкой, оставляем на странице
         * 
         */
      
        
        e.preventDefault();
        
        const email = $('#InputEmail').val();
        const password = $('#InputPassword').val();
        
        const login_data = {
            Email: email,
            Password: password
        };
        
        
        console.log(login_data);
      
      
      
        fetch('/login', {
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
                    body: JSON.stringify(login_data)
                    
        })
        .then(result => {
                  
                    // тут также может быть ошибка показываем флеш сообщение
//                    if(result.se.status === 500) {
//                        alert('code 500');
//                        
//                    };
//                    
                    
                    console.log('request send true');
                    console.log(result);
                    //console.log(result.status);
                    //window.location.reload();
                    
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
                    alert('Возникла ошибка при авторизации' + err);
//                    
//                    <div class="alert alert-danger" role="alert">
                      //  Это уведомление об опасности — check it out!
                    //</div>
            
        });
                
        
        
    });
    
    
    
    
    
    
    
    // end ready document
});