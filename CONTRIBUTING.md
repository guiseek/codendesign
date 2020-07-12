## Executando o Commitizen no git commit
Demonstração de como incorporar o Commitizen no fluxo de trabalho existente do git commit usando ganchos do git e a opção da linha de comandos `--hook`. Isso é útil para os mantenedores do projeto que desejam seguir um padrão para mensagens de commit e  garantir que o formato de confirmação adequado seja aplicado às contribuições daqueles não familiarizados com o _Commitizen_.

Após a implementação de qualquer um desses métodos, os usuários que executam `git commit` serão apresentados com uma sessão interativa do _Commitizen_ que os ajuda a escrever mensagens úteis em seus commits.


> **NOTA:** Este exemplo assume que o projeto foi configurado para usar o Commitizen localmente.


### Traditional git hooks

Altere `.git/hooks/prepare-commit-msg` com o seguinte trecho de código `bash`:

```sh
#!/bin/bash
exec < /dev/tty && node_modules/.bin/git-cz --hook || true
```

> **DICA:** caso não tenha familiaridade com o `vi` ou `vim`, use o editor como _VS Code_

`code .git/hooks/prepare-commit-msg`

Adicione o código bash, salve e volte para o terminal, e em seguida execute

`ls -l .git/hooks/`

```sh
-rwxr-xr-x  1 guiseek  staff   544 11 Jul 02:18 pre-receive.sample
-rw-r--r--  1 guiseek  staff    71 11 Jul 15:24 prepare-commit-msg
-rwxr-xr-x  1 guiseek  staff  1492 11 Jul 02:18 prepare-commit-msg.sample
```

Repare que o arquivo criado tem permissões diferentes e não estará em vermelho
pois ele ainda não é um executável, este comando fornece a permissão para execução.

`chmod +x .git/hooks/prepare-commit-msg`

👍

---

### Husky

Para usuários `husky`, adicione a seguinte configuração ao` package.json` do projeto:

```json
"husky": {
  "hooks": {
    "prepare-commit-msg": "exec < /dev/tty && git cz --hook || true",
  }
}
````

Por que `exec < /dev/tty`? Por padrão, os ganchos do git não são interativos. Este comando permite que o usuário use seu terminal para interagir com o Commitizen durante o gancho.
