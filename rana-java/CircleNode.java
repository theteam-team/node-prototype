import javafx.application.*;
import javafx.application.Application;
import javafx.geometry.*;
import javafx.event.*;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.beans.property.DoubleProperty;
import javafx.beans.property.SimpleDoubleProperty;
import javafx.scene.*;
import javafx.scene.Parent;
import javafx.scene.Node;
import javafx.scene.Node.*;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.control.Button;
import javafx.scene.control.SplitPane;
import javafx.scene.control.Alert.*;
import javafx.scene.input.*;
import javafx.scene.input.MouseEvent.*;
import javafx.scene.input.KeyEvent.*;
import javafx.scene.layout.Pane;
import javafx.scene.layout.*;
import javafx.scene.layout.StackPane;
import javafx.scene.shape.*;
import javafx.scene.paint.*;
import javafx.scene.paint.Color;
import javafx.stage.*;
import javafx.stage.Stage;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Optional.*;
import java.util.HashMap;
import java.util.Map;

public class CircleNode extends Pane {

    // node position
    public double x = 0;
    public double y = 0;
    // mouse position
    public double mousex = 0;
    public double mousey = 0;
    public Circle view;
    public boolean dragging = false;
    public boolean moveToFront = true;
    static List<Circle> nodes = new ArrayList<Circle>();

    public CircleNode() {
        init();
    }

    public CircleNode(Circle view) {
        this.view = view;

        getChildren().add(view);
        init();
    }

    public void init() {

        onMousePressedProperty().set(new EventHandler<MouseEvent>() {
            @Override
            public void handle(MouseEvent event) {

                if (event.getClickCount() == 2) {
                    TextInputDialog dialog = new TextInputDialog();
 
                    dialog.setTitle("Input");
                    dialog.setHeaderText("Enter a capital letter:");
 
                    Optional<String> result = dialog.showAndWait();
                    String s;
  
                    if (result.isPresent()) {
                        s = result.get();  
                        view.setId(s);
                        nodes.add(view);
                    }  
                 }   

                // record the current mouse X and Y position on Node
                mousex = event.getSceneX();
                mousey = event.getSceneY();

                x = getLayoutX();
                y = getLayoutY();

                if (isMoveToFront()) {
                    toFront();
                }
            }
        });

        //Event Listener for MouseDragged
       onMouseDraggedProperty().set(new EventHandler<MouseEvent>() {
            @Override
            public void handle(MouseEvent event) {

                // Get the exact moved X and Y

                double offsetX = event.getSceneX() - mousex;
                double offsetY = event.getSceneY() - mousey;

                x += offsetX;
                y += offsetY;

                double scaledX = x;
                double scaledY = y;

                setLayoutX(scaledX);
                setLayoutY(scaledY);

                dragging = true;

                // again set current Mouse x AND y position
                mousex = event.getSceneX();
                mousey = event.getSceneY();

                event.consume();
            }
        });

        onMouseClickedProperty().set(new EventHandler<MouseEvent>() {
            @Override
            public void handle(MouseEvent event) {

                dragging = false;
            }
        });  

    }


     //return the dragging
    public boolean isDragging() {
        return dragging;
    }

     //return the view
    public Circle getView() {
        return view;
    }

    public String id() {
        return view.getId();
    }

    public List<Circle> getList() {
        return nodes;
    }

     //param moveToFront the moveToFront to set
    public void setMoveToFront(boolean moveToFront) {
        this.moveToFront = moveToFront;
    }

     //return the moveToFront
    public boolean isMoveToFront() {
        return moveToFront;
    }
    
    public void removeNode(Circle n) {
        getChildren().remove(n);
    }
}
