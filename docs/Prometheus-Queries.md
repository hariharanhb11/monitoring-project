# Prometheus Queries

This document contains the Prometheus queries used during the monitoring demo along with an explanation of each graph.

---

# 1. Node CPU Usage

### Query

```promql
rate(node_cpu_seconds_total{mode!="idle"}[5m])
```

### Purpose

Shows CPU usage of each Kubernetes worker node.

### Graph

* **X-Axis:** Time
* **Y-Axis:** CPU seconds per second (CPU utilization rate)
* **Each Line:** One CPU core of one worker node

### Expected Result

* Stable line during idle
* Line increases when application traffic increases

---

# 2. Node Memory Usage

### Query

```promql
node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes
```

### Purpose

Shows RAM currently being used.

### Graph

* X-Axis → Time
* Y-Axis → Bytes
* Each Line → One Kubernetes node

---

# 3. Memory Percentage

### Query

```promql
100 * (1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes))
```

### Purpose

Shows percentage of memory utilization.

---

# 4. Filesystem Usage

### Query

```promql
100 - (
node_filesystem_avail_bytes * 100 /
node_filesystem_size_bytes
)
```

### Purpose

Displays disk usage percentage.

### Graph

* X-Axis → Time
* Y-Axis → Percentage (%)
* Each Line → Mounted filesystem

---

# 5. Network Receive

### Query

```promql
rate(node_network_receive_bytes_total[5m])
```

### Purpose

Incoming network traffic.

### Graph

* X-Axis → Time
* Y-Axis → Bytes/sec
* Each Line → Network Interface

---

# 6. Network Transmit

### Query

```promql
rate(node_network_transmit_bytes_total[5m])
```

### Purpose

Outgoing network traffic.

---

# 7. Node Load

### Query

```promql
node_load1
```

### Purpose

Average CPU load over the last minute.

---

# 8. Running Pods

### Query

```promql
count(kube_pod_status_phase{phase="Running"})
```

### Purpose

Displays total running pods in the cluster.

---

# 9. Running Nodes

### Query

```promql
count(kube_node_info)
```

### Purpose

Displays total worker nodes.

Expected Result:

3

---

# 10. Deployment Replicas

### Query

```promql
kube_deployment_status_replicas_available
```

### Purpose

Shows available replicas for each deployment.

---

# 11. Pod Restarts

### Query

```promql
increase(kube_pod_container_status_restarts_total[1h])
```

### Purpose

Shows restarted containers during the last hour.

---

# 12. Application Requests

### Query

```promql
rate(http_requests_total[1m])
```

### Purpose

Shows incoming HTTP requests to the application.

Generate traffic to see this graph increase.

---

# 13. Application Up

### Query

```promql
up{job="monitoring-demo"}
```

### Purpose

Checks whether Prometheus can scrape the application.

Values:

* 1 = Healthy
* 0 = Down

---

# 14. Prometheus Targets

### Query

```promql
up
```

### Purpose

Shows the health of all scrape targets.

---

# Understanding Prometheus Graphs

## X-Axis

Always represents **Time**.

Example:

* Last 5 minutes
* Last 1 hour
* Last 24 hours

---

## Y-Axis

Represents the value returned by the query.

Examples:

* CPU %
* Memory Bytes
* Requests/sec
* Network Bytes/sec
* Number of Pods

---

## Graph Lines

Each colored line represents one metric series.

Examples:

* One Kubernetes Node
* One CPU Core
* One Pod
* One Network Interface

---

# If Graph Shows "No Data"

Possible reasons:

* Exporter pod not running
* Target is Down
* Wrong PromQL query
* Application not generating metrics
* Wrong time range selected
* ServiceMonitor not configured
* Metrics endpoint unavailable

---

# Troubleshooting

Check Prometheus Targets

```
Status → Targets
```

All targets should be **UP**.

Check ServiceMonitor

```bash
kubectl get servicemonitor -n monitoring
```

Check Application

```bash
kubectl get pods -n monitoring
```

Check Metrics Endpoint

```
http://<application>/metrics
```

Verify Prometheus is scraping the application.

Generate application traffic and refresh the graph.
