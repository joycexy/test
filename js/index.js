var div = document.getElementById('advertise');
var ul = document.getElementById('ad-imgs');
var lis = document.getElementById('ad-imgs').getElementsByTagName('li');
var leftbtn=document.getElementById('left');
var rightbtn=document.getElementById('right');
var ol=document.getElementsByTagName('ol')[0];
var liWidth = ul.children[0].offsetWidth;
var count = 0;

var timeId = null;

for(var i=0;i<lis.length;i++){
    var li=document.createElement('li');
    ol.appendChild(li);
    li.setAttribute('id',i);
    li.onmouseover=function () {
        for(var j=0;j<ol.children.length;j++){
            ol.children[j].removeAttribute('class');
        }
        this.className='current';
        count=this.getAttribute('id');
        move(ul,-count*liWidth);
    }
}
ol.children[0].className='current';


ul.appendChild(ul.children[0].cloneNode(true));

var timeId = setInterval(animate, 3000);

div.onmouseout=function () {
        timeId=setInterval(animate,3000);

}

div.onmouseover=function () {
    clearInterval(timeId);
}

function animate() {
    count++;
    for(var j=0;j<ol.children.length;j++){
        ol.children[j].removeAttribute('class');
    }

    if (count > lis.length - 1) {
        ul.style.left = 0;
        count = 1;
    }
    if(count==lis.length-1){
        ol.children[0].className = 'current';
    }else{
        ol.children[count].className='current';
    }

    move(ul, -count * liWidth);
}

function move(e, target) {
    clearInterval(e.timeId);
    var speed = e.offsetLeft< target ? 10 : -10;
    e.timeId = setInterval(function () {
        var result = target - e.offsetLeft;
        if (Math.abs(result) <= Math.abs(speed)) {
            clearInterval(e.timeId);
            e.style.left = target + 'px';
        }
        else
            e.style.left=e.offsetLeft+speed+'px';
    }, 20)
}


function getStyle(element, stylename) {
    if (element.currentStyle) {
        return element.currentStyle[stylename];
    } else if (getComputedStyle(element, false)) {
        return element.getComputedStyle(element, false)[stylename];
    }
}

leftbtn.onclick=function () {
    if(count==lis.length-1){
        ul.style.left=0+'px';
        count=0;
    }
    count++;
    for(var j=0;j<ol.children.length;j++){
        ol.children[j].removeAttribute('class');
    }
    if(count==ol.children.length) {
        ol.children[0].className = 'current';
    }else {
        ol.children[count].className = 'current';
    }
    move(ul, -count * liWidth);
}

rightbtn.onclick=function () {
    if (count==0) {
        count = lis.length - 1;
        ul.style.left=-count*liWidth+'px';
    }
    count--;

    for(var j=0;j<ol.children.length;j++){
        ol.children[j].removeAttribute('class');
    }
    ol.children[count].className='current';

    move(ul, -count * liWidth);
}