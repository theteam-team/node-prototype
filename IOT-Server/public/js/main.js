var HOST = location.origin.replace(/^http/, 'ws');
var socket = new WebSocket(HOST); //#A


var rValue = 0; 
var gValue = 0; 
var bValue = 0;

var local_user = "Default";

function myClick(el) {
    let led = el.children[0].getElementsByTagName('g');
    led[0].style.fill = "none";
    led[1].style.fill = "red";

    let msg = {
        type: "led",
        data: {
            id: el.id,
            time: (new Date()).toLocaleTimeString('it-IT'),
            user: local_user
        }
    }

    if (socket && socket.readyState === 1) {
        socket.send(JSON.stringify(msg));
    } else {
        console.log("server is down");
    }
}

function changeled(id, value) {
    let el = document.getElementById(id)
    //console.log(id);
    let led = el.children[0].getElementsByTagName('g');
    led[0].style.fill = value == 1 ? "orange" : "none";
    led[1].style.fill = value == 1 ? "orange" : "gray";
}

function submitUser()
{
    console.log('submit');
    userName = document.getElementById("username").value;

    let msg = {
        type: 'userName',
        data: {
            user: userName,
        }
    }

    if (socket && socket.readyState === 1) {
        socket.send(JSON.stringify(msg));
    } else {
        console.log("server is down");
    }
}

function sendr(newVal)
{
    console.log('Send changeR');

    let msg = {
        type: 'rgb',
        data: {
            r: newVal,
            g: gValue,
            b: bValue,
        }
    }

    if (socket && socket.readyState === 1) {
        socket.send(JSON.stringify(msg));
    } else {
        console.log("server is down");
    }
}
function sendg(newVal)
{
    console.log('Send changeG');

    let msg = {
        type: 'rgb',
        data: {
            r: rValue,
            g: newVal,
            b: bValue,
        }
    }

    if (socket && socket.readyState === 1) {
        socket.send(JSON.stringify(msg));
    } else {
        console.log("server is down");
    }
}
function sendb(newVal)
{
    console.log('Send changeB');

    let msg = {
        type: 'rgb',
        data: {
            r: rValue,
            g: gValue,
            b: newVal,
        }
    }

    if (socket && socket.readyState === 1) {
        socket.send(JSON.stringify(msg));
    } else {
        console.log("server is down");
    }
}

function showRVal(newVal){
    rValue = newVal;
    document.getElementById("rrange").value = rValue;
    document.getElementById("rvalue").innerHTML="Value: " + rValue;
    
}
function showGVal(newVal){
    gValue = newVal;
    document.getElementById("grange").value = gValue;
    document.getElementById("gvalue").innerHTML="Value: " + gValue;
    
}
function showBVal(newVal){
    bValue = newVal;
    document.getElementById("brange").value = bValue;
    document.getElementById("bvalue").innerHTML="Value: " + bValue;
}

function changeColor()
{
    let color = "rgb(" + rValue + "," + gValue + "," + bValue + ")";
    document.getElementById("fvalue").style.backgroundColor = color;
}

function addLog(time, user, message)
{
    let text = '@ ' + time + ' ' + user + ' ' + message;
    console.log(text);

    var para = document.createElement("p");
    para.className = "row log-bg";
    var node = document.createTextNode(text);
    para.appendChild(node);

    var element = document.getElementById("logs");
    element.appendChild(para);

}

