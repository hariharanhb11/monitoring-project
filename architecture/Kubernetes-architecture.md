# ☸️ Kubernetes Architecture

## Cluster Overview

| Detail | Value |
|---|---|
| **Cloud Provider** | AWS |
| **Platform** | Amazon EKS |
| **Cluster Name** | `monitoring-cluster` |
| **Region** | `us-east-1` (N. Virginia) |
| **Kubernetes Version** | `v1.31.14-eks-7d6f6ec` |

---

## 📊 Resource Summary

| Resource | Count |
|---|---|
| **Worker Nodes** | 3 |
| **Total Pods** | 25 |
| **Namespaces** | 2 |
| **Deployments** | 8 |
| **StatefulSets** | 2 |
| **DaemonSets** | 4 (active) |
| **Services** | 20 |
| **LoadBalancer Services** | 1 |
| **Persistent Volume Claims** | 1 |
| **Ingress** | 0 |

---

## 🖥️ Worker Nodes

| Node | Status | Version | Age |
|---|---|---|---|
| `ip-192-168-15-237.ec2.internal` | ✅ Ready | v1.31.14-eks-7d6f6ec | 21h |
| `ip-192-168-5-92.ec2.internal` | ✅ Ready | v1.31.14-eks-7d6f6ec | 5h |
| `ip-192-168-59-227.ec2.internal` | ✅ Ready | v1.31.14-eks-7d6f6ec | 29h |

Each node runs: `kube-proxy` · `aws-node (VPC CNI)` · `ebs-csi-node` · `node-exporter`

---

## 📦 Pods — All Namespaces (25 Total)

### `kube-system` — 14 Pods

| Pod | Ready | Status |
|---|---|---|
| `aws-node-qn96l` | 2/2 | ✅ Running |
| `aws-node-s62qx` | 2/2 | ✅ Running |
| `aws-node-v8955` | 2/2 | ✅ Running |
| `coredns-79767d7cc-f8zlh` | 1/1 | ✅ Running |
| `coredns-79767d7cc-nq8zl` | 1/1 | ✅ Running |
| `ebs-csi-controller-74f6678474-sf9hk` | 6/6 | ✅ Running |
| `ebs-csi-controller-74f6678474-xpjmg` | 6/6 | ✅ Running |
| `ebs-csi-node-8hmrg` | 3/3 | ✅ Running |
| `ebs-csi-node-9lh2s` | 3/3 | ✅ Running |
| `ebs-csi-node-nxt6q` | 3/3 | ✅ Running |
| `kube-proxy-f42r9` | 1/1 | ✅ Running |
| `kube-proxy-f4frh` | 1/1 | ✅ Running |
| `kube-proxy-n47j9` | 1/1 | ✅ Running |
| `metrics-server-84c7d8c58-8c42d` | 1/1 | ✅ Running |

### `monitoring` — 11 Pods

| Pod | Ready | Status |
|---|---|---|
| `alertmanager-monitoring-kube-prometheus-alertmanager-0` | 2/2 | ✅ Running |
| `monitoring-demo-f69c77d74-cxxnb` | 1/1 | ✅ Running |
| `monitoring-demo-f69c77d74-qkscz` | 1/1 | ✅ Running |
| `monitoring-grafana-846bf585cd-srh8p` | 3/3 | ✅ Running |
| `monitoring-kube-prometheus-operator-7474dc5856-ksvnc` | 1/1 | ✅ Running |
| `monitoring-kube-state-metrics-8588bb4b88-clgkf` | 1/1 | ✅ Running |
| `monitoring-prometheus-node-exporter-4jsjd` | 1/1 | ✅ Running |
| `monitoring-prometheus-node-exporter-5wrrm` | 1/1 | ✅ Running |
| `monitoring-prometheus-node-exporter-7pnn2` | 1/1 | ✅ Running |
| `postgres-995685b97-p7cmv` | 1/1 | ✅ Running |
| `prometheus-monitoring-kube-prometheus-prometheus-0` | 2/2 | ✅ Running |

---

## 🚀 Deployments (8 Total)

| Namespace | Deployment | Ready | Available |
|---|---|---|---|
| `kube-system` | `coredns` | 2/2 | ✅ 2 |
| `kube-system` | `ebs-csi-controller` | 2/2 | ✅ 2 |
| `kube-system` | `metrics-server` | 1/1 | ✅ 1 |
| `monitoring` | `monitoring-demo` | 2/2 | ✅ 2 |
| `monitoring` | `monitoring-grafana` | 1/1 | ✅ 1 |
| `monitoring` | `monitoring-kube-prometheus-operator` | 1/1 | ✅ 1 |
| `monitoring` | `monitoring-kube-state-metrics` | 1/1 | ✅ 1 |
| `monitoring` | `postgres` | 1/1 | ✅ 1 |

