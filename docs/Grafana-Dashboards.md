# Grafana Dashboards

The following Grafana dashboards are used to monitor the Kubernetes cluster, worker nodes, and application.

---

# 1. Node Exporter Full (Dashboard ID: 1860)

## Purpose

Monitor Kubernetes worker node health and resource utilization.

## Key Panels

- CPU Usage
- Memory Usage
- Disk Usage
- Filesystem Usage
- Network Traffic
- System Load
- Uptime

## Metrics Source

- Node Exporter

## If No Data

Possible reasons

- Node Exporter Pod not running
- Prometheus target is Down
- Wrong Prometheus datasource selected

## Verify

```bash
kubectl get pods -n monitoring
kubectl get daemonset -n monitoring
```

---

# 2. Kubernetes Cluster Monitoring

## Purpose

Monitor overall Kubernetes cluster health and resource usage.

## Key Panels

- Cluster CPU Usage
- Cluster Memory Usage
- Cluster Disk Usage
- Node Count
- Running Pods
- Deployments
- Container Status
- Namespace Resource Usage

## Metrics Source

- Prometheus
- kube-state-metrics
- Node Exporter

## If No Data

Possible reasons

- kube-state-metrics not running
- Prometheus target Down
- Wrong namespace selected

## Verify

```bash
kubectl get pods -n monitoring
```

---

# 3. Kubernetes Deployment / StatefulSet / DaemonSet Metrics

## Purpose

Monitor Kubernetes workloads and application resources.

## Key Panels

- Deployment CPU Usage
- Deployment Memory Usage
- Available Replicas
- Unavailable Replicas
- Cluster CPU
- Cluster Memory
- Disk Usage
- Network I/O

## Metrics Source

- Prometheus
- kube-state-metrics
- cAdvisor

## If No Data

Check

```bash
kubectl get deployment -A
kubectl get statefulset -A
kubectl get daemonset -A
```

---

# 4. Kubernetes Views / Global

## Purpose

Monitor overall cluster utilization and Kubernetes resources.

## Key Panels

- Global CPU Usage
- Global Memory Usage
- Running Pods
- Running Containers
- CPU by Namespace
- Memory by Namespace
- Node Utilization
- Network Utilization

## Metrics Source

- Prometheus
- kube-state-metrics
- Node Exporter

## If No Data

Check

```bash
kubectl get pods -n monitoring
```

---

# Dashboard Troubleshooting

## No Data

Possible reasons

- Wrong Prometheus datasource
- Prometheus not running
- Node Exporter not running
- kube-state-metrics not running
- Wrong dashboard variables
- Wrong namespace selected
- No application traffic
- Time range too short

---

## Verify Prometheus Datasource

Grafana

```
Connections
    ↓
Data Sources
    ↓
Prometheus
    ↓
Save & Test
```

Expected Result

```
Datasource is working
```

---

## Check Prometheus Targets

Open Prometheus

```
Status
   ↓
Targets
```

Every target should be

```
UP
```

---

## Generate Live Data

Generate application traffic

```bash
while true
do
  curl http://<LOAD_BALANCER_URL>
  sleep 1
done
```

Stop

```text
Ctrl + C
```

Within a few seconds, the CPU, Memory, Network, Requests/sec, and Pod graphs will update automatically.

---

# Dashboards Used

| Dashboard | Purpose |
|------------|---------|
| **Node Exporter Full (1860)** | Worker node monitoring |
| **Kubernetes Cluster Monitoring** | Cluster health and resource usage |
| **Kubernetes Deployment / StatefulSet / DaemonSet Metrics** | Workload monitoring |
| **Kubernetes Views / Global** | Overall cluster utilization |

These dashboards together demonstrate infrastructure health, Kubernetes resource status, workload monitoring, node utilization, and application performance for the monitoring demo.