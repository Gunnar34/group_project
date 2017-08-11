# Abamath Check-In ![abamath logo][logo]

Team Abamath
![Group Photo][group]

## About Abamath Check-In
This is a MEAN stack application designed to keep track of class rosters for Abamath programming classes and provide an interface for parents to check students in and out of class.  Please navigate through the app using visible buttons and the hamburger menu in the upper-left.

### For Parents
Through this app parents are given the option to use a PIN system when leaving class to ensure the right student is being taken home by the right adult.  Parents also have the option to get text notifications when their student leaves class.  Parents will verify their phone number as part of reviewing emergency contact information.

The Parent View is accessible by the eye icon on the Student page for a given class.  The app is designed to be left on the Parent View for the duration of class.

Instructors can click the Abamath logo in the upper-right corner of the screen to leave the Parent View and return to that class' dashboard page.

Parents will walk through a series of short questions, though they may need your assistance in understanding some of the options.

#### Parent Question Screens:
##### Emergency Contact Info
Review contact info, edit information by clicking directly on the field.

##### Student Self-Checkout
Say Yes if the student will be leaving class on their own, or No if the parent will be returning to check the student out of class.

##### PIN System
Clicking Yes will open up a keypad to enter a PIN.  PINs are four digits long, can only contain numbers, and do not have to be unique.

##### Text Notifications
Clicking Yes will send a text notification whenever the student is checked out, regardless of if a PIN is being used or not.

### For Instructors
Instructors have the ability to add classes and edit all information relating to them.  Students are not tracked between classes, so all classes must be populated with students' information from the school district before each class begins.

#### Instructor Dashboard
On the Instructor Dashboard, Instructors can edit or delete other Instructors.  Only the Admin can add new Instructors.

Instructors' log-in and log-out times are tracked, and available on the Statistics page.

#### Class Dashboard
On the Class Dashboard, Instructors can view all data for all recorded classes.  Add classes through the button in the top-middle, or edit/delete classes using the button on the right of each class row.  Click the icon in the View Class column to see the Students page for each class.

#### Students Page
On the Students page, Instructors can view, edit, and delete individual students from the class.  There are also options to mass check-in and -out students at the end of class.  Use these tools when several students are leaving class on their own, or their parents have declined the option to use the app.

"Check-Out Student" will check out all students who are not using a PIN.  "Force Check-Out All Students" will check out all students, including those using a PIN.

New students can be added with the button near the upper-left corner of the students table, and the eye icon in the same location will go to the Parent View for that class.

#### Statistics
On this page, view number of students by location, attendance, PIN users, and Instructor log-in/log-out records.


## Credits
Team Abamath:  Noah Rolf, Parker Walker, Peter Wildberger, and Ben Zeise

### Technologies Used
* Google OAuth
* Passport
* JavaScript
* jQuery
* Mongo DB
* Express
* AngularJS
* Node.js
* Angular Materialize
* Chart.js
* Xeditable
* SweetAlerts

[group]: https://github.com/Gunnar34/group_project/blob/master/public/assets/images/groupphoto.png
 [logo]:https://github.com/Gunnar34/group_project/blob/master/public/assets/images/abamath.png
