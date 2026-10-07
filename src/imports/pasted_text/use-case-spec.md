Use Case Specification Document
PhishGuard Website Development project




Team Members
#
Name
1
Arohi
2
Macario
3
Aiden
4
Nicolas
5
Matthew



Contents
1.	Overall Description	3
2.	Users	3
3.	Use Case Specifications	3
3.1.	Use Case Name and Unique Identifier/ID [Author Name: ]	3
3.2.	Use Case Name and Unique Identifier/ID [Author Name: ]	4
3.3.	Use Case Name and Unique Identifier/ID [Author Name: ]	4
3.4.	Use Case Name and Unique Identifier/ID [Author Name: ]	4
3.5.	Use Case Name and Unique Identifier/ID [Author Name: ]	5
3.6.	Use Case Name and Unique Identifier/ID [Author Name: ]	5
3.7.	Use Case Name and Unique Identifier/ID [Author Name: ]	6
3.8.	Use Case Name and Unique Identifier/ID [Author Name: ]	6
3.9.	Use Case Name and Unique Identifier/ID [Author Name: ]	7
3.10.	Use Case Name and Unique Identifier/ID [Author Name: ]	7
3.11.	Use Case Name and Unique Identifier/ID [Author Name: ]	7
3.12.	Use Case Name and Unique Identifier/ID [Author Name: ]	8
3.13.	Use Case Name and Unique Identifier/ID [Author Name: ]	8
3.14.	Use Case Name and Unique Identifier/ID [Author Name: ]	9
3.15.	Use Case Name and Unique Identifier/ID [Author Name: ]	9
3.16.	Use Case Name and Unique Identifier/ID [Author Name: ]	10
3.17.	Use Case Name and Unique Identifier/ID [Author Name: ]	10
3.18.	Use Case Name and Unique Identifier/ID [Author Name: ]	11
3.19.	Use Case Name and Unique Identifier/ID [Author Name: ]	11
3.20.	Use Case Name and Unique Identifier/ID [Author Name: ]	12
4.	Use Case Diagram	12
5.	Constraints and Limitations	13
6.	UI Specifications (Prototype)	13
7.	Definitions and Acronyms	13


Overall Description
[Instructions: In the section, provide a brief description of the services that the PhishGuard website would provide once online]
 
Users
[Instructions: In table given below, identify the users/actors and provide a brief description about each identified user and their intended use of website (i.e., what does this user do on a day-to-day basis in his/her job or home and what goals will the PhishGuard website help each user achieve?)]
User 
Description

































Use Case Specifications
Each use case description should be provided under its own sub-section. Also, note that each use case should have a name (a verb phrase) and unique identifier (e.g., UC1, UC2, and so on). 

Use Case Name and Unique Identifier/ID [Author Name: Arohi ]

Use Case Name:
Create New Account
Description:
A new user creates an account on the PhishGuard platform
Primary Actor(s):
General User (First-time User)
Trigger:
The actor selects “Sign Up” option
Precondition(s):
The actor is not already registered
System is available
The actor navigates to the PhishGuard sign-up page
Postcondition(s):
The actor’s account is saved in the system database
The actor’s profile is initialized with default settings
Confirmation message is displayed
Success Scenario 
(or Normal Flow):

The actor enters mandatory (* marked) details:
First Name: First alphabet should be upper case, character limit: 2-30
Last Name: First alphabet should be upper case, character limit: 2-30
Username: with atleast one upper case letter, atleast one symbol and atleast one number, character limit: 2-30
Email: with correct format “@” and domain, and if the email address actually exists
Password:  with 
Re-enter Password
2. The actor clicks “Sign Up”
System validates input data
System verifies that none of the fields are left blank and they meet the fit within the character requirements and are in the valid format and aren’t duplicates
The username field is not left blank and meets minimum length requirements.
The email field is not left blank and is in valid format (contains “@” and domain)
The password field is not left blank and meets security requirements (minimum length, characters)
System checks for duplicate accounts using email/username
System creates a new user account
System initializes user profile (progress tracking, default settings)
System presents a confirmation screen informing the user that the account has been successfully created


