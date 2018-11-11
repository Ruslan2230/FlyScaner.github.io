(function() {
    function showPlaceholder() {
        const container = document.querySelector('#container');
        const innerBlock = document.querySelector('#no-result');

        innerBlock.classList.remove('hidden');
        container.classList.add('placeholder');
    }

    function hidePlaceholder() {
        const container = document.querySelector('#container');
        const innerBlock = document.querySelector('#no-result');

        innerBlock.classList.add('hidden');
        container.classList.remove('placeholder');
    }


    window.showPlaceholder = showPlaceholder;
    window.hidePlaceholder = hidePlaceholder;
})();