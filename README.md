# React TODO

Project is build using the create-react-app cli and being deployed over [Vercel](https://vercel.com/)

[Demo](https://react-todo-frontend.vercel.app/) is also available

## Project Local Build Instructions

Make sure you've [`git`](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), [`yarn`](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) & [`nodejs`](https://nodejs.org/en/) installed in your system.

Open terminal and follow these steps;

- Step 1: Clone the repo.

```bash
git clone https://github.com/ekas/react-todo
```

You should now see a `react-todo` folder in your present working directory. Let's change directory to it.

```bash
cd react-todo/
```

- Step 2: Frontend Build Instructions. Install dependencies.

```bash
cd frontend/
yarn install
```

This will use `yarn` to install project dependencies.

- Step 3: Start the frontend project.

```bash
yarn start
```

This will run a local instance of the application `http://localhost:3000/`

- Step 4: BAckend Build Instructions. Install dependencies.

Open a new terminal and enter following command.

```bash
cd backend/
yarn install
```

- Step 4: Start the backend project.

```bash
yarn start
```

This will run a local backend instance of the application `http://localhost:4000/`. If you change the backend port don't forget to update the `.env` file in the frontend folder

## Project e2e test Instructions

- Step 1: Restart both frontend and backend servers as per instructions in above sections.
- Step 2: After that open another terminal.

```bash
cd frontend/
yarn run cy:run
```

- Step 3: For Visual e2e test.

```bash
cd frontend/
yarn cypress open
```

- Step 4: Click on `E2E Testing` and then chose a browser and click on start E2E testing button.

- Step 4: Another chrome will load with list containing tests `todoBoard.cy.js`. Click on it to run tests.

![Img 1](https://github.com/ekas/react-todo/blob/main/screenshots/image1.png)

## Project Features

- Simple TODO app.
- Add New Tasks, Update & Delete Tasks.
- Move Tasks to different Stages like `In Progress` and `Completed`.
- On Refresh, data changes persist.

## Project Screenshots

![Img 2](https://github.com/ekas/react-todo/blob/main/screenshots/image2.png)

![Img 3](https://github.com/ekas/react-todo/blob/main/screenshots/image3.png)

![Img 4](https://github.com/ekas/react-todo/blob/main/screenshots/image4.png)

![Img 5](https://github.com/ekas/react-todo/blob/main/screenshots/image5.png)

![Img 6](https://github.com/ekas/react-todo/blob/main/screenshots/image6.png)

![Img 7](https://github.com/ekas/react-todo/blob/main/screenshots/image7.png)

## Thank You
