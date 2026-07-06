# ☸️ Kubernetes Architecture

## Overview

This project is deployed on **Amazon Elastic Kubernetes Service (EKS)** in **AWS us-east-1**.

The cluster consists of **2 Worker Nodes** running the application and monitoring stack. Monitoring is implemented using **Prometheus**, **Grafana**, **Node Exporter**, and **kube-state-metrics**.

---

## Cluster Information

| Property | Value |
|-----------|-------|
| Cloud Provider | AWS |
| Platform | Amazon EKS |
| Cluster Name | monitoring-demo |
| Region | us-east-1 |
| Kubernetes Version | v1.31 |
| Platform Version | eks.64 |
| Worker Nodes | 2 |

---

## Kubernetes Architecture

```text
                         AWS Cloud
                             │
                             ▼
                     Amazon EKS Cluster
                             │
        ┌────────────────────┴────────────────────┐
        │                                         │
        ▼                                         ▼
 Control Plane (Managed by AWS)            Worker Nodes (2)
                                           │
               ┌───────────────────────────┼────────────────────────────┐
               │                           │                            │
               ▼                           ▼                            ▼
        Deployments                  StatefulSet                  DaemonSets
               │                           │                            │
               ▼                           ▼                            ▼
          ReplicaSets                 Prometheus                Node Exporter
               │
               ▼
              Pods
               │
      ┌────────┴─────────┐
      ▼                  ▼
 PostgreSQL          monitoring-demo
      │                  │
      └──────────┬───────┘
                 ▼
              Services
                 │
                 ▼
            Load Balancer
                 │
                 ▼
                Users
```

---

## Kubernetes Resources

| Resource | Running |
|----------|--------:|
| Worker Nodes | **2** |
| Namespaces | **6** |
| Deployments | **8** |
| ReplicaSets | **8** |
| StatefulSets | **1** |
| DaemonSets | **6** *(4 active on Linux + 1 Windows template + 1 Fluent Bit)* |
| Pods | **21** |
| Services | **18** |
| Persistent Volume Claims | **1** |
| ConfigMaps | **38+** |
| Secrets | **9** |
| Ingress | **0** |

---

## Kubernetes Components

| Component | Running | Purpose |
|-----------|:-------:|---------|
| **Namespace** | **6** | Logically separates Kubernetes resources. |
| **Pod** | **21** | Smallest deployable unit that runs containers. |
| **Deployment** | **8** | Manages stateless applications and rolling updates. |
| **ReplicaSet** | **8** | Maintains the required number of Pod replicas. |
| **StatefulSet** | **1** | Manages stateful applications with persistent storage. |
| **DaemonSet** | **6** | Runs one Pod on every worker node. |
| **Service** | **18** | Enables communication between Pods. |
| **PVC** | **1** | Requests persistent storage from Kubernetes. |
| **ConfigMap** | **38+** | Stores application configuration. |
| **Secret** | **9** | Stores sensitive information securely. |

---

## Application Architecture

```text
                Internet
                    │
                    ▼
        AWS Elastic Load Balancer
                    │
                    ▼
      monitoring-demo Service (LoadBalancer)
                    │
                    ▼
        monitoring-demo Deployment
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
     Pod Replica 1       Pod Replica 2
          │                   │
          └─────────┬─────────┘
                    ▼
            PostgreSQL Service
                    │
                    ▼
           PostgreSQL Deployment
                    │
                    ▼
             Persistent Volume
                    │
                    ▼
         Persistent Volume Claim
```

---

## Monitoring Architecture

```text
Node Exporter
      │
kube-state-metrics
      │
Application /metrics
      │
      ▼
 ServiceMonitor
      │
      ▼
  Prometheus
      │
      ├────────► Alertmanager
      │
      ▼
   Grafana
      │
      ▼
 Dashboards
```

---

## Monitoring Components

| Component | Purpose |
|-----------|---------|
| **Prometheus** | Collects metrics from Kubernetes, Nodes, Pods and applications. |
| **Grafana** | Visualizes metrics through dashboards. |
| **Node Exporter** | Collects CPU, Memory, Disk and Network metrics from worker nodes. |
| **kube-state-metrics** | Exposes Kubernetes object metrics (Pods, Deployments, Services, etc.). |
| **metrics-server** | Provides CPU and Memory metrics for `kubectl top`. |
| **Alertmanager** | Manages and routes Prometheus alerts. |

---

## Storage

```text
PostgreSQL Pod
      │
      ▼
Persistent Volume Claim (5 Gi)
      │
      ▼
AWS EBS Volume
```

---

## Summary

- ✅ Amazon EKS manages the Kubernetes Control Plane.
- ✅ 2 Worker Nodes run the application and monitoring workloads.
- ✅ Deployments manage stateless applications.
- ✅ ReplicaSets maintain the required number of Pods.
- ✅ StatefulSet manages Prometheus with persistent storage.
- ✅ DaemonSets run system components on every node.
- ✅ Services provide internal and external communication.
- ✅ Prometheus collects metrics from the cluster.
- ✅ Grafana displays metrics through dashboards.
- ✅ PostgreSQL stores application data on an AWS EBS-backed Persistent Volume.