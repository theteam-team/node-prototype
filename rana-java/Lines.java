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

public class Lines extends Pane {

    public DoubleProperty mouseX = new SimpleDoubleProperty();
    public DoubleProperty mouseY = new SimpleDoubleProperty();

    public List<Circle> nodes = new ArrayList<Circle>();
    public Scene scene;
    public Line currentLine = null;
    public boolean dragActive = false;

    public Lines(List<Circle> nodes, Scene scene) {
        this.nodes = nodes;
        this.scene = scene;

        attachHandlers(scene);
    }

    public Optional<Circle> findNode(double x, double y) {
        return nodes.stream().filter(n -> n.contains(x, y)).findAny();
    }

    public void startDrag(Circle node) {
        if (dragActive)
            return;

        dragActive = true;
        currentLine = new Line();
        currentLine.setUserData(node);
        currentLine.setStartX(node.getCenterX());
        currentLine.setStartY(node.getCenterY());
        currentLine.endXProperty().bind(mouseX);
        currentLine.endYProperty().bind(mouseY);
        node.startFullDrag();
        getChildren().add(currentLine);
    }

    public void stopDrag(Circle node) {
        dragActive = false;

        if (currentLine.getUserData() != node) {
            // distinct node
            currentLine.endXProperty().unbind();
            currentLine.endYProperty().unbind();
            currentLine.setEndX(node.getCenterX());
            currentLine.setEndY(node.getCenterY());
            currentLine = null;
        } else {
            // same node
            stopDrag();
        }
    }

    public void stopDrag() {
        dragActive = false;

        currentLine.endXProperty().unbind();
        currentLine.endYProperty().unbind();
        getChildren().remove(currentLine);
        currentLine = null;
    }

    public void attachHandlers(Scene scene) {
        scene.setOnMouseMoved(e -> {
            mouseX.set(e.getSceneX());
            mouseY.set(e.getSceneY());
        });

        scene.setOnMouseDragged(e -> {
            mouseX.set(e.getSceneX());
            mouseY.set(e.getSceneY());
        });

        scene.setOnMousePressed(e -> {
            findNode(e.getSceneX(), e.getSceneY()).ifPresent(this::startDrag);
        });

        scene.setOnMouseReleased(e -> {
            Optional<Circle> maybeNode = findNode(e.getSceneX(), e.getSceneY());

            if (maybeNode.isPresent()) {
                stopDrag(maybeNode.get());
            } else {
                stopDrag();
            }
        });
    }

    public Line getLine() {
        return currentLine;
    }
}
