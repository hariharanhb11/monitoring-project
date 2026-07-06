# 📈 Prometheus Queries

## Overview

This document contains the Prometheus (PromQL) queries used during the monitoring demo along with an explanation of what each graph represents and how to interpret it.

---

# 1. Node CPU Usage

### Query

```promql
rate(node_cpu_seconds_total{mode!="idle"}[5m])
```

### Purpose

Shows the CPU utilization of each Kubernetes worker node.

### Graph Details

| Property | Description |
|----------|-------------|
| **X-Axis** | Time |
| **Y-Axis** | CPU Usage (CPU seconds/second) |
| **Each Line** | One CPU core of a worker node |

### Expected Result

- Stable values when the cluster is idle.
- CPU usage increases when application traffic increases.

---

# 2. Node Memory Usage

### Query

```promql
node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes
```

### Purpose

Displays the amount of RAM currently being used on each worker node.

### Graph Details

| Property | Description |
|----------|-------------|
| **X-Axis** | Time |
| **Y-Axis** | Memory Used (Bytes/GiB) |
| **Each Line** | One Kubernetes worker node |

### Expected Result

- Memory usage remains relatively stable.
- Usage increases as more applications or workloads run.

---

# 3. Memory Utilization (%)

### Query

```promql
100 * (1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes))
```

### Purpose

Shows memory utilization as a percentage.

### Graph Details

| Property | Description |
|----------|-------------|
| **X-Axis** | Time |
| **Y-Axis** | Memory Utilization (%) |
| **Each Line** | One Kubernetes worker node |

### Expected Result

- Displays the percentage of RAM currently in use.
- Higher values indicate increased memory consumption.

---

# 4. Filesystem (Disk) Usage

### Query

```promql
100 - (
node_filesystem_avail_bytes * 100 /
node_filesystem_size_bytes
)
```

### Purpose

Displays disk usage percentage for mounted filesystems.

### Graph Details

| Property | Description |
|----------|-------------|
| **X-Axis** | Time |
| **Y-Axis** | Disk Usage (%) |
| **Each Line** | One mounted filesystem |

### Expected Result

- Disk usage changes slowly over time.
- Helps identify storage consumption.

---

# 5. Network Receive Traffic

### Query

```promql
rate(node_network_receive_bytes_total[5m])
```

### Purpose

Shows incoming network traffic received by each network interface.

### Graph Details

| Property | Description |
|----------|-------------|
| **X-Axis** | Time |
| **Y-Axis** | Bytes/sec |
| **Each Line** | One network interface |

### Expected Result

- Traffic increases when clients send requests to the application.

---

# 6. Network Transmit Traffic

### Query

```promql
rate(node_network_transmit_bytes_total[5m])
```

### Purpose

Shows outgoing network traffic from each worker node.

### Graph Details

| Property | Description |
|----------|-------------|
| **X-Axis** | Time |
| **Y-Axis** | Bytes/sec |
| **Each Line** | One network interface |

### Expected Result

- Outgoing traffic increases when the application sends responses.

---

# 7. Running Pods

### Query

```promql
count(kube_pod_status_phase{phase="Running"})
```

### Purpose

Displays the total number of running Pods in the Kubernetes cluster.

### Graph Details

| Property | Description |
|----------|-------------|
| **X-Axis** | Time |
| **Y-Axis** | Number of Running Pods |
| **Graph Type** | Single line |

### Expected Result

- Should remain stable unless Pods are created or deleted.

---

# 8. Running Worker Nodes

### Query

```promql
count(kube_node_info)
```

### Purpose

Shows the total number of Kubernetes worker nodes.

### Graph Details

| Property | Description |
|----------|-------------|
| **X-Axis** | Time |
| **Y-Axis** | Number of Worker Nodes |
| **Graph Type** | Single line |

### Expected Result

For this project:

```
2
```

---

# 9. Deployment Replicas

### Query

```promql
kube_deployment_status_replicas_available
```

