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

public class App extends Application {

    public List<Circle> nodes = new ArrayList<Circle>();
    public Map<String, KeyCode> map = new HashMap<String, KeyCode>();
    public CircleNode temp = new CircleNode();

    @Override
    public void start(Stage primaryStage) {

        primaryStage.setTitle("JBPM");

        SplitPane root = new SplitPane();
        Scene scene = new Scene(root, 800, 600);

        VBox left = new VBox(new Label("Tools"));
        left.setStyle("-fx-background-color: #b3b3b3");
        left.setAlignment(Pos.TOP_CENTER);

        root.getItems().add(left);
        root.setDividerPosition(0, 1/(double)5);

        Pane right = new Pane(new Label("Working space"));
        right.setStyle("-fx-background-color: white");
        //right.setAlignment(Pos.TOP_CENTER);
        root.getItems().add(right);

        
        Button roundButton = new Button("Input");
        Button squareButton = new Button("Output");
        Button connectionButton = new Button("Connection");
        Button saveNodes = new Button("Save Nodes");
        Button save = new Button("Save All");
        
        left.setSpacing(30);
        roundButton.setStyle(
            "-fx-background-radius: 5em; " +
            "-fx-min-width: 75px; " +
            "-fx-min-height: 75px; " +
            "-fx-max-width: 75px; " +
            "-fx-max-height: 75px;"            
        );
        
        squareButton.setStyle(
            "-fx-background-radius: 0; " +
            "-fx-min-width: 75px; " +
            "-fx-min-height: 75px; " +
            "-fx-max-width: 75px; " +
            "-fx-max-height: 75px;"
        );

        connectionButton.setStyle(
            "-fx-background-radius: 0; " +
            "-fx-min-width: 100px; " +
            "-fx-min-height: 30px; " +
            "-fx-max-width: 100px; " +
            "-fx-max-height: 30px;"
        );

        saveNodes.setStyle(
            "-fx-background-radius: 0; " +
            "-fx-min-width: 100px; " +
            "-fx-min-height: 30px; " +
            "-fx-max-width: 100px; " +
            "-fx-max-height: 30px;"
        );
        saveNodes.setLayoutX(320);
        saveNodes.setLayoutY(560);

        save.setStyle(
            "-fx-background-radius: 0; " +
            "-fx-min-width: 100px; " +
            "-fx-min-height: 30px; " +
            "-fx-max-width: 100px; " +
            "-fx-max-height: 30px;"
        );
        save.setLayoutX(430);
        save.setLayoutY(560);


        left.getChildren().add(roundButton);
        left.getChildren().add(squareButton);
        left.getChildren().add(connectionButton);
        right.getChildren().add(saveNodes);
        right.getChildren().add(save); 

        roundButton.setOnAction(new EventHandler<ActionEvent>() {
            public void handle(ActionEvent event) {
                Circle circle1 = new Circle();
                CircleNode circle = new CircleNode(circle1);
                circle.setStyle(
                    "-fx-background-radius: 5em; " +
                    "-fx-min-width: 45px; " +
                    "-fx-min-height: 45px; " +
                    "-fx-max-width: 45px; " +
                    "-fx-max-height: 45px;" +
                    "-fx-background-color: #669999;" +
                    "-fx-text-fill: black; "
                );
                // position the node
                circle.setLayoutX(40 + circle.getPrefWidth());
                circle.setLayoutY(40);

                // add the node to the working space pane
                right.getChildren().add(circle);
            }
        });

        squareButton.setOnAction(new EventHandler<ActionEvent>() {
            public void handle(ActionEvent event) {
                Rectangle rectangle1 = new Rectangle();
                RectangleNode rectangle = new RectangleNode(rectangle1);
                rectangle.setPrefSize(40, 40);
                rectangle.setStyle(
                    "-fx-background-color: lightblue; "
                    + "-fx-text-fill: black; "
                    + "-fx-border-color: black;");
                // position the node
                rectangle.setLayoutX(100 + rectangle.getPrefWidth());
                rectangle.setLayoutY(100);

                // add the node to the working space pane
                right.getChildren().add(rectangle);            
            }
        });       

       
        saveNodes.setOnAction(new EventHandler<ActionEvent>() {
            public void handle(ActionEvent event) {
                nodes = temp.getList();    

                for (int i = 0; i < nodes.size(); i++)
                    System.out.printf("Key : %s and Value: %s %n", nodes.get(i), nodes.get(i).getId());
            }
        });

        
        connectionButton.setOnAction(new EventHandler<ActionEvent>() {
            public void handle(ActionEvent event) {
                Lines line = new Lines(nodes, scene);
            }
        });


        save.setOnAction(new EventHandler<ActionEvent>() {
            public void handle(ActionEvent event) {
                
            }
        });


        map.put("A", KeyCode.A);
        map.put("B", KeyCode.B);
        map.put("C", KeyCode.C);
        map.put("D", KeyCode.D);
        map.put("E", KeyCode.E);
        map.put("F", KeyCode.F);
        map.put("G", KeyCode.G);
        map.put("H", KeyCode.H);
        map.put("I", KeyCode.I);
        map.put("J", KeyCode.J);
        map.put("K", KeyCode.K);
        map.put("L", KeyCode.L);
        map.put("M", KeyCode.M);
        map.put("N", KeyCode.N);
        map.put("O", KeyCode.O);
        map.put("P", KeyCode.P);
        map.put("Q", KeyCode.Q);
        map.put("R", KeyCode.R);
        map.put("S", KeyCode.S);
        map.put("T", KeyCode.T);
        map.put("U", KeyCode.U);
        map.put("V", KeyCode.V);
        map.put("W", KeyCode.W);
        map.put("X", KeyCode.X);
        map.put("Y", KeyCode.Y);
        map.put("Z", KeyCode.Z);

        
        scene.addEventHandler(KeyEvent.KEY_PRESSED, (key) -> {
              
            if(key.getCode() == map.get(nodes.get(0).getId())) {
                scene.addEventHandler(KeyEvent.KEY_PRESSED, (k) -> {
                    if(k.getCode() == map.get(nodes.get(1).getId())) {
                
                        Alert alert = new Alert(AlertType.INFORMATION);
                        alert.setTitle("Output");
                        alert.setHeaderText(null);
                        alert.setContentText("Key pressed");

                        alert.showAndWait();
                    }
                });
            }
        });


        // finally, show the stage
        
        primaryStage.setScene(scene);
        primaryStage.show();
    }
     


    public static void main(String[] args) {
        launch(args);
    }
}
