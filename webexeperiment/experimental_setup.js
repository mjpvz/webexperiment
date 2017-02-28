/*
This script is intented to work as a framework for a webexperiment. 
Het is bedoeld om mensen via een webpage stimuli(in dit geval afbeeldingen) te laten zien, en ze daar vragen over te stellen.

De mensen worden uiteindelijk de webpagine aangeboden via Amazon Mechanical Turk. 


De HTML is devided door een left_wrapper en een right_wrapper. 

  In the left_wrapper wordt er tekst en forms aangeboeden waarin uitleg staat en de vragen. 

  In the right_wrapper wordt de stimuli afgebeeld, en de segmentation task. 

  Voor de segmentation tasks wordt een proefpersoon gevraagd om een matriaal/object 'uit te knippen' door op 
  de randen van een matriaal te clicken. Op de click locaties komt een visual indicator, connected met lines, 
  De [x,y] waardes relatief aan de top-left corner van de image worden dan opgeslagen. 
  */



// Variable declaration
var curTrial = -1;
var viewport_vh = 0.98;
var viewport_vw = 0.72;
var trialnum = curTrial;
var clicks = [];
var margin = 15;


//temporarty way to acces stimuli, just for testing. This should refer to a server later on. 
var stimuli = ['https://upload.wikimedia.org/wikipedia/commons/4/4e/Pleiades_large.jpg', // this image is to large, resize testing
              'http://www.getty.edu/museum/media/images/web/enlarge/00066001.jpg',
              'http://www.getty.edu/museum/media/images/web/enlarge/00055301.jpg',
              'http://www.getty.edu/museum/media/images/web/enlarge/00066301.jpg',
              'http://www.getty.edu/museum/media/images/web/enlarge/00066001.jpg',
              'http://www.getty.edu/museum/media/images/web/enlarge/00055301.jpg',
              'http://www.getty.edu/museum/media/images/web/enlarge/00066301.jpg',
              'http://www.getty.edu/museum/media/images/web/enlarge/00066001.jpg',
              'http://www.getty.edu/museum/media/images/web/enlarge/00055301.jpg',
              'http://www.getty.edu/museum/media/images/web/enlarge/00066301.jpg']
  


/* Start the experiment.
Remove the instructions, and show the first ShowBetweenTrials screen*/
function startexperiment() {
  var element = document.getElementById('instructions');
  element.parentNode.removeChild(element);
  ShowBetweenTrials(1)
}

// This is shown between every trial
function ShowBetweenTrials(firstCall) {
    // If it's the first time this funciton is called, that means that trialholder 
    // does not exist yet, and thus cant be removed either.
  if (firstCall != 1) {
    returnData()
    delElement('trialholder')
    delElement('image_holder')

    // var element = document.getElementById('trialholder'); // deze manier van #trialholder verwijderen doe ik vaker, dus wou
    //                                                       // hier een functie voor maken, maar dat werkte het niet. Ik denk
    //                                                       // dat het iets te maken heeft met dat ik verkeerd het element door geef. 
    // element.parentNode.removeChild(element);              // maar nu werkt het wel. nu snap ik niet meer waarom het niet werkte haha
    // var element = document.getElementById('image_holder');
    // element.parentNode.removeChild(element);
  }
 $('#left_wrapper').append(`
  <div id="betweentrials" style="margin:${margin}px">
      <p>Continue to the next trial</p>
      <button id="next"type="button" onclick="RunTrial()">Submit</button> 
      <p> Trial ${trialnum+1} of ${stimuli.length} </p>
  </div>
    `) }


function increase(x) {
    x++;
    return x;
  }


 function RunTrial() {
   delElement('betweentrials')
   Trial();
}


function returnData() {  // so far it doesn't really return much usefulldata. 
    form_data_holder = $(`#trialholder`);
    var a = form_data_holder
    //console.log(a)
}


function Trial() {
   /*The trial it self. Consists of two parts; 
        1) the stimuli that is presented in #right_wrapper,
        2) the questions/task that are presented in the left_wrapper */

	curTrial = increase(curTrial);

   // Code to contain the stimuli
   $('#right_wrapper').append(`
    <div id="image_holder">
      <img id="image" onload="resize_image()" onclick="Coords(event)" align="middle">
    </div>`)   
    document.getElementById('image').src = stimuli[curTrial];

    // This holds the questions/tasks that will be asked/explained 
    $('#left_wrapper').append(`  
    <div id="trialholder" style="margin:${margin}px">
        <form>
            Question 1:<br>
            <input type="text" name="firstname" value="answer"><br>
            Question 2:<br>
            <input type="text" name="lastname" value="answer">
            <br><br>
            <button id="continue" type="button" onclick="ShowBetweenTrials()"> Continue </button>
        </form>
      </div>`)
        }
      

 // I'll probably won't actually be using this function anymore.  Shame because it used some (supercomplicatd high-level) math. 
 function resize_image(targetImage) {
      var targetImage = document.getElementById('image'); 
      // present the image at the desired size
      var targetImageHeight = targetImage.height;// image
      var targetImageWidth = targetImage.width; //

      var windowHeight = $(image_holder).height()
      var windowWidth = $(image_holder).width()
 
      var ratio = Math.min(windowWidth / targetImageWidth, windowHeight / targetImageHeight);

     if (ratio < 1) {
        console.log('resizing')
        targetImageHeight = targetImageHeight*ratio;
        targetImageWidth = targetImageWidth*ratio;
        targetImage.style.width = `${targetImageWidth}px`;
        targetImage.style.height= `${targetImageHeight}px`;
      }
      else { //no resize required
      } }


// Still a work in progress. 
function Coords(event) {
    var x = event.clientX;
    var y = event.clientY;

    // Create a new div which holds only a o. 
    $('#image_holder').append(`<div id="x${clicks.length}" style="color:red">o</div>`) // this places an o, using click location as top-left. 
                                                                                       // I want the click location to be the center. 

    var circleAtClickLocation = document.getElementById(`x${clicks.length}`);
    circleAtClickLocation.style.position = "absolute";
    circleAtClickLocation.style.left = x+'px';
    circleAtClickLocation.style.top = y+'px';
    clickCoordinates = [x,y]

    if(clicks.length > 2) { //werkt nog niet, placeholder-ish
      var x_1 = clicks[clicks.length-2][0]
      var x_2 = clicks[clicks.length-1][0]
      var y_1 = clicks[clicks.length-2][1]
      var y_2 = clicks[clicks.length-1][1]

      // now draw a thing line from x_1,y_1 to x_1,y_2 (The line is purely for cosmetic reaons in the UI)
    } }
  

  function delElement(image_holder) { 
    var element = document.getElementById(image_holder);
    element.parentNode.removeChild(element);
  }