document.addEventListener("DOMContentLoaded", function () {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="M57.3 166.2H12.7c-6.8 0-12.4 5.5-12.4 12.4s5.5 12.4 12.4 12.4h44.6c6.8 0 12.4-5.5 12.4-12.4S64.2 166.2 57.3 166.2z"/><path d="M499.3 166.2h-44.6c-6.8 0-12.4 5.5-12.4 12.4s5.5 12.4 12.4 12.4h44.6c6.8 0 12.4-5.5 12.4-12.4S506.1 166.2 499.3 166.2z"/><path d="M108.3 326.2c-4.8-4.8-12.7-4.8-17.5 0l-32.4 32.4c-4.8 4.8-4.8 12.7 0 17.5 2.4 2.4 5.6 3.6 8.8 3.6s6.3-1.2 8.8-3.6l32.4-32.4C113.2 338.9 113.2 331 108.3 326.2z"/><path d="M430.9 3.6c-4.8-4.8-12.7-4.8-17.5 0L381.9 35.2c-4.8 4.8-4.8 12.7 0 17.5 2.4 2.4 5.6 3.6 8.8 3.6 3.2 0 6.3-1.2 8.8-3.6l31.5-31.5C435.7 16.3 435.7 8.5 430.9 3.6z"/><path d="M130.1 35.1L98.6 3.6c-4.8-4.8-12.7-4.8-17.5 0-4.8 4.8-4.8 12.7 0 17.5L112.6 52.7c2.4 2.4 5.6 3.6 8.8 3.6s6.3-1.2 8.8-3.6C135 47.8 135 40 130.1 35.1z"/><path d="M453.6 358.6l-32.3-32.3c-4.8-4.8-12.7-4.8-17.5 0-4.8 4.8-4.8 12.7 0 17.5l32.3 32.3c2.4 2.4 5.6 3.6 8.8 3.6 3.2 0 6.3-1.2 8.8-3.6C458.4 371.3 458.4 363.5 453.6 358.6z"/></g><g><path d="M256 33.6c-85.6 0-155.3 72.9-155.3 162.5 0 41.7 14.9 86.5 40.9 123 20 28 30.5 59.2 30.5 90.2v77.9c0 13.7 11.1 24.8 24.8 24.8h118.2c13.7 0 24.8-11.1 24.8-24.8V409.4c0-31 10.6-62.2 30.5-90.2 26-36.5 40.9-81.3 40.9-123C411.3 106.5 341.6 33.6 256 33.6zM315.1 487.2H196.9v-16.2h59.1c6.8 0 12.4-5.5 12.4-12.4s-5.5-12.4-12.4-12.4h-59.1v-16.2h118.2l0 57.2C315.1 487.2 315.1 487.2 315.1 487.2zM238.6 256.1l-16.6-35.4h67.9l-16.6 35.4c-0.7 1.4-1 2.9-1.1 4.4l-9.6 144.7h-13.2l-9.6-144.7C239.7 259 239.3 257.5 238.6 256.1zM350.2 304.7c-22.1 31.1-34.2 65.7-35.1 100.5h-27.7l9.3-140.7 23.8-50.9c1.8-3.8 1.5-8.3-0.8-11.9-2.3-3.6-6.2-5.7-10.5-5.7H202.6c-4.2 0-8.2 2.2-10.5 5.7-2.3 3.6-2.6 8.1-0.8 11.9l23.8 50.9 9.3 140.7h-27.7c-0.9-34.8-13-69.5-35.1-100.5-22.8-31.9-36.3-72.6-36.3-108.6 0-75.9 58.6-137.7 130.6-137.7s130.6 61.8 130.6 137.7C386.6 232.2 373 272.8 350.2 304.7z"/></g></svg>';

    var el = document.getElementsByClassName("led");

    for (var i = 0; i < el.length; i++) {
        el[i].innerHTML = svg + el[i].innerHTML;
        el[i].tabIndex = "0";
        el[i].addEventListener("mouseenter", function (e) { this.style.opacity = 1; });
        el[i].addEventListener("mouseleave", function (e) { this.style.opacity = 0.9; });
        el[i].addEventListener("click", function (e) { myClick(this); }, false);
    }

    // Get the input field
    var input = document.getElementById("username-input");

    // Execute a function when the user releases a key on the keyboard
    input.addEventListener("keyup", function(event) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        if(input.value != "")
        {
            local_user = input.value;
            input.value = "";
            console.log("user accepted");
        }
    }
    });
    
    socket.onmessage = function (event) { //#B
        //console.log(event);
        var msg = JSON.parse(event.data);

        if (msg.type === "start") {

            console.log(msg.dataled);

            let id_keys = Object.keys(msg.dataled);
            console.log(id_keys);

            for(let id of id_keys)
            {
                changeled(id, msg.dataled[id]);
            }

            console.log(msg.datargb);
            id_keys = Object.keys(msg.datargb);

            let r = id_keys[0];
            let g = id_keys[1];
            let b = id_keys[2];

            showRVal(msg.datargb[r]);
            showGVal(msg.datargb[g]);
            showBVal(msg.datargb[b]);

            changeColor();

        }

        else if (msg.type === "led")
        {
            console.log(msg.data);

            let id_keys = Object.keys(msg.data);

            let id = id_keys[0];
            let time = id_keys[1];
            let user = id_keys[2];

            changeled(id, msg.data[id]);

            addLog(msg.data[time],
                msg.data[user],
                'changed item ' + id + ' to ' + msg.data[id]);
        }

        else if (msg.type === "rgb")
        {
            console.log(msg.data);

            let id_keys = Object.keys(msg.data);

            let r = id_keys[0];
            let g = id_keys[1];
            let b = id_keys[2];

            showRVal(msg.data[r]);
            showGVal(msg.data[g]);
            showBVal(msg.data[b]);

            changeColor();
            
        }

        else if (msg.type === "sensor")
        {
            console.log(msg.data);

            let id_keys = Object.keys(msg.data);
            let date = id_keys[0];
            let ranVal = id_keys[1];

            setSensorData(msg.data[date], msg.data[ranVal]);

            
        }
    };


    socket.onerror = function (error) {
        console.log('WebSocket error!');
        console.log(error);
    };


});


function setSensorData(date, ranVal) {

	if (data) {
		data.addRow([date, ranVal]);
		if (data.getNumberOfRows() > maxDataPoints) {
			data.removeRow(0);
		}
		chart.draw(data, options);
	}
}