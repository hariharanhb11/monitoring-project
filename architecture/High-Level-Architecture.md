# 🏗️ High-Level Architecture

## Enterprise Kubernetes Monitoring & Centralized Logging — AWS EKS

---

## 📌 Overview

This document describes the architecture of the **Enterprise Kubernetes Monitoring and Observability Platform** deployed on Amazon EKS.

The platform provides:

- **Real-time metrics** collection from nodes, pods, containers, and applications
- **Interactive dashboards** via Grafana
- **Custom alerting** via Prometheus alert rules and Alertmanager
- **Centralized log management** via Fluent Bit and Amazon CloudWatch Logs

---

## 🧠 Solution Architecture

```
                                     Users
                                       │
                                       │ HTTP Request
                                       ▼
                          AWS Elastic Load Balancer (ELB)
                                       │
                                       ▼
                    Kubernetes Service (LoadBalancer Type)
                                       │
                                       ▼
                         Monitoring Demo Application
                                  (Node.js)
                                       │
                 ┌─────────────────────┴─────────────────────┐
                 │                                           │
                 ▼                                           ▼
         PostgreSQL Database                     Prometheus Metrics
                 │                                           │
                 │                                           ▼
                 │                                   ServiceMonitor
                 │                                           │
                 │                                           ▼
                 │                                      Prometheus
                 │                                           │
                 │                       ┌───────────────────┴──────────────────┐
                 │                       │                                      │
                 ▼                       ▼                                      ▼
        Application Data          Alert Rules                          Grafana Dashboards
                                        │                                      │
                                        ▼                                      ▼
                                  Alertmanager                    Infrastructure Visualization
```

---

## 🖥️ Worker Node Distribution

```
────────────────────────────────────────────────────────────────
 Amazon EKS — Managed Worker Nodes
────────────────────────────────────────────────────────────────

  Node 1                    Node 2                    Node 3
  ──────────────────        ──────────────────        ──────────────────
  Monitoring App Pod        PostgreSQL                Grafana
  Node Exporter             Prometheus                Alertmanager
  kube-proxy                kube-state-metrics        Node Exporter
  aws-node                  kube-proxy                kube-proxy
  EBS CSI Driver            aws-node                  aws-node

────────────────────────────────────────────────────────────────

  (Optional — runs on all nodes)

  Fluent Bit DaemonSet  →  Amazon CloudWatch Logs

────────────────────────────────────────────────────────────────
```

---

## 🏗️ Infrastructure Overview

| Component | Detail |
|---|---|
| **Cloud Provider** | AWS |
| **Kubernetes Platform** | Amazon EKS |
| **Region** | `us-east-1` |
| **Kubernetes Version** | `v1.31` |
| **Cluster Name** | `monitoring-cluster` |
| **Worker Nodes** | 3 |
| **Monitoring Stack** | kube-prometheus-stack (Helm) |
| **Metrics Tool** | Prometheus |
| **Dashboard Tool** | Grafana |
| **Database** | PostgreSQL |
| **Storage** | Amazon EBS (Persistent Volume) |
| **Package Manager** | Helm |
| **Logging** | Fluent Bit + Amazon CloudWatch Logs |

---

## ☸️ Cluster Resource Summary

| Resource | Count |
|---|---|
| **Worker Nodes** | 3 |
| **Namespaces** | 2 (`kube-system`, `monitoring`) |
| **Deployments** | 8 |
| **StatefulSets** | 2 |
| **DaemonSets** | 5 |
| **Persistent Volume Claims** | 1 |
| **LoadBalancer Services** | 1 |

---

## 🏛️ Control Plane & Node Architecture

```
                    Amazon EKS Cluster
          ┌─────────────────────────────────────┐
          │           Control Plane             │
          │  ┌─────────────┐  ┌─────────────┐  │
          │  │  API Server │  │   Scheduler │  │
          │  └─────────────┘  └─────────────┘  │
          │  ┌──────────────────┐  ┌────────┐  │
          │  │ Controller Mgr   │  │  ETCD  │  │
          │  └──────────────────┘  └────────┘  │
          └──────────────────┬──────────────────┘
                             │
     ────────────────────────┼────────────────────────
                 Managed Worker Nodes
     ────────────────────────┼────────────────────────
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
           Node 1          Node 2          Node 3
         (App Layer)    (Data Layer)   (Observability)
```

---

## 🔄 Kubernetes Resource Flow

```
Deployment
    │
    ▼
ReplicaSet
    │
    ▼
Pods
    │
    ▼
Service
    │
    ▼
AWS Load Balancer
    │
    ▼
Users
```

---

## 📡 Monitoring Architecture

### Metrics Collection Flow

```
Monitoring Application
         │
         ▼
  /metrics endpoint
         │
         ▼
   ServiceMonitor          ← Auto-discovers app, no manual config needed
         │
         ▼
     Prometheus            ← Scrapes, stores as time-series data
         │
         ▼
      Grafana              ← Queries Prometheus via PromQL
         │
         ▼
  Interactive Dashboards   ← Visualized for the operations team
```

