# Cluster Inventory

## Cluster Information

| Item | Value |
|------|-------|
| Cluster Name | monitoring-demo |
| Cloud Provider | AWS |
| Kubernetes Platform | Amazon EKS |
| Region | us-east-1 |
| Kubernetes Version | v1.31 |
| Worker Nodes | 2 |

---

# Cluster Resources

| Resource | Count |
|----------|------:|
| Namespaces | 6 |
| Deployments | 8 |
| StatefulSets | 1 |
| DaemonSets (Active) | 4 |
| ReplicaSets | 8 |
| Running Pods | 21 |
| Services | 19 |
| Persistent Volume Claims | 1 |
| ConfigMaps | 45+ |
| Secrets | 10 |
| Ingress | 0 |

---

# Worker Nodes

| Node | Status |
|------|--------|
| ip-192-168-59-199 | Ready |
| ip-192-168-6-208 | Ready |

---

# Monitoring Stack

- Prometheus
- Grafana
- Prometheus Operator
- Node Exporter
- kube-state-metrics

---

# Application

- monitoring-demo (2 Replicas)
- PostgreSQL
- AWS LoadBalancer Service

---

# Storage

| Resource | Value |
|----------|------|
| Storage Class | gp2 |
| PVC | postgres-pvc (5Gi) |

---

# Networking

| Resource | Count |
|----------|------|
| LoadBalancer Services | 1 |
| ClusterIP Services | 18 |
| Ingress | Not Configured |

---

# Cluster Health

| Component | Status |
|-----------|--------|
| Worker Nodes | ✅ Healthy |
| Monitoring Stack | ✅ Running |
| Demo Application | ✅ Running |
| PostgreSQL | ✅ Running |
| Prometheus | ✅ Running |
| Grafana | ✅ Running |