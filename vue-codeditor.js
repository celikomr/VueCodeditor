import Vue from "vue"

const component = Vue.component("vue-codeditor", {
    // render function
    render: function (h) {
        // create editor div element
        return h("div", {
            attrs: {
                id: this.id,
                style: "width: 100%",
            }
        })
    },

    // props (id | content | mode | theme)
    props: ["id", "content", "mode", "theme"],

    // watch (content)
    watch: {
        content(value) {
            if (this.beforeContent !== value) {
                this.editor.setValue(value, 1);
            }
        },
    },

    // mounted
    mounted() {
        // set mode-xxx.js & theme-xxx.js
        const mode = this.mode || "javascript";
        const theme = this.theme || "github";

        // import brace & mode-xxx.js & theme-xxx.js
        var ace = require("brace");
        require(`brace/mode/${mode}`);
        require(`brace/theme/${theme}`);

        this.editor = ace.edit(this.id);
        this.editor.setValue(this.content, 1);

        // set editor's mode-xxx.js & theme-xxx.js
        this.editor.getSession().setMode(`ace/mode/${mode}`);
        this.editor.setTheme(`ace/theme/${theme}`);
        this.editor.setOptions({
            maxLines: Infinity,
        });

        this.editor.on("change", () => {
            this.beforeContent = this.editor.getValue();
            this.$emit("change-content", this.editor.getValue());
        });
    },
})

export default component;