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

var config = require('./etc/config'),
    dnode = require('dnode'),
    net = require('net'),
    connect = require('connect'),
    http = require('http'),
    serveStatic = require('serve-static'),
    bodyParser = require('body-parser');

var nodesCount = 0;
var activeNodes = [];
var stats = {
        errors: 0,
        success: 0
    };


var server = net.createServer(function (node) {
    var d = dnode(function(node){
        this.stats = function (s) {
            console.log("New stats report:",s);
        }
        this.ping = function (s){
            console.log("=> New ping received:" + s);
        }
    });

    d.on('remote',function(node){
        activeNodes.push(node);
        console.log("New Node conected! "+activeNodes.length+" ready.");
    });

    d.on('end',function(node){
        activeNodes.shift(node);
        console.log("One Node less :( "+activeNodes.length+" still here");
    })
    node.pipe(d).pipe(node);
});

/**
 * Start the Dnode Server Listener
 */
server.listen(config.port);


/**
 *  
 */
var app = connect();

app.use(serveStatic('./www'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/run', function (req, res, next) {
    console.log(req.body);

    activeNodes.forEach(function(node){
        node.run(req.body.url,req.body.req);
    });

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ activeNodes: activeNodes.length, result: 'ok', message: 'DDoS Started' }));

    next();
});

app.use('/stop', function (req, res, next) {
    console.log("Deactivating DDoS nodes");

    activeNodes.forEach(function(node){
        node.stop();
    });

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ result: 'ok', message: 'DDoS Deactivated' }));

    next();
});

app.use('/stats', function (req, res, next) {
    // TODO: Send aggragated stats from all nodes
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ activeNodes: activeNodes.length }));
    next();
});

/**
 * Start the Web Server
 */
http.createServer(app).listen(3000)

