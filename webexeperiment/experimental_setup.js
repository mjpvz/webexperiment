var curTrial = 0;
var viewport_vh = 0.98;
var viewport_vw = 0.72;

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
var element = document.getElementById('image_holder');
element.parentNode.removeChild(element);

}

var trialnum = curTrial;
 $('#left_wrapper').append(`
<div id="betweentrials" style="margin:15px">
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
   $('#right_wrapper').append(`
    <div id="image_holder">
      <img id="image" onload="resize_image()">
    </div>`)   
    document.getElementById('image').src = stimuli[curTrial];
   
      $('#left_wrapper').append(`
      <div id="trialholder" style="margin:15px">
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
      

  
 function resize_image(targetImage) {
     var targetImage = document.getElementById('image');
// present the image at the desired size
      var margin = 0.95; //I want 2.5% of the window empty as a margin. 
      var targetImageHeight = targetImage.height;// image
      var targetImageWidth = targetImage.width; //
      var windowHeight = $(window).height()*viewport_vh;   //   browser 
      var windowWidth  = $(window).width()*viewport_vw;   //
      console.log(targetImageHeight)
      console.log(targetImageWidth)
      console.log(windowHeight)
      console.log(windowWidth)
      var ratio = Math.min(windowWidth / targetImageWidth, windowHeight / targetImageHeight);
      console.log(ratio)
      if (ratio < 1) {
        console.log('resizing')
        targetImageHeight = targetImageHeight*ratio*margin;
        targetImageWidth = targetImageWidth*ratio*margin;
        targetImage.style.width = `${targetImageWidth}px`;
        targetImage.style.height= `${targetImageHeight}px`;
      }
      else  {
        // do nothing
      }
        //now check where the UI will be placed (to the right if there's enough space, otherwise below)
        // But there's no UI yet, so yea..nothing to show 
        return [windowWidth,targetImageWidth]
  }




// Random small functions 
function increase(x) {
    x++;
    return x;
  }
  
// needs to go back into trial()
  