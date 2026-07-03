# Kubernetes Architecture

## Overview

This project is deployed on a single Amazon EKS cluster running in the **us-east-1 (N. Virginia)** region.

The Kubernetes cluster hosts the application, PostgreSQL database, Prometheus monitoring stack, Grafana dashboards, and supporting monitoring components.

---

# Cluster Summary

| Resource | Count |
|----------|------:|
| Kubernetes Cluster | 1 |
| Worker Nodes | 3 |
| Namespaces | 2 (kube-system, monitoring) |
| Deployments | 8 |
| StatefulSets | 2 |
| DaemonSets | 4 |
| Services | 15 |
| Persistent Volume Claims | 1 |
| LoadBalancer Services | 1 |
| Ingress | 0 |

---

# Worker Nodes

The EKS cluster consists of three EC2 worker nodes.

| Node |
|------|
| ip-192-168-15-237 |
| ip-192-168-5-92 |
| ip-192-168-59-227 |

Each worker node runs:

- kube-proxy
- AWS VPC CNI
- EBS CSI Driver
- Prometheus Node Exporter

---

# Namespaces

## kube-system

Contains Kubernetes system components.

Resources include:

- CoreDNS
- kube-proxy
- AWS VPC CNI
- EBS CSI Driver
- Metrics Server

---

## monitoring

Contains the monitoring solution.

Resources include:

- Monitoring Demo Application
- PostgreSQL
- Prometheus
- Alertmanager
- Grafana
- Prometheus Operator
- kube-state-metrics
- Node Exporter

---

# Deployments

| Deployment | Replicas |
|------------|---------:|
| monitoring-demo | 2 |
| postgres | 1 |
| monitoring-grafana | 1 |
| monitoring-kube-prometheus-operator | 1 |
| monitoring-kube-state-metrics | 1 |
| coredns | 2 |
| metrics-server | 1 |
| ebs-csi-controller | 2 |

---

# StatefulSets

| StatefulSet | Purpose |
|-------------|---------|
| Prometheus | Metrics storage |
| Alertmanager | Alert management |

---

# DaemonSets

DaemonSets run one pod on every worker node.

| DaemonSet | Purpose |
|-----------|---------|
| aws-node | AWS VPC CNI |
| kube-proxy | Kubernetes networking |
| ebs-csi-node | EBS volume management |
| monitoring-prometheus-node-exporter | Node metrics collection |

Current Node Exporter Pods:

- 3 Pods (One per worker node)

---

# Services

The project exposes the following important services.

| Service | Type |
|----------|------|
| monitoring-demo | LoadBalancer |
| Prometheus | ClusterIP |
| Grafana | ClusterIP |
| PostgreSQL | ClusterIP |
| Alertmanager | ClusterIP |
| kube-state-metrics | ClusterIP |
| Node Exporter | ClusterIP |

---

# Storage

Persistent storage is provided using Amazon EBS.

| PVC | Capacity |
|-----|---------:|
| postgres-pvc | 5 GiB |

Storage Class:

- gp2

---

# Monitoring Architecture

Prometheus collects metrics from:

- Kubernetes Nodes
- kube-state-metrics
- Node Exporter
- Monitoring Demo Application
- Kubernetes API
- Control Plane Components

Grafana visualizes metrics using Prometheus as the data source.

---

# Traffic Flow

User

↓

AWS Load Balancer

↓

Monitoring Demo Service

↓

Monitoring Demo Pods

↓

PostgreSQL

Prometheus continuously scrapes metrics from all Kubernetes components and the application.

Grafana queries Prometheus to display dashboards.

---

# High Availability

The application is deployed with:

- 2 replicas
- Automatic pod scheduling
- Kubernetes self-healing
- Load balancing across replicas

If one application pod fails:

- Kubernetes automatically routes traffic to the healthy pod.
- A replacement pod is created automatically.

---

# Current Cluster Status

- Cluster Status: Healthy
- Worker Nodes: 3 Ready
- Monitoring Stack: Running
- Prometheus: Running
- Grafana: Running
- PostgreSQL: Running
- Monitoring Application: Running (2 Pods)