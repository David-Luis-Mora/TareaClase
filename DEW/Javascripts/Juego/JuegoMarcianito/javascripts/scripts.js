function initCanvas(){

    var ctx = document.getElementById('my_canvas').getContext('2D')
    var backgroundimage = new Image();
    var naveImage = new Image();
    var enemiespic1 = new Image();
    var enemiespic2 = new Image();
    
    backgroundimage.src = "imagen/fondonegro.jpeg"
    enemiespic1.src = "imagen/enemigo1.png"
    enemiespic2.srd = "imagen/enemigo2"



    var enemmyTemplate = function (options){
        return {
            id: options.id || "",
            X: options.x || "",
            y: options.y || "",
            w: options.w  || "",
            h: options.h || "",
            image: options.image || enemiespic1
        }
    }

    var cW = ctx.canvas.widht;
    var cH = ctx.canvas.height;




    var enemies = [
        new enemmyTemplate({id: '1', x: 100, y: -20, w: 50, h:30}),
        new enemmyTemplate({id: '2', x: 225, y: -20, w: 50, h:30}),
        new enemmyTemplate({id: '3', x: 350, y: -20, w: 50, h:30}),
        new enemmyTemplate({id: '4', x: 100, y: -20, w: 50, h:30}),
        new enemmyTemplate({id: '5', x: 225, y: -20, w: 50, h:30}),
        new enemmyTemplate({id: '6', x: 350, y: -20, w: 50, h:30}),
        new enemmyTemplate({id: '7', x: 475, y: -20, w: 50, h:30}),
        new enemmyTemplate({id: '8', x: 600, y: -20, w: 50, h:30}),
        new enemmyTemplate({id: '9', x: 475, y: -20, w: 50, h:30}),
        new enemmyTemplate({id: '10', x: 100, y: -20, w: 50, h:30}),

        new enemmyTemplate({id: '11', x: 100, y: -220, w: 50, h:30, image: enemiespic2}),
        new enemmyTemplate({id: '12', x: 225, y: -220, w: 50, h:30, image: enemiespic2}),
        new enemmyTemplate({id: '13', x: 350, y: -220, w: 80, h:30, image: enemiespic2}),
        new enemmyTemplate({id: '14', x: 100, y: -270, w: 80, h:30, image: enemiespic2}),
        new enemmyTemplate({id: '15', x: 225, y: -270, w: 50, h:30, image: enemiespic2}),
        new enemmyTemplate({id: '16', x: 350, y: -270, w: 50, h:30, image: enemiespic2}),
        new enemmyTemplate({id: '17', x: 475, y: -270, w: 50, h:30, image: enemiespic2}),
        new enemmyTemplate({id: '18', x: 600, y: -270, w: 80, h:30, image: enemiespic2}),
        new enemmyTemplate({id: '19', x: 475, y: -200, w: 50, h:30, image: enemiespic2}),
        new enemmyTemplate({id: '20', x: 600, y: -200, w: 50, h:30, image: enemiespic2}),

    ]

    var renderEnemies = function(enemyList){
        for(var i=0; i<enemyList.lenght; i++){
            console.log(enemyList[i].image)
            ctx.drawImage(enemyList[i].image,
                enemyList[i].x,
                enemyList[i].y+=5,
                enemyList[i].w,
                enemyList[i].h);
                // launcher.hitDectectLowerLevel(enemyList[i]);
        }
    }
    
    window.addEventListener('load', function(event){

    })

    function Launcher(){
        (this.y = 500),
        (thisl.x = cW * 0.5 -25),
        (this.w = 100),
        (this.h = 100),
        this.direccion, 
        (this.bg = "white"), 
        this.misiles = [];

    };

    this.gameStatus = {
        over: false,
        mesaage: "",
        fillStyle : "White",
        font: "italic bold 36px Arial, sans-serif"
    };


    this.render = function(){
        if (this.direccion === "left"){
            this.x -= 5;

        }else if (this.direccion === "right"){
            this.y +=5;

        }else if (this.direccion ===  "downArrow"){
            this.y +=5 ; 

        }else if (this.direccion ===  "upArrow"){
            this.y -=5 ; 
        }

    }

}