# gl-ui

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Circle CI Build

https://circleci.com/gh/zmad5306/gl-ui

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Build with Docker

`docker build . -t zmad5306/gl-ui:latest`

`docker push zmad5306/gl-ui:latest`

## Continious Integration Builds

### GitHub Integration

#### Storage Bucket

A storage bucket is required to store an encrypted GitHub OAuth authenticaion token. This is utilzed by the builds to authenticate to GitHub to push changes, create branches and create pull requests. The name of the storage bucket is passed to the builds as Substitution Variables (see _GIT_HUB_KEY_BUCKET_NAME below).

#### Cryptographic Keys

In the Google Cloud Platform Console there must be a Cryptographic Key-Ring and Key created. The name of the key-ring and key are passed to the builds (see _KMS_KEY and _KMS_KEYRING below).

In addition to creating the keys a GitHub access token must be encrypted in a hub.enc and uploaded to the storage bucked created above.

Create a `hub` file in the following format:

```yaml
github.com:
  - protocol: https
    user: ${GITHUB_USERNAME}
    oauth_token: <git hub token here>
```

See Creating a personal access token for the command line for more details: https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/

Once the `hub` file is created it needs encrypted using the gcloud API:

`gcloud kms encrypt --location=global --keyring=gl-keyring --key=gl --plaintext-file=hub --ciphertext-file=hub.enc`

Then finally, the hub.enc needs uploaded to the storage bucked created above.

### Staging

**Name:** User Interface Staging CI Build

**Trigger type:** Branch

**Branch (regex):** ^develop$

**Build configration:** cloudbuild.yaml

**cloudbuild.yaml location:** /staging/cloudbuild.yaml

#### Staging Substitution variables

| Variable                    | Value               |
| --------------------------- | -----               |
| _CLOUDSDK_COMPUTE_ZONE      | us-central1-f       |
| _CLOUDSDK_CONTAINER_CLUSTER | staging             |
| _KMS_KEY                    | gl                  |
| _KMS_KEYRING                | gl-keyring          |
| _PROJECT_ID                 | grocery-list-205220 |
| _GIT_HUB_KEY_BUCKET_NAME    | gl-git-hub-key      |

### QA

**Name:** User Interface QA CI Build

**Trigger type:** Tag

**Tag (regex):** .*

**Build configration:** cloudbuild.yaml

**cloudbuild.yaml location:** /qa/cloudbuild.yaml

#### QA Substitution variables

| Variable                    | Value               |
| --------------------------- | -----               |
| _CLOUDSDK_COMPUTE_ZONE      | us-central1-f       |
| _CLOUDSDK_CONTAINER_CLUSTER | qa                  |
| _KMS_KEY                    | gl                  |
| _KMS_KEYRING                | gl-keyring          |
| _PROJECT_ID                 | grocery-list-205220 |
| _GIT_HUB_KEY_BUCKET_NAME    | gl-git-hub-key      |