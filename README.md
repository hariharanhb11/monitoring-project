# 📊 Enterprise Kubernetes Monitoring & Centralized Logging — AWS EKS

![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
![AWS EKS](https://img.shields.io/badge/AWS%20EKS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white)
![Helm](https://img.shields.io/badge/Helm-0F1689?style=for-the-badge&logo=helm&logoColor=white)
![CloudWatch](https://img.shields.io/badge/CloudWatch-FF4F8B?style=for-the-badge&logo=amazonaws&logoColor=white)

> **Production-grade observability** — Full-stack Kubernetes monitoring and centralized logging on Amazon EKS using Prometheus, Grafana, Fluent Bit, and Amazon CloudWatch Logs.

---

## 📌 Project Overview

This project implements a **complete Kubernetes observability platform** on Amazon EKS covering:

- 📈 **Real-time metrics** collection and visualization
- 🔔 **Custom alerting** for infrastructure and application health
- 📋 **Centralized log management** via CloudWatch
- 🗄️ **PostgreSQL database monitoring**
- ☸️ **Cluster, node, pod, and deployment visibility**

Built following **production DevOps and SRE practices** using industry-standard open-source tools.

---

## 🧠 Solution Architecture

```
                              Users
                                │
                                ▼
                  AWS Application Load Balancer
                                │
                                ▼
              Monitoring Demo Application (Node.js)
                                │
           ┌────────────────────┴────────────────────┐
           │                                         │
           ▼                                         ▼
    Prometheus Server                           Fluent Bit
           │                                         │
           ▼                                         ▼
   Grafana Dashboards                   Amazon CloudWatch Logs
           │
    ┌──────┴──────┐
    ▼             ▼
Kubernetes    Application
 Metrics       Metrics
    │
    ▼
PostgreSQL Database
```

---

## 🛠️ Technology Stack

| Category | Technology |
|---|---|
| **Cloud Platform** | AWS |
| **Container Orchestration** | Kubernetes (Amazon EKS) |
| **Container Runtime** | Docker |
| **Application** | Node.js |
| **Database** | PostgreSQL |
| **Metrics Collection** | Prometheus |
| **Visualization** | Grafana |
| **Node Metrics** | Node Exporter |
| **Kubernetes Metrics** | kube-state-metrics |
| **Service Discovery** | ServiceMonitor (Prometheus Operator) |
| **Alert Rules** | PrometheusRule |
| **Log Forwarding** | Fluent Bit (DaemonSet) |
| **Log Storage** | Amazon CloudWatch Logs |
| **Package Manager** | Helm |

---

## 📁 Project Structure

```
monitoring-demo/
├── app/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js                  # Node.js app with /metrics endpoint
│
├── k8s/
│   ├── namespace.yaml             # Namespace definition
│   ├── deployment.yaml            # Application deployment
│   ├── service.yaml               # Service + Load Balancer
│   ├── postgres.yaml              # PostgreSQL deployment
│   ├── servicemonitor.yaml        # Prometheus auto-discovery
│   └── prometheus-rule.yaml       # Custom alert rules
│
├── screenshots/                   # Dashboard and validation screenshots
├── architecture/                  # Architecture diagrams
├── docs/                          # Additional documentation
└── README.md
```

---

## 🔍 Solution Components

### ☸️ Amazon EKS
Hosts the Kubernetes cluster running all workloads — the demo application, PostgreSQL, Prometheus, Grafana, Fluent Bit, and all supporting monitoring components.

---

### 📦 Monitoring Demo Application (Node.js)
A containerized application deployed on Kubernetes that exposes a **`/metrics` endpoint** for Prometheus scraping.

---

### 📡 Prometheus
Continuously scrapes metrics from Kubernetes components and the application.

**Collected metrics:**

| Source | Metrics |
|---|---|
| Application | HTTP requests, API metrics, response times, uptime |
| Node | CPU, memory, disk, network, load average |
| Kubernetes | Pod status, deployment health, replica counts |

---

### 📊 Grafana Dashboards

Four production-grade dashboards imported and validated:

| Dashboard | Grafana ID | Metrics Covered |
|---|---|---|
| **Node Exporter Full** | `1860` | CPU, memory, filesystem, network, disk, system load |
| **Kubernetes Cluster** | `15757` | Cluster health, nodes, namespaces, pod distribution, resource utilization |
| **Kubernetes Pod** | `6417` | Pod CPU, memory, network, restarts, container stats |
| **Kubernetes Deployment** | `8588` | Deployment health, replica availability, deployment status |

---

### 🔔 Custom Prometheus Alert Rules

Four alert rules deployed via `PrometheusRule`:

| Alert | Condition |
|---|---|
| `MonitoringDemoDown` | Application is unreachable |
| `HighCPUUsage` | CPU usage exceeds threshold |
| `HighMemoryUsage` | Memory usage exceeds threshold |
| `PodRestarting` | Pod restart count increasing |

> Alerts were validated by scaling the deployment to zero and confirming the `Firing` state in Prometheus.

---

### 🪵 Fluent Bit (Log Forwarding)

Runs as a **DaemonSet** on every EKS worker node.

```
Kubernetes Pods
      │
      ▼  (reads container logs + Kubernetes metadata)
 Fluent Bit
      │
      ▼
Amazon CloudWatch Logs
```

Responsibilities:
- Collects all container logs from worker nodes
- Enriches logs with Kubernetes pod/namespace metadata
- Forwards to CloudWatch Log Groups in real time

---

### ☁️ Amazon CloudWatch Logs

Serves as the **centralized log storage** layer.

Benefits:
- Single pane for all container logs across the cluster
- Historical log retention and search
- Application troubleshooting without `kubectl exec`
- Audit trail for all workloads

---

## 📈 Metrics Coverage

### Infrastructure Metrics
- CPU Utilization
- Memory Utilization
- Disk & Filesystem Usage
- Network Traffic
- Node Load Average

### Kubernetes Metrics
- Node / Pod / Container Status
- Deployment & ReplicaSet Health
- Namespace Resource Usage
- Pod Restart Counts

### Application Metrics
- HTTP Request Rate
- API Response Metrics
- Application Availability & Uptime

### Database Metrics
- PostgreSQL Availability
- Database Connectivity
- Database Health Status

---

## ✅ Validation Summary

| Component | Validation |
|---|---|
| **Application** | Deployed on EKS, accessible via AWS Load Balancer, `/metrics` endpoint active |
| **Prometheus** | ServiceMonitor discovery working, targets reported `UP`, metrics scraping confirmed |
| **Grafana** | All 4 dashboards rendering live data, real-time updates verified via traffic generation |
| **Alerts** | `MonitoringDemoDown` alert transitioned to `Firing` on deployment scale-down |
| **Fluent Bit** | Container logs collected and forwarded to CloudWatch Log Groups |
| **CloudWatch** | Logs visible and searchable across all application pods |

---

## 🔄 Monitoring & Logging Workflows

### Metrics Flow

```
Application /metrics endpoint
          │
          ▼
    Prometheus scrape
          │
          ▼
   Grafana dashboards
          │
          ▼
   Alert rules evaluated
```

### Logging Flow

```
Pod stdout / stderr
          │
          ▼
   Fluent Bit DaemonSet
   (+ Kubernetes metadata)
          │
          ▼
  CloudWatch Log Groups
```

---

## 🚀 Future Enhancements

The platform can be extended with:

| Enhancement | Description |
|---|---|
| **Alertmanager** | Email / PagerDuty / Slack / Teams notifications |
| **Amazon Managed Prometheus** | Fully managed Prometheus at scale |
| **Amazon Managed Grafana** | Managed Grafana with IAM integration |
| **Loki** | Kubernetes-native log aggregation |
| **Jaeger / Tempo** | Distributed tracing across microservices |
| **OpenTelemetry** | Unified metrics, logs, and traces pipeline |
| **Advanced PostgreSQL Monitoring** | `pg_stat_statements`, query performance, connection pools |
| **Custom Business Metrics** | Application-level KPIs exposed via Prometheus client |

---

## 🎓 Key Takeaways

- **ServiceMonitor** eliminates manual Prometheus config — Prometheus Operator handles service discovery automatically
- **DaemonSet for Fluent Bit** ensures no node is ever missed for log collection
- **Node Exporter + kube-state-metrics** together give full coverage — OS-level and Kubernetes-object-level metrics
- **PrometheusRule** keeps alert definitions version-controlled alongside the application code
- **CloudWatch** integration enables log access without direct cluster access — critical for ops and security teams

---

## 🏁 Summary

This project delivers an **end-to-end Kubernetes observability platform** covering metrics, visualization, alerting, and centralized logging — all running on Amazon EKS.

| ✅ Capability | Tool |
|---|---|
| Metrics Collection | Prometheus |
| Visualization | Grafana |
| Node Monitoring | Node Exporter |
| Kubernetes Object Metrics | kube-state-metrics |
| Alert Rules | PrometheusRule |
| Log Forwarding | Fluent Bit |
| Centralized Log Storage | Amazon CloudWatch Logs |
| Deployment | Helm |

---

*Platform: Amazon EKS | Observability Stack: Prometheus · Grafana · Fluent Bit · CloudWatch*
*Architecture: Production-inspired DevOps / SRE monitoring practices*

