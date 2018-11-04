/**
 * @file WindowEventsForNodeProgram
 * @author Kirononame <abdelrahman.abdelrahman101@gmail.com>
 * @version 0.1
*/

containerCanvas.onclick = function(e) {

    if(running)
    {
        return;
    }

    var rect = this.getBoundingClientRect();   // get abs. position of canvas
    var x = e.clientX - rect.left;             // adjust mouse-position
    var y = e.clientY - rect.top;

    if(appMode == appEnum.test)
    {
        console.log(x, y);
    }

    var collidedShape = CheckContainerCollisions(x, y);

    if(collidedShape == null)
    {
        console.log("No shape selected");
    }
    else if (collidedShape == shapesEnum.square)
    {
        console.log("Square shape selected");
    }
    else if(collidedShape == shapesEnum.circle)
    {
        console.log("Circle shape selected");
        
    }

};

workspaceCanvas.onclick = function(e) {

    if(running)
    {
        return;
    }

    var rect = this.getBoundingClientRect();   // get abs. position of canvas
    var x = e.clientX - rect.left;             // adjust mouse-position
    var y = e.clientY - rect.top;

    if(appMode == appEnum.test)
    {
        console.log(x, y);
    }

    var collidedShape = CheckWorkspaceCollisions(x, y);

    if(collidedShape == createEnum.donothing)
    {
        console.log("Click elsewhere");
        clickedShape = null;
        RemoveProperties();

        if(firstClickedShape != null)
        {
            firstClickedShape = null;
            console.log("line first point removed");
        }
        
    }

    else if(collidedShape == createEnum.create)
    {
        clickedShape = null;
        RemoveProperties();
        
        if(firstClickedShape != null)
        {
            firstClickedShape = null;
            console.log("line first point removed");
        }

        if(chosenShape == null)
        {
            console.log("Choose a Shape");
        }
        else if(chosenShape == shapesEnum.square)
        {
            workspaceShapes.push(new Square(x, y, shapeWidth, shapeHeight));
            console.log("A new square shape made");
            
        }
        else if(chosenShape == shapesEnum.circle)
        {
            workspaceShapes.push(new Circle(x, y, shapeWidth/2, 0, 2*Math.PI));
            console.log("A new circle shape made");
        }
    }
    else
    {
        console.log("Shape Clicked");
        clickedShape = collidedShape;

        AddProperties(collidedShape.properties);

        if(firstClickedShape == null)
        {
            if(collidedShape.shape == shapesEnum.circle)
            {
                firstClickedShape = collidedShape;
                console.log("A line first point is made");
            }
            else{
                console.log("A line first point can't be made from sqaure");
            }
            
        }
        else
        {
            secondClickedShape = collidedShape;

            secondClickedShape.input = true;

            //firstClickedShape.properties["String"] = secondClickedShape.properties["String"]
            
            var line = [firstClickedShape, secondClickedShape];
            workspaceLines.push(line);

            if(collidedShape.shape == shapesEnum.circle)
            {
                if(appMode == appEnum.test)
                {
                    firstClickedShape.pressed = secondClickedShape.pressed;
                }
                else
                {
                    
                    firstClickedShape.output.push(secondClickedShape);
                }
                
            }

            else{

                if(appMode == appEnum.test)
                {
                    firstClickedShape.pressed.addHandler(secondClickedShape.print);
                }
                else
                {
                    
                    firstClickedShape.output.push(secondClickedShape);
                }
                // firstClickedShape.pressed = secondClickedShape.print;

            }

            firstClickedShape = null;

            console.log("A new line made");
        }

        

    }

};