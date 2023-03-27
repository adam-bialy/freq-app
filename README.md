# Hearing frequency range test

### Description

This simple web app can be used to test the user's hearing range.

### Use

Click "activate" to start the app. After that, you can toggle the sound on an off with "sound".
Adjust volume and frequency with sliders. Try to find your lower and upper frequency bounds.
When you find them, mark them with buttons at the bottom.
Once you are done, type in your name and generate a PDF report.

### Deployment

#### Local

To start:

```
docker build -t freqapp .
docker run --name freqapp -d -p 3000:3000 freqapp
```

To stop and remove:

```
docker stop freqapp && docker rm freqapp
docker image rm freqapp
```
