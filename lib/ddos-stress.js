/*
 * DDoS Stress
 * https://github.com/mlazarov/ddos-stress
 *
 * Copyright (c) 2015, Martin Lazarov
 * Licensed under the MIT license.
 */

'use strict';

/*
 * Module Dependencies
 */

var request = require('superagent'),
    runningState = false;

require('colors');

/**
 * `Api` constructor.
 *
 */

function Api(){
    this.stats = {
        errors: 0,
        success: 0,
        loop: 0
    };
}

/**
 * Method responsible for sending requests to a target
 *
 * @method run
 * @public
 * @param {String} url Url of a target
 * @param {Number} concurent Maximum Concurent Connections
 */

Api.prototype.run = function run(url, concurent) {
   var that = this;

    function attack() {
        if(that.runningState == false){
            console.log("Runing State: Stop.")
            clearInterval(killer);
            return;
        }
        that.stats.loop++;
        console.log("Loop: "+that.stats.loop+" Current stats: errors("+that.stats.errors+") success("+that.stats.success+")");

        for (var i = 0; i < concurent; i++) {
            //console.log("Req:"+url);
            request
                .get(url)
                .query({
                    stress_test: "test"
                })
                .end(function(err, res) {
                    //console.log("error:",err);
                    if (err) {
                        that.stats.errors++;
                        if (err.code === 'ECONNREFUSED' || err.code === 'ECONNRESET') {
                            
                        }
                        return;
                    }
                    
                    that.stats.success++;
                    
                    // TODO: Track res.statusCode.toString() results
                });
        }
    }

    //Start Killer
    var killer = setInterval(attack, 1000);
};

/**
 * Method for clearing stats
 */

Api.prototype.resetStats = function resetStats() {
    var that = this;
    that.stats = {
        errors: 0,
        success: 0,
        loop: 0
    };
}


/**
 * Expose `Api`
*/

module.exports = Api;