Alternative Courses:
Invalid Input
System presents error message: “Invalid email format”
The actor re-enters correct email
Use case resumes at step 3
Duplicate Account
System displays error message: “Account already exists”
The actor enters a different email
Use case resumes at step 3
System Error
System displays error message
The actor may retry later

Use Case Name and Unique Identifier/ID [Author Name: Arohi]

Use Case Name:
Complete Training Module with Assessment
Description:
The actor completes an interactive phishing training module and passes an assessment to demonstrate understanding.
Primary Actor(s):
User
Trigger:
The actor selects a training module
Precondition(s):
Module is available
Any prerequisite modules are completed
Postcondition(s):
Module marked complete
Score recorded
Points assigned
Success Scenario 
(or Normal Flow):
The actor navigates to Training section
The actor selects a module
System loads module content (lessons, examples, scenarios)
The actor reads and interacts with content (clicks examples, expands tips)
The actor proceeds through each section using navigation controls
System tracks completion of each section
System presents a quiz at the end
The actor answers all questions
System evaluates responses instantly
System displays score and feedback
If passing score achieved, then module marked complete
System updates user progress and awards points
Alternative Courses:
Actor Exits Early
Progress is saved
Module is marked incomplete
Actor Fails Quiz
System displays feedback
System prompts retry
System Error
System displays error message


Use Case Name and Unique Identifier/ID [Author Name: Arohi]

Use Case Name:
Identify and Flag Phishing Indicators in Simulation
Description:
The actor analyzes a simulated email by identifying and flagging suspicious elements such as links, sender information, and message content to determine if it is a phishing attempt.
Primary Actor(s):
User
Trigger:
The actor starts a phishing simulation exercise
Precondition(s):
Simulation is available
The actor has access to training or challenge features
Postcondition(s):
Selected indicators are recorded
System evaluates accuracy of selections
Feedback is provided
Success Scenario 
(or Normal Flow):
The actor navigates to the Simulation or Challenge section
The actor selects a phishing simulation
System displays a realistic email/message interface
The actor examines different parts of the message (sender, subject, links, content)
The actor clicks on elements they believe are suspicious (e.g., suspicious link, fake sender)
System highlights selected elements
The actor continues analyzing until finished
The actor submits selected indicators
System evaluates selections against correct phishing indicators
System displays results showing correct and incorrect selections
System provides explanation for each indicator
System updates user performance and learning progress
Alternative Courses: 
No selection made
System prompts user to confirm submission
The actor continues or submits
Use case resumes at step 8
The actor exits early
Simulation is marked incomplete
System Error
System displays error message


Use Case Name and Unique Identifier/ID [Author Name: Arohi]

Use Case Name:
Create and Publish Training Module
Description:
The actor creates, configures, and publishes a new phishing awareness training module, including content, examples, and assessment questions.
Primary Actor(s):
Administrator
Trigger:
The actor selects “Create Training Module” from the dashboard
Precondition(s):
The actor is authenticated and has access to the dashboard
System content management module is available
Postcondition(s):
New training module is created and published
Module becomes available to users
Success Scenario 
(or Normal Flow):
The actor logs into the system dashboard
The actor navigates to the Training Management section
The actor selects “Create New Module”
System displays module creation form
The actor enters module title, description, and difficulty level
The actor adds instructional content (text, examples, phishing scenarios)
The actor uploads or links supporting media (images, links, case examples)
The actor creates quiz/assessment questions with correct answers
The actor defines passing criteria (e.g., minimum score)
The actor previews the module
The actor edits content if necessary
Admin clicks “Save and Publish”
System validates all inputs
System stores module in database
System makes module available in Training section
Alternative Courses:
Missing Required Fields
System highlights errors and prevents submission
The actor corrects input
Use case resumes at step 12
Invalid Content Format
System displays validation message
The actor corrects content
Use case resumes at step 12
Actor Cancels
Module is not created
System Error
Module is not published
System displays error message


