# План текущих задач по разработке приложения


##На чем я остановился

1. Сейчас разрабатывай раздел Task - постановка задач
    функционал добавление задачи, обновление данных, получение всех задач в список
     напиши, напиши модульные тесты, протестируй.

3. Реализуй функционал worker - добавление работников в базу - он вспомогательный

2. Продумай и реализуй функционал фильтрации и сортировки списка задач.

4. реализую все-таки регистрацию и авторизацию  - думаю google авторизация подойдет ));

5. Отдельно выдели функционал табеля рабочего времени "timesheet" - там будет заполнятся явка работников и отработанное время - потом формироваться табель. Должна быть увязка, с журналом работ и работниками по данному числу??!!

6. 

##Сосредоточься на функционале taks
###Поскольку это пожалуйс основной функционал на сегодняшний день, который может быть полезен


1. View  ---> Html + JS
2. Controller
3. MOdel


Контроллер получает данные при вызове /index
Контроллер записывает данные в базу данных.


1. Функционал создания, открытия, редактирования и удаления задач реализован.

##Займись тестированием, с тестированием будет быстрее

#Почитай про интеграционное тестирование

#20.07.2020 План задач:

2. Настрой на сервере функционал авторизации и аутентификации при помощи oAuth2 посредсвом гугл.
4. поставь форму для загрузки файла из бутстрапа  вмодальное окно. функционал пока не делай.

21.07.2020
Формы html вставил. - Далее продумай процедуры авторизации и напиши сервернвый код авторизации
Также добавь логику для отображения имени и скрытия кнопок при авторизованой сессии.


###Реализуй также сервис приема заявок от мастеров. 
    Тут продумай сценарии. Подача заявки и журнал заявок. Далее куда?? Мастер вручную создает задачу по заявке? или Сделать это одним и тем же??
    Заявка этот задача только со статусом заявка + Автор задачи будет пользователь.




22.07.2020
1. Переназначь обработчики на кнопки поиск


24.07.2020
*для google api OAuth2.0 нужно указать домен - т.е. нужно определиться с сервером.
*Напиши политику конфидинциальности

Можно ли реализовать ручной очередности списка - сортировку по БД. как именно?

#Основные запросы к журналу
1. Список всех заданий по профессии или работнику
2. За период КТУ работника или %  нормированных заданий
3. затраты времени на конкретное задание (локомотив №001 --> человекочасы)
4. КТУ по професии


#Запросы к списку задач
1. покажи активные, или отложенные, или все
2. Покажи задачи только за период (созданные или завершенные в периоде)
3. покажи задачи для конкретной профессии
4. Группировка отдельных категорий


25.07.2020
*Реализовал функционал автоматического добавления даты создания задачи.


26.07.2020
*подумай что нужно еще для запуска приложения альфа версии
    *Буду самостоятельно пользоваться без других пользователей.

*напиши тесты, а затем протестируй модуль user.model.js
*Разберись и реализуй флеш сообщение после успешной авторизации, чтобы появлялось на главной странице. 
*Реализуй функционал взятие данных пользователя для формы профиля, + запись в базу.

Добавь функционал в модель.user, при создании пользователя добавить еще и время создания
*Разберись с методами проверки и верификации пользователей - отправка данных на почту + ссылка для подтверждения для админа.
*Что делать с модулем Отчет???
*почитай про подготовку на продакшен - чек лист для подготовки.
*разберись и подготовься к переносу данных из эксель в базу монго.

#import to mongodb
mongoimport --host=localhost -d test -c rhuTask --type csv --file ~/Download/rhuTask.csv --headerline


8.09.2020
*накидай план реализации отчетов. А именно: для мастера, для руководителя, для нормировщика.
    Что нужно мастеру?
    Что нужно знать руководителю?
    Что нужно знать нормировщику?

#Заливка на прод.
    *Доделай следующее:
        1. Реализуй функционал отправки письма администратору при регистрации пользователя
               с ссылкой на подтверждение или вручную можно подтверждать
        2. Реализуй функционал сброса пароля:
       ++ 3.Доделай реализацию фильтров в отчете

          ++ 1.1. Функционал профиля доделай - (подтянуть данные) + (изменение) + изм. пароля // готово.
          ++ 1.2 Функция отправка емейла при регистрации на адрес пользователя - проверка
          ++ 1.3 Функция отправки емейла при регистрации на адрес админа -- подтверждение 
          ++ 1.5 Настроить функционал для проверки подтверждения и проверки регистрации


*Закинь данные из файла в базу данных.
*страницу ошибок реализуй - доделаq Error404...

*Пока еще не настроена проверка по полям confirm & verife - настрой. Стратегия просто проверяет и если лож то не пускает?

*Функционал сброса пароля реализуй. Пока можно вручную сбрасывать по запросу пользователя. 
        Алгоритм:
            начало.
            возьми емейл, найди пользователя
            сгенерируй свой пароль
            сгенерируй хеш и запиши в базу
            если ок, то отправль пользователю новый пароль на почту. и сообщение покажи - "отправлено"
            конец.





###Почитай про oAuth2 и реализую данную стратегию авторизации


    *Реализуй загрузку фотографий в задачу  ++

*При ошибочной авторизации  реализуй вывод ошибок от passportAuth

#Накидай алгоритм для функционала учета рабочего времени и работ.
выа
    

*Доделай реализацю роутера по запросу JobList/:id  - пусть открывает страницу с окном что-ли.

*Протестируй модули приложения.
*почитай как протестировать клиентский js.

