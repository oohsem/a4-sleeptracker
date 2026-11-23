--Readme document for Samuel Choung, sychoung@uci.edu, 23979244, Group 91--

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

10/10
- 1/1 The ability to log overnight sleep
- 1/1 The ability to log sleepiness during the day
- 1/1 The ability to view these two categories of logged data
- 2/2 Either using a native device resource or backing up logged data
- 2/2 Following good principles of mobile design
- 2/2 Creating a compelling app
- 1/1 A readme and demo video which explains how these features were implemented and their design rationale

2. How long, in hours, did it take you to complete this assignment?
   -45 hours 


3. What online resources did you consult when completing this assignment? (list specific URLs)
    https://ionicframework.com/docs, https://ionicframework.com/docs/api/datetime, https://ionicframework.com/docs/api/toast, 
    https://ionicframework.com/docs/api/alert, https://angular.dev, https://github.com/ionic-team/ionic-storage, https://www.typescriptlang.org/docs/
    -ChatGPT was also used for some implementation guidance, dubgging, and UI design assitance



4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?
    -none



5. Is there anything special we need to know in order to run your code?
    -none


--Aim for no more than two sentences for each of the following questions.--


6. Did you design your app with a particular type of user in mind? If so, whom?
    -I designed my application for students and individuals who want to monitor their sleeping habits and daytime energy levels. 
    I focused on making the interface simple and relaxing so users can quickly record their sleep without unnecessary distractions.



7. Did you design your app specifically for iOS or Android, or both?
    -I designed my application to be compatible with both iOS and Android using the Ionic framework. 
    The responsive layout and mobile-friendly components allow the application to adapt to different screen sizes.


8. How can a person log overnight sleep in your app? Why did you choose to support logging overnight sleep in this way?
    -Users can select the Log Overnight Sleep button on the dashboard, choose their bedtime and wake-up time using date/time pickers, confirm their selections, and save the entry. 
    I chose this approach because it is intuitive, allows users to record sleep from previous nights, and automatically calculates the total sleep duration.


9. How can a person log sleepiness during the day in your app? Why did you choose to support logging sleepiness in this way?
    -Users can select Log Daytime Sleepiness, choose a rating from 1 to 7 on the Stanford Sleepiness Scale, select the date and time, and save their entry. 
    I chose this method because the numbered ratings and descriptions make it easy for users to evaluate their sleepiness without needing to type a response.


10. How can a person view the data they logged in your app? Why did you choose to support viewing logged data in this way?
    -Users can view their most recent sleep records on the dashboard or open the Sleep History page to view all entries and filter between overnight sleep and daytime sleepiness. 
    I chose this design because it provides a quick overview of recent activity while keeping the complete history organized and accessible.


11. Which feature choose--using a native device resource, backing up logged data, or both?
    -I chose to implement local data persistence using Ionic Storage to save the user's sleep records. 
    This allows the application to retain logged information after the browser is refreshed or the application is reopened.


12. If you used a native device resource, what feature did you add? How does this feature change the app's experience for a user?
    -n/a



13. If you backed up logged data, where does it back up to?
    -The application saves sleep records locally on the user's device using Ionic Storage, which uses browser-based storage when running as a web application. 
    Saved records are automatically loaded when the application starts, allowing users to access their previous entries without reentering information.


14. How does your app implement or follow principles of good mobile design?
    -My application follows mobile design principles by using a minimalist interface, consistent navigation, readable typography, large interactive buttons, and a responsive layout. 
    I also implemented input validation, confirmation dialogs, success notifications, and clearly organized information to prevent errors and improve usability.