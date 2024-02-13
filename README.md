# Polygon-on-a-map
A web application that displays a specific polygon on a map.


## Task overview
Create a web application that displays the polygon defined in the provided polygon.json file on a map. Use the OpenLayers library to accomplish this task.


## Solution Approach:

Setup Environment:
- Install the OpenLayers library using npm.

Create PolygonMap Component:
- Create a new React component named PolygonMap.
- Use the useEffect hook to fetch polygon coordinates from the provided JSON file (polygon.json).
- Utilize useState and useRef hooks to manage state and create a reference for the map container.
- Inside the useEffect hook, create a new OpenLayers map instance, add a tile layer (OSM), and configure the view with default center and zoom.
- Fetch the polygon coordinates from polygon.json, convert them to OpenLayers format, and create a polygon feature.
- Add the polygon feature to a vector layer and add the vector layer to the map.
- Adjust the map view to fit the polygon using the fit method.
- Clean up by removing the map instance when the component unmounts.

Styling and UI/UX:
- Style the map container to ensure it takes up the appropriate space.
- Ensure that the map is responsive and user-friendly, allowing zooming in/out and panning around.

Additional Files:
- Create index.html to provide the root element for rendering React components.
- Configure index.js to render the PolygonMap component within the root element.
