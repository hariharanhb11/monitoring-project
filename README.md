# Enterprise Kubernetes Monitoring & Centralized Logging on AWS EKS

## Project Overview

This project demonstrates a complete Kubernetes Monitoring and Centralized Logging solution deployed on **Amazon EKS** using industry-standard open-source monitoring tools.

The objective is to monitor the health of a containerized application, Kubernetes cluster, worker nodes, and PostgreSQL database while collecting centralized logs for troubleshooting and operational visibility.

This project simulates a production-ready monitoring platform using Prometheus, Grafana, Fluent Bit, and Amazon CloudWatch.

---

# Project Architecture

```
                           Users
                             │
                             ▼
                    AWS Load Balancer
                             │
                             ▼
                  Monitoring Demo Application
                             │
          ┌──────────────────┴──────────────────┐
          │                                     │
          ▼                                     ▼
   Prometheus Server                     Fluent Bit
          │                                     │
          ▼                                     ▼
      Grafana Dashboard               Amazon CloudWatch Logs

          │
          ▼
   PostgreSQL Database

```

---

# Technologies Used

| Technology         | Purpose                 |
| ------------------ | ----------------------- |
| AWS EKS            | Kubernetes Cluster      |
| Amazon EC2         | Worker Nodes            |
| Kubernetes         | Container Orchestration |
| Docker             | Containerization        |
| PostgreSQL         | Database                |
| Prometheus         | Metrics Collection      |
| Grafana            | Monitoring Dashboards   |
| Node Exporter      | Node Metrics            |
| kube-state-metrics | Kubernetes Metrics      |
| ServiceMonitor     | Prometheus Discovery    |
| PrometheusRule     | Alert Rules             |
| Fluent Bit         | Log Collection          |
| Amazon CloudWatch  | Centralized Logging     |
| Helm               | Package Management      |

---

# Project Objectives

The project provides monitoring for

* Kubernetes Cluster
* Worker Nodes
* Application Pods
* CPU Usage
* Memory Usage
* Network Usage
* Filesystem Usage
* API Response Metrics
* PostgreSQL Metrics
* Centralized Application Logs

---

# Repository Structure

```
monitoring-demo
│
├── app/
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   └── ...
│
├── k8s/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── postgres.yaml
│   ├── servicemonitor.yaml
│   ├── prometheus-rule.yaml
│   ├── namespace.yaml
│   └── ...
│
├── screenshots/
│
├── architecture/
│
├── docs/
│
└── README.md
```

---

# Step 1 – Create EKS Cluster

Create an Amazon EKS Cluster.

Create a managed node group.

Verify cluster connectivity.

```
kubectl get nodes
```

Expected Output

```
Ready
Ready
```

---

# Step 2 – Deploy Monitoring Application

Deploy the application.

```
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

Verify

```
kubectl get pods

kubectl get svc
```

Access the application through the AWS Load Balancer.

---

# Step 3 – Deploy PostgreSQL

Deploy PostgreSQL.

```
kubectl apply -f postgres.yaml
```

Verify

```
kubectl get pods
```

Database will be used by the application.

---

# Step 4 – Install kube-prometheus-stack

Add Helm Repository

```
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

helm repo update
```

Install Monitoring Stack

```
helm install monitoring prometheus-community/kube-prometheus-stack \
-n monitoring \
--create-namespace
```

Verify

```
kubectl get pods -n monitoring
```

Expected Components

* Prometheus
* Grafana
* Alertmanager
* Node Exporter
* kube-state-metrics
* Prometheus Operator

---

# Step 5 – Configure ServiceMonitor

Create ServiceMonitor

```
kubectl apply -f servicemonitor.yaml
```

Verify

```
kubectl get servicemonitor -n monitoring
```

Prometheus automatically discovers the application.

---

# Step 6 – Verify Prometheus Targets

Open Prometheus

Navigate to

```
Status

↓

Targets
```

Verify

```
monitoring-demo

