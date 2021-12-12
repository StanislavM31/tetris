
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
main.appendChild(tetris); //appendChild (tetris) вставляет в класс main
let excel = document.getElementsByClassName('excel');
let i = 0;

for (let y=18; y>0; y--) {
    for (let x=1; x<11; x++) {
        excel[i].setAttribute('posX', x);
        excel[i].setAttribute('posY', y);
        i++;
    }
}

/* let x = 5, y = 10; */
let x = 5, y = 15; //за пределами поля
let mainArr = [
    //палка
    [
        [0, 1],
        [0, 2],
        [0, 3],
        //rotate 90
        [
            [-1, 1],
            [0, 0],
            [1, -1],
            [2, -2]
        ],
        //rotate 180
        [
            [1, -1],
            [0, 0],
            [-1, 1],
            [-2, 2]
        ],
        //rotate 90
        [
            [-1, 1],
            [0, 0],
            [1, -1],
            [2, -2]
        ],
        //rotate 180
        [
            [1, -1],
            [0, 0],
            [-1, 1],
            [-2, 2]
        ],
        
    ],
    //квадрат~
    [
        [1, 0],
        [0, 1],
        [1, 1],
        //rotate 90
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ],
        //rotate 180
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ],
        //rotate 270
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ],
        //rotate 360
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ],
    ],
    // L
    [
        [1, 0],
        [0, 1],
        [0, 2],        
        //rotate 90
        [
            [0, 0],
            [-1, 1],
            [1, 0],
            [2, -1]
        ],
        //rotate 180
        [
            [1, -1],
            [1, -1],
            [-1, 0],
            [-1, 0]
        ],
        //rotate 270
        [
            [-1, 0],
            [0, -1],
            [2, -2],
            [1, -1]
        ],
        //rotate 360
        [
            [0, -1],
            [0, -1],
            [-2, 0],
            [-2, 0]
        ],
    ],
    //зеркальная L
    [
        [1, 0],
        [1, 1],
        [1, 2],
        //rotate 90
        [
            [0, 0],
            [0, 0],
            [1, -1],
            [-1, -1]
        ],
        //rotate 180
        [
            [0, -1],
            [-1, 0],
            [-2, 1],
            [1, 0]
        ],
        //rotate 270
        [
            [2, 0],
            [0, 0],
            [1, -1],
            [1, -1]
        ],
        //rotate 360
        [
            [-2, 0],
            [1, -1],
            [0, 0],
            [-1, 1]
        ],
    ],
    //молния вправо
    [
        [1, 0],
        [-1, 1],
        [0, 1],
         //rotate 90
         [
            [0, -1],
            [-1, 0],
            [2, -1],
            [1, 0]
        ],
        //rotate 180
        [
            [0, 0],
            [1, -1],
            [-2, 0],
            [-1, -1],
        ],
        //rotate 270
        [
            [0, -1],
            [-1, 0],
            [2, -1],
            [1, 0],
        ],
        //rotate 360
        [
            [0, 0],
            [1, -1],
            [-2, 0],
            [-1, -1]
        ],
    ],
    //молния влево
    [
        [1, 0],
        [1, 1],
        [2, 1],
        //rotate 90
        [
            [2, -1],
            [0, 0],
            [1, -1],
            [-1, 0]
        ],
        //rotate 180
        [
            [-2, 0],
            [0, -1],
            [-1, 0],
            [1, -1]
        ],
        //rotate 270
        [
            [2, -1],
            [0, 0],
            [1, -1],
            [-1, 0]
        ],
        //rotate 360
        [
            [-2, 0],
            [0, -1],
            [-1, 0],
            [1, -1]
        ],
    ],
    //лего
    [
        [1, 0],
        [2, 0],
        [1, 1],
        //rotate 90
        [
            [1, -1],
            [0, 0],
            [0, 0],
            [0, 0]
        ],
        //rotate 180
        [
            [0, 0],
            [-1, 0],
            [-1, 0],
            [1, -1]
        ],
        //rotate 270
        [
            [1, -1],
            [1, -1],
            [1, -1],
            [0, 0]
        ],
        //rotate 360
        [
            [-2, 0],
            [0, -1],
            [0, -1],
            [-1, -1]
        ],
    ],
]

let currentFigure = 0;
let figureBody = 0;
let rotate = 1;


function create() {
    function getRandom() {
        /* return Math.round(Math.random());  */
        return Math.round(Math.random()*(mainArr.length-1));
    }

    rotate = 1;
    currentFigure = getRandom();//номер фигуры в массиве

    figureBody = [
        document.querySelector(`[posX = "${x}"][posY = "${y}"]`), /*шаблоны строк (интерполяция).
        querySelector возвращает первый элемент (Element) документа, который соответствует указанному селектору или группе селекторов. */
        document.querySelector(`[posX = "${x + mainArr[currentFigure][0][0]}"][posY = "${y + mainArr[currentFigure][0][1]}"]`),
        document.querySelector(`[posX = "${x + mainArr[currentFigure][1][0]}"][posY = "${y + mainArr[currentFigure][1][1]}"]`),
        document.querySelector(`[posX = "${x + mainArr[currentFigure][2][0]}"][posY = "${y + mainArr[currentFigure][2][1]}"]`),
    ]
    for (let i=0; i<figureBody.length; i++) {
        figureBody[i].classList.add('figure');
    }
}

    create();

    let score = 0;
    let input = document.getElementsByTagName('input')[0];
    input.value = `Ваши очки: ${score}`;
 
