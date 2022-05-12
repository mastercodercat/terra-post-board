# Terra post board

Decentralized post board on Terra where users can create their posts with terra station.

## Short Demo

- ![Image](https://github.com/mastercodercat/terra-post-board/blob/master/resources/board.PNG)
- [Video](https://www.loom.com/share/abac2144b6d14e49ad7aa99b8cc57ad2)

## Features

- View posts which were saved on smart contract
- Create a post with terra station
- Like a post with terra station

## Tech Stack

- Rust & Cosmwasm & Terrain
- TypeScript & Material UI & React

## How to run

- First of all, you need to install terrain on your local machine.

```shell
npm install -g @terra-money/terrain
```

- You need to run localterra on your local machine.

```shell
cd localterra
docker-compose up
```

- After installing terrain module, you need to deploy smart contract, written with cosmwasm into localterra.

```shell
terrain deploy post_board --signer test1
```

- Start the frontend application

```shell
cd frontend
npm install
npm start
```
