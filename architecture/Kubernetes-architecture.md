# ☸️ Kubernetes Architecture

## Overview

This project is deployed on **Amazon Elastic Kubernetes Service (EKS)** in **AWS us-east-1**. The Amazon EKS control plane is managed by AWS, while **2 worker nodes** host the application and monitoring workloads.

---

## Cluster Information

| Property | Value |
|----------|-------|
| Cloud Provider | AWS |
| Kubernetes Platform | Amazon EKS |
| Cluster Name | monitoring-demo |
| Region | us-east-1 |
| Kubernetes Version | v1.31 |
| Platform Version | eks.64 |
| Worker Nodes | 2 |

---

# Amazon EKS Kubernetes Architecture

```text
                               AWS Cloud
┌────────────────────────────────────────────────────────────────────────────┐
│                            Amazon EKS Cluster                             │
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                EKS Control Plane (Managed by AWS)                    │  │
│  │----------------------------------------------------------------------│  │
│  │ • API Server                                                         │  │
│  │ • Scheduler                                                          │  │
│  │ • Controller Manager                                                 │  │
│  │ • etcd                                                               │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│                            Kubernetes Worker Nodes                         │
│                                                                            │
│  ┌──────────────────────────┐        ┌──────────────────────────┐          │
│  │        Worker Node 1     │        │       Worker Node 2      │          │
│  │--------------------------│        │--------------------------│          │
│  │ • kubelet                │        │ • kubelet                │          │
│  │ • kube-proxy             │        │ • kube-proxy             │          │
│  │ • Container Runtime      │        │ • Container Runtime      │          │
│  │ • Application Pods       │        │ • Monitoring Pods        │          │
│  │ • Node Exporter          │        │ • Node Exporter          │          │
│  └──────────────────────────┘        └──────────────────────────┘          │
└────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
                               Kubernetes Resources
                                        │
      ┌─────────────┬──────────────┬──────────────┬──────────────┐
      ▼             ▼              ▼              ▼
  Namespaces   Deployments    StatefulSets    DaemonSets
      │             │              │              │
      ▼             ▼              ▼              ▼
 ConfigMaps    ReplicaSets     Prometheus    Node Exporter
 Secrets            │
                    ▼
                   Pods
                    │
      ┌─────────────┴──────────────┐
      ▼                            ▼
 monitoring-demo              PostgreSQL
      │                            │
      └──────────────┬─────────────┘
                     ▼
                  Services
                     │
                     ▼
        AWS Elastic Load Balancer
                     │
                     ▼
                    Users
```

---

## Kubernetes Resources

| Resource | Running |
|----------|---------:|
| Worker Nodes | **2** |
| Namespaces | **6** |
| Deployments | **8** |
| ReplicaSets | **8** |
| StatefulSets | **1** |
| DaemonSets | **6** |
| Pods | **21** |
| Services | **18** |
| Persistent Volume Claims | **1** |
| ConfigMaps | **38+** |
| Secrets | **9** |
| Ingress | **0** |

---

## Kubernetes Components

| Component | Running | Purpose |
|-----------|:------:|---------|
| **Namespace** | **6** | Logically separates Kubernetes resources. |
| **Pod** | **21** | Smallest deployable unit that runs containers. |
| **Deployment** | **8** | Manages stateless applications and rolling updates. |
| **ReplicaSet** | **8** | Maintains the desired number of Pod replicas. |
| **StatefulSet** | **1** | Manages stateful applications with persistent storage. |
| **DaemonSet** | **6** | Runs one Pod on every worker node. |
| **Service** | **18** | Enables communication between Pods. |
| **Persistent Volume Claim (PVC)** | **1** | Provides persistent storage for applications. |
| **ConfigMap** | **38+** | Stores application configuration. |
| **Secret** | **9** | Stores sensitive information securely. |

---

## Monitoring Architecture

```text
Node Exporter
       │
kube-state-metrics
       │
Application Metrics (/metrics)
       │
       ▼
 ServiceMonitor
       │
       ▼
  Prometheus
       │
 ┌─────┴──────┐
 ▼            ▼
Alertmanager  Grafana
                   │
                   ▼
             Dashboards
```

---

## Storage Architecture

```text
PostgreSQL Pod
       │
       ▼
Persistent Volume Claim (5 GiB)
       │
       ▼
AWS EBS Persistent Volume
```

---

## Summary

- Amazon EKS manages the Kubernetes control plane.
- Two worker nodes host the application and monitoring workloads.
- Deployments manage stateless applications.
- ReplicaSets ensure the required number of Pod replicas.
- A StatefulSet manages the Prometheus server.
- DaemonSets run node-level services such as Node Exporter and kube-proxy.
- Services provide internal networking and external access through an AWS Load Balancer.
- Prometheus collects metrics from Kubernetes, nodes, and the application.
- Grafana visualizes metrics using dashboards.
- PostgreSQL stores persistent data on an AWS EBS-backed Persistent Volume.