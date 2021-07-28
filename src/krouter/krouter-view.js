export default {
    render(h) {
        const { routeMap, current } = this.$router
        let component = routeMap[current].component || null;
        // console.log(this.$router)
        // this.$router.$options.routes.forEach(route => {
        //     if(route.path === this.$router.current) {
        //         component = route.component
        //     }
        // })
        return h(component)
    }
}