## Usage

```
// Requiring the module
var imageGalModule = require('image-gal');
```
```
// Instantiation
var imageGal = imageGalModule()
```

```
// Using own template file
var template = 'my-template.html'

var imageGal = imageGalModule(template);
```
Then you can use it as an Express.js route handler
```
app.get('/images*', imgGal);
```
If the url path is `/images` it will output images folder contents
if the url path is `/images/cats` it will output cats folder contents

If you use your own template file put `<% images %>` where you want images' html to appear