UP
```

This confirms Prometheus is scraping the application metrics.

---

# Step 7 – Configure Grafana

Login to Grafana.

Import the following dashboards.

## Dashboard 1

Node Exporter Dashboard

ID

```
1860
```

Displays

* CPU
* Memory
* Filesystem
* Network
* Disk Usage

---

## Dashboard 2

Kubernetes Cluster Dashboard

ID

```
15757
```

Displays

* Cluster Health
* Nodes
* Namespaces
* Pods

---

## Dashboard 3

Kubernetes Pod Dashboard

ID

```
6417
```

Displays

* Pod CPU
* Pod Memory
* Pod Network
* Pod Restarts

---

## Dashboard 4

Deployment Dashboard

ID

```
8588
```

Displays

* Deployments
* Replica Count
* Availability
* Deployment Health

---

# Step 8 – Generate Application Traffic

Generate HTTP Requests

```
for i in {1..100}; do
curl http://<LoadBalancerDNS>/
done
```

Observe

Prometheus

↓

Query Metrics

Grafana

↓

Live CPU Graphs

↓

Memory Usage

↓

Application Metrics

---

# Step 9 – Configure Prometheus Alerts

Custom Alert Rules

MonitoringDemoDown

HighCPUUsage

HighMemoryUsage

PodRestarting

Deploy

```
kubectl apply -f prometheus-rule.yaml
```

Verify

Prometheus

↓

Alerts

The custom alert rules become available and can be tested by scaling the deployment.

---

# Step 10 – Centralized Logging

Deploy Fluent Bit.

Fluent Bit runs as a DaemonSet.

It collects logs from every Kubernetes node.

Log Flow

```
Pods

↓

Fluent Bit

↓

CloudWatch Logs
```

Verify

AWS Console

↓

CloudWatch

↓

Log Groups

↓

Application Logs

---

# Monitoring Components

## Application Monitoring

* Application Availability
* HTTP Requests
* API Metrics
* Response Time

---

## Node Monitoring

* CPU Usage
* Memory Usage
* Disk Usage
* Network Traffic

---

## Kubernetes Monitoring

* Cluster Health
* Node Status
* Pod Status
* Deployment Health
* Namespace Usage

---

## Database Monitoring

* PostgreSQL Availability
* Database Metrics
* Active Connections

---

# Project Validation

The project was validated using the following tests.

## Application Test

Application accessible through AWS Load Balancer.

---

## Prometheus Test

Application target appears as **UP**.

---

## Grafana Test

Imported dashboards display live metrics.

---

## Traffic Test

Generated HTTP traffic updates Prometheus and Grafana metrics.

---

## Alert Test

Scaling the application down triggers the custom alert rule in Prometheus.

---

## Logging Test

Application logs are successfully forwarded to Amazon CloudWatch Logs.

---

# Monitoring Flow

```
Application

↓

Prometheus

↓

Grafana
```

---

# Logging Flow

```
Pods

↓

Fluent Bit

↓

CloudWatch Logs
```

---

# Key Features

* Kubernetes Monitoring
* Node Monitoring
* Pod Monitoring
* Deployment Monitoring
* PostgreSQL Monitoring
* Centralized Logging
* Prometheus Alert Rules
* Live Grafana Dashboards
* AWS Cloud Integration

---

# Demo Walkthrough

## 1. Explain the Architecture

Describe how the application runs on Amazon EKS and how Prometheus, Grafana, Fluent Bit, and CloudWatch work together.

---

## 2. Show the Running Application

Open the application using the AWS Load Balancer.

---

## 3. Show Kubernetes Resources

```
kubectl get pods -n monitoring

kubectl get svc -n monitoring

kubectl get nodes
```

---

## 4. Open Prometheus

Demonstrate

* Targets
* Metrics
* Alert Rules

---

## 5. Open Grafana

Explain each imported dashboard.

Show

* CPU
* Memory
* Pod Health
* Cluster Status
* Deployment Status

---

## 6. Generate Traffic

Run

```
for i in {1..100}; do
curl http://<LoadBalancerDNS>/
done
```

Observe the graphs updating in Grafana.

---

## 7. Open CloudWatch

Navigate to

CloudWatch

↓

Log Groups

↓

Application Logs

Show centralized logging.

---

## 8. Explain Production Benefits

This solution enables:

* Centralized monitoring
* Centralized logging
* Faster troubleshooting
* Infrastructure visibility
* Performance analysis
* Kubernetes health monitoring
* Operational observability

---

# Future Enhancements

* Alertmanager Email Notifications
* Slack Notifications
* Microsoft Teams Integration
* Amazon SNS Integration
* AWS Managed Prometheus
* AWS Managed Grafana
* Loki Log Aggregation
* Jaeger Distributed Tracing
* OpenTelemetry Integration

---

# Conclusion

This project demonstrates an end-to-end Kubernetes observability platform on Amazon EKS using Prometheus, Grafana, Fluent Bit, and Amazon CloudWatch. It provides real-time monitoring of infrastructure, Kubernetes resources, application performance, and centralized logging, closely aligning with production monitoring practices used in enterprise cloud environments.
