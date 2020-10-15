module.exports = {
    css: {
        loaderOptions: {
            sass:{
                additionalData: '@import "@/styles/base.scss";'
            }
        }
    }
}
// has to be outside src