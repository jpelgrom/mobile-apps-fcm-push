'use strict';

const functions = require('firebase-functions/v1');
const { initializeApp } = require('firebase-admin/app');

// We need to initialize the app before importing modules that want Firestore.
initializeApp();

const android = require('./android');
const legacy = require('./legacy');

const region = process.env.APP_REGION || 'us-central1';
const regionalFunctions = functions.region(region).runWith({ timeoutSeconds: 10 });

// These must be imported before the handlers to ensure they are initialized correctly
process.env.DEBUG = isDebug().toString();
process.env.REGION = region;

const { handleRequest, handleCheckRateLimits } = require('./handlers');

exports.androidV1 = regionalFunctions.https.onRequest(async (req, res) =>
  handleRequest(req, res, android.createPayload),
);

exports.sendPushNotification = regionalFunctions.https.onRequest(async (req, res) =>
  handleRequest(req, res, legacy.createPayload),
);

exports.checkRateLimits = regionalFunctions.https.onRequest(async (req, res) =>
  handleCheckRateLimits(req, res),
);

function isDebug() {
  if (process.env.APP_DEBUG_LOCAL !== undefined) {
    return process.env.APP_DEBUG_LOCAL === 'true';
  }
  return false;
}

exports.handleRequest = handleRequest;
exports.handleCheckRateLimits = handleCheckRateLimits;