function move() {
    let moveFlag = true;
    
    coordinates = [
        [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
        [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
        [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
        [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')],
    ];
    for (let i=0; i<coordinates.length; i++) {
        if (coordinates[i][1] == 1 || document.querySelector(`[posX = "${coordinates[i][0]}"][posY = "${coordinates[i][1] - 1}"]`).classList.contains('set')) {
                moveFlag = false;
                break;
            }
        }
        
        if (moveFlag) {
            for (let i = 0; i<figureBody.length; i++) {
                figureBody[i].classList.remove('figure');
            }
            figureBody = [
                document.querySelector(`[posX = "${coordinates[0][0]}"][posY = "${coordinates[0][1] - 1}"]`),
                document.querySelector(`[posX = "${coordinates[1][0]}"][posY = "${coordinates[1][1] - 1}"]`),
                document.querySelector(`[posX = "${coordinates[2][0]}"][posY = "${coordinates[2][1] - 1}"]`),
                document.querySelector(`[posX = "${coordinates[3][0]}"][posY = "${coordinates[3][1] - 1}"]`),
                
            ];
            for (let i=0; i<figureBody.length; i++) {
                figureBody[i].classList.add('figure');
            }
        } else {
            for (let i = 0; i<figureBody.length; i++) {
                figureBody[i].classList.remove('figure');
                figureBody[i].classList.add('set');
            }
            for (let i = 1; i<15; i++){
                let count = 0;
                for(let k = 1; k < 11; k++) {
                    if(document.querySelector(`[posX = "${k}"][posY = "${i}"]`).classList.contains('set')) {
                        count++;
                        if (count == 10) {
                            score += 10;
                            input.value = `Ваши очки:${score}`;
                            for (let j = 1; j < 11; j++) {
                                document.querySelector(`[posX = "${j}"][posY = "${i}"]`).classList.remove('set')
                            }
                            let set = document.querySelectorAll('.set');
                            let newSet = [];
                            for (let s = 0; s<set.length; s++) {
                                let setCoordinates = [set[s].getAttribute('posX'), set[s].getAttribute('posY')];
                                if( setCoordinates[1]>i){
                                    set[s].classList.remove('set');
                                    newSet.push(document.querySelector(`[posX = "${setCoordinates[0]}"][posY = "${setCoordinates[1] - 1}"]`));
                                }
                            }
                            for (let a = 0; a<newSet.length; a++) {
                                newSet[a].classList.add('set');
                            }
                            i--;
                        }
                    }
                }
            }
            for (let n=1; n<11; n++) { //если хоть одна ячейка из 15го ряда имеет класс set - game over
                if(document.querySelector(`[posX = "${n}"][posY = "15"]`).classList.contains('set')) {
                    clearInterval(interval);
                    alert(`Game over. Your score:${score}`);
                    break;
                }
            }
            create();
        }
    
}

    let interval = setInterval(() => {
        move();
    }, 1000);
    
    let flag=true;

  window.addEventListener('keydown', function (e){
      let coordinates1 = [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')];
      let coordinates2 = [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')];
      let coordinates3 = [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')];
      let coordinates4 = [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')];

      function getNewState(a) {

        flag = true;

        let figureNew = [
            document.querySelector(`[posX = "${+coordinates1[0] + a}"][posY = "${coordinates1[1]}"]`),
            document.querySelector(`[posX = "${+coordinates2[0] + a}"][posY = "${coordinates2[1]}"]`),
            document.querySelector(`[posX = "${+coordinates3[0] + a}"][posY = "${coordinates3[1]}"]`),
            document.querySelector(`[posX = "${+coordinates4[0] + a}"][posY = "${coordinates4[1]}"]`),
        ];
          for ( let i = 0; i<figureNew.length; i++) {
              if (!figureNew[i] || figureNew[i].classList.contains('set')) {
                  flag = false;
              }
          }

          if (flag == true) {
            for (let i = 0; i<figureBody.length; i++) {
                figureBody[i].classList.remove('figure');
            }
            figureBody = figureNew;

            for(let i=0; i<figureBody.length; i++) {
                figureBody[i].classList.add('figure');
            }
          }
      }
      if (e.keyCode == 37) {
          getNewState(-1);
      } else if (e.keyCode == 39) {
          getNewState(1);
      } else if (e.keyCode == 40) {
          move();
      } else if (e.keyCode == 38) {
        flag = true;

        let figureNew = [
            document.querySelector(`[posX = "${+coordinates1[0] + mainArr[currentFigure][rotate + 2][0][0]}"][posY = "${+coordinates1[1] + mainArr[currentFigure][rotate+2][0][1]}"]`),
            document.querySelector(`[posX = "${+coordinates2[0] + mainArr[currentFigure][rotate + 2][1][0]}"][posY = "${+coordinates2[1] + mainArr[currentFigure][rotate+2][1][1]}"]`),
            document.querySelector(`[posX = "${+coordinates3[0] + mainArr[currentFigure][rotate + 2][2][0]}"][posY = "${+coordinates3[1] + mainArr[currentFigure][rotate+2][2][1]}"]`),
            document.querySelector(`[posX = "${+coordinates4[0] + mainArr[currentFigure][rotate + 2][3][0]}"][posY = "${+coordinates4[1] + mainArr[currentFigure][rotate+2][3][1]}"]`),
        ];
        for ( let i = 0; i<figureNew.length; i++) {
            if (!figureNew[i] || figureNew[i].classList.contains('set')) {
                flag = false;
            }
        }

        if (flag == true) {
            for (let i = 0; i<figureBody.length; i++) {
                figureBody[i].classList.remove('figure');
            }
            figureBody = figureNew;

            for(let i=0; i<figureBody.length; i++) {
                figureBody[i].classList.add('figure');
            }

            if (rotate < 4) {
                rotate++;
            }
            else {
                rotate = 1;
            }
          }
      }


  })