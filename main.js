status="";
img="";
object=[];
function preload(){
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(380,380);
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting objects";
}
function modelLoaded(){
    console.log("model loaded!!");
    status=true;
}
function gotResults(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    object=results;
}


function draw(){
    image(video,0,0,380,380);

    if(status!=""){
        objectDetector.detect(video,gotResults);
        r= random(250);
        g= random(250);
        b= random(250);
        for(i=0;i<object.length; i++){
            document.getElementById("status").innerHTML="Status: Object Detected";
            document.getElementById("object_number_dector").innerHTML="Number of object detected :"+object.length;
            fill(r,g,b);
            percentage=floor(object[i].confidence * 100);
            text(object[i].label+" "+percentage+"%",object[i].x,object[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);

        }
    }



}