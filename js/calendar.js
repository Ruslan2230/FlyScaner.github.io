(function() {
    var options = {
        text: {
            days: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            today: 'Сегодня',
            now: 'Сейчас',
            am: 'AM',
            pm: 'PM'
        },
        ampm: false,
        firstDayOfWeek: 1,
        formatter: {
            date: function (date) {
                if (!date) return '';

                var day = date.getDate();
                var month = date.getMonth() + 1;
                var year = date.getFullYear();

                return day + '.' + month + '.' + year;
            },
        },
    };
    var tomorrow = new Date();
    var upSevenDays = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    upSevenDays.setDate(upSevenDays.getDate() + 7);
    
    // set of default value 
    $('#rangestart input').val(tomorrow);
    $('#rangeend input').val(upSevenDays);

    $('#rangestart').calendar({
        type: 'date',
        // minDate: new Date(),
        // endCalendar: $('#rangeend'),
        ...options
    });

    $('#rangeend').calendar({
        type: 'date',
        // minDate: new Date(),
        // startCalendar: $('#rangestart'),
        ...options
    });
})();