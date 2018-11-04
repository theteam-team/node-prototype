/**
 * @file RendereringForNodeProgram
 * @author Kirononame <abdelrahman.abdelrahman101@gmail.com>
 * @version 0.1
*/

function ContainerRender()
{
    containerCtx.clearRect(0, 0, containerWidth, containerHeight);
    
    for(let shape of containerShapes)
    {
        let color = 'green';
        if(shape.clicked)
            color = 'black';
        
        shape.draw(containerCtx, color);
    }
}

function LineWorkspaceRender()
{
    for(let line of workspaceLines)
    {
        workspaceCtx.fillStyle = 'black';

        workspaceCtx.beginPath();
        workspaceCtx.moveTo(line[0].x, line[0].y);
        workspaceCtx.lineTo(line[1].x, line[1].y);
        workspaceCtx.stroke();

    }
}

function WorkspaceRender()
{
    workspaceCtx.clearRect(0, 0, workspaceWidth, workspaceHeight);

    for(let shape of workspaceShapes)
    {
        let color = 'green';
        if(shape.clicked)
            color = 'black'
        if(shape.activate && shape.shape == shapesEnum.circle)
            color = 'yellow';
        if(shape.activate && shape.shape == shapesEnum.square)
            color = 'blue';

        shape.draw(workspaceCtx, color);
    }

    LineWorkspaceRender();

}


function Render()
{
    
    ContainerRender();
    WorkspaceRender();
    
}