### Alert Flow

```
Metrics in Prometheus
         │
         ▼
  PrometheusRule           ← Evaluates alert conditions continuously
         │
         ▼
   Alertmanager            ← Routes alerts to notification channels
         │
         ▼
Alert Generated
(Email / Slack / SNS)
```

---

## 🪵 Logging Architecture

```
Application stdout / stderr
         │
         ▼
  Container Logs (per node)
         │
         ▼
  Fluent Bit DaemonSet     ← Runs on every worker node
  + Kubernetes metadata
         │
         ▼
  Amazon CloudWatch Logs   ← Centralized, searchable log storage
         │
         ▼
  Log Analysis & Audit
```

---

## 🔍 Monitoring Components

### 1. Amazon EKS
Hosts the complete platform — handles pod scheduling, service networking, load balancing, and self-healing.

### 2. Monitoring Demo Application (Node.js)

| Endpoint | Purpose |
|---|---|
| `/` | Application homepage |
| `/health` | Health check |
| `/metrics` | Prometheus metrics scrape target |

### 3. PostgreSQL
Application database — connected internally via Kubernetes Service with Amazon EBS persistent storage.

### 4. Prometheus
| Responsibility | Detail |
|---|---|
| Service Discovery | Via ServiceMonitor CRD |
| Metrics Collection | Nodes, pods, containers, app, database |
| Storage | Time-series database (TSDB) |
| Querying | PromQL |
| Alert Evaluation | Continuous rule evaluation |

### 5. Grafana — Imported Dashboards

| Dashboard | ID | Covers |
|---|---|---|
| Node Exporter Full | `1860` | CPU, memory, disk, network, load |
| Kubernetes Cluster | `15757` | Cluster health, nodes, namespaces, resource utilization |
| Kubernetes Pods | `6417` | Pod CPU, memory, network, restarts |
| Kubernetes Deployments | `8588` | Deployment health, replica availability |

### 6. Node Exporter
Runs as a **DaemonSet** — one pod per worker node. Exports OS-level metrics: CPU, memory, disk, filesystem, network, load average.

### 7. kube-state-metrics
Provides Kubernetes object state metrics: Deployments, ReplicaSets, StatefulSets, Pods, Nodes, Services, Namespaces.

### 8. ServiceMonitor
Tells Prometheus Operator which services to scrape — **no manual Prometheus config needed**.

### 9. PrometheusRule — Custom Alerts

| Alert | Trigger |
|---|---|
| `MonitoringDemoDown` | Application is unreachable |
| `HighCPUUsage` | CPU exceeds defined threshold |
| `HighMemoryUsage` | Memory exceeds defined threshold |
| `PodRestarting` | Pod restart count is increasing |

### 10. Alertmanager
Receives alerts from Prometheus. Integrates with: Email, Slack, Microsoft Teams, Amazon SNS.

### 11. Fluent Bit
DaemonSet on every node. Collects pod and container logs, enriches with Kubernetes metadata, forwards to CloudWatch.

---

## 🔁 End-to-End Data Flow

```
User
 │
 ▼
AWS Load Balancer
 │
 ▼
Kubernetes Service
 │
 ▼
Application Pods
 │
 ├──────────────────────────────────────┐
 │                                      │
 ▼                                      ▼
/metrics endpoint                 stdout / stderr logs
 │                                      │
 ▼                                      ▼
Prometheus ──────────────────► Fluent Bit DaemonSet
 │                                      │
 ▼                                      ▼
Grafana Dashboards              CloudWatch Logs
 │
 ▼
Operations Team
```

---

## 🛡️ High Availability Features

| Feature | Mechanism |
|---|---|
| Multi-node cluster | 3 worker nodes across availability zones |
| Pod failure recovery | Kubernetes self-healing deployments |
| Database persistence | Amazon EBS Persistent Volume |
| Load balancing | AWS ELB across healthy pods |
| Metrics persistence | StatefulSet deployment for Prometheus |
| Alert state persistence | StatefulSet deployment for Alertmanager |
| Service abstraction | Kubernetes Services decouple pods from consumers |

---

## 🚀 Future Enhancements

| Enhancement | Category |
|---|---|
| Horizontal Pod Autoscaler (HPA) | Scaling |
| Cluster Autoscaler / Karpenter | Scaling |
| Amazon Managed Prometheus (AMP) | Managed Services |
| Amazon Managed Grafana (AMG) | Managed Services |
| Loki | Log Aggregation |
| Tempo / Jaeger | Distributed Tracing |
| OpenTelemetry Collector | Unified Observability Pipeline |
| Amazon SNS / Slack / Teams Alerts | Alerting |
| Multi-Cluster Monitoring | Scale-Out |
| ArgoCD GitOps | Deployment Automation |
| Cross-Region Disaster Recovery | Resilience |

---

*Platform: Amazon EKS `us-east-1` | Stack: Prometheus · Grafana · Fluent Bit · CloudWatch*
*Cluster: `monitoring-cluster` | Nodes: 3 × Managed Worker Nodes*