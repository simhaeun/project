const imgWrap = document.querySelectorAll('.img_wrap');
const imgBox = document.querySelectorAll('.box');
const aLink = document.querySelectorAll('.img_cont a');

let windowSize;
let windowHeight;
let elems;

windowSize = innerWidth;
windowHeight = innerHeight;

window.onload = function(){
    imgWrap.forEach((el, i) => {
        let h = 0;

        if(window.scrollY >= 0 && window.scrollY < (innerHeight * 0.5)){
            h = window.scrollY + innerHeight;
        } else {
            h = window.scrollY - (innerHeight * 0.5);
        }

        if(el.getBoundingClientRect().top < h){
            // console.log(el)
            setTimeout(() => {
                el.classList.add('on');
            }, 500);
            imgBox[i].classList.add('on');
        }
    })
}

for (let i = 0; i < imgWrap.length; i++){
    imgWrap[i].setAttribute('data-index',i);
}

window.addEventListener('scroll', () => {
    imgEvent();
});

function imgEvent(){
    const totalHeight = document.body.clientHeight - windowHeight;
    let scrollPer = (scrollY / totalHeight) * 500;

    for(let i = 0; i < imgWrap.length; i++){
        let top = imgWrap[i].getBoundingClientRect().top;

        if(top < windowHeight * 1.1){
            setTimeout(() => {
                imgWrap[i].classList.add('on');
            }, 500);

            imgBox[i].classList.add('on');

            if(windowSize > 1209){
                if((i + 1) % 2 == 0){
                    aLink[i].style.transform = `translateY(-${scrollPer}px)`;
                }
            }
        }                
    }
}

window.addEventListener('resize', () => {
    windowSize = innerWidth;
    windowHeight = innerHeight;
});