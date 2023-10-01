
# metamon.dev
https://metamon.dev/
This is a URL shortener made with Gin &amp; Gonic on the backend, with React and Typescript on the front end.
Both the front end and back end are hosted as separate projects on Railway. 

The back end is dockerized and the front end was developed using Vite.


## Lessons:
-  Had to use serve to make the front end work, as vite is only a test server. To deploy vite, it would be better to use serve or something like Docker/Caddy.
-  Communication between backend and front end should be done via CORS and Rest API.
-  Use React Router to have all short urls still use the main domain, much like tinyurl. That way, it doesn't matter where the back end is hosted, as you can just fetch the full URL and redirect from the front end.
