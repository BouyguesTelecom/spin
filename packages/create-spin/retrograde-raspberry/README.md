# Custom Template Bytel for Spin  🌀

![Type: Helm Chart](https://img.shields.io/badge/Helm-0F1689?style=for-the-badge&logo=Helm&labelColor=0F1689) ![AppVersion: 1.16.0](https://img.shields.io/badge/kubernetes-326ce5.svg?&style=for-the-badge&logo=kubernetes&logoColor=white)

Find in this directory all the config , devOps files you need to be compatible with the Bouygues Telecom cluster.

| File                                    | Description                                                                                   |
|-----------------------------------------|-----------------------------------------------------------------------------------------------|  
| `/helms/templates/ingress.yml`          | Ingress Configuration your application.                                                       | 
| `/helms/templates/prisme-connector.yml` | PrismeConnector is a resource that sends your logs to PRISME.                                 | 
| `.gitlab-ci.yml`                        | Contains the configuration for your CI/CD pipeline.                                           |
| `.npmrc`                                | Stores the feed URLs and credentials that Npm uses.                                           |
| `LICENSE`                               | Include Bouygues Telecom license                                                              |
| `package.json`                          | Specifics of npm's package.json handling. It includes the design system : Trilogy             |
| `renovate.json`                         | Configuration for Renovate : Automated dependency updates. Multi-platform and multi-language. |

## `/helms/templates` folder

Templates generate manifest files, which are YAML-formatted resource descriptions that Kubernetes can understand.

## `/helms/templates/ingress.yml`
### 🔎 How to use it ?
To be able to consume this ingress, it is <u>necessary</u> that the `domain` and `environment` values are present in your configuration reference to be able to deploy your app dynamically on each cluster.

[Go to the referentiel configuration 👈](https://gitlab.int.nbyt.fr/referentiel-configuration)

<b>Example :  </b>

```yaml
> referentiel-configuration/benevolat/ap1/helms/values-env.yaml

environment: ap1
domain: www.apps.ocp-1.pin.prd.mlb.nbyt.fr

> referentiel-configuration/benevolat/prod/helms/values-env.yaml

environment: prod
domain: www.apps.ocp-3.ocp.euw3r53.nbyt.fr
```

⚠️ If you're using the registry helm `spin-helms`, in the values.yaml file of your application, you have to configure your values as follows:

```yaml
spin:
    ingress:
        enabled: false
```
[More about spin-helms 👈 ](https://github.com/sara-picoud/spin-helms)

## `/helms/templates/prisme-connector.yml`
### 🔎 How to use it ?

To benefit prisme connector, all you need is your PRISME user and password.
It is <u>necessary</u> that the `prisme.username` and `prisme.password` values are present in your configuration reference to be able to get the logs inside all the different cluster.

[More about Prisme 👈 ](https://confluence.bouyguestelecom.fr/pages/viewpage.action?spaceKey=PRISME&title=Les+parcours+PRISME)

<b>Exemple</b>
```yaml
> referentiel-configuration/palpatine_partials/ap1/helms/values-env.yaml

prisme:
  username: Palpatine_Landing_Pages_TBD
  password: xxxxxx
  
> referentiel-configuration/palpatine_partials/prod/helms/values-env.yaml

prisme:
  username: Palpatine_Landing_Pages_PRD
  password: xxxxxx
```
## `.gitlab-ci.yml`
### 🔎 How to use it ?

We have created a fairly comprehensive CI for your applications. It combines the 3 main jobs that you need, using CI templates to streamline the code and to ensure that you benefit from the latest updates !

#### Variables 

```yaml
variables:
  ST_NAME: ""
  HTTP_PROXY: ""
  HTTPS_PROXY: ""
  NO_PROXY: ""
  DOCKER_REGISTRY_HOST: registry.glouton.int.nbyt.fr # registry bytel
  DOCKER_REGISTRY_PATH: "" #st name in lowercase
  ARTIFACTORY_PATH: "" # st/st_name/app_name
```

#### Default

```yaml
default:
  image: commun/devops/ci/delivery-tools:5-LATEST #Image of ci
  before_script:
    - export VERSION=$(echo "$CI_COMMIT_TAG" | sed -n 's/.*@//p')
    - sed -i "s/__VERSION_GATEWAY__/VERSION/" helms/chart_name/values.yaml 
    # replace chart_name with your chart's name > helms/chart_name/...
    # This feature allows you to retrieve your GitLab tag, set it as a version, and use it to dynamically manage image versions.
```

#### Include 
[More about CI template 👈 ](https://gitlab.int.nbyt.fr/COMMUN/frontoffice/templates )

```yaml
include:
  - project: "COMMUN/frontoffice/templates"
    ref: 1.7.0
    file:
      - "/ci/install-playbook-template.yml" 
      - "/ci/publish-container-template.yml"
      - "/ci/publish-assets-template.yml"
```

#### Jobs

```yaml
stages:
  - docker # /ci/publish-container-template.yml
  - helm # /ci/install-playbook-template.yml
  - a7 # /ci/publish-assets-template.ym 
  
  # publish-assets is optionnal. 
  # Use it in the case of uploading static asset files (image, js, json, etc.)
```
## `package.json`
### 🧐 To do what ?
Take advantage of the Bytel dependencies that suit you!
Our design system: Trilogy

[More about Trilogy 👈 ](https://gitlab.int.nbyt.fr/COMMUN/frontoffice/trilogy-react-ts)


## `.npmrc`
### 🧐 To do what ?

A .npmrc file is a configuration file for the Node.js package manager, npm. This file defines configuration options for npm such as the `Glouton registry` (npm bytel) to use when installing packages `@bytel`

## `LICENCE`
### 🧐 To do what ?

Using a license on corporate projects is important for protection, transparency, brand image, legality, and compliance with legal requirements.

## `renovate.json`
### 🧐 To do what ?

Automated dependency updates.This configuration file allows you to connect Renovate to your project's GitLab.

[More about renovate 👈 ](https://docs.renovatebot.com/)