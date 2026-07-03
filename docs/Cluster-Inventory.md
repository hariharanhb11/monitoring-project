# Cluster-Inventory.md

# Cluster Inventory

## Cluster Information

| Item                | Value                   |
| ------------------- | ----------------------- |
| Cluster Name        | monitoring-cluster      |
| Cloud Provider      | AWS                     |
| Kubernetes Platform | Amazon EKS              |
| Region              | us-east-1 (N. Virginia) |
| Kubernetes Version  | v1.31                   |

---

## Worker Nodes

| Total Nodes | Status |
| ----------: | ------ |
|           3 | Ready  |

---

## Namespaces

* kube-system
* monitoring

---

## Workloads

| Resource                 | Count |
| ------------------------ | ----: |
| Deployments              |     8 |
| StatefulSets             |     2 |
| DaemonSets               |     4 |
| Running Pods             |    24 |
| Services                 |    15 |
| Persistent Volume Claims |     1 |

---

## Monitoring Components

* Prometheus
* Grafana
* Alertmanager
* Prometheus Operator
* Node Exporter
* kube-state-metrics

---

## Application Components

* Monitoring Demo Application (2 Replicas)
* PostgreSQL Database
* LoadBalancer Service

---

## Storage

| Resource      | Value                |
| ------------- | -------------------- |
| Storage Class | gp2                  |
| PVC           | postgres-pvc (5 GiB) |

---

## Networking

| Resource              | Value          |
| --------------------- | -------------- |
| LoadBalancer Services | 1              |
| ClusterIP Services    | 14             |
| Ingress               | Not Configured |

---

## Cluster Health

* Kubernetes Cluster: Healthy
* Worker Nodes: 3/3 Ready
* Monitoring Stack: Running
* Application: Running
* Database: Running
* Prometheus Targets: Healthy