Use Case Name and Unique Identifier/ID [Author Name: Arohi]

Use Case Name:
Generate and Analyze Performance Reports
Description:
The actor generates, filters, analyzes, and exports performance reports to evaluate user engagement, training completion, and phishing simulation results.
Primary Actor(s):
Administrator
Trigger:
The actor selects the Reports section from the dashboard
Precondition(s):
System contains user activity and performance data
The actor has access to reporting tools
Postcondition(s):
Customized report is generated
Insights are analyzed
Report is optionally exported
Success Scenario 
(or Normal Flow):
The actor accesses the dashboard
The actor navigates to the Reports section
System displays available report categories (for example: user progress, challenge performance, simulation results)
The actor selects a report type
The actor applies filters (date range, user group, module, performance level)
System updates and displays filtered data
The actor selects metrics to include (completion rate, scores, risk levels, engagement)
System generates a visual report (charts, tables, summaries)
The actor reviews and analyzes the data
Admin drills down into specific users or modules for detailed insights
System displays detailed breakdowns
The actor selects export format (CSV, PDF, etc.)
The actor clicks “Export”
System generates and downloads the report 
Alternative Courses:
No Data Found
System displays message (“No results found”)
Invalid Filters
System prompts correction
Export Failure
System displays error message
System Delay
System displays loading indicator


Use Case Name and Unique Identifier/ID [Author Name: Arohi]

Use Case Name:
Enroll Users in Bulk and Assign Training
Description:
The actor uploads, reviews, validates, and assigns training to multiple users during bulk enrollment.
Primary Actor(s):
Administrator
Trigger:
The actor selects bulk enrollment option
Precondition(s):
The actor has organization-level access
User data file (CSV) is available
Postcondition(s):
Multiple user accounts are created
Users are assigned to training modules or groups
Success Scenario 
(or Normal Flow):
The actor navigates to User Management section
The actor selects “Bulk Upload” option
System displays upload interface with file requirements
The actor uploads CSV file containing user data
The actor validates file format and structure
System displays preview of uploaded users
The actor reviews uploaded data (names, emails, roles)
The actor edits or removes incorrect entries if needed
The actor assigns users to groups, roles, or training modules
The actor confirms enrollment
System creates user accounts
System assigns selected training/modules to users
System displays summary of successful and failed entries
Confirmation message is displayed
Alternative Courses:
Invalid File Format
System rejects file and displays error message
Duplicate Users Detected
System flags duplicates for review
The actor updates or removes duplicate entries
Use case resumes at step 9
Missing Required Fields
System prompts correction
The actor updates data
Use case resumes at step 9
Actor Cancels
No users are created
System Error
Partial upload results are displayed


Use Case Name and Unique Identifier/ID [Author Name: Matthew]

Use Case Name:
Attempt Phishing Simulation
Description:
A registered actor receives or accesses a simulated phishing email or webpage and interacts with it. The system records the user’s response and provides immediate educational feedback.
Primary Actor(s):
General User
Trigger:
Actor wants to see what a phishing attempt would look like in real time 
Precondition(s):
Actor is logged into the PhishGuard platform
At least one phishing simulation is active or scheduled for the actor
Postcondition(s):
Actor’s response (clicked, reported, or ignored) is recorded
Feedback and educational content are displayed to the actor
Simulation result is reflected in the actor’s progress and risk score
Success Scenario 
(or Normal Flow):
Actor receives a simulated phishing email or sees a simulation prompt on the dashboard
Actor opens the simulated email or notification
System presents the phishing scenario (e.g., fake login page, suspicious link, deceptive attachment)
Actor decides to click the link/attachment, report it as phishing, or ignore it
System captures the actor’s action in real time
If actor clicks the link, system displays a warning page indicating it was a simulation
System presents a brief explanation of the phishing indicators present in the scenario
System provides tips on identifying similar attacks in the future
System records the outcome (fell for simulation vs. correctly identified)
Actor’s risk profile and progress dashboard are updated accordingly
Alternative Courses:
If actor reports the simulation as phishing before interacting, then: system records a successful identification and awards points
If actor ignores the simulation entirely, then: system marks it as unresolved and may send a reminder
If simulation content fails to load, then: system displays an error message and the attempt is not counted
If actor’s session expires mid-simulation, then: attempt is flagged as incomplete and result is not recorded


