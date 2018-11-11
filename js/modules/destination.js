(function() {
    const container = document.querySelector("#input-to .dropdown");
    let currentIndex = 0;
    let isInit = false;
    let data = {};
  
    function close() {
      const menu = container.querySelector(".menu");
  
      container.classList.remove("active");
      menu.classList.remove("transition");
      menu.classList.remove("visible");
    }
    
    function updateCurrentItem(name) {
      const currentItem = container.querySelector('.text');
  
      currentItem.innerHTML = '';

      currentItem.classList.remove('default');
  
      let item = document.createElement("div");
      item.className = "item";
      item.innerText = name;
  
      currentItem.appendChild(item);
    }
  
    function renderItems() {
      const menu = container.querySelector('.menu');
      menu.innerHTML = '';

      data.forEach(function({
        PlaceName,
        CityId,
        PlaceId
      }, index) {
        const menu = container.querySelector(".menu");
  
        let item = document.createElement("div");
        item.className = "item";
        item.setAttribute("data-value", CityId.toLocaleLowerCase());
        item.innerText = PlaceName + " (" + PlaceId + ")";
  
        if(index === 0) {
          item.classList.add("selected");
        }
  
        let icon = document.createElement("i");
        icon.className = "icon plane";
  
        item.insertBefore(icon, item.firstChild);
  
        item.addEventListener("click", function() {
          let selectedItem = container.querySelector(".item.selected");
  
          selectedItem.classList.remove("selected");
  
          this.classList.add("selected");
  
          currentIndex = index;
  
          updateCurrentItem(PlaceName);
  
          close();
        }, true);
  
        menu.appendChild(item);
      });
  
    }
  
    function loadData() {
      container.classList.add("loading");
  
      api.getDestination(function(response) {
        data = response;
  
        container.classList.remove("loading");
  
        renderItems();
      });
  
      isInit = true;
    }
  
    // Open list
  
    container.addEventListener("click", function() {
      let menu = container.querySelector(".menu");
  
      container.classList.add("active");
      menu.classList.add("transition");
      menu.classList.add("visible");
  
      if (!isInit) {
          loadData();
      }
    }, true);
  
    // 1.2.d
    document.addEventListener("click", function(event) {
      let targetElement = event.target;
  
      do {
          if (targetElement === container) {
              return;
          }
          targetElement = targetElement.parentNode;
      } while (targetElement);
  
      close();
    });
  
    function getDestinationData() {
      return data;
    }

    function getDestinationKey() {
        return data.length > 0 ? data[currentIndex].PlaceName : null;
    }

    function getDestinationId() {
        // return data.length > 0 ? data[currentIndex].CityId : null;
        return 'buda';
    }

    function getCurrentIndexDest() {
      return currentIndex;
    }

    function updateDestination(key, collection, index) {
      currentIndex = index;
      data = collection;

      updateCurrentItem(key);
      renderItems();
    }

    window.getDestinationData = getDestinationData;
    window.getDestinationKey = getDestinationKey;
    window.updateDestination = updateDestination;
    window.getCurrentIndexDest = getCurrentIndexDest;
    window.getDestinationId = getDestinationId;
  
  })();