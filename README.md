![npm](https://img.shields.io/npm/v/vue-codeditor)

# vue-codeditor

Multi-language vue js code editor component running on the browser.

### Project setup
```
npm install vue-codeditor
```

### Usage
##### Import vue-codeditor component
```javascript
// main.js

import Vue from "vue"
import App from "./App.vue"
import vueCodeditor from "vue-codeditor";

Vue.component(vueCodeditor)
```
##### Usage in other components
```html
<!-- App.vue -->

<template>
  <div id="app">
    <!-- 
        * Can be used in the loop (for multiple editor components)
        * Each component must have its own content value.
    -->
    <vue-codeditor v-model="content" mode="javascript" theme="chrome" />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      content: "console.log('Hello world!')",
    };
  },
};
</script>
```
##### Component feature(s)

* prob ```v-model``` is required
* prob ```mode``` is optional | [ace theme(s)](https://github.com/ajaxorg/ace/tree/master/lib/ace/theme)
* prob ```theme``` is optional | [ace mode(s)](https://github.com/ajaxorg/ace/tree/master/lib/ace/mode)

### Sample pictures

![codedit_1](images/codedit_1.PNG)

![codedit_2](images/codedit_2.PNG)

![codedit_3](images/codedit_3.PNG)


#### Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

#### License
[MIT](https://choosealicense.com/licenses/mit/)