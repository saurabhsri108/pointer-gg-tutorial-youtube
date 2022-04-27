Hi there, it's Saurabh here. Welcome to IBCoder. This is part 4 of the NFT Project series where we are going to focus on building the frontends for the traditional backend we created last time. In this video, we will build the frontend using Angular. The pre-requisite here is to have basic knowledge of Angular, however, I will try to explain as much as possible in the parts we are going to be using. Let's start.

The first thing is installing angular. For that we need to run the command:

```s
npm install -g @angular/cli #this will help us create a new angular project

ng new angular # for creating angular app
```

Let me brief you on some important part of the folder structure in angular app:

1. **angular.json**: This is where all the important settings in angular app go. In case of any third party usage for styles or js, we can add it in this file.

2. **src/index.html**: This is the entry html page of our app. We do head related stuff here.

3. **src/styles.css**: This is for global styling. We are going to use this for this project as its small.

4. **src/app-routing.module.ts**: This is where we do our route pages path setting. We are going to have 2 pages, so we will use this.

5. **src/app.component.ts**: This is the entry point of our app where we write UI business logic JS/TS code.

6. **selector**: In angular, we can name our own html element, this selector is that name. We go back to our index.html and will find that this is the only selector element that is present here. It's because app-component is the root component of our app. We render everything within this.

7. **src/app.component.html**: This is the file where we write html for the component.

8
