export default {
    props: {
        to: {
            type: String,
            required: true
        }
    },
    render(h) {
        console.log(this.$slots)
        // return h("a",{attrs:{herf: "#"+this.to,class:"router-link"}},this.$slots.default) 两种class都可以
        return h("a", {
            attrs: {
                href: "#" + this.to
            },
            class: "router-link"
        }, this.$slots.default)
    }
}