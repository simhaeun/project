function random(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size){
    gsap.to(selector, random(1.2,1.5), {
        y: size,
        repeat: -1,
        yoyo: true,
        ease: Power1.easeInOut,
        delay: random(0,delay)
    })
}

floatingObject('.floating1', 1.2, 25)
floatingObject('.floating3', 1.8, 20)






const content = "꼼꼼하게 빈 틈을 채워나가는 개발자."
const text = document.querySelector('.text')
let i = 0;

function typing(){
    let txt = content[i++];
    text.innerHTML += txt;
    if (i > content.length) {
        text.textContent = "";
        i = 0;
    }
}
setInterval(typing, 250)




// scrollTop
const scrollTop = document.querySelector('.scroll-top');
scrollTop.addEventListener('click', (e) =>{
    e.preventDefault();
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
})