var curTrial = 0;
var stimuli = ['http://www.getty.edu/museum/media/images/web/enlarge/00066001.jpg',
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
var element = document.getElementById('trialholder');
element.parentNode.removeChild(element);
}
var trialnum = curTrial;
 $('#location').append(`
<div id="betweentrials">
    <p>Continue to the next trial</p>
    <button id="next"type="button" onclick="RunTrial()">Submit</button> 
    <p> Trial ${trialnum} of n </p>
</div>
    `) }

 function RunTrial() {
  var element = document.getElementById('betweentrials');
  element.parentNode.removeChild(element);
  Trial();
}

function Trial() {
	curTrial = increase(curTrial);

   $('#location').append(`
   <div id="trialholder" style="text-align:center"> 
   <img id="image"> 
    <form >
        Question 1:<br>
        <input type="text" name="firstname" value="answer"><br>
        Question 2:<br>
        <input type="text" name="lastname" value="answer">
        <br><br>
        <button id="continue" type="button" onclick="ShowBetweenTrials()"> Continue </button>
    </form>
    </div>`)
      document.getElementById('image').src = stimuli[curTrial];

}


// Random small functions 
function increase(x) {
    x++;
    return x;
    }