Use Case Name and Unique Identifier/ID [Author Name: ]

Use Case Name:


Description:


Primary Actor(s):


Trigger:


Precondition(s):


Postcondition(s):


Success Scenario 
(or Normal Flow):


Alternative Courses:



Use Case Name and Unique Identifier/ID [Author Name: Matthew]

Use Case Name:
Edit / Delete Training Module
Description:
An administrator modifies the content of an existing training module or permanently removes it from the platform. Changes take effect immediately for all future actor sessions.
Primary Actor(s):
Administrator
Trigger:
Admin selects an existing module from the Training Management section and chooses "Edit" or "Delete"
Precondition(s):
Admin is authenticated and has access to the admin dashboard
The target training module exists in the system
Postcondition(s):
If editing: module content is updated and changes are immediately available to actors 
If deleting: module is removed from the platform and no longer accessible to actors
Affected actor progress records are flagged or archived appropriately
Success Scenario 
(or Normal Flow):
Admin navigates to the Training Management section of the dashboard
System displays a list of existing training modules
Admin selects the target module and chooses "Edit" or "Delete"
Edit path: system loads the module editor pre-populated with existing content
Admin updates title, description, instructional content, media, and/or assessment questions
Admin previews the updated module
Admin clicks "Save Changes"
System validates all updated fields and saves the changes
Updated module is immediately published and available to actors 
Delete path (from step 3): system displays a confirmation dialog warning that deletion is permanent
Admin confirms deletion
System removes the module from the Training section and archives associated actor progress records
System displays a success confirmation message
Alternative Courses:
If required fields are left blank during editing → system highlights errors and prevents saving
If admin cancels editing before saving → no changes are applied
If admin cancels the delete confirmation → module is not deleted
If a system error occurs during save or delete → operation is rolled back and an error message is displayed


Use Case Name and Unique Identifier/ID [Author Name: Matthew]

Use Case Name:
Monitor User Progress and Engagement
Description:
An administrator views detailed progress and engagement metrics for individual actors or actor groups, enabling identification of at-risk actors and assessment of overall training effectiveness.
Primary Actor(s):
Administrator
Trigger:
Admin navigates to the actor Progress section of the admin dashboard
Precondition(s):
Admin is authenticated with dashboard access
Actor activity data exists in the system
Postcondition(s):
Progress and engagement data is displayed for the selected actor or group
Admin can identify actors who are lagging or at elevated risk
Optional follow-up actions (reminders, module reassignment) are initiated if needed
Success Scenario 
(or Normal Flow):
Admin logs into the admin dashboard
Admin navigates to the actor Progress & Engagement section
System displays an overview with aggregate statistics (e.g., completion rates, average scores, simulation click rates)
Admin applies filters such as date range, department/group, training module, or risk level
System refreshes the view with filtered results
Admin selects an individual actor to drill into their detailed profile
System displays the actor’s module completion history, quiz scores, simulation results, challenge scores, and last activity date
Admin identifies actors who have not completed required modules or who have a high phishing click rate
Admin optionally sends a reminder notification to a flagged actor directly from the progress view
Admin optionally reassigns or unlocks specific training modules for an actor 
Alternative Courses:
If no data matches the selected filters → system displays "No results found"
If an actor has no recorded activity → system displays a "No activity yet" message on their profile
If the reminder fails to send → system displays an error and prompts the admin to retry
If the system takes too long to load data → a loading indicator is shown


