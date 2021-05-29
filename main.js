music1 = "";
music2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftScore = 0;
statusLeft = "";
rightScore = 0;
statusRight = "";
function preload(){
    music1 = loadSound("music.mp3");
    music2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600,600);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log("Model Loaded!");
}
function draw(){
    image(video, 0, 0, 600, 600);
    fill("#F50000");
    stroke("#F50000");

    statusLeft = music1.isPlaying();
    if(leftScore > 0.2){
        circle(leftWristX, leftWristY,20);
        music2.stop();
        if(statusLeft = false){
            music1.play();
            document.getElementById("songName").innerHTML = "Song Name: Harry Potter Theme Song";
        }
    }
    statusRight = music2.isPlaying;
    if(rightScore>0.2){
        circle(rightWristX, rightWristY, 20);
        music1.stop();
        if(statusRight = false){
            music2.play();
            document.getElementById("songName").innerHTML = "Song Name: Peter Pan";
        }
    }
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        leftScore = Math.floor(results[0].pose.leftWrist.confidence);
        rightScore = Math.floor(results[0].pose.rightWrist.confidence);
    }
}
