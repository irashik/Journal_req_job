// взаимодействие со странице Report и передача действий контроллеру
/* 
 * 
 * 
 */

'use strict';


$(document).ready(function() {
    
    
    

 
  $( function() {
    let dateFormat = "dd/mm/yy";
    let today = new Date();
    let lastMonth = new Date(2020, 0, 1);
    //lastMonth.setDate(today.getDate() -60);
    // далее хочу задавать стандартный период для выборки - пол года или год или квартал
    
    
    
    
    let from = $("#from")
        .datepicker({
          dateFormat: dateFormat,
          defaultDate: "-1m",
          changeMonth: true,
          numberOfMonths: 1,
          startDate: '01.01.2020',
          endDate: ""
         
      })
        
        .on( "change", function() {
          to.datepicker( "option", "minDate", getDate( this ) );
        
    });
        
        
        from.datepicker('setDate', lastMonth);
        
        
    let to = $( "#to" ).datepicker({
        dateFormat: dateFormat,
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 1,
        startDate: '01.01.2020',
        endDate: ""
      })
      .on( "change", function() {
        from.datepicker( "option", "maxDate", getDate( this ) );
      });
      
      
      to.datepicker('setDate', today);
      
      
      
 
    function getDate( element ) {
      let date;
      try {
        date = $.datepicker.parseDate( dateFormat, element.value );
      } catch( error ) {
        date = null;
      }
 
      return date;
    }
  } );
  
  
  
  
  
  
  $( function() {

    $( "#number" )
      .selectmenu()
      .selectmenu( "menuWidget" )
          .addClass( "overflow" );
 
    
    
    $( "#number2" )
      .selectmenu()
      .selectmenu( "menuWidget" )
          .addClass( "overflow" );
 
    
    
    
  } );
  
  
  
    
    
    
    
    
    
    
    
    
    
    // end ready document
});