Use Case Name and Unique Identifier/ID [Author Name: Matthew]

Use Case Name:
Manage User Accounts
Description:
An administrator creates, edits, deactivates, or deletes individual user accounts and adjusts user roles and permissions within the PhishGuard platform.
Primary Actor(s):
Admin
Trigger:
Admin selects a actor from the actor Management section of the dashboard
Precondition(s):
Admin is authenticated with actor management permissions
The actor Management section is accessible
Postcondition(s):
Actor account reflects all changes made by the admin
If deactivated/deleted, the actor can no longer access the platform
System logs the admin action for auditing purposes
Success Scenario 
(or Normal Flow):
Admin navigates to the actor Management section of the dashboard
System displays a searchable, filterable list of all actor accounts
Admin searches for or selects a specific actor 
System displays the actor’s profile, role, status, and activity summary
Admin selects an action: Edit, Deactivate, or Delete
Edit path: admin updates actor details (name, email, role, group assignment) and clicks "Save"
System validates and applies the changes; updated profile is immediately active
Deactivate path: admin clicks "Deactivate" and confirms; system suspends the account without deleting data
Delete path: system displays a permanent deletion warning; admin confirms; system removes the account and archives associated data
System logs the action with a timestamp and the admin's credentials
System displays a success confirmation message
Alternative Courses:
If edited fields fail validation → system highlights errors and prevents saving
If admin attempts to delete their own account → system blocks the action and displays a warning
If admin cancels any action before confirming → no changes are applied
If a system error occurs → operation is rolled back and an error message is displayed


Tracking Learning Progress  [Aiden Ciancitto ]

Use Case Name:
Tracking Learning Progress
Description:
This Use case describes the ability for End Users and Administrators (Actors) to view Learning progress through our simulations and quizzes
Primary Actor(s):
Admin, End User
Trigger:
Admin: Goes into User Management Dashboard, selects user in group
User: Displayed in percentage on ‘Learning Tab’ on the site
Precondition(s):
Admin Must have access to access to the UMD 
End User has an account created.
Postcondition(s):
Every Quiz, Simulation, and or Learning assignment will update the specific  
Success Scenario 
(or Normal Flow):
Actor completes Quiz, Simulation, and Learning assignment
Progress is denoted by a numerical percentage “%” and Bar at the top of the Learning Tab on the site.
Admins will be able to see all users respective progress in the tenant by going the UMD  (User Management Dashboard)
Alternative Courses:




Export Analytics Data (Aiden Ciancitto)

Use Case Name:
Export Analytics Data 
Description:
Use Case describes the ability for Admins to Export analytical data for their End Users in the tenant
Primary Actor(s):
Admin
Trigger:
When Admin needs to view Data of Registered Users (User-Inititated) 
Precondition(s):
The Actor MUST be added to the tenant.
Postcondition(s):
Analytical Data (Progress, Learning, Quiz Scores, Simulation Success types) 
Success Scenario 
(or Normal Flow):
Admin will go to the UMD (User Management Dashboard) when pressing their profile in the context menu
Navigate to bottom of the page
Select the Export Analytics Data
Check of what data you want to export
User Progress
Learning
Quiz Scores
Simulation Success Type
Admin can select specific users or ALL users in the Tenant
The Analytics Data will export as a .csv or .xlsx to the Admins Registered Email.
Alternative Courses:




Create Phishing Simulations [Aiden Ciancitto]

Use Case Name:
Create Phishing Simulations 
Description:
Allows admins to create, configure, and deploy phishing simulation campaigns to end users for security awareness training purposes.
Primary Actor(s):
Admins
Trigger:
Admin clicks the "Create Simulation" button within the site.
Precondition(s):
Admin must be logged into the system with a valid admin account
At least one end user account must exist in the system
Admin must have permission to create and send simulations


