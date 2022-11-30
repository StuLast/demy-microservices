# DEMO ONLY --- Toutmaster ticket reseller demo ---- DEMO ONLY

## Pre-Requisites for local dev environment

Install the following:

- NodeJS : https://nodejs.org/en/
- Docker Desktop : https://www.docker.com/products/docker-desktop/
- Install Kubernetes from Docker Desktop : https://kubernetes.io/docs/setup/
- Install kubectl: https://kubernetes.io/docs/tasks/tools/

Enable Kubernetes in Docker Desktop

Then Install:

- Skaffold : https://skaffold.dev/
- ingress nginx : `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.5.1/deploy/static/provider/cloud/deploy.yaml`

## Running the dev environment

From the root of the project run `skaffold dev`
