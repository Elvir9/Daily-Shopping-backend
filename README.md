# Daily-Shopping-backend

## Available Scripts

In the project directory, you can run:

### `npm run dev` 

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The application is supported by ### nodemon tool that helps develop node.js based application by automatically restarting the node application when file changes in the directory are deteced. 
You will also see any lint errors in the console.

### `npm run build`

With this script you can build application for production mode. After script is runned it will create build directory in the project root strucure.

## The application is dockerizing using separate Docker containers, one for Node.js and other one for database, for this case MongoDB. 

# For raise up containers we need to run 

``` docker-compose up```

# If we need to see which container is rasied up we need to run

``` docker ps```

# If we did some changes then we need to run 

```  docker-compose build```

# to rebuild those changes and repeat process
