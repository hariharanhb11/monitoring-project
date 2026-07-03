# Grafana Dashboards

The following dashboards are used during the monitoring.

---

# 1. Node Exporter Full (Dashboard ID: 1860)

Purpose

Monitor worker node health.

Key Panels

* CPU Usage
* Memory Usage
* Disk Usage
* Filesystem Usage
* Network Traffic
* Load Average

If No Data

* Node Exporter Pod not running
* Prometheus target Down
* Wrong datasource

Verify

```bash
kubectl get pods -n monitoring
```

---

# 2. Kubernetes Cluster Monitoring (Dashboard ID: 15757)

Purpose

Monitor overall Kubernetes cluster.

Key Panels

* Cluster CPU
* Cluster Memory
* Node Count
* Pod Count
* Namespace Usage
* Resource Usage

If No Data

* kube-state-metrics unavailable
* Prometheus target Down

Verify

```bash
kubectl get pods -n monitoring
```

---

# 3. Kubernetes Pods (Dashboard ID: 6417)

Purpose

Monitor application pods.

Key Panels

* Pod CPU
* Pod Memory
* Pod Restarts
* Network Usage
* Pod Status

If No Data

Check

```bash
kubectl get pods -A
```

Pods should be Running.

---

# 4. Kubernetes Deployment (Dashboard ID: 8588)

Purpose

Monitor deployments.

Key Panels

* Available Replicas
* Desired Replicas
* Deployment Status
* Replica Count

If No Data

Check

```bash
kubectl get deployment -A
```

---

# Dashboard Troubleshooting

## No Data

Possible reasons

* Wrong Prometheus datasource
* Prometheus not running
* Node Exporter not running
* kube-state-metrics not running
* Wrong dashboard variables
* Wrong namespace selected
* No application traffic
* Time range too short

---

## Verify Prometheus Datasource

Grafana

Settings

↓

Data Sources

↓

Prometheus

↓

Test Connection

Should display:

```
Datasource is working
```

---

## Check Targets

Open Prometheus

Status

↓

Targets

Every target should be:

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

Stop:

```
Ctrl + C
```

Within a few seconds, CPU, Requests/sec, Network, and Pod graphs should update automatically.

---

# Dashboards


1. Node Exporter Full (1860)
2. Kubernetes Cluster (15757)
3. Kubernetes Pods (6417)
4. Kubernetes Deployment (8588)

These four dashboards demonstrate infrastructure health, Kubernetes resource status, application performance, and deployment health, covering all the monitoring capabilities implemented in this project.
