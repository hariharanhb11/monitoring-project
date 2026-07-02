const express = require("express");
const client = require("prom-client");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

// -------------------------------
// Prometheus Metrics
// -------------------------------

client.collectDefaultMetrics();

const requestCounter = new client.Counter({
    name: "http_requests_total",
    help: "Total HTTP Requests",
    labelNames: ["method", "route", "status"]
});

const requestDuration = new client.Histogram({
    name: "http_request_duration_seconds",
    help: "HTTP Request Duration",
    labelNames: ["method", "route"],
    buckets: [0.1, 0.3, 0.5, 1, 2, 5]
});

// -------------------------------
// Middleware
// -------------------------------

app.use((req, res, next) => {

    const end = requestDuration.startTimer();

    res.on("finish", () => {

        requestCounter.inc({
            method: req.method,
            route: req.route?.path || req.path,
            status: res.statusCode
        });

        end({
            method: req.method,
            route: req.route?.path || req.path
        });

    });

    next();

});

// -------------------------------
// Routes
// -------------------------------

app.get("/", async (req, res) => {

    try {

        const result = await pool.query("SELECT NOW()");

        console.log(`API Request received at ${new Date().toISOString()}`);

        res.json({

            application: "Monitoring Demo",

            status: "Running",

            database_time: result.rows[0].now

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            status: "Database Error"

        });

    }

});

app.get("/health", (req, res) => {

    res.status(200).send("Healthy");

});

app.get("/metrics", async (req, res) => {

    res.set("Content-Type", client.register.contentType);

    res.end(await client.register.metrics());

});

// -------------------------------
// Startup
// -------------------------------

console.log("Starting Monitoring Demo Application...");

app.listen(PORT, () => {

    console.log(`Application is running on port ${PORT}`);

});