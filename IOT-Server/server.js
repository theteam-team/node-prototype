const express = require("express");
const SocketServer = require('ws').Server;


var id = 1;


var userName = 'Default';

var users = {

}

let status = {
	led: {
		led0: 0,
		led1: 0,
		led2: 0,
		led3: 0,
		led4: 0,
		led5: 0,
		led6: 0,
		led7: 0,
		led8: 0,
		led9: 0
	},
	rgb: {
		r: 0,
		g: 0,
		b: 0
	}
};

var sensor_data = [(new Date()).toLocaleTimeString(), Math.random() * 100]

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static(__dirname + "/public"));

app.get('/', function (req, res) {
	res.sendFile(__dirname + "/" + "index.html");
});

const server = app.listen(PORT, function () {
	console.log('Listening on PORT ' + PORT)
});

const wss = new SocketServer({ server });

wss.on('connection', function (ws) {
	console.log('Client connected');

	ws.send(JSON.stringify({
		type: "start",
        dataled: status.led,
        datargb: status.rgb
	}));

	ws.on('message', function (msg) {
		console.log('msg recieved');

		let rcvmsg = JSON.parse(msg);
		let type = rcvmsg.type;	//led or slider 

		var sndmsg = {
			type: type,
		};

		if (type === 'sensor') {

			userName = rcvmsg.data.user;
			return;
		}

		if (type === 'userName') {

			userName = rcvmsg.data.user;
			return;
		}

		if(type === 'rgb')
		{
			status[type]['r'] = rcvmsg.data.r;
			status[type]['g'] = rcvmsg.data.g;
			status[type]['b'] = rcvmsg.data.b;

			sndmsg = {
				type: type,
				data: {
					['r']: status[type]['r'],
					['g']: status[type]['g'],
					['b']: status[type]['b']
				}
			};

		}
		

		
		if (type === 'led') {

			let id = rcvmsg.data.id;
			let t = rcvmsg.data.time;
			let user = rcvmsg.data.user;

			status[type][id] ^= 1;

			sndmsg = {
				type: type,
				data: {
					[id]: status[type][id],
					['time']: t,
					['user']: user
				}
			};
		}

		//console.log(sndmsg);
		
		broadcast(JSON.stringify(sndmsg));

	});

	ws.on('close', function () {
		console.log('Client disconnected')
	});

});

function broadcast(msg) {
	wss.clients.forEach(function e(client) {
		if (client.readyState === client.OPEN) { // if client still connected
			client.send(msg);
		}
	});
}

setInterval(function () {

	var date = (new Date()).toLocaleTimeString();
	var ranVal = Math.random() * 100;

	let sndmsg = {
		type: "sensor",
		data: {
			['date']: date,
			['ranVal']: ranVal,
		}
	};

	broadcast(JSON.stringify(sndmsg));


	
}, 1000);