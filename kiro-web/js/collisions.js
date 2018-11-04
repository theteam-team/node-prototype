/**
 * @file CollisionDetectionForNodeProgram
 * @author Kirononame <abdelrahman.abdelrahman101@gmail.com>
 * @version 0.1
*/

function CheckContainerCollisions(x, y)
{
    chosenShape = null;

    for(let shape of containerShapes)
    {
       
        if(shape.shape == shapesEnum.square)
        {
            var dx = x - shape.x;
            var dy = y - shape.y;
            var dist = Math.abs(Math.sqrt(dx*dx + dy*dy));


            if (dist <= shape.width / 2) {
                shape.clicked = true;
                chosenShape = shapesEnum.square;
            }
            else{
                shape.clicked = false;
            }

        }

        else if(shape.shape == shapesEnum.circle)
        {
            var dx = x - shape.x;
            var dy = y - shape.y;
            var dist = Math.abs(Math.sqrt(dx*dx + dy*dy));


            if (dist <= shape.radius) {
                shape.clicked = true;
                chosenShape = shapesEnum.circle;
            }

            else{
                shape.clicked = false;
            }

        }

    }

    return chosenShape;
    
}

function CheckWorkspaceCollisions(x, y)
{
    var create = createEnum.create;

    for(let shape of workspaceShapes)
    {

        if(shape.shape == shapesEnum.square)
        {
            var dx = x - shape.x;
            var dy = y - shape.y;
            var dist = Math.abs(Math.sqrt(dx*dx + dy*dy));


            if (dist <= shape.width / 2) {
                shape.clicked = true;
                
                create = shape;
            }
            else if (dist <= shape.width * 2) {

                if(create == createEnum.create)
                    create = createEnum.donothing;

                shape.clicked = false;
            }
            else{
                shape.clicked = false;
            }

        }

        else if(shape.shape == shapesEnum.circle)
        {
            var dx = x - shape.x;
            var dy = y - shape.y;
            var dist = Math.abs(Math.sqrt(dx*dx + dy*dy));


            if (dist <= shape.radius)
            {
                shape.clicked = true;

                create = shape;
            }

            else if (dist <= shape.radius * 4)
            {
                if(create == createEnum.create)
                    create = createEnum.donothing;

                shape.clicked = false;
            }

            else
            {
                shape.clicked = false;
            }

        }

    }

    return create;

}