Postcondition(s):
A phishing simulation campaign is created and stored in the system
End users receive the simulated phishing email
Results are logged and available for admin review


Success Scenario 
(or Normal Flow):
Admin navigates to the simulations dashboard and clicks "Create Simulation"
Admin fills out the simulation form (campaign name, phishing email template, target audience)
Admin configures simulation settings (send date/time, difficulty level, landing page)
Admin reviews the configuration and clicks "Launch Simulation"
System sends the simulated phishing email to all targeted end users
End user interactions (opened, clicked link, submitted credentials) are tracked in real time
Admin can view a results dashboard showing campaign metrics and individual user responses


Alternative Courses:




Use Case Name and Unique Identifier/ID [Author Name: ]

Use Case Name:


Description:


Primary Actor(s):


Trigger:


Precondition(s):


Postcondition(s):


Success Scenario 
(or Normal Flow):


Alternative Courses:



Use Case Name and Unique Identifier/ID [Author Name: ]

Use Case Name:
View Feedback on Simulation Result(User)
Description:
Once the User finished their related simulation they’ll be given back their results based on their inputs
Primary Actor(s):
User
Trigger:
User finished their related Simulation & a tab with rows of history exam results
Precondition(s):
User must be logged it
User must finish Simulation to produce the results and feedback
Postcondition(s):
User will have access to their updated  score
Will be able to review and improve their later score
Success Scenario 
(or Normal Flow):
User successfully completes the simulation
System calculated their score
Feedback score is accessable
Alternative Courses:
If no feedback shows, shows error message redirecting Users to Help Desk




Use Case Name and Unique Identifier/ID [Author Name: ]

Use Case Name:
Earn Medals/Achievements (User)
Description:
The User will be given a digital incentive Medal for their score and progress
Primary Actor(s):
Users
Trigger:
-Must make progress within the course selection
Precondition(s):
Must complete course work to receive Achievement Medal
Postcondition(s):
Customer will receive a digital award as an  incentive to continue
Success Scenario 
(or Normal Flow):
User receives a reward after course completion
Alternative Courses:
If no reward is given to user, Show message of progress







Use Case Name and Unique Identifier/ID [Author Name: ]

Use Case Name:
Assign Medals and Achievement Criteria (Admin)
Description:
Sys admin will authorize privilege to those who meet the condition to receive a reward. We’re referring to the top percentile will receive a medal or digital from the system administrator
Primary Actor(s):
System Administrators
Trigger:
Grants authorized access to User with Medal
Precondition(s):
User must complete the course module for Admin authorization
Postcondition(s):
User gains Medal XP and levels up
Success Scenario 
(or Normal Flow):
User gained access to Medal post module completion
Alternative Courses:
No Medal, show message & Admin will review



Use Case Name and Unique Identifier/ID [Author Name: ]

