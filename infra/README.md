# Blog Counter Infrastructure

Some fancy scripts and YAMLs for the blog counter infrastructure.

## Requirements

- `ansible` v2.12+

## Initial setup

Next files need to be copied with new names and populated with values:

```sh
cp hosts.ini.example hosts.ini
cp vars/common.yml.example var/common.yml
```

## Keys

Key generation:

```sh
ssh-keygen -t ed25519 -C "user@example.com" -f ./keys/production_key
```

VM should be created with the public key above.

Key path is controlled via `vars/common.yml` file:

- `public_key_local_path` — path to the public key on local machine

**Note: `./keys/` folder should be added to `.gitignore`!**

## Provision

To provision **prod** environment:

```sh
ansible-playbook provision-prod.yml
```

## Deploy

To deploy latest release to **prod**:

```sh
ansible-playbook deploy-prod.yml
```
