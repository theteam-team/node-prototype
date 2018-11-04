<!Doctype html>
<html>

<head>
    <meta charset="utf-8" />
    <title>IOT Lab(1)</title>
    <link rel="icon" type="image/png" href="imgs/iot.png" />
    <meta charset="utf-8">
	<meta name="description" content="Welcome to my website">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" type="text/css" media="screen" href="css/style.css" />
    <!--
        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    -->

    <script type="text/javascript" src="js/chart/loader.js"></script>
    <script type="text/javascript" src="js/chart/main.js"></script>

</head>

<body>
    <div class="header">
        <!--<form onsubmit="submitUser()">-->
            <input style="float:right;" type="text" id="username-input" placeholder="Enter your name" />
        <!-- </form> -->

    </div>

    <div class="header">
        <h1>IOT Control Pannel</h1>
    </div>

    <div class="outer" id="div1">
        <div class="caption">Digital I/O</div>
        <div class="inner">
            <button class="led" id="led0">led 0</button>
            <button class="led" id="led1">led 1</button>
            <button class="led" id="led2">led 2</button>
            <button class="led" id="led3">led 3</button>
            <button class="led" id="led4">led 4</button>
            <button class="led" id="led5">led 5</button>
            <button class="led" id="led6">led 6</button>
            <button class="led" id="led7">led 7</button>
            <button class="led" id="led8">led 8</button>
            <button class="led" id="led9">led 9</button>
        </div>
    </div>

    <div class="outer" id="div2">
        <div class="caption">Slider</div>
        <div class="inner">
            
            <div class="row red-bg">
                <p class="column1">Red:</p>
                <p class="column3">
                      0  <input type="range" id="rrange" min="0" max="255" step="1" value="0" onchange="sendr(this.value)"> 255
                </p>
                <p class="column2" id="rvalue">Value: 0</p>
            </div>

            <div class="row green-bg">
                <p class="column1">Green:</p>
                <p class="column3">
                        0  <input type="range" id="grange" min="0" max="255" step="1" value="0" onchange="sendg(this.value)"> 255
                  </p>
                <p class="column2" id="gvalue">Value: 0</p>
            </div>

            <div class="row blue-bg">
                <p class="column1">Blue:</p>
                <p class="column3">
                        0  <input type="range" id="brange" min="0" max="255" step="1" value="0" onchange="sendb(this.value)"> 255
                  </p>
                <p class="column2" id="bvalue">Value: 0</p>
            </div>

            <div class="row">
                <p class="column-auto">Result Color: </p>
                <div class="color-box column" style="background-color: #000000;" id="fvalue">
                </div>
            </div>

            </p>

        </div>
        
    </div>

    <div class="outer" id="wrapper">
        <div class="caption">Sensor Read</div>
        <div id="chart" style="padding: 10px;"></div>
    </div>

    <div class="outer">
        <div class="caption">Logs</div>
        <div class="inner" id="logs">
            
        </div>
    </div>

    <script src="js/main.js"></script>
</body>

</html>