let ficherogpx  = document.querySelector('#rutaFich');
document.getElementById("formuRuta").addEventListener("submit", function(event) {
    event.preventDefault();
    let fileInput = document.getElementById("rutaFich");
    let file = fileInput.files[0];
    let reader = new FileReader();
    reader.onload = function() {
        let gpx = reader.result;
        let parser = new gpxParser();
        parser.parse(gpx);
        // let geojson = parser.toGeoJSON()
        // console.log(geojson);
        let json = parser.tracks[0] ;
        console.log(json);
    }
    reader.readAsText(file);
let gpx = new gpxParser(); //Create gpxParser Object
gpx.parse("<xml><gpx></gpx></xml>"); //parse gpx file from string data
});