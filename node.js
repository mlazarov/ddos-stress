#!/usr/bin/env node
/*
 * DDoS Stress
 * https://github.com/mlazarov/ddos-stress
 *
 * Copyright (c) 2015, Martin Lazarov
 * Licensed under the MIT license.
 */

/**
 * Module dependencies.
 */

var dnode = require('dnode'),
    stress = require('./'),
    config = require('./etc/config'),
    ddos = new stress();

/**
 * Connect to the dnode Server
 */

var d = dnode({
    run: function (url, concurent){
        ddos.runningState = true;
        ddos.resetStats();
        ddos.run(url,concurent);
        console.log('DDoS started');
    },
    stop: function (){
        console.log("Terminating DDoS");
        ddos.runningState = false;
    }
}).connect(config.server,config.port, function(remote,conn){
    console.log('=> We are connected to the server! Sending ping...');

    function reqStats(){
        if(ddos.runningState){
            remote.stats(ddos.stats);
        }
        stats = setTimeout(reqStats,1000);
    }
    var stats = setTimeout(reqStats,1000);
});


/**
 * Catch errors
 */

d.on('error', function(err){
    console.log(err.toString());
});

d.on('fail', function(err){
    console.log(err);
});

d.on('end', function(err){
    console.log("=> Connection to the server closed");
});

