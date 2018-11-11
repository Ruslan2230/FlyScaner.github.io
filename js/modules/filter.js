(function() {


    function updateCount(value) {
        const elem = document.querySelector('.number-of-search');
        elem.innerHTML = value;
    }

    function updateLabel(value) {
        const elem = document.querySelector('#type-of-filter');
        elem.innerHTML = value;
    }

    function tabs() {
        const buttons = document.querySelectorAll('.buttons .button');
        
        buttons.forEach(item => {
            item.addEventListener('click', (e) => {
                const target = e.target;
                const type = target.dataset.value;

                updateLabel(target.innerText);

                document.querySelector('.buttons .button.active').classList.remove('active');
                target.classList.add('active');

                if (type === "cheap") {
                    sortByPrice();
                } else if (type === "duration") {
                    sortByDuration();
                }

                renderTable();
            });
        });
    }

    tabs();


    window.updateCount = updateCount;

})();