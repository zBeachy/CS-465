Architecture

    Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).
    Why did the backend use a NoSQL MongoDB database?

    - In my experience, I felt that Angular and the development of the SPA was overall more easy for me to understand and work with. While Express is more static and requires less configuration, I was often
      confused by how the system was routing and its processes. With Angular, I felt I was more effectively able to troubleshoot when issues arrose. Working with JavaScript was also... interesting. 
      This was my first experience using it, and it felt overall pretty quick to pick up, but I know many complain about quirks of the language that I probably wasn't exposed to in the short period of
      using it, so my impression was positive. I assume the backend used a NoSQL MongoDB because that allowed the application to fit within the MEAN stack definition, but I don't see any reason why
      it could not be a different database system. The web application at the place I currently work at, for example, uses SQL. 

Functionality

    How is JSON different from Javascript and how does JSON tie together the frontend and backend development pieces?
    Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable user interface (UI) components.

    - JSON is simply a method for storing key/value pair data rather than an entire programming language like Javascript. It is extremely valuable for storing, sending, and manipulating data. I have used
      JSON extensively not just in this application but in my professional career as well. There were instances where code was refactored to use reusable components via JSON with handlebars on the express
      side of the application. This is extremely beneficial because it dramatically reduces the need for boilerplate code as only the necessary components can be rapidly referenced similar to variables in 
      smaller programming uses. It also reduces the time needed to build newer webpages because a lot of features can be reused. A good example of this was the header and footer component of handlebars, which
      eliminated the need for specifying that section on each webpage.

Testing

    Methods for request and retrieval necessitate various types of API testing of endpoints, in addition to the difficulties of testing with added layers of security. Explain your understanding of methods,
    endpoints, and security in a full stack application.

    - Methods are what specify what type of information or action you are requesting. A method can be something like GET for retrieving information, or POST for uploading new information. when a method is
      called, parameters can be sent as well, which is typically where security comes in. In addition to performing the action requested, the method will often include security information so that 
      not just anyone can run the API calls. You can send authorizations in this fashion or header values that contain authorization information. The endpoints are where the requests are routed, so a method
      makes a request to the system, which hits the API endpoint. If the request is authorized, the API will do what it was told to do, then return a response, which can either be information about 
      what was performed, or simply an HTML code to key the user into whether or not the request went through.

Reflection

    How has this course helped you in reaching your professional goals? What skills have you learned, developed, or mastered in this course to help you become a more marketable candidate in your career field?

    - I would argue that this was one of the most useful courses I have taken while going to college. I think that it has taught me a lot about many of the different facets of web development, which is
      the field of software engineering that interests me the most. In my professional career, I have worked as a product owner in the past, and the information in this course has given me a lot of excellent
      insight into the processes and work that goes in to fielding customer requests for changes on a web page. This allows me to better represent our software team and ensure that customer requests are
      properly tempered to be within reason and performability for the software team. 
