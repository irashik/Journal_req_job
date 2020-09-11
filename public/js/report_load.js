// взаимодействие со странице Report и передача действий контроллеру
/* 
 * 
 * 
 */
'use strict';

$(document).ready(function() {
 
    // функционал работы с DatePicker
    $(function() {
        let dateFormat = "yy/mm/dd";
        let today = new Date();
        let lastMonth = new Date();
        lastMonth.setDate(today.getDate() - 30);
    
        //Период DateStart
        let DateStart1 = $("input[name='DateStart1']")
            .datepicker({
              dateFormat: dateFormat,
              defaultDate: "-1m",
              changeMonth: true,
              numberOfMonths: 1,
              startDate: '01.01.2020',
              endDate: ""

            })
            .on("change", function() {
                DateStart1.datepicker( "option", "minDate", getDate(this));

            });
        
        
        let DateStart2 = $("input[name='DateStart2']")
                .datepicker({
                    dateFormat: dateFormat,
                    defaultDate: "+1w",
                    changeMonth: true,
                    numberOfMonths: 1,
                    startDate: '01.01.2020',
                    endDate: ""
                })

                .on( "change", function() {
                    DateStart2.datepicker( "option", "maxDate", getDate(this));
        });
    
    
    // Период DateEnd
    let DateEnd1 = $("input[name='DateEnd1']")
        .datepicker({
          dateFormat: dateFormat,
          defaultDate: "-1m",
          changeMonth: true,
          numberOfMonths: 1,
          startDate: '01.01.2020',
          endDate: ""
         
        })
        .on("change", function() {
            DateEnd1.datepicker( "option", "minDate", getDate(this));
        
        });
        
        
    let DateEnd2 = $("input[name='DateEnd2']")
            .datepicker({
                dateFormat: dateFormat,
                defaultDate: "+1w",
                changeMonth: true,
                numberOfMonths: 1,
                startDate: '01.01.2020',
                endDate: ""
            })
            
            .on( "change", function() {
                DateEnd2.datepicker( "option", "maxDate", getDate(this));
    });
    
    
      
        // это думаю не понадобиться. - даты если нужну вручную выставишь.
        //to.datepicker('setDate', today);
        //from.datepicker('setDate', lastMonth);

 
    function getDate(element) {
      let date;
      try {
        date = $.datepicker.parseDate(dateFormat, element.value);
      } 
      catch(error) {
        date = null;
      }
      return date;
    }
    
  });
  
    // Кнопка применить фильтры.  
    $('#toApplyFilter').click((e) => {
        e.preventDefault();
            /*
             * возьми значения всех селекторов
             * сделай запрос на контроллер и передай параметры.
             * 
             */
          
          let dateStartFrom = $('input#DateStartFrom').val();
          let dateStartTo = $('input#DateStartTo').val();
          let dateEndFrom = $('input#DateEndFrom').val();
          let dateEndTo = $('input#DateEndTo').val();
          let typeTask = $('select#TypeTaskFilter').val();
          let status = $('select#StatusFilter').val();
          let creator = $('select#CreatorFilter').val();
          let resource = $('select#ResourceFilter').val();
          
          
            let options = {
                DateStart1: dateStartFrom,
                DateStart2: dateStartTo,
                DateEnd1: dateEndFrom,
                DateEnd2: dateEndTo,
                TypeTask: typeTask,
                Status: status,
                Creator: creator,
                Resource: resource
                
                
            };
            
            //  создаем урл
            // TODO надо бы динамически задавать урл - что я буду - переписывать его каждый раз.??
            
            //let url = new URL('http://localhost:3000/Report');
            let url = new URL(window.location.origin + window.location.pathname);

            let params =  $.param(options);
           
        
            //отправляю запрос на сервер для перезагрузки страницы.
            location.href = url.href + '?' + params;
            
            // todo надо бы реализовать fetch запросы с перезагрузкой части страницы.
          
    });
  
  
            
    $('#toClearFilter').click((e) => {
        e.preventDefault();
        
        let url = new URL(window.location.origin + window.location.pathname);
        location.href = url.href;
        //location.reload();
        
        
        
              
    });
          
            
          
          
  
  


    
    //применение виджета UIquery для всех селекторов
    $("select[name='number']")
      .selectmenu()
      .selectmenu( "menuWidget" )
          .addClass( "overflow" );
 
    
  
  

  






    
    // end ready document
});


// автоматическая нумерация строк таблицы
//todo нужна функция которая будет обновлять нумерацию при изменениях
$(function updateTableNumeration() {
  $('table tr').each(function(i) {
      if(i !== 0) {
        let number = i;
        $(this).find('th:first').text(number + ".");
    }
  });
});