---

## 🗂️ StatefulSets (2 Total)

| Namespace | StatefulSet | Ready | Purpose |
|---|---|---|---|
| `monitoring` | `prometheus-monitoring-kube-prometheus-prometheus` | 1/1 | Metrics storage |
| `monitoring` | `alertmanager-monitoring-kube-prometheus-alertmanager` | 1/1 | Alert management |

---

## 👾 DaemonSets (4 Active)

| Namespace | DaemonSet | Desired | Ready | Purpose |
|---|---|---|---|---|
| `kube-system` | `aws-node` | 3 | 3 | AWS VPC CNI networking |
| `kube-system` | `kube-proxy` | 3 | 3 | Kubernetes networking |
| `kube-system` | `ebs-csi-node` | 3 | 3 | EBS volume management |
| `monitoring` | `monitoring-prometheus-node-exporter` | 3 | 3 | Node metrics collection |

---

## 🌐 Services (20 Total)

### `monitoring` Namespace

| Service | Type | Cluster IP | External IP / Port |
|---|---|---|---|
| `monitoring-demo` | **LoadBalancer** | `10.100.194.162` | `a8d5ae08...us-east-1.elb.amazonaws.com:80` |
| `monitoring-grafana` | ClusterIP | `10.100.113.117` | Port `80` |
| `monitoring-kube-prometheus-prometheus` | ClusterIP | `10.100.78.13` | Port `9090` |
| `monitoring-kube-prometheus-alertmanager` | ClusterIP | `10.100.202.178` | Port `9093` |
| `monitoring-kube-prometheus-operator` | ClusterIP | `10.100.166.200` | Port `443` |
| `monitoring-kube-state-metrics` | ClusterIP | `10.100.66.139` | Port `8080` |
| `monitoring-prometheus-node-exporter` | ClusterIP | `10.100.176.186` | Port `9100` |
| `postgres` | ClusterIP | `10.100.32.134` | Port `5432` |
| `prometheus-operated` | ClusterIP (Headless) | None | Port `9090` |
| `alertmanager-operated` | ClusterIP (Headless) | None | Port `9093` |

### `kube-system` Namespace

| Service | Type | Purpose |
|---|---|---|
| `kube-dns` | ClusterIP | DNS resolution (`53/UDP`, `53/TCP`) |
| `metrics-server` | ClusterIP | Kubernetes Metrics API |
| `monitoring-kube-prometheus-kubelet` | ClusterIP (Headless) | Kubelet metrics scraping |
| `monitoring-kube-prometheus-coredns` | ClusterIP (Headless) | CoreDNS metrics |
| `monitoring-kube-prometheus-kube-proxy` | ClusterIP (Headless) | kube-proxy metrics |
| `monitoring-kube-prometheus-kube-etcd` | ClusterIP (Headless) | etcd metrics |
| `monitoring-kube-prometheus-kube-scheduler` | ClusterIP (Headless) | Scheduler metrics |
| `monitoring-kube-prometheus-kube-controller-manager` | ClusterIP (Headless) | Controller manager metrics |
| `eks-extension-metrics-api` | ClusterIP | EKS extension metrics |

---

## 💾 Persistent Storage

| PVC | Namespace | Capacity | Mode | Storage Class | Status |
|---|---|---|---|---|---|
| `postgres-pvc` | `monitoring` | `5 GiB` | RWO | `gp2` | ✅ Bound |

---

## 🔄 Traffic & Monitoring Flow

```
User
 │
 ▼
AWS Load Balancer (ELB)
 │  a8d5ae08...us-east-1.elb.amazonaws.com:80
 ▼
monitoring-demo Service (LoadBalancer)
 │
 ▼
monitoring-demo Pods (2 replicas)
 │
 ├──────────────────────────┐
 ▼                          ▼
PostgreSQL               /metrics endpoint
(ClusterIP:5432)              │
                              ▼
                         ServiceMonitor
                              │
                              ▼
                          Prometheus (StatefulSet)
                              │
                              ▼
                       Grafana Dashboards
```

---

## 🏥 Cluster Health

| Component | Status |
|---|---|
| Worker Nodes (3/3) | ✅ Ready |
| Monitoring Demo App (2/2 pods) | ✅ Running |
| Prometheus | ✅ Running |
| Grafana | ✅ Running |
| Alertmanager | ✅ Running |
| PostgreSQL | ✅ Running |
| Node Exporter (3/3 nodes) | ✅ Running |
| kube-state-metrics | ✅ Running |
| CoreDNS (2/2) | ✅ Running |
| EBS CSI Driver | ✅ Running |

---

*Cluster: `monitoring-cluster` | Region: `us-east-1` | Version: `v1.31.14-eks-7d6f6ec`* 