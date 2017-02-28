var curTrial = -1;
var viewport_vh = 0.98;
var viewport_vw = 0.72;

//temporarty way to acces stimuli, just for testing. 
var stimuli = ['https://upload.wikimedia.org/wikipedia/commons/4/4e/Pleiades_large.jpg',
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
    <p> Trial ${trialnum+1} of ${stimuli.length} </p>
</div>
    `) }

var clicks = [];
function Coords(event) {
    var x = event.clientX;
    var y = event.clientY;
    var coords = "X coords: " + x + ", Y coords: " + y;

    $('#image_holder').append(`<div id="x${clicks.length}" style="color:red">X</div>`)

    var d = document.getElementById(`x${clicks.length}`);
    d.style.position = "absolute";
    d.style.left = x+'px';
    d.style.top = y+'px';
    click = [x,y]
    clicks.push(click)
    console.log(clicks)

    if(clicks.length > 1) {
      var x_1 = clicks[clicks.length-1][0]
      var x_2 = clicks[clicks.length][0]
      var y_1 = clicks[clicks.length-1][0]
      var y_2 = clicks[clicks.length][0]

    }
    



    // document.getElementById("demo").innerHTML = coords;

}


 function RunTrial() {
  var element = document.getElementById('betweentrials');
  element.parentNode.removeChild(element);
  Trial();
}


function returnData() {
    form_data_holder = $(`#trialholder`);
    var a = form_data_holder
    console.log(a)
}


function Trial() {
	curTrial = increase(curTrial);

  //generate the html code
   $('#right_wrapper').append(`
    <div id="image_holder">
      <img id="image" onload="resize_image()" onclick="Coords(event)" align="middle">
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
      var targetImageHeight = targetImage.height;// image
      var targetImageWidth = targetImage.width; //

      var actualWindowHeight = $(image_holder).height()
      var actualWindowWidth = $(image_holder).width()
 
      var ratio = Math.min(actualWindowWidth / targetImageWidth, actualWindowHeight / targetImageHeight);

     if (ratio < 1) {
        console.log('resizing')
        targetImageHeight = targetImageHeight*ratio;
        targetImageWidth = targetImageWidth*ratio;
        targetImage.style.width = `${targetImageWidth}px`;
        targetImage.style.height= `${targetImageHeight}px`;
      }
      else { //no resiznig required
      }
    
  }




// Random small functions 
function increase(x) {
    x++;
    return x;
  }
  
// needs to go back into trial()
  