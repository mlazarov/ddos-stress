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

var Stress = require('./');

var StressServer = new Stress();

StressServer.run('178.237.56.152',10);

