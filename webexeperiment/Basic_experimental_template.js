/*
This script is intented to work as a framework for a webexperiment. It works wih basic_index.html.

De HTML is devided with a left_warpper and a right_wrapper. 

The left_wrapper holds text, questions and instructions 
In the right_wrapper stimuli are presented and possible tasks can be performed. 
*/




// Variable declaration
var curTrial = -1;
var viewport_vh = 0.98;
var viewport_vw = 0.72;
var trialnum = curTrial;
var margin = 15;


//temporarty way to acces stimuli, just for testing. This should refer to a server later on. 
var stimuli = ['http://www.getty.edu/museum/media/images/web/enlarge/00066001.jpg',
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
    delElement('image_holder')  }
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
      <img id="image" onclick="Coords(event)" align="middle">
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

  function delElement(image_holder) { 
    var element = document.getElementById(image_holder);
    element.parentNode.removeChild(element);
  }