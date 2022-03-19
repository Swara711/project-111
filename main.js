Webcam.set({
    width: 350,
    height: 350,
    image_format: "png",
    png_quality: 50
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri) { document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>'; });
}

console.log('ml5.version: ', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/vnF5IsmEb/model.json");

function modelLoaded() {
    console.log("Model Loaded! ");
}
function check() { 
img = document.getElementById('captured_image'); 
classifier.classify(img, gotResult); 
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;
        gesture = results[0].label;
        toSpeak = "";
        if (gesture == "Amazing") {
            toSpeak = "this is looking amazing";
            document.getElementById("result_object_gesture_icon").innerHTML = "&#128076;";
        } else if (gesture == "Victory") {
            toSpeak = "That was a marvelous victory";
            document.getElementById("result_object_gesture_icon").innerHTML = "&#9996;";
        } else if (gesture == "All the best") {
            toSpeak = "All the best";
            document.getElementById("result_object_gesture_icon").innerHTML = "&#128077;";
        }
        speak();
    }
}
function speak() {
    var synth = window.SpeechSynthesis;
    speak_data = toSpeak;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
