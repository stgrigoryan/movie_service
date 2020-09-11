## To run the app

Firstly build a docker image running:
```sh
docker build -t <<tag_name>> .
```

After successfull image built run a docker container:
```sh
docker run -d -n <<container_name>> -e <<environment variable>> <<tag_name>>.
```

Please note, that you to should provide all necessary environment variables listed in the **ENV** file, when running abovementioned command.
