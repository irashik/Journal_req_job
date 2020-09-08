// взаимодействие со странице Report и передача действий контроллеру
/* 
 * 
 * 
 */
'use strict';

$(document).ready(function() {
 
    // функционал работы с DatePicker
    $(function() {
    let dateFormat = "dd/mm/yy";
    let today = new Date();
    let lastMonth = new Date();
    lastMonth.setDate(today.getDate() - 30);
    
    let from = $("#from")
        .datepicker({
          dateFormat: dateFormat,
          defaultDate: "-1m",
          changeMonth: true,
          numberOfMonths: 1,
          startDate: '01.01.2020',
          endDate: ""
         
        })
        .on("change", function() {
            to.datepicker( "option", "minDate", getDate(this));
        
        });
        
        
    let to = $("#to")
            .datepicker({
                dateFormat: dateFormat,
                defaultDate: "+1w",
                changeMonth: true,
                numberOfMonths: 1,
                startDate: '01.01.2020',
                endDate: ""
            })
            
            .on( "change", function() {
                from.datepicker( "option", "maxDate", getDate(this));
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
          
          
    });
  
  


    
    //применение виджета UIquery для всех селекторов
    $("select[name='number']")
      .selectmenu()
      .selectmenu( "menuWidget" )
          .addClass( "overflow" );
 
    
  
  
// автоматическая нумерация строк таблицы
function updateTableNumeration() {
  $('table tr').each(function(i) {
      if(i !== 0) {
        let number = i;
        $(this).find('th:first').text(number + ".");
    }
  });
}

  //todo нужна функция которая будет обновлять нумерацию при изменениях
  updateTableNumeration();
    
    // end ready document
});