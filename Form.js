class Form{
    constructor(x,y){
        this.title=createElement('h1')
        this.input=createInput("").attribute("placeholder","Enter Your Name");
        this.button=createButton('Next');
    }

    display(){
        background("red");
        
        this.title.html("ASTROID MINING");
        this.title.position(300,200);
        this.input.position(300,300);
        this.button.position(300,400);

        fill("black");
        textSize(15);
        text("NOTE: Click On Next Button Only When You Enter Your Name",300,350);

        this.button.mousePressed(()=>{
            gameState=1;
            level=1;
            this.title.hide();
            this.input.hide();
            this.button.hide();
            //start.visible=true;
        })
    

    }
}