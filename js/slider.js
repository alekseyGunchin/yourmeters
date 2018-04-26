document.addEventListener('DOMContentLoaded', function () {//загрузился контент сработал скрипт
  const wrapper = document.querySelector(".slider-wrap"); // смотровое окно
  const left = document.querySelector(".slider-prev");// кнопка влево
  const right = document.querySelector(".slider-next");// кнопка вправо
  const itemsWrapper = document.getElementById("items");// лента слайдов
  const items = document.querySelectorAll(".item");// сами слайды

  let mainWidth = getComputedStyle(wrapper).width; //ширина слайда и смещение ленты
  let currentIndex = 0; //индекс слайда

  resizer();

  right.addEventListener("click", function () {
    scrollSlide(1);
  });

  left.addEventListener("click", function() {
    scrollSlide(-1);
  });



  function scrollSlide(vector) {
    currentIndex += vector; //обновляем индекс
    
    //делаем проверки
    //1) не больше числа слайдов
    currentIndex = currentIndex <= (items.length-1) ? currentIndex : items.length-1;
    //2) не меньше нуля
    currentIndex = currentIndex >= 0 ? currentIndex : 0;

    

    //изменяем смещение ленты
    itemsWrapper.style.marginLeft = -currentIndex * parseInt(mainWidth) + "px";
 
  }

  function resizer() {
    mainWidth = getComputedStyle(wrapper).width; // обновление ширины/смещения

    for (var i = 0; i < items.length; i++) {
      items[i].style.width = mainWidth;//обновление слайдов
    }

    scrollSlide(0);//изменение положения ленты
  }

  window.addEventListener('resize', resizer); //обновление параметров при изменении размера окна



  //mobile
  let point = 0; //положение начала касания

  wrapper.addEventListener('touchstart', function(e){//нало касания
    let touchobj = e.changedTouches[0]; // первая точка прикосновения
    point = touchobj.clientX; //составляющая по иксу
  }, false);

  wrapper.addEventListener('touchend', function(e){// отпустили экран
    let touchobj = e.changedTouches[0]; // первая точка отпускания


    if (point+30<touchobj.clientX) { // более 30 по горизонтали
      e.preventDefault();
      scrollSlide(-1);//обновление ленты влево
    } else if(point-30>touchobj.clientX) {
      e.preventDefault();
      scrollSlide(1); //обновление ленты в право
    }

  }, false)

}, false);


