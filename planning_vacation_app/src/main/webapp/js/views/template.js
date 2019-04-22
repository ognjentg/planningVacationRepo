var templateView = {

    selectPanel: function () {
        util.selectPanel(this.getPanel());

    },

    getPanel: function () {
        return {
            id: "templatePanel",
            view:"template",
            template:"Template goes here"
        }
    }
};