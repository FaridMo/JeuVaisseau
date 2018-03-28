/************************************************/
/**                                             */
/**              FARID-PROJET JS 2015           */
/**                                             */
/***********************************************/

/** placez ici votre code javascript réponse aux questions du sujet de projet */

/** n'oubliez pas de faire précéder le code de vos fonctions
    d'un commentaire documentant la fonction                   **/

// var canvas = $('stars')[0];
// var context = canvas.getContext('2d');

$(function(){ /* DEBUT DU CODE */
    /**
     * Contexte du canvas
     */
    var canvas = $("#stars");
    var context = canvas.get(0).getContext("2d");
    var canvasWidth = canvas.width();
    var canvasHeight = canvas.height();

    var LimiteHaut = 5;
    var LimiteBas = 355;
    /**
     * Variables globales utiles
     */
    var delai = 25;        /* ms */

    /* Position du vaisseau */
    var posX = 48;
    var posY = 180;


    var img = new Image();
    img.src = "images/vaisseau-ballon-petit.png";

    var feu = new Image();
    feu.src="images/feu.png";


    var soucoupe = new Image();
    soucoupe.src = "images/flyingSaucer-petit.png";

    /* KeyCodes */
     var flecheHaut = 38;
     var flecheBas = 40;
     var espace = 32;
     var xmax=970;
     var xmin=770;
     var ymax=356;
     var ymin=10;
     var tirs=[];
     var scps=[];


     function Tirer(x,y) {
       this.x=x;
       this.y=y;
       this.drawTir=function(){
         // context.drawImage(feu,this.x,this.y,10,10);
         context.drawImage(feu,this.x,this.y,10,10);
       }

     }



     window.onload = function() {

    function dessineVaisseau(){
      context.drawImage(img, posX, posY);
    }
    dessineVaisseau();



    /**
     * Evénements sur touches clavier
     * Ils mettent à jour les positions du vaisseau dans le canvas
     */

    $(document).keydown(function(e){
      if(posY>LimiteHaut){
        if (e.keyCode == flecheHaut) {
          context.clearRect(posX,posY,48,39);
          posY-=8;
          context.drawImage(img,posX,posY);
        }
      }
      if(posY<LimiteBas){
        if (e.keyCode == flecheBas) {
          context.clearRect(posX,posY,48,39);
          posY+=8;
          context.drawImage(img,posX,posY);
        }
      }



        if (e.keyCode == 37) {
          context.clearRect(posX,posY,48,39);
          posX-=8;
          context.drawImage(img,posX,posY);
        }


        if (e.keyCode == 39) {
          context.clearRect(posX,posY,48,39);
          posX+=8;
          context.drawImage(img,posX,posY);
        }



      if (e.keyCode == espace) {
        a=posX+48;
        b=posY+10;
        // c=a-10
        // d=b+20
        tirs.push(new Tirer(a,b));

      }
    });

    function incrementationTirs(){
      for(var i=0;i<tirs.length;i++){

        if(tirReussi(tirs[i])!=null){

            scps.splice(scps.indexOf(tirReussi(tirs[i])),1);
            tirs.splice(i,1);
            context.clearRect(tirReussi(tirs[i]).x,tirReussi(tirs[i]).y,48,36);
            context.clearRect(tirs[i].x,tirs[i].y,10,10);

        }

         tirs[i].drawTir();
         context.clearRect(tirs[i].x,tirs[i].y,10,10);
         tirs[i].x=tirs[i].x+8;
         tirs[i].drawTir();
       }

    }

    function Soucoupes(x,y){
      this.x=x;
      this.y=y;
      this.Scpdraw=function(){
      context.drawImage(soucoupe,this.x, this.y);
      }
    }
    function genererScp(){
      x=Math.random()*(xmax-xmin)+xmin;
      y=Math.random()*(ymax-ymin)+ymin;
      scps.push(new Soucoupes(x,y));
      this.blur();
    }
    for(var i=0;i<5;i++){
      genererScp();
    }

    function incrementationScp(){
      for(var i=0;i<scps.length;i++){
         scps[i].Scpdraw();
         context.clearRect(scps[i].x,scps[i].y,48,39);
         scps[i].x=scps[i].x-8;
         scps[i].Scpdraw();
       }
    }

    $("#nouvelleSoucoupe").click(function(e){
      genererScp();
    });

    function collision(a,b){
      var absT=a.x+10;
      var ordT=a.y+10;
      var absS=b.x+48;
      var ordS=b.y+36;
      // if (absT>=b.x && a.x<=absS && ordT>=b.y && a.y<=ordS){
      if(absT>=b.x && a.x<=absS &&
        ordT>=b.y &&a.y<=ordS){
        return true;
      }
      else{
        return false;
      }
    }


    function tirReussi(t){
        for(var i=0;i<scps.length;i++){
          if(collision(t,scps[i])){
            return scps[i];
          }else{
            return null;
          }
        }
      }


    setInterval(incrementationTirs,delai);
    setInterval(incrementationScp,80);



    }

}); /* FIN DU CODE */
