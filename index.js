import Vue from "vue";

const component = Vue.component("vue-codeditor", {
    // render function
    render(h) {
        return h("div")
    },

    // props ( value | mode | theme | readonly)
    props: ["value", "mode", "theme", "readonly"],

    // data ( editor | contentPre )
    data() {
        return {
            editor: null,
            contentPre: ""
        }
    },

    // watch ( value | theme | mode | readonly)
    watch: {
        value(value) {
            if (this.contentPre !== value) {
                this.editor.session.setValue(value, 1);
                this.contentPre = value;
            }
        },
        theme(value) {
            // import brace & theme-xxx.js
            const ace = require("brace");
            require("brace/theme/" + value);

            this.editor.setTheme("ace/theme/" + value);
        },
        mode(value) {
			// import brace & mode-xxx.js
            const ace = require("brace");
            require("brace/mode/" + value);
			
            this.editor.getSession().setMode(typeof value === "string" ? ("ace/mode/" + value) : value);
        },
        readonly(value) {
            this.editor.setReadOnly(value);
        },
    },

    // beforeDestroy
    beforeDestroy() {
        this.editor.destroy();
        this.editor.container.remove();
    },

    // mounted
    mounted() {
        const vm = this;
        // set mode-xxx.js & theme-xxx.js
        const mode = this.mode || "javascript";
        const theme = this.theme || "chrome";
        const readonly = this.readonly || null;

        // import brace & mode-xxx.js & theme-xxx.js
        const ace = require("brace");
        require("brace/mode/" + mode);
        require("brace/theme/" + theme);

        // set editor's mode-xxx.js & theme-xxx.js
        const editor = vm.editor = ace.edit(this.$el);
        editor.getSession().setMode(typeof mode === "string" ? ("ace/mode/" + mode) : mode);
        editor.setTheme("ace/theme/" + theme);
        editor.setReadOnly((readonly == "true") ? readonly : null);
        editor.setOptions({
            maxLines: Infinity,
        });

        if (this.value) {
            editor.setValue(this.value, 1);
        }

        this.contentPre = this.value;

        // update content
        editor.on("change", function () {
            const content = editor.getValue();
            vm.$emit("input", content);
            vm.contentPre = content;
        });
    }
})

export default component;