Use Case Name:
Search Training Modules by Topic (User)
Description:
The user searches for phishing training modules using keywords and topics. The systems displaying relevant topics based on what the user entered to help them discover addition topics
Primary Actor(s):
Users( students, Employees, IT Professionals, Hobbyist
Trigger:
User types keyword onto the search bar on the training module page
Precondition(s):
-User must be logged into to PhishGuard
-Training Modules must exist in the system database
-User must have access to training module section
Postcondition(s):
-System displays additional and related topics
-User can select the recommended topic module
-Search history is recorded for analytic purposes
Success Scenario 
(or Normal Flow):
-User receives additional topics
-Search Tab is fully function
Alternative Courses:
-System displays message regarding an Error
-System Admin will review




Use Case Name and Unique Identifier/ID [Author Name: ]

Use Case Name:
Enroll Users in Bulk (Organizational)
Description:
An organizational Administrator uploads a file containing user records to enroll many users simultaneously into the PhishGuard platform, rather than adding one user at a time. This streamlines onboarding for larger institutions 
Primary Actor(s):
Organizational Admins
Trigger:
Administrator clicks “Enroll Users in Bulk” button and selects a file to upload
Precondition(s):
-Admin must upload the form
-User must sign up
Postcondition(s):
-User account will be uploaded onto the DB
-Admin will receive the output of the file
Success Scenario 
(or Normal Flow):
-A large streamline of admitted users into PhishGuard
Alternative Courses:
-System provide link to download file template


Use Case Name and Unique Identifier/ID [Author Name: Macario Saquic-Pablo]

Use Case Name:
View Another User’s Profile
Description:
Allows user to view public information about another user.
Primary Actor(s):
Registered User
Trigger:
User clicks on another user’s name or profile picture.
Precondition(s):
- Target user’s profile exists.
- User has permission to view the profile.
Postcondition(s):
Profile information is displayed.
Success Scenario 
(or Normal Flow):
1. User selects another user’s profile link.
2. System retrieves the profile data.
3. System loads public information (name, bio, achievements, badges).
4. System displays training progress (if public).
5. System displays recent activity (if allowed).
6. User views the profile and may choose to follow or message the user.
Alternative Courses:
IF Profile is Private:
1.  System detects that the target user has set their profile to private.
2. System displays a limited version of the profile.
3. System shows a message: “This profile is private.”
4. User may request to follow to gain access.


Use Case Name and Unique Identifier/ID [Author Name: Macario Saquic-Pablo]

Use Case Name:
Follow Another User’s Profile
Description:
Allows a registered user to follow another user to stay updated on their activity (Examples: training progress, quiz achievements, etc.).
Primary Actor(s):
Registered User
Trigger:
Actor clicks the “Follow” button on another user’s profile
Precondition(s):
- Actor is logged in.
- Target user’s profile is visible.
- Actor qis not already following the target user.
Postcondition(s):
- A “follow” relationship is created and stored.
Success Scenario 
(or Normal Flow):
User navigates to another user’s profile.
System loads the profile information.
User clicks the “Follow” button.
System checks if the user is already following the target.
System creates a new follow record.
System updates the follower count.
System displays a confirmation message.
System updates the user’s feed to include the target user’s activity.
Alternative Courses:
IF: User Already Following Target
System detects an existing “follow” relationship.
System disables the “Follow” button or changes it to “Following.”
System displays a message indicating the user is already following them.
User may choose to unfollow instead.


Use Case Name and Unique Identifier/ID [Author Name: Macario Saquic-Pablo]

Use Case Name:
Manage Notification Preferences
Description:
Allows a user to customize which notifications they receive (email alerts, training reminders, security alerts, etc.).
Primary Actor(s):
Registered User
Trigger:
User selects “Notification Settings.”
Precondition(s):
User is logged in.
Postcondition(s):
Notification preferences are updated.
Success Scenario 
(or Normal Flow):
1. User opens account settings.
2. User selects “Notification Preferences.”
3. System loads current notification settings.
4. User toggles preferences (email alerts, SMS alerts, push notifications).
5. System validates the changes.
6. System saves the updated preferences.
7. System displays a confirmation message.
Alternative Courses:
IF Invalid Contact Method (SMS):

1. User enables SMS notifications.
2. System detects no phone number on file.
3. System prompts user to add a phone number.
4. User enters phone number.
5. System validates and saves it.
6. User re-enables SMS notifications successfully.


Use Case Name and Unique Identifier/ID [Author Name: Macario Saquic-Pablo]

Use Case Name:
Enable Two-Factor Authentication
Description:
Allows a user to add an extra layer of security to their account.
Primary Actor(s):
Registered User
Trigger:
User selects “Enable Two‑Factor Authentication.”
Precondition(s):
- User is logged in.
- User has access to a valid email or phone number.
Postcondition(s):
Two-Factor Authentication is enabled and configured.
Success Scenario 
(or Normal Flow):
1. User opens security settings.
2. User selects “Enable Two-Factor Authentication.”
3. System displays available Two-Factor Authentication methods (email, SMS, authenticator app, etc.).
4. User selects a method.
5. System sends a verification code.
6. User enters the code.
7. System validates the code.
8. System activates Two-Factor Authentication.
9. System displays a success message.
Alternative Courses:
IF Incorrect Verification Code:

1. User enters an invalid code.
2. System displays an error message.
3. User requests a new code.
4. System sends a new code.
5. User enters the correct code.
6. System completes setup for Two-Factor Authentication.


Use Case Name and Unique Identifier/ID [Author Name: Macario Saquic-Pablo]

Use Case Name:
Generate Performance Report
Description:
Allows a user to generate a report summarizing their training progress, quiz scores, and phishing detection activity.
Primary Actor(s):
Registered User
Trigger:
User selects “Generate Performance Report.”
Precondition(s):
User has completed at least one training module or quiz.
Postcondition(s):
A performance report is generated and displayed.
Success Scenario 
(or Normal Flow):
1. User opens the “Performance” section.
2. User clicks “Generate Report.”
3. System retrieves training progress data.
4. System retrieves quiz history.
5. System compiles all data into a structured report.
6. System displays the report to the user.
7. User may download, print, or share the report.
Alternative Courses:
IF No Data Available Is Available:

1. System detects that the user has no training or quiz activity.
2. System displays a message: “No performance data available.”
3. System suggests completing training modules or quizzes.
4. User is redirected to the training page.


Use Case Name and Unique Identifier/ID [Author Name: ]

Use Case Name:


Description:


Primary Actor(s):


Trigger:


Precondition(s):


Postcondition(s):


Success Scenario 
(or Normal Flow):


Alternative Courses:






Use Case Name and Unique Identifier/ID [Author Name: Arohi]

Use Case Name:
Log out
Description:
The actor securely logs out of the PhishGuard platform to end their session and protect account access.
Primary Actor(s):
User
Trigger:
The actor clicks “Log Out” option
Precondition(s):
The actor is currently logged into the system
Postcondition(s):
The actor session is terminated
The actor is redirected to the home or login page
Success Scenario 
(or Normal Flow):
The actor clicks on profile/settings menu
Selects “Log Out”
System invalidates active session
System clears session data (tokens/cookies)
The actor is redirected to homepage/login screen
Confirmation of logout is displayed (optional)
Alternative Courses:
Session Expired
System redirects to the login page
System Error
The actor remains logged in
System displays error message

Use Case Diagram
[Instructions: In the space given below, provide the use case diagram for PhishGuard project. See an example use case diagram below]


Constraints and Limitations
The Constraint field lists the constraint or limitation for the project. The USE CASE ID field lists the related use cases (if any) that provides additional context for the constraint. 
Constraint
USE CASE ID





















UI Specifications (Prototype)
Based on the use cases described in Section 3, provide the prototype for what the PhishGuard website’s interface would look like. UI design is a creative activity and you are allowed to create the website based on your own vision (i.e., team’s vision). Additionally, you can use the UI design tool of your choice. Here are helpful resources to find the right UI design tools:
https://www.figma.com/ 
https://www.creativebloq.com/how-to/20-best-ui-design-tools
https://blog.prototypr.io/4-best-web-ui-mockup-tools-for-free-89a1513c3fcd
https://www.mockflow.com/
https://creately.com/lp/wireframe-tool-online

Your prototype should be interactive (i.e., clickable) and simulate the look and feel of the final website.

Definitions and Acronyms

Example:

Term
Definition
MSU
Montclair State University
Cayenne


The database management system being utilized for this project.
Tapestry


The framework being utilized for this project.
Java
The backend language being utilized by the server.
SQL
The language being used to query, access, and modify our database.
Step
A task that needs to be completed on the dissertation schedule. 


