(function() {
    const container = document.querySelector('#date-range-end');

    container.addEventListener('click', function() {
        if(this.classList.contains('disabled')) {
            setTwoWays();
        }
    }, false);
  })();