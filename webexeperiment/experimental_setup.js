
var curTrial = 0;

//temporarty way to acces stimuli, just for testing. 
var stimuli = ['http://www.getty.edu/museum/media/images/web/enlarge/00066001.jpg',
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
var element = document.getElementById('trialholder');
element.parentNode.removeChild(element);
}

var trialnum = curTrial;
 $('#location').append(`
<div id="betweentrials">
    <p>Continue to the next trial</p>
    <button id="next"type="button" onclick="RunTrial()">Submit</button> 
    <p> Trial ${trialnum} of ${stimuli.length} </p>
</div>
    `) }

 function RunTrial() {
  var element = document.getElementById('betweentrials');
  element.parentNode.removeChild(element);
  Trial();
}

function Trial() {
	curTrial = increase(curTrial);

  //generate the html code
   $('#location').append(`
   <div id="trialholder"> 
    <img id="image"> 
   </div>`)

    // present the image 
    var targetImage = document.getElementById('image')
    targetImage.src =  stimuli[curTrial];

      // present the image at the desired size
      var margin = 0.95; //I want 2.5% of the window empty as a margin. 
      
      var targetImageHeight = targetImage.height;// image
      var targetImageWidth = targetImage.width; //
      var windowHeight = $(window).height();   //   browser 
      var windowWidth  = $(window).width();   //
      var ratio = Math.min(windowWidth / targetImageWidth, windowHeight / targetImageHeight);

      if (ratio < 1) {
        targetImageHeight = targetImageHeight*ratio*margin;
        targetImageWidth = targetImageWidth*ratio*margin;
        targetImage.style.width = `${targetImageWidth}px`;
        targetImage.style.height= `${targetImageHeight}px`;
      }

        //now check where the UI will be placed (to the right if there's enough space, otherwise below)
        // But there's no UI yet, so yea..nothing to show

        /*if (windowWidth-targetImageWidth >= 400) {  //400 is an arbitrary number. I don't know the size of the UI yet.
          
        }
        else {
        } */
          document.getElementById("trialholder").setAttribute("align", "center");
          //this is pretty much a placeholder till i know the actual data i wanna gather 
          $('#trialholder').append(`
              <form >
                  Question 1:<br>
                  <input type="text" name="firstname" value="answer"><br>
                  Question 2:<br>
                  <input type="text" name="lastname" value="answer">
                  <br><br>
                  <button id="continue" type="button" onclick="ShowBetweenTrials()"> Continue </button>
              </form>`)


        }
  
     




// Random small functions 
function increase(x) {
    x++;
    return x;
  }
  
// needs to go back into trial()
  