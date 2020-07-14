#!/usr/bin/env bash

COMMAND=$1

if [[ $COMMAND == "enable" ]]; then
  echo "Configurando registro para registro local"
  echo "Para desativar: yarn local-registry disable"
  npm config set registry http://localhost:4873/
  yarn config set registry http://localhost:4873/
fi

if [[ $COMMAND == "disable" ]]; then
  npm config delete registry
  yarn config delete registry
  CURRENT_NPM_REGISTRY=$(npm config get registry)
  CURRENT_YARN_REGISTRY=$(yarn config get registry)

  echo "Revertendo registros"
  echo "  > NPM:  $CURRENT_NPM_REGISTRY"
  echo "  > YARN: $CURRENT_YARN_REIGSTRY"
fi

if [[ $COMMAND == "clear" ]]; then
  echo "Limpando o registro local"
  rm -rf ./build/local-registry/storage
fi

if [[ $COMMAND == "start" ]]; then
  echo "Iniciando o Registro Local"
  npx verdaccio --config ./.verdaccio/config.yml
fi
