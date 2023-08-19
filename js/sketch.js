window.onload = function(){ 

    /**
     * Set the constants and variables.
     */
    const sketchPadSize = 480;
    let currentGridSize = 16;

    //Initially, let's create a sketch pad of 16X16.
    createSketchPad(currentGridSize);
    /**
     * Event listener for range slider change.
     * 
    */
    document.getElementById("sketch-form-grid-slider").addEventListener("change", function(){
        //Now, let's get the new value of the grid.
        let newSliderVal = document.getElementById("sketch-form-grid-slider").value;
        //Now, let's change the textcontent of the current Grid size.
        document.getElementById("sketch-form-grid-slider-value-span").textContent = `${newSliderVal} X ${newSliderVal}`;

        //Now, let's create a grid of this value. We can simply call our function with this value.
        currentGridSize = newSliderVal;
        createSketchPad(newSliderVal);
        
    });

    function createSketchPad(gridSize){
        
        //Clear the element.
        document.getElementById("sketch-wrapper").textContent = "";
        //Let's set the height of our row based on our total width (960px) and the grid size.
        let eachRowHeight = sketchPadSize/gridSize;
        //Let's create a gridSize X gridSize square divs.
        for(let i =1; i<=gridSize; i++){
            let divElem = document.createElement("div");
            divElem.classList.add("each-row-div");
            divElem.setAttribute("id", `sketch-row-${i}`);
            //Let' set the element's height to be this.
            //divElem.setAttribute('style', `height: ${eachRowHeight}px;`);
            document.getElementById("sketch-wrapper").appendChild(divElem);
            //Now, for each row created, let's add 16 divs.
            for(let j=1; j<=gridSize; j++){
                let eachGridElem = document.createElement("div");
                eachGridElem.classList.add("etch-sketch-grid");
                eachGridElem.setAttribute("id", `sketch-grid-row-${i}-grid-${j}`);
                //Let's set the height and width of each grid as well.
                eachGridElem.setAttribute('style', `height: ${eachRowHeight}px; width: ${eachRowHeight}px;`);
                document.getElementById(`sketch-row-${i}`).appendChild(eachGridElem);
            }
        }
    }
    
    

    //When hovering over each grids, the color of the grid changes.
    document.getElementById("sketch-wrapper").addEventListener('mouseover', function(e){
        //Get hovered element.
        let hoveredElem = e.target;
        // Now, change color on the hovered element. We simply add a class of hovered to the grid element.

        
        // The CSS rule will fill the grid with black color.
        //hoveredElem.classList.add("hovered");
        
        
        //First, see which marker type is currently selected.
        let currentMarkerType = "simple";
        if(document.getElementById("marker-color-type-random").checked){
            currentMarkerType = "random";
        }

        if(currentMarkerType === "simple"){
            //Simply set the background color of the hovered element to black.
            //Only do it if this element has a class of "etch-sktech-grid". We don't want the whole row's bg color to change.
            if(hoveredElem.classList.contains("etch-sketch-grid")){
                hoveredElem.style.backgroundColor = "#000";
            }
        }else if(currentMarkerType === "random"){
            //This time we set the background color to be random.
            //Colors are in the format of rgb which range from 0 to 255.
            //Let's generate 3 random values from 0 to 255.
            //The only thing we have to make sure is that all 3 random values are not equal to 255, since that would correspond to the color white.
            let randomColor1 = getRandomNum(256);
            let randomColor2 = getRandomNum(256);
            let randomColor3 = getRandomNum(256);

            if(randomColor1 === randomColor2 === randomColor3 === 255){
                randomColor1 = randomColor1 - 44;
                randomColor3 = randomColor3 - 167;
            }

            //Now, let's set the background color of the hovered element to these rgb value.
            //Only do it if this element has a class of "etch-sketch-grid". We don't want the whole row's bg color to change at once.
            if(hoveredElem.classList.contains("etch-sketch-grid")){
                hoveredElem.style.backgroundColor = `rgb(${randomColor1},${randomColor2}, ${randomColor3})`;
            }
        }
        

    });

    //When the "Reset" button is clicked, let's clear the sketch pad of any colors.
    document.getElementById("sketch-form-reset-btn").addEventListener('click', function(){
        resetSketchPad();
    });

    //Event Listener for Sketch Marker Color type.
    document.getElementById("marker-color-type-simple").addEventListener("click", function(){
        //Reset the sketch pad.
        resetSketchPad();
    });

    document.getElementById("marker-color-type-random").addEventListener("click", function(){
        //Reset the sketch pad.
        resetSketchPad();
    });



    /**
     * Function to reset the sketch pad.
     */
    function resetSketchPad(){

        /*
        //Remove all hovered class.
        let allHoveredElems = document.querySelectorAll(".hovered");
        allHoveredElems.forEach(element => {
            element.classList.toggle("hovered");
        });
        */

       //Get all etch-sketch-grid class elements and simply set their background color to white.
       let allColoredElems = document.querySelectorAll(".etch-sketch-grid");
       allColoredElems.forEach(element => {
            element.style.backgroundColor = "#fff";
       });
    }

    /**
     * Function to get a random number.
     */
    function getRandomNum(max){
        return Math.floor(Math.random() * max);
    }



}