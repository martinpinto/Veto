export default class Model {
    id: number;
    _type: string;

    parseDynamicValues(model: Model) {
        let self = this;

        for (let key in model) {
            if (model.hasOwnProperty(key)) {
                let split = key.split(".");
                if (split.length > 1) {
                    let properties = {
                        model: split[0],
                        property: split[1]
                    };
                    if (!self[properties.model]) {
                        self[properties.model] = this.instantiate(properties.model);
                    }
                    self[properties.model][properties.property] = model[key];
                } else {
                    self[key] = model[key];
                }
            }
        }
        console.log(self);
    }

    private instantiate(className: string) {
        var tmpObj = {};
        tmpObj[className] = {};
        var obj = Object.create(tmpObj[className]);
        return obj;
    }

}