### Purpose

Shows the number of available replicas for each deployment.

### Graph Details

| Property | Description |
|----------|-------------|
| **X-Axis** | Time |
| **Y-Axis** | Number of Available Replicas |
| **Each Line** | One Kubernetes Deployment |

### Expected Result

- Replica count matches the desired deployment replicas.
- Helps identify unavailable deployments.

---

# 10. Pod Restarts

### Query

```promql
increase(kube_pod_container_status_restarts_total[1h])
```

### Purpose

Shows the number of container restarts during the last hour.

### Graph Details

| Property | Description |
|----------|-------------|
| **X-Axis** | Time |
| **Y-Axis** | Restart Count |
| **Each Line** | One Pod |

### Expected Result

- Normally remains **0**.
- Any increase may indicate application or container issues.

---

# 11. Application Requests

### Query

```promql
rate(http_requests_total[1m])
```

### Purpose

Shows the incoming HTTP requests handled by the application.

### Graph Details

| Property | Description |
|----------|-------------|
| **X-Axis** | Time |
| **Y-Axis** | Requests per Second (Req/s) |
| **Graph Type** | Single line |

### Expected Result

- Increases when users access the application.
- Useful for demonstrating live traffic.

### Generate Sample Traffic

```bash
while true
do
  curl http://<LOAD_BALANCER_URL>
  sleep 1
done
```

Stop:

```bash
Ctrl + C
```

---

# 12. Application Health

### Query

```promql
up{job="monitoring-demo"}
```

### Purpose

Checks whether Prometheus can successfully scrape the application metrics.

### Graph Details

| Property | Description |
|----------|-------------|
| **X-Axis** | Time |
| **Y-Axis** | Health Status |
| **Graph Type** | Single line |

### Values

| Value | Meaning |
|------:|---------|
| **1** | Application is healthy and being scraped |
| **0** | Application is down or unreachable |

---

# 13. Prometheus Targets Health

### Query

```promql
up
```

### Purpose

Shows the health status of all Prometheus scrape targets.

### Graph Details

| Property | Description |
|----------|-------------|
| **X-Axis** | Time |
| **Y-Axis** | Target Status |
| **Each Line** | One Prometheus target |

### Expected Result

- All targets should remain at **1 (UP)**.
- Any target showing **0** indicates a scraping or connectivity issue.

---

# Understanding Prometheus Graphs

## X-Axis

Represents **Time**.

Examples:

- Last 5 Minutes
- Last 1 Hour
- Last 24 Hours

---

## Y-Axis

Represents the value returned by the PromQL query.

Examples:

- CPU Usage
- Memory Usage
- Disk Usage
- Requests per Second
- Network Traffic
- Running Pods
- Running Nodes

---

## Graph Lines

Each colored line represents a different metric series.

Examples:

- One Worker Node
- One CPU Core
- One Deployment
- One Pod
- One Network Interface

---

# Troubleshooting

If a graph displays **No Data**, check the following:

- Prometheus is running.
- Node Exporter is running.
- kube-state-metrics is running.
- ServiceMonitor is configured.
- Application metrics endpoint is reachable.
- Prometheus targets are **UP**.
- Correct PromQL query is used.
- Dashboard time range is appropriate.

Useful commands:

```bash
kubectl get pods -n monitoring
```

```bash
kubectl get servicemonitor -n monitoring
```

Open Prometheus:

**Status → Targets**

All targets should display:

```
UP
```

---

# Summary

These Prometheus queries demonstrate the key monitoring capabilities of the project:

- ✅ Node CPU Usage
- ✅ Node Memory Usage
- ✅ Memory Utilization
- ✅ Filesystem (Disk) Usage
- ✅ Network Traffic (Receive & Transmit)
- ✅ Running Pods
- ✅ Running Worker Nodes
- ✅ Deployment Replicas
- ✅ Pod Restarts
- ✅ Application Request Rate
- ✅ Application Health
- ✅ Prometheus Target Health
