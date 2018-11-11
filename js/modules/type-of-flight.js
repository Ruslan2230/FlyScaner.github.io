(function() {
    const container = document.querySelector('#type-flight');
    let activeIndex = 1;

    function setTwoWays() {
        setActiveState(0);
    }

    function setActiveState(index) { // TODO: remove classes from previus state
        const field = container.querySelectorAll('.field')[index];
        const radioInput = field.querySelector('input[type=radio]');
        const radioItem = field.querySelector('.radio');

        if(index === 0) {
            document.querySelector('#date-range-end').classList.remove('disabled');
        } else if(index === 1) {
            document.querySelector('#date-range-end').classList.add('disabled');
        }

        radioInput.click();
        radioItem.classList.add('checked');
    }

    function attachEvents(items) {
        items.forEach((item, index) => {
            item.addEventListener('click', e => {
                setActiveState(index);
            });
        });
    }

    function init(index) {
        const labels = container.querySelectorAll('.field label');

        setActiveState(index);
        attachEvents(labels);
    }

    init(activeIndex);

    window.setTwoWays = setTwoWays;

})(); // IIFE