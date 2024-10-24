#### for vue-link-preview
> **<ins>NOTE: This utilizes https://github.com/ashwamegh/link-preview-generator-server server deployed on Azure, a free web server which can run 30 minutes in a day.</ins> If you want to use it in a PRODUCTION app, I would recommend you to use your own server (You can use the [`Dockerfile`](https://github.com/ashwamegh/link-preview-generator-server/blob/master/Dockerfile) or the [Docker hub image](https://hub.docker.com/repository/docker/ashwamegh/lpdg-server) for deploying [link-preview-generator-server](https://github.com/ashwamegh/link-preview-generator-server)) and provide the custom link of the API for `customDomain` in the Component Props**

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
