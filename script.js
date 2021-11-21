
let tetris = document.createElement('div');
tetris.classList.add('tetris');

for (let i=1; i<181; i++) {
    let excel = document.createElement('div');
    /* Метод createElement позволяет создать новый элемент, передав в параметре имя тега. 
    После создания с элементом можно работать как с обычным элементом, 
    а также его можно добавить на страницу методами prepend, append, appendChild, insertBefore или insertAdjacentElement. */
    excel.classList.add('excel');
    /* Свойство classList возвращает псевдомассив DOMTokenList, содержащий все классы элемента. */
    tetris.appendChild(excel);
    /* Метод appendChild позволяет вставить в конец какого-либо другой элемент. 
    Чаще всего используется после создания элемента с помощью createElement. */
}

/* получим main */
let main = document.getElementsByClassName('main')[0]; /* #эл-та в массиве(даже если1 на стр.) */
main.appendChild(tetris);

let excel = document.getElementsByClassName('excel');
let i = 0;

for (let y=18; y>0; y--) {
    for (let x=1; x<11; x++) {
        excel[i].setAttribute('posX', x);
        excel[i].setAttribute('posY', y);
        i++;
    }
}

let x = 5, y = 10;
let mainArr = [
    //палка
    [
        [0, 1],
        [0, 2],
        [0, 3]
    ],
    //квадрат
    [
        [1, 0],
        [0, 1],
        [1, 1]
    ]
]

let currentFigure = 0;
let figureBody = 0;

function create() {
    function getRandom() {
        /* return Math.round(Math.random());  */
        return Math.round(Math.random()*(mainArr.length-1));
    }
    currentFigure = getRandom();//номер фигуры в массиве
    figureBody = [
        document.querySelector(`[posX = "${x}"][posY = "${y}"]`),//шаблоны строк (интерполяция).
        /*querySelector возвращает первый элемент (Element) документа, который соответствует указанному селектору или группе селекторов. */
        document.querySelector(`[posX = "${x + mainArr[currentFigure][0][0]}"][posY = "${y + mainArr[currentFigure][0][1]}"]`),
        document.querySelector(`[posX = "${x + mainArr[currentFigure][1][0]}"][posY = "${y + mainArr[currentFigure][1][1]}"]`),
        document.querySelector(`[posX = "${x + mainArr[currentFigure][2][0]}"][posY = "${y + mainArr[currentFigure][2][1]}"]`),
    ]
    for (let i=0; i<figureBody.length; i++) {
        figureBody[i].classList.add('figure');
    }
}
create();