// взаимодействие со странице Login и передача действий контроллеру
/* 
 * 
 * 
 */

$(document).ready(function() {
    // нажатие клавиши отправки формы регистрации
    
    $('#login-form').on('submit', function(e) {
        /*
         * 
         * @todo
         * может есть более удобный способ??
         * хотелось бы использовать fetch и показывать флеш сообщения от passport
         * 
         * однако при fetch данные попадают в ответ и соот. флеш сообщение не выводится
         * как вытащить сообщение из ответа? или по другому передать сообщение
         * 
         */
        
        
        
        /*
         * берем данные из полей
         * форма проверяет валидацию сама
         * передаем на сервер методом post
         * получаем ответ с сервера - ничего не делаем
         * если ошибка - то показываем флеш сообщение с ошибкой, оставляем на странице
         * 
         */
          
        //e.preventDefault();
          
        const email = $('#InputEmail').val();
        const password = $('#InputPassword').val();
        
        const login_data = {
            email: email,
            password: password
        };
        
        
        
        
        
//        fetch('/login', {
//            method: 'POST',
//            mode: 'cors',
//            cache: 'no-cache',
//            credentials: 'same-origin',
//            redirect: 'follow',
//            referrerPolicy: 'origin-when-cross-origin',
//            
//            headers: {
//                       'Accept': 'application/json',
//                       'Content-Type': "application/json",
//                       //'Accept': 'application/x-www-form-urlencoded',
//                       'Accept-Charset': 'utf-8',
//                       //'Content-Type': 'text/html',
//                       
//            },
//            body: JSON.stringify(login_data)
//            
//                    
//        })
//        .then(result => {
//                  
//                    // тут также может быть ошибка показываем флеш сообщение
////                    if(result.se.status === 500) {
////                        alert('code 500');
////                        
////                    };
////                    
//                    
//                    
//                    if (result.status == 200) {
//                        //window.location.href = '/';
//                        
//                        
//                    }
//                    
//                    if (result.status == 401 ) {
//                        /*
//                         * добавить блок-сообщение на страничку login
//                         */
//                        $('form').before(`
//                         <div class='alert alert-danger' role='alert'>
//                            Incorrect user or password!
//                        </div>`);
//
//                        
//                        
//                    }
//                    
////                    <div class="alert alert-success" role="alert">
//  //                      Это уведомление об успехе — check it out!
//    //                    result
//      //              </div>
//                    
//              
//          
//                    
//        })
//        .catch(err => {
//                    
//                    /*
//                     * показываем флеш сообщение с ошибкой
//                     */
//                    
//                    console.log('error from server');
//                    alert('Возникла ошибка при авторизации' + err);
////                    
////                    <div class="alert alert-danger" role="alert">
//                      //  Это уведомление об опасности — check it out!
//                    //</div>
//            
//        });
        
        
        
        
        
        
        
  });
       
    
